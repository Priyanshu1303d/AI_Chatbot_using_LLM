from src.AI_Chatbot_using_LLMs.utils.state import ChatState
from src.AI_Chatbot_using_LLMs.utils.prompts import EDUCATION_PROMPT

def education_node(state: ChatState):
    formatted_prompt = EDUCATION_PROMPT.format(query=state['user_query'])
    return {"prompt": formatted_prompt}