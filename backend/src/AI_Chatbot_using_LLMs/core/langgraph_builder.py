from langgraph.graph import StateGraph, START, END
from src.AI_Chatbot_using_LLMs.utils.state import ChatState
from src.AI_Chatbot_using_LLMs.core.model_loader import call_llm
from src.AI_Chatbot_using_LLMs.domains.education_node import education_node
from src.AI_Chatbot_using_LLMs.domains.legal_node import legal_node
from src.AI_Chatbot_using_LLMs.domains.medical_node import medical_node
from src.AI_Chatbot_using_LLMs.domains.sports_node import sports_node


def route_domain(state: ChatState):
    """
    Determines next node based on domain string.
    """
    return state["domain"]

def llm_node(state: ChatState):
    """
    Executes the LLM call using the prompt prepared by domain nodes.
    """
    provider = state.get("provider", "groq")
    
    response = call_llm(state["prompt"], provider=provider)
    
    return {"response": response}

def build_graph():
    graph = StateGraph(ChatState)

    graph.add_node("education", education_node)
    graph.add_node("legal", legal_node)
    graph.add_node("medical", medical_node)
    graph.add_node("sports", sports_node)
    graph.add_node("llm", llm_node)

    graph.add_conditional_edges(
        START,
        route_domain,
        {
            "education": "education",
            "legal": "legal",
            "medical": "medical",
            "sports": "sports",
        }
    )

    graph.add_edge("education", "llm")
    graph.add_edge("legal", "llm")
    graph.add_edge("medical", "llm")
    graph.add_edge("sports", "llm")


    graph.add_edge("llm", END)

    return graph.compile()

chatbot_graph = build_graph()