import Header from "../header"
import FigmaConverter from "@/components/figma-converter"
import { FigmaConnectionProvider } from "@/components/figma-connection-provider"
import { FigmaStatusToast } from "@/components/figma-status-toast"

export default function Page() {
  return (
    <FigmaConnectionProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <FigmaConverter />
        <FigmaStatusToast />
      </div>
    </FigmaConnectionProvider>
  )
}
