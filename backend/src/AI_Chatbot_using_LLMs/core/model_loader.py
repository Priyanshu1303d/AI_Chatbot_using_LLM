import os
import google.generativeai as genai
from openai import OpenAI
from groq import Groq
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv()

def call_llm(messages: list, provider: str = "groq", model_name: str = None):
    """
    Unified function to call LLMs with full Conversation History.
    Args:
        messages (list): List of dicts [{'role': 'system', 'content': '...'}, {'role': 'user', 'content': '...'}]
    """
    try:
        if provider == "groq":
            key = os.getenv("GROQ_API_KEY")
            if not key: return "Error: GROQ_API_KEY missing."
            
            client = Groq(api_key=key)
            model = model_name if model_name else "llama-3.3-70b-versatile"
            
            resp = client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=0.7
            )
            return resp.choices[0].message.content

        elif provider == "openai":
            key = os.getenv("OPENAI_API_KEY")
            if not key: return "Error: OPENAI_API_KEY missing."
            
            client = OpenAI(api_key=key)
            model = model_name if model_name else "gpt-4o-mini"
            
            resp = client.chat.completions.create(
                model=model,
                messages=messages
            )
            return resp.choices[0].message.content

        elif provider == "gemini":
            key = os.getenv("GOOGLE_API_KEY")
            if not key: return "Error: GOOGLE_API_KEY missing."
            
            genai.configure(api_key=key)
            model = genai.GenerativeModel('gemini-1.5-flash')
            

            full_prompt = "\n".join([m['content'] for m in messages])
            resp = model.generate_content(full_prompt)
            return resp.text

        elif provider == "hf":
            token = os.getenv("HF_TOKEN")
            if not token: return "Error: HF_TOKEN missing."
            
            client = InferenceClient(token=token)
            model = model_name if model_name else "mistralai/Mistral-7B-Instruct-v0.3"
            
            full_prompt = "\n".join([f"{m['role']}: {m['content']}" for m in messages])
            
            resp = client.text_generation(
                full_prompt, model=model, max_new_tokens=512, return_full_text=False
            )
            return resp

        else:
            return f"Error: Unknown provider '{provider}'"

    except Exception as e:
        return f"Error calling {provider}: {str(e)}"