"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Library, Wand2 } from "lucide-react"
import { MultiStepWizard } from "./multi-step-wizard"
import { OutputArea } from "./output-area"
import { TemplateIntegration } from "./template-integration"
import type { ComponentTemplate } from "@/lib/component-templates"

interface OutputData {
  figmaData?: any
  jsx: string
  css: string
  figmaCss: string
  figmaUrl: string
}

export default function FigmaConverter() {
  const [output, setOutput] = useState<OutputData | null>(null)
  const [showOutput, setShowOutput] = useState(false)
  const [activeTab, setActiveTab] = useState<"converter" | "templates">("converter")

  const handleWizardComplete = (result: OutputData) => {
    setOutput(result)
    setShowOutput(true)
    console.log("🎉 Conversion completed:", result)
  }

  const handleReset = () => {
    setOutput(null)
    setShowOutput(false)
    setActiveTab("converter")
  }

  const handleTemplateSelect = (template: ComponentTemplate) => {
    // Apply template to the converter
    const templateOutput: OutputData = {
      jsx: template.jsx,
      css: template.css,
      figmaCss: "",
      figmaUrl: template.figmaUrl || "",
      figmaData: {
        name: template.name,
        lastModified: template.createdAt,
      },
    }

    setOutput(templateOutput)
    setShowOutput(true)
    setActiveTab("converter")

    console.log("✅ Template applied:", template.name)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
      {!showOutput ? (
        <div className="w-full max-w-7xl">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="converter" className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4" />
                  Figma Converter
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center gap-2">
                  <Library className="w-4 h-4" />
                  Templates
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="converter" className="mt-0">
              <div className="flex justify-center">
                <MultiStepWizard onComplete={handleWizardComplete} />
              </div>
            </TabsContent>

            <TabsContent value="templates" className="mt-0">
              <TemplateIntegration onTemplateSelect={handleTemplateSelect} />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        output && <OutputArea output={output} onReset={handleReset} />
      )}
    </div>
  )
}
