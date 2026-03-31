import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { NotificationProvider } from "@/components/providers/NotificationProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f4f7f6]">
      {/* Top Header Navigation */}
      <Header userName={session.user.name || undefined} userEmail={session.user.email || undefined} />
      
      {/* Body with Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6 text-gray-800 relative">
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </main>
      </div>
    </div>
  );
}
