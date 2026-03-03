export interface ChatMessageDTO {
  role: 'user' | 'model'
  content: string
}

export interface ChatRequestDTO {
  history: ChatMessageDTO[]
}