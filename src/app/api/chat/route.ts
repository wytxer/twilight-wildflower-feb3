import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function chat(options: OpenAI.ChatCompletionCreateParams) {
  const stream = options.stream ?? false
  return client.chat.completions.create({
    model: options.model,
    stream,
    messages: options.messages,
  })
}

export async function GET (req: NextRequest) {
  try {
    return NextResponse.json({
      code: 0,
      data: await chat({
        model: 'gpt-3.5-turbo',
        stream: false,
        messages: [{ role: 'user', content: 'Hello' }]
      })
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ code: 500 })
  }
}
