"use client";

import { ReactNode } from "react";
import Chatbot from "./Chatbot";

interface ChatbotProviderProps {
  children: ReactNode;
}

const ChatbotProvider = ({ children }: ChatbotProviderProps) => {
  return (
    <>
      {children}
      <Chatbot />
    </>
  );
};

export default ChatbotProvider;
