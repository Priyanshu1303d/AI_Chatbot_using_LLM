from src.AI_Chatbot_using_LLMs.utils.state import ChatState
from src.AI_Chatbot_using_LLMs.utils.prompts import LEGAL_PROMPT

def legal_node(state: ChatState):
    formatted_prompt = LEGAL_PROMPT.format(query=state['user_query'])
    return {"prompt": formatted_prompt}