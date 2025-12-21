from src.AI_Chatbot_using_LLMs.utils.state import ChatState
from src.AI_Chatbot_using_LLMs.utils.prompts import MEDICAL_PROMPT

def medical_node(state: ChatState):
    """
    Prepares the prompt for medical queries with safety guardrails.
    """
    formatted_prompt = MEDICAL_PROMPT
    
    return {"prompt": formatted_prompt}