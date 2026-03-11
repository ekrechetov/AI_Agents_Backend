declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GEMINI_API_KEY: string;
      VITE_API_URL: string;
    }
  }
}
export {};
