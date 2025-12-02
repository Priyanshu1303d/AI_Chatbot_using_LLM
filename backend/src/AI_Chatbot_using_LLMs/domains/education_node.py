from src.AI_Chatbot_using_LLMs.utils.state import ChatState
from src.AI_Chatbot_using_LLMs.utils.prompts import EDUCATION_PROMPT

def education_node(state: ChatState):
    """
    Prepares the prompt for education-related queries.
    """
    query = state.get('user_query', '')
    formatted_prompt = EDUCATION_PROMPT.format(query=query)
    
    return {"prompt": formatted_prompt}