"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import { LuMessageCircle, LuSend, LuX } from "react-icons/lu";

type Message = {
  sender: "user" | "bot";
  text: string;
};

interface Career {
  id: number;
  title: string;
  department: string;
  description: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  hours: string;
}

// Mock database service - in a real app, this would be an actual database connection
class DBService {
  // Mock careers data
  private static careers: Career[] = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      description: "Develop modern web interfaces using React and TypeScript.",
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Design",
      description:
        "Create user-centered designs for web and mobile applications.",
    },
    {
      id: 3,
      title: "Marketing Specialist",
      department: "Marketing",
      description:
        "Develop and execute marketing campaigns across digital channels.",
    },
    {
      id: 4,
      title: "Backend Developer",
      department: "Engineering",
      description: "Build robust APIs and backend services using Node.js.",
    },
  ];

  // Mock services data
  private static services: Service[] = [
    {
      id: 1,
      name: "Web Development",
      description:
        "Custom websites and web applications for businesses of all sizes.",
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Native and cross-platform mobile apps for iOS and Android.",
    },
    {
      id: 3,
      name: "UX/UI Design",
      description:
        "User-centered design services that enhance user satisfaction.",
    },
    {
      id: 4,
      name: "Digital Marketing",
      description:
        "Data-driven marketing strategies to grow your online presence.",
    },
  ];

  // Mock contact data
  private static contactInfo: ContactInfo = {
    email: "info@example.com",
    phone: "+1 (123) 456-7890",
    address: "123 Tech Street, San Francisco, CA",
    hours: "Monday-Friday: 9am-5pm PST",
  };

  // Query the "database" for careers
  static async queryCareers(query?: string): Promise<Career[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!query) return this.careers;

    // Simple search implementation
    return this.careers.filter(
      (career) =>
        career.title.toLowerCase().includes(query.toLowerCase()) ||
        career.department.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Query the "database" for services
  static async queryServices(query?: string): Promise<Service[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!query) return this.services;

    // Simple search implementation
    return this.services.filter((service) =>
      service.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Get contact information
  static async getContactInfo(): Promise<ContactInfo> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.contactInfo;
  }
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi there! I'm your AI assistant. How can I help you with questions about our site?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to handle user messages and generate responses
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Generate response after "querying the database"
      const response = await generateDatabaseResponse(userMessage.text);
      setMessages((prev) => [...prev, response]);
    } catch (error: unknown) {
      // Handle errors
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I encountered an error while searching for information. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Generate response by querying the "database"
  const generateDatabaseResponse = async (
    message: string
  ): Promise<Message> => {
    const lowerMessage = message.toLowerCase();

    // Career related queries
    if (
      lowerMessage.includes("career") ||
      lowerMessage.includes("job") ||
      lowerMessage.includes("position") ||
      lowerMessage.includes("hiring") ||
      lowerMessage.includes("work")
    ) {
      // Extract potential search terms (after "about", for example: "tell me about frontend jobs")
      const searchTerms = extractSearchTerms(lowerMessage, [
        "career",
        "job",
        "position",
        "hiring",
      ]);

      // Query the "database"
      const positions = await DBService.queryCareers(searchTerms);

      if (positions.length === 0) {
        return {
          sender: "bot",
          text: `I couldn't find any positions matching "${searchTerms}". Would you like to see all available positions?`,
        };
      }

      // If asking about a specific position
      if (searchTerms && positions.length === 1) {
        const position = positions[0];
        return {
          sender: "bot",
          text: `The ${position.title} position in our ${position.department} department requires: ${position.description}`,
        };
      }

      // General response about available positions
      return {
        sender: "bot",
        text: `We currently have ${positions.length} open positions: ${positions
          .map((p) => p.title)
          .join(", ")}. Would you like to know more about any specific role?`,
      };
    }

    // Services related queries
    if (
      lowerMessage.includes("service") ||
      lowerMessage.includes("offer") ||
      lowerMessage.includes("provide") ||
      lowerMessage.includes("solution")
    ) {
      // Extract potential search terms
      const searchTerms = extractSearchTerms(lowerMessage, [
        "service",
        "offer",
        "provide",
      ]);

      // Query the "database"
      const services = await DBService.queryServices(searchTerms);

      if (searchTerms && services.length === 1) {
        const service = services[0];
        return {
          sender: "bot",
          text: `Our ${service.name} service includes: ${service.description}`,
        };
      }

      return {
        sender: "bot",
        text: `We offer the following services: ${services
          .map((s) => s.name)
          .join(", ")}. Can I provide more details about any of these?`,
      };
    }

    // Contact related queries
    if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("phone") ||
      lowerMessage.includes("reach") ||
      lowerMessage.includes("address") ||
      lowerMessage.includes("location") ||
      lowerMessage.includes("hours")
    ) {
      const contactInfo = await DBService.getContactInfo();

      // Specific contact information requested
      if (lowerMessage.includes("email")) {
        return {
          sender: "bot",
          text: `You can email us at ${contactInfo.email}.`,
        };
      }

      if (lowerMessage.includes("phone") || lowerMessage.includes("call")) {
        return {
          sender: "bot",
          text: `You can call us at ${contactInfo.phone}.`,
        };
      }

      if (
        lowerMessage.includes("address") ||
        lowerMessage.includes("location") ||
        lowerMessage.includes("office")
      ) {
        return {
          sender: "bot",
          text: `Our office is located at ${contactInfo.address}.`,
        };
      }

      if (lowerMessage.includes("hours") || lowerMessage.includes("open")) {
        return {
          sender: "bot",
          text: `Our business hours are ${contactInfo.hours}.`,
        };
      }

      // General contact information
      return {
        sender: "bot",
        text: `You can contact us at ${contactInfo.email} or call us at ${contactInfo.phone}. Our office is located at ${contactInfo.address} and we're open ${contactInfo.hours}.`,
      };
    }

    // Default response
    return {
      sender: "bot",
      text: "I'm not sure I understand. Could you rephrase your question? You can ask about our careers, services, or how to contact us.",
    };
  };

  // Helper function to extract search terms from user message
  const extractSearchTerms = (message: string, keywords: string[]): string => {
    // Find if the message contains phrases like "about X" or "for X"
    for (const connector of ["about", "for", "regarding", "on"]) {
      const regex = new RegExp(`${connector}\\s+([\\w\\s]+)`, "i");
      const match = message.match(regex);

      if (match && match[1]) {
        // Check that the extracted term isn't just one of our keywords
        const term = match[1].trim().toLowerCase();
        if (!keywords.some((keyword) => term === keyword)) {
          return term;
        }
      }
    }

    // Look for specific job titles or service names if nothing else found
    const commonTerms = [
      "frontend",
      "backend",
      "developer",
      "designer",
      "marketing",
      "web",
      "mobile",
      "app",
      "design",
      "ui",
      "ux",
    ];

    for (const term of commonTerms) {
      if (message.toLowerCase().includes(term)) {
        return term;
      }
    }

    return "";
  };

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg z-50 hover:bg-primary-dark transition-all duration-300"
        aria-label="Open chat"
      >
        <LuMessageCircle size={24} />
      </button>

      {/* Chat interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaRobot size={20} />
                <h3 className="font-medium">AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-dark rounded-full p-1 transition-colors"
                aria-label="Close chat"
              >
                <LuX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-white shadow-md rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white shadow-md rounded-2xl rounded-tl-none px-4 py-2">
                    <p className="text-sm">
                      <span className="animate-pulse">...</span>
                    </p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask a question..."
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className={`rounded-full p-2 ${
                    input.trim()
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <LuSend size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
