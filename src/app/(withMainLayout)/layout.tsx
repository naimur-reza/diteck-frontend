"use client";

import { ChatbotProvider } from "@/components/shared/Chatbot";
import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header/Header";
import { LenisProvider } from "@/providers/LenisProvider";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <LenisProvider>
      <ChatbotProvider>
        <Header />
        <div>{children}</div>
        <Footer />
      </ChatbotProvider>
    </LenisProvider>
  );
};

export default MainLayout;
