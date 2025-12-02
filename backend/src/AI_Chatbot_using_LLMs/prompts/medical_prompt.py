from src.AI_Chatbot_using_LLMs.utils.state import ChatState
from src.AI_Chatbot_using_LLMs.utils.prompts import MEDICAL_PROMPT

def medical_node(state: ChatState):
    formatted_prompt = MEDICAL_PROMPT.format(query=state['user_query'])
    return {"prompt": formatted_prompt}