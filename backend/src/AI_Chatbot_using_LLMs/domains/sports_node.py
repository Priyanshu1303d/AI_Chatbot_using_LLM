from src.AI_Chatbot_using_LLMs.utils.state import ChatState
from src.AI_Chatbot_using_LLMs.utils.prompts import SPORTS_PROMPT

def sports_node(state: ChatState):
    """
    Prepares the prompt for sports analysis.
    """
    query = state.get('user_query', '')
    formatted_prompt = SPORTS_PROMPT.format(query=query)
    
    return {"prompt": formatted_prompt}