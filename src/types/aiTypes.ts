/* Data Transfer Objects (DTOs) for AI chat interactions */

export interface PartDTO {
	text: string
}

export interface ChatMessageDTO {
  role: 'user' | 'model'
  parts: PartDTO[]
}

export interface ChatRequestDTO {
	message: string
  history: ChatMessageDTO[]
}
