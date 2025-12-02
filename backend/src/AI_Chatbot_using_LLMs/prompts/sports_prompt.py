from src.AI_Chatbot_using_LLMs.utils.state import ChatState
from src.AI_Chatbot_using_LLMs.utils.prompts import SPORTS_PROMPT

def sports_node(state: ChatState):
    formatted_prompt = SPORTS_PROMPT.format(query=state['user_query'])
    return {"prompt": formatted_prompt}