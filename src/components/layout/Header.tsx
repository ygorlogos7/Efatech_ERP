"use client";

import React from "react";
import { Menu, Grid, Bell, User } from "lucide-react";
import { signOut } from "next-auth/react";

interface HeaderProps {
  userName?: string;
  userEmail?: string;
}

export function Header({ userName, userEmail }: HeaderProps) {
  // Extract initials (e.g. "Ygor Gomes" -> "YG")
  const getInitials = (name?: string) => {
    if (!name) return "US";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(userName);

  return (
    <header className="h-[60px] bg-[#1a1c23] flex items-center justify-between px-6 text-white shrink-0 shadow-md relative z-10">
      {/* Left section: Logo & Hamburger */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 text-xl font-bold tracking-tight">
          <span>Efatech</span>
          <span className="text-[#38b473]">PRO</span>
        </div>
        <button className="p-1 hover:bg-gray-700 rounded-md transition-colors text-gray-300">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Right section: Icons & User */}
      <div className="flex items-center gap-5">
        <button className="text-gray-300 hover:text-white transition-colors">
          <Grid className="w-[18px] h-[18px]" />
        </button>
        
        <button className="text-gray-300 hover:text-white transition-colors relative">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-[#1a1c23]"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-gray-700">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#1a1c23] font-bold text-xs select-none cursor-pointer hover:bg-gray-100" title={`Sair da conta de ${userName}`}>
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
