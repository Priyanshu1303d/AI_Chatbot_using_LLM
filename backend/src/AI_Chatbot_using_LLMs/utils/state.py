from typing import TypedDict, Literal

class ChatState(TypedDict):
    """
    Represents the state of the conversation graph.
    """
    user_query: str
    domain: Literal["education", "legal", "medical", "sports"]
    provider: Literal["groq", "openai", "gemini", "hf"]
    prompt: str
    response: str