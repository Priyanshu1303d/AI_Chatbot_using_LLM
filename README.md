# 🤖 AI Chatbot using LLM (Full Stack)

> **Live Application:** [https://ai-chatbot-using-llm.vercel.app](https://ai-chatbot-using-llm.vercel.app)

## 📖 Overview

This is a production-grade, domain-specific AI Chatbot capable of intelligent routing, persistent memory, and multi-expert persona management. It features a high-performance **FastAPI** backend that orchestrates stateful conversations using **LangGraph**, connected to a modern **Next.js 14** frontend with a sleek, anti-gravity aesthetic.

The system is designed to simulate a team of industry experts:
- 🎓 **Education Expert** (Socratic Tutor)
- ⚖️ **Legal Assistant** (Regulatory Guidance)
- 🏥 **Medical Assistant** (Health Protocols)
- ⚽ **Sports Analyst** (Data & Strategy)

## 🏗️ Architecture

### 🖥️ Frontend (`/frontend`)
- **Framework:** Next.js 14 (App Router) & TypeScript
- **Styling:** Tailwind CSS + GSAP (Animations) + Lenis (Smooth Scroll)
- **Features:**
    - Dynamic Domain Theming (Colors shift based on active expert).
    - Smart "Switch" UI that detects backend routing suggestions.
    - Chat history management and Markdown rendering.

### ⚙️ Backend (`/backend`)
- **Framework:** FastAPI (Python)
- **State Machine:** LangGraph (Manages conversation state & memory).
- **LLM Engine:** Multi-provider support (Groq, OpenAI, Google Gemini, Hugging Face).
- **Intelligence:**
    - **Router:** Automatically detects domain mismatch and proposes switches.
    - **Guardrails:** Strict system prompts prevent off-topic hallucinations.
    - **Memory:** `MemorySaver` persists context across chat turns.

## 📂 Repository Structure

```bash
AI_Chatbot_using_LLM/
├── frontend/           # Next.js Application
│   ├── src/            # Components, Hooks, and Pages
│   ├── public/         # Static Assets
│   └── ...
│
├── backend/            # FastAPI Application
│   ├── api/            # API Routes
│   ├── src/            # Core Logic (Graph, Prompts, Nodes)
│   ├── Dockerfile      # Deployment Config
│   └── ...
│
└── README.md           # Documentation

```

## 🚀 Quick Start (Local Development)

You need two terminals running simultaneously to develop locally.

### Terminal 1: Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload

```

*Backend runs on: `http://localhost:8000*`

### Terminal 2: Frontend

```bash
cd frontend
npm install
npm run dev

```

*Frontend runs on: `http://localhost:3000*`

## 🌐 Deployment Status

| Component | Platform | Status |
| --- | --- | --- |
| **Frontend** | Vercel | ✅ Live |
| **Backend** | Hugging Face Spaces | ✅ Live |

## 🤝 Contribution

This project was developed as a comprehensive Full Stack AI Internship project, demonstrating advanced architecture in State Management, API Design, and UI/UX Engineering.