from fastapi import APIRouter , HTTPException
from pydantic import BaseModel
from typing import Literal , Optional

from src.AI_Chatbot_using_LLMs.core.langgraph_builder import chatbot_graph

router = APIRouter()

class ChatRequest(BaseModel):
    """Request Schema (Data validation)"""
    query : str
    domain : Literal["education", "legal", "medical", "sports"]
    provider : Optional[Literal["groq", "openai", "gemini", "hf"]] = "groq"
    thread_id : str = "default_user"

class ChatResponse(BaseModel):
    """Response Schema"""
    domain : str
    response : str
    provider : str    

@router.post("/chat", response_model = ChatResponse)
async def chat_endpoint(request : ChatRequest):
    try :
        config = {"configurable" : {"thread_id": request.thread_id}}

        initial_state = {
            "user_query" : request.query,
            "domain": request.domain,
            "provider" : request.provider,
            "prompt" : "",
            "response" : "",
            "messages": []
        }

        result = chatbot_graph.invoke(initial_state , config = config)
        
        return ChatResponse(
            domain = result["domain"],
            response= result["response"],
            provider = request.provider
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))