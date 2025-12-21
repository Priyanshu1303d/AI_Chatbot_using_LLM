import sys
import os
import uuid

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from src.AI_Chatbot_using_LLMs.core.langgraph_builder import chatbot_graph

def main():
    print("--- AI Chatbot Initialized (Persistent Memory) ---")
    print("Type 'quit' to exit.")
    
    session_id = str(uuid.uuid4())
    config = {"configurable": {"thread_id": session_id}}
    current_domain = None

    while True:
        if not current_domain:
            current_domain = input("\nSelect Domain (education/legal/medical/sports): ").lower()
            if current_domain not in ["education", "legal", "medical", "sports"]:
                print("Invalid domain.")
                current_domain = None
                continue

        query = input(f"\n({current_domain.upper()}) Enter Query: ")
        if query.lower() in ["quit", "exit"]: break
        
        if query.lower().startswith("switch to"):
            new_domain = query.split(" ")[-1]
            if new_domain in ["education", "legal", "medical", "sports"]:
                current_domain = new_domain
                print(f"--- Switched to {current_domain.upper()} ---")
                continue

        initial_state = {
            "user_query": query,
            "domain": current_domain,
            "provider": "groq", 
            "prompt": "",
            "response": "",
            "messages": []
        }

        print("Thinking...")
        result = chatbot_graph.invoke(initial_state, config=config)
        response_text = result["response"]
        print(f"\n[AI]: {response_text}")

        if "switch to" in response_text.lower() or "belongs to the" in response_text.lower():
            
            proposed_domain = None
            if "legal" in response_text.lower(): proposed_domain = "legal"
            elif "medical" in response_text.lower(): proposed_domain = "medical"
            elif "sports" in response_text.lower(): proposed_domain = "sports"
            elif "education" in response_text.lower(): proposed_domain = "education"

            if proposed_domain and proposed_domain != current_domain:
                user_choice = input(f"\n[System]: Bot suggests switching to {proposed_domain.upper()}. Type 'yes' to switch: ").lower()
                
                if user_choice == "yes":
                    current_domain = proposed_domain
                    print(f"--- Domain Switched to {current_domain.upper()} ---")
                    

                    replay = input("Re-ask previous question in new domain? (yes/no): ").lower()
                    if replay == "yes":
                        
                        pass

if __name__ == "__main__":
    main()