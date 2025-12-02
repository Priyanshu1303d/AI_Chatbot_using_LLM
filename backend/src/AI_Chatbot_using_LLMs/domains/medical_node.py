from src.AI_Chatbot_using_LLMs.utils.state import ChatState
from src.AI_Chatbot_using_LLMs.utils.prompts import MEDICAL_PROMPT

def medical_node(state: ChatState):
    """
    Prepares the prompt for medical queries with safety guardrails.
    """
    query = state.get('user_query', '')
    formatted_prompt = MEDICAL_PROMPT.format(query=query)
    
    return {"prompt": formatted_prompt}