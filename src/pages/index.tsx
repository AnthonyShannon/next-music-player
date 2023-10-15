import Sidebar from "@/components/Sidebar";
import Center from "@/components/Center";
import { SessionProvider } from "next-auth/react"

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <SessionProvider>
        <main className="flex">
          <Sidebar />
          <Center />
        </main>
      </SessionProvider>
    </div>
  )
}
