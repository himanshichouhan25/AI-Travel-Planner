import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import FloatingButton from "../components/dashboard/FloatingButton";
import MobileNavBar from "../components/dashboard/MobileNavBar";
import ChatDrawer from "../components/chat/ChatDrawer";

export default function DashboardLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Sidebar (Desktop only) */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header />

        {/* Page Content with bottom padding on mobile for MobileNavBar */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Assistant Button */}
      <FloatingButton
        onClick={() => setIsChatOpen((prev) => !prev)}
        isOpen={isChatOpen}
      />

      {/* AI Travel Assistant Chat Drawer / Popup */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Mobile Sticky Bottom Tab Navigation (Mobile only) */}
      <MobileNavBar />
    </div>
  );
}