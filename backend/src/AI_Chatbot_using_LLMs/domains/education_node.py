from src.AI_Chatbot_using_LLMs.utils.state import ChatState
from src.AI_Chatbot_using_LLMs.utils.prompts import EDUCATION_PROMPT

def education_node(state: ChatState):
    """
    Prepares the prompt for education-related queries.
    """
    formatted_prompt = EDUCATION_PROMPT
    
    return {"prompt": formatted_prompt}