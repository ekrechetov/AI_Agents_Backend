export interface ChatMessageDTO {
  role: 'user' | 'model'
  content: string
}

export interface ChatRequestDTO {
	message: string
  history: ChatMessageDTO[]
}