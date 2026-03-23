/**
 * LongCat AI Client
 * Documentation: https://longcat.chat/platform/docs/
 */

interface LongCatRequest {
  model: string;
  messages: { role: string; content: string }[];
  temperature?: number;
  max_tokens?: number;
}

interface LongCatResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

class LongCatClient {
  private apiKey: string;
  private baseUrl: string = 'https://api.longcat.chat/v1';

  constructor() {
    this.apiKey = import.meta.env.VITE_LONGCAT_API_KEY || '';
  }

  async generate(prompt: string, systemPrompt?: string): Promise<string> {
    if (!this.apiKey) {
      console.warn('LongCat API Key missing. Returning simulation mode response.');
      return this.simulateResponse(prompt);
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'longcat-v1', // Replace with the actual model name from docs
          messages: [
            { role: 'system', content: systemPrompt || 'You are WRAITH, an expert narrative architecture engine.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
        } as LongCatRequest),
      });

      if (!response.ok) {
        throw new Error(`LongCat API Error: ${response.statusText}`);
      }

      const data: LongCatResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('LongCat Generation Failed:', error);
      return this.simulateResponse(prompt);
    }
  }

  private simulateResponse(prompt: string): string {
    return `[SIMULATED_AI_RESPONSE]: Analyzing "${prompt.slice(0, 30)}..." // Suggesting increased psychological pressure in CH_04 based on the established wound.`;
  }
}

export const aiClient = new LongCatClient();
