# 🧠 AI Expert System - Intelligent Backend API

A high-performance, stateful backend architecture built with **FastAPI** and **LangGraph**. This system orchestrates domain-specific AI experts, manages persistent conversation memory, and enforces strict guardrails for production-grade reliability.


## ✨ Core Architecture

### 🛡️ Domain-Specific Guardrails

The system uses advanced prompt engineering and negative constraints to ensure experts stay within their lane:

* **Education Node** - Socratic teaching methods (Refuses medical/legal queries)
* **Legal Node** - Informational guidance with liability disclaimers
* **Medical Node** - Health guidelines with emergency protocols
* **Sports Node** - Data-driven analysis and historical context

### 🧠 Stateful Memory & Context

* **LangGraph Checkpointing** - Maintains conversation context across multiple turns using `thread_id`.
* **Session Persistence** - Remembers user preferences and previous questions without sending full history from the frontend.
* **Context Awareness** - Intelligently references previous "User" and "AI" messages for coherent replies.

### 🔀 Intelligent Routing System

* **Auto-Detection** - Analyzes user intent to detect domain mismatches (e.g., asking a Medical expert about Football).
* **Switch Proposals** - Generates structured suggestions ("Would you like to switch to...") that the frontend interprets into UI actions.
* **Zero-Hallucination Routing** - Strictly refuses off-topic queries instead of making up answers.

### 🔌 Multi-Provider LLM Engine

Unified interface connecting to top-tier AI models:

* **Groq** (Llama-3.3-70b) - Low-latency inference
* **OpenAI** (GPT-4o) - High-precision reasoning
* **Google Gemini** (1.5 Flash) - Efficient context handling
* **HuggingFace** (Mistral/Zephyr) - Open-source flexibility

## 🚀 Quick Start

### Prerequisites

* Python 3.10+
* Docker (optional, for containerization)
* API Keys for selected providers

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Priyanshu1303d/AI_Chatbot_using_LLM
cd backend

```

2. **Create Virtual Environment**

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

```

3. **Install Dependencies**

```bash
pip install -r requirements.txt

```

4. **Configuration**
Create a `.env` file in the root directory:

```env
# Core Providers
GROQ_API_KEY=gsk_...
OPENAI_API_KEY=sk-...

# Optional Providers
GOOGLE_API_KEY=AIza...
HF_TOKEN=hf_...

```

5. **Run the Server**

```bash
uvicorn app:app --reload

```

Server will start at `http://127.0.0.1:8000`

## 🔌 API Documentation

The backend provides interactive documentation via Swagger UI.
Access it at: `http://localhost:8000/docs`

### Main Chat Endpoint

**POST** `/api/v1/chat`

**Request Payload:**

```json
{
  "query": "What are the symptoms of the common cold?",
  "domain": "medical",
  "provider": "groq",
  "thread_id": "unique-session-id-123"
}

```

**Response:**

```json
{
  "domain": "medical",
  "response": "The common cold is a viral infection...",
  "provider": "groq"
}

```

## 📁 Project Structure

```
backend/
├── api/
│   └── routes/           # FastAPI Route definitions
├── src/
│   ├── core/
│   │   ├── langgraph_builder.py  # State Machine Logic
│   │   └── model_loader.py       # LLM Provider Factory
│   ├── domains/          # Domain-specific logic nodes
│   │   ├── education_node.py
│   │   ├── legal_node.py
│   │   ├── medical_node.py
│   │   └── sports_node.py
    ├── prompts/          # Prompts logic nodes
│   │   ├── education_prompt.py
│   │   ├── legal_pronpt.py
│   │   ├── medical_prompt.py
│   │   └── sports_prompt.py
│   └── utils/
│       ├── prompts.py    # System Prompts & Guardrails
│       └── state.py      # Pydantic State Models
├── app.py                # App Entry Point & CORS Config
├── Dockerfile            # Container Configuration
└── requirements.txt      # Python Dependencies

```

## ☁️ Deployment

This project is optimized for **Hugging Face Spaces (Docker)** or **Render**.

### Docker Deployment

The included `Dockerfile` is production-ready.

1. **Build the image:**

```bash
docker build -t ai-expert-backend .

```

2. **Run container:**

```bash
docker run -p 7860:7860 --env-file .env ai-expert-backend

```

*Note: For Hugging Face Spaces, simply push the repository and add your API keys in the Space Settings "Secrets" tab.*

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewDomain`)
3. Commit your changes (`git commit -m 'Add Financial Domain'`)
4. Push to the branch (`git push origin feature/NewDomain`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.