from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from api.routes import chat_routes


app = FastAPI(
    title="AI ChatBot API",
    description="Backend for Domain-Specific Chatbot using LangGraph",
    version="1.0.0"
)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://ai-chatbot-using-llm.vercel.app",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

# 3. Include Routes
app.include_router(chat_routes.router, prefix="/api/v1" , tags=["Chat"])

@app.get("/")
def read_root():
    return {"status": "running", "message": "AI Chatbot Backend is Active"}


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)