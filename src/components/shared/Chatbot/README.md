# AI Chatbot with Database Integration

This is an AI-powered chatbot that can query data from a database to answer user questions about the website. The current implementation uses mock data, but can be easily adapted to use a real database.

## Features

- Floating chat interface accessible from any page
- Ability to query information about careers, services, and contact details
- Natural language processing to extract search terms from user queries
- Animated UI with typing indicators and smooth transitions

## How to Use in Your Project

The chatbot is implemented as a React component that can be added to any layout. It's wrapped in a provider component for easy integration:

```tsx
<ChatbotProvider>
  <YourAppOrLayout />
</ChatbotProvider>
```

## Connecting to a Real Database

The current implementation uses a mock database service (`DBService`) that returns hardcoded data. To connect to a real database:

### 1. Replace the DBService implementation

Replace the mock `DBService` class with your actual database service. For example, if using a REST API:

```typescript
class DBService {
  // Real API implementation for careers
  static async queryCareers(query?: string): Promise<Career[]> {
    try {
      const response = await fetch(`/api/careers?search=${query || ""}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching careers:", error);
      return [];
    }
  }

  // Real API implementation for services
  static async queryServices(query?: string): Promise<Service[]> {
    try {
      const response = await fetch(`/api/services?search=${query || ""}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  }

  // Real API implementation for contact info
  static async getContactInfo(): Promise<ContactInfo> {
    try {
      const response = await fetch("/api/contact");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching contact info:", error);
      return {
        email: "",
        phone: "",
        address: "",
        hours: "",
      };
    }
  }
}
```

### 2. Create API Routes

Create the necessary API routes to handle these requests. For example, using Next.js API routes:

```typescript
// pages/api/careers.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // or your database client

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search } = req.query;

  try {
    const careers = await prisma.career.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search as string, mode: "insensitive" } },
              {
                department: { contains: search as string, mode: "insensitive" },
              },
            ],
          }
        : undefined,
    });

    res.status(200).json(careers);
  } catch (error) {
    console.error("Error fetching careers:", error);
    res.status(500).json({ error: "Failed to fetch careers" });
  }
}
```

### 3. Enhancing the AI Capabilities

For more advanced natural language processing, consider integrating with an AI service like OpenAI:

```typescript
// Example integration with OpenAI
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Inside your Chatbot component
const processWithAI = async (message: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant for our website. Answer questions about our company based on the following information about our services and careers.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return (
      response.choices[0].message.content || "I'm not sure how to answer that."
    );
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return "I'm having trouble processing your request right now.";
  }
};
```

## Further Customization

You can customize the chatbot by:

1. Adding more query types beyond careers, services, and contact
2. Implementing user authentication to personalize responses
3. Adding analytics to track common questions
4. Implementing context memory to handle follow-up questions
5. Adding attachments or rich media responses

## Type Definitions

The chatbot uses TypeScript interfaces to define the data structure. Update these interfaces to match your actual database schema:

```typescript
interface Career {
  id: number;
  title: string;
  department: string;
  description: string;
  // Add more fields as needed
}

interface Service {
  id: number;
  name: string;
  description: string;
  // Add more fields as needed
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  hours: string;
  // Add more fields as needed
}
```
