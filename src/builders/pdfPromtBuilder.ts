	import { InvoiceSchema } from "../utils/zodInvoiceSheme.js" 
  
  export const pdfPrompt = `
    Ти — система для аналізу фінансових документів.
    Проаналізуй інвойс українською мовою.
    Поверни СТРОГО JSON без пояснень.
    Структура:
    ${JSON.stringify(InvoiceSchema, null, 2)}
  `
	