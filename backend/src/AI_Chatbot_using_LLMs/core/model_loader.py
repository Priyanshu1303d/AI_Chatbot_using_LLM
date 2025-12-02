import os
import google.generativeai as genai
from openai import OpenAI
from groq import Groq
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv()

# --------------------------
# UNIFIED CALLER
# --------------------------

def call_llm(prompt: str, provider: str = "groq", model_name: str = None):
    """
    Unified function to call different LLM providers.
    """
    try:

        if provider == "groq":
            key = os.getenv("GROQ_API_KEY")
            if not key: return "Error: GROQ_API_KEY missing."
            
            client = Groq(api_key=key)

            model = model_name if model_name else "llama-3.3-70b-versatile"
            
            resp = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
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
                messages=[{"role": "user", "content": prompt}]
            )
            return resp.choices[0].message.content

        elif provider == "gemini":
            key = os.getenv("GOOGLE_API_KEY")
            if not key: return "Error: GOOGLE_API_KEY missing."
            
            genai.configure(api_key=key)
            model = genai.GenerativeModel('gemini-1.5-flash')
            resp = model.generate_content(prompt)
            return resp.text


        elif provider == "hf":
            token = os.getenv("HF_TOKEN")
            if not token: return "Error: HF_TOKEN missing."
            
            client = InferenceClient(token=token)
            model = model_name if model_name else "mistralai/Mistral-7B-Instruct-v0.3"
            
            resp = client.text_generation(
                prompt, model=model, max_new_tokens=512, return_full_text=False
            )
            return resp

        else:
            return f"Error: Unknown provider '{provider}'"

    except Exception as e:
        return f"Error calling {provider}: {str(e)}"