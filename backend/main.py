import sys
import os
from src.AI_Chatbot_using_LLMs.core.langgraph_builder import chatbot_graph

def main():
    print("--- AI Chatbot Initialized ---")
    print("Type 'quit' to exit.")
    
    while True:
        query = input("\nEnter Query: ")
        if query.lower() in ["quit", "exit"]:
            break
            
        domain = input("Select Domain (education/legal/medical/sports): ").lower()
        if domain not in ["education", "legal", "medical", "sports"]:
            print("Invalid domain.")
            continue

        initial_state = {
            "user_query": query,
            "domain": domain,
            "provider": "groq",
            "prompt": "",
            "response": ""
        }

        print("Thinking...")
        result = chatbot_graph.invoke(initial_state)
        
        print(f"\n[AI - {domain.upper()}]:")
        print(result["response"])

if __name__ == "__main__":
    main()