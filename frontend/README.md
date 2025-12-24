# AI Expert System - Multi-Domain Chat Application

A production-ready Next.js 14 chat application featuring domain-specific AI experts, multi-LLM provider support, and ChatGPT-style interface with persistent chat history.

![AI Expert System](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🎯 Domain-Specific Expertise
- **Education** - Academic and learning-related queries
- **Legal** - Legal advice and information
- **Medical** - Healthcare and medical questions
- **Sports** - Sports-related discussions

Each domain has:
- Unique theme colors with smooth transitions
- Specialized AI responses
- Domain-specific prompt engineering

### 🤖 Multi-LLM Provider Support
Choose from 4 different AI providers:
- **Groq** - Ultra-fast inference with Llama models
- **OpenAI** - GPT-4 and GPT-3.5 Turbo
- **Google Gemini** - Multimodal AI capabilities
- **HuggingFace** - Open-source model ecosystem

Switch providers instantly without losing context!

### 💬 ChatGPT-Style Interface
- **Persistent Chat History** - All conversations saved in localStorage
- **Thread Management** - Create, view, and delete chat threads
- **Delete on Hover** - ChatGPT-style delete buttons
- **Welcome Screen** - Helpful onboarding for first-time users
- **Empty State Handling** - Clean UX when no threads exist

### 🎨 Premium UI/UX
- **Glassmorphism Design** - Modern, translucent aesthetic
- **Dark Theme** - Eye-friendly dark mode with vibrant accents
- **Smooth Animations** - GSAP-powered transitions
- **Responsive Layout** - Works on all screen sizes
- **Transparent Scrollbars** - Clean, uncluttered interface

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Backend API running (see Backend Setup)
- At least one LLM provider API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Priyanshu1303d/AI_Chatbot_using_LLM
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1/chat

# Add at least one provider key
GROQ_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
HF_TOKEN=your_huggingface_token_here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

See backend repository for setup instructions.

## 📁 Project Structure

```
frontend/
├── app/
│   ├── page.tsx              # Landing page with Hero
│   ├── chat/
│   │   └── page.tsx          # Main chat page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Hero.tsx              # Landing page hero section
│   ├── ChatInterface.tsx     # Main chat component
│   ├── ChatHistorySidebar.tsx# Thread management sidebar
│   ├── DomainSelector.tsx    # Domain selection UI
│   ├── ProviderSelector.tsx  # LLM provider selection
│   ├── MessageBubble.tsx     # Chat message display
│   ├── DomainSwitchPrompt.tsx# Domain switch confirmation
│   └── SmoothScroll.tsx      # Lenis scroll wrapper
├── hooks/
│   ├── useChat.ts            # Chat logic and API calls
│   └── useTheme.ts           # Dynamic theming system
├── types/
│   └── chat.ts               # TypeScript interfaces
└── .env.example              # Environment template
```

## 📦 Build for Production

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.
