from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver
from src.AI_Chatbot_using_LLMs.utils.state import ChatState
from src.AI_Chatbot_using_LLMs.core.model_loader import call_llm

from src.AI_Chatbot_using_LLMs.domains.education_node import education_node
from src.AI_Chatbot_using_LLMs.domains.legal_node import legal_node
from src.AI_Chatbot_using_LLMs.domains.medical_node import medical_node
from src.AI_Chatbot_using_LLMs.domains.sports_node import sports_node

def route_domain(state: ChatState):
    return state["domain"]

def llm_node(state: ChatState):
    provider = state.get("provider", "groq")
    
    messages_payload = [{"role": "system", "content": state["prompt"]}]
    
    if state.get("messages"):
        for msg in state["messages"]:
            if msg.startswith("User: "):
                messages_payload.append({"role": "user", "content": msg.replace("User: ", "")})
            elif msg.startswith("AI: "):
                messages_payload.append({"role": "assistant", "content": msg.replace("AI: ", "")})
    

    messages_payload.append({"role": "user", "content": state["user_query"]})
    
    response_text = call_llm(messages_payload, provider=provider)
    
    return {
        "response": response_text,
        "messages": [f"User: {state['user_query']}", f"AI: {response_text}"]
    }

def build_graph():
    memory = MemorySaver()
    graph = StateGraph(ChatState)

    graph.add_node("education", education_node)
    graph.add_node("legal", legal_node)
    graph.add_node("medical", medical_node)
    graph.add_node("sports", sports_node)
    graph.add_node("llm", llm_node)

    graph.add_conditional_edges(START, route_domain, {
        "education": "education", "legal": "legal", "medical": "medical", "sports": "sports"
    })

    graph.add_edge("education", "llm")
    graph.add_edge("legal", "llm")
    graph.add_edge("medical", "llm")
    graph.add_edge("sports", "llm")
    graph.add_edge("llm", END)

    return graph.compile(checkpointer=memory)

chatbot_graph = build_graph()