export interface PromtBuilder {
	baseInstructions?: string[]
  domainInstructions: string[]
  uiInstructions?: string[]
  buildInstructions: () => string
}
