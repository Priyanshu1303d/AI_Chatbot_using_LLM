export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type Domain = 'Education' | 'Legal' | 'Medical' | 'Sports';

export type LLMProvider = 'groq' | 'openai' | 'gemini' | 'hf';

export interface ChatRequest {
  query: string;
  domain: string;
  provider: string;
  thread_id?: string;
}

export interface ChatResponse {
  response: string;
}

export interface ChatThread {
  id: string;
  title: string;
  createdAt: Date;
  lastMessageAt: Date;
  messages: Message[];
  domain: Domain;
}
