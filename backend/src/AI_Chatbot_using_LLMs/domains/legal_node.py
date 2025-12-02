from src.AI_Chatbot_using_LLMs.utils.state import ChatState
from src.AI_Chatbot_using_LLMs.utils.prompts import LEGAL_PROMPT

def legal_node(state: ChatState):
    """
    Prepares the prompt for legal queries with necessary disclaimers.
    """
    query = state.get('user_query', '')
    formatted_prompt = LEGAL_PROMPT.format(query=query)
    
    return {"prompt": formatted_prompt}