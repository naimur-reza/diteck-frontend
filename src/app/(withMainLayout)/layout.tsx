"use client";

import { ChatbotProvider } from "@/components/shared/Chatbot";
import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header/Header";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ChatbotProvider>
      <Header />
      <div>{children}</div>
      <Footer />
    </ChatbotProvider>
  );
};

export default MainLayout;
