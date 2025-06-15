"use client"

import { FIGMA_CONFIG } from "./figma-config"

export interface FigmaFileResponse {
  document: FigmaDocumentNode
  components: Record<string, FigmaComponent>
  componentSets: Record<string, FigmaComponentSet>
  schemaVersion: number
  styles: Record<string, FigmaStyle>
  name: string
  lastModified: string
  thumbnailUrl: string
  version: string
  role: string
  editorType: string
  linkAccess: string
}

export interface FigmaDocumentNode {
  id: string
  name: string
  type: "DOCUMENT"
  children: FigmaPageNode[]
}

export interface FigmaPageNode {
  id: string
  name: string
  type: "PAGE"
  children: FigmaFrameNode[]
  backgroundColor?: FigmaColor
  prototypeStartNodeID?: string
}

export interface FigmaFrameNode {
  id: string
  name: string
  type: "FRAME" | "COMPONENT" | "INSTANCE" | "GROUP"
  children?: FigmaNode[]
  backgroundColor?: FigmaColor
  absoluteBoundingBox: FigmaBoundingBox
  constraints?: FigmaConstraints
  layoutMode?: "NONE" | "HORIZONTAL" | "VERTICAL"
  primaryAxisSizingMode?: "FIXED" | "AUTO"
  counterAxisSizingMode?: "FIXED" | "AUTO"
  primaryAxisAlignItems?: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN"
  counterAxisAlignItems?: "MIN" | "CENTER" | "MAX"
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
  itemSpacing?: number
  cornerRadius?: number | number[]
  fills?: FigmaFill[]
  strokes?: FigmaStroke[]
  strokeWeight?: number
  effects?: FigmaEffect[]
  exportSettings?: FigmaExportSetting[]
  blendMode?: string
  preserveRatio?: boolean
  layoutGrow?: number
  opacity?: number
  isMask?: boolean
  visible?: boolean
  componentId?: string
  componentProperties?: Record<string, any>
}

export interface FigmaTextNode {
  id: string
  name: string
  type: "TEXT"
  characters: string
  style: FigmaTextStyle
  characterStyleOverrides?: number[]
  styleOverrideTable?: Record<string, FigmaTextStyle>
  absoluteBoundingBox: FigmaBoundingBox
  constraints?: FigmaConstraints
  fills?: FigmaFill[]
  strokes?: FigmaStroke[]
  strokeWeight?: number
  effects?: FigmaEffect[]
  opacity?: number
  visible?: boolean
}

export interface FigmaVectorNode {
  id: string
  name: string
  type: "VECTOR" | "STAR" | "LINE" | "ELLIPSE" | "POLYGON" | "RECTANGLE"
  absoluteBoundingBox: FigmaBoundingBox
  constraints?: FigmaConstraints
  fills?: FigmaFill[]
  strokes?: FigmaStroke[]
  strokeWeight?: number
  strokeCap?: "NONE" | "ROUND" | "SQUARE" | "ARROW_LINES" | "ARROW_EQUILATERAL"
  strokeJoin?: "MITER" | "BEVEL" | "ROUND"
  cornerRadius?: number | number[]
  effects?: FigmaEffect[]
  opacity?: number
  visible?: boolean
}

export type FigmaNode = FigmaFrameNode | FigmaTextNode | FigmaVectorNode

export interface FigmaBoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export interface FigmaConstraints {
  vertical: "TOP" | "BOTTOM" | "CENTER" | "TOP_BOTTOM" | "SCALE"
  horizontal: "LEFT" | "RIGHT" | "CENTER" | "LEFT_RIGHT" | "SCALE"
}

export interface FigmaColor {
  r: number
  g: number
  b: number
  a: number
}

export interface FigmaFill {
  type: "SOLID" | "GRADIENT_LINEAR" | "GRADIENT_RADIAL" | "GRADIENT_ANGULAR" | "GRADIENT_DIAMOND" | "IMAGE"
  color?: FigmaColor
  opacity?: number
  gradientHandlePositions?: FigmaVector[]
  gradientStops?: FigmaColorStop[]
  scaleMode?: "FILL" | "FIT" | "CROP" | "TILE"
  imageTransform?: number[][]
  scalingFactor?: number
  rotation?: number
  imageRef?: string
  filters?: FigmaImageFilters
  visible?: boolean
  blendMode?: string
}

export interface FigmaStroke {
  type: "SOLID" | "GRADIENT_LINEAR" | "GRADIENT_RADIAL" | "GRADIENT_ANGULAR" | "GRADIENT_DIAMOND" | "IMAGE"
  color?: FigmaColor
  opacity?: number
  gradientHandlePositions?: FigmaVector[]
  gradientStops?: FigmaColorStop[]
}

export interface FigmaEffect {
  type: "INNER_SHADOW" | "DROP_SHADOW" | "LAYER_BLUR" | "BACKGROUND_BLUR"
  visible?: boolean
  radius: number
  color?: FigmaColor
  blendMode?: string
  offset?: FigmaVector
  spread?: number
  showShadowBehindNode?: boolean
}

export interface FigmaTextStyle {
  fontFamily: string
  fontPostScriptName?: string
  paragraphSpacing?: number
  paragraphIndent?: number
  listSpacing?: number
  italic?: boolean
  fontWeight: number
  fontSize: number
  textCase?: "ORIGINAL" | "UPPER" | "LOWER" | "TITLE"
  textDecoration?: "NONE" | "UNDERLINE" | "STRIKETHROUGH"
  textAutoResize?: "NONE" | "WIDTH_AND_HEIGHT" | "HEIGHT"
  textAlignHorizontal?: "LEFT" | "RIGHT" | "CENTER" | "JUSTIFIED"
  textAlignVertical?: "TOP" | "CENTER" | "BOTTOM"
  letterSpacing?: number
  lineHeightPx?: number
  lineHeightPercent?: number
  lineHeightPercentFontSize?: number
  lineHeightUnit?: "PIXELS" | "FONT_SIZE_%" | "INTRINSIC_%"
}

export interface FigmaVector {
  x: number
  y: number
}

export interface FigmaColorStop {
  position: number
  color: FigmaColor
}

export interface FigmaImageFilters {
  exposure?: number
  contrast?: number
  saturation?: number
  temperature?: number
  tint?: number
  highlights?: number
  shadows?: number
}

export interface FigmaComponent {
  key: string
  name: string
  description: string
  componentSetId?: string
  documentationLinks: FigmaDocumentationLink[]
}

export interface FigmaComponentSet {
  key: string
  name: string
  description: string
  documentationLinks: FigmaDocumentationLink[]
}

export interface FigmaStyle {
  key: string
  name: string
  description: string
  styleType: "FILL" | "TEXT" | "EFFECT" | "GRID"
}

export interface FigmaDocumentationLink {
  uri: string
}

export interface FigmaExportSetting {
  suffix: string
  format: "JPG" | "PNG" | "SVG" | "PDF"
  constraint: {
    type: "SCALE" | "WIDTH" | "HEIGHT"
    value: number
  }
}

export interface FigmaImagesResponse {
  images: Record<string, string>
  err?: string
}

export class FigmaApiClient {
  private baseUrl = FIGMA_CONFIG.API_BASE_URL
  private token: string

  constructor(token?: string) {
    this.token = token || this.getStoredToken() || FIGMA_CONFIG.TOKEN
  }

  private getStoredToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(FIGMA_CONFIG.STORAGE_KEY)
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        "X-Figma-Token": this.token,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Figma API Error (${response.status}): ${errorText}`)
    }

    return response.json()
  }

  async getFile(fileKey: string): Promise<FigmaFileResponse> {
    try {
      console.log(`🔍 Fetching Figma file: ${fileKey}`)
      const data = await this.makeRequest<FigmaFileResponse>(`/files/${fileKey}`)
      console.log(`✅ Successfully fetched file: ${data.name}`)
      return data
    } catch (error) {
      console.error(`❌ Failed to fetch Figma file:`, error)
      throw error
    }
  }

  async getImages(
    fileKey: string,
    nodeIds: string[],
    options?: {
      format?: "jpg" | "png" | "svg" | "pdf"
      scale?: number
      version?: string
    },
  ): Promise<FigmaImagesResponse> {
    const params = new URLSearchParams({
      ids: nodeIds.join(","),
      format: options?.format || "png",
      scale: (options?.scale || 1).toString(),
    })

    if (options?.version) {
      params.append("version", options.version)
    }

    try {
      console.log(`🖼️ Fetching images for nodes: ${nodeIds.length}`)
      const data = await this.makeRequest<FigmaImagesResponse>(`/images/${fileKey}?${params}`)
      console.log(`✅ Successfully fetched ${Object.keys(data.images || {}).length} images`)
      return data
    } catch (error) {
      console.error(`❌ Failed to fetch images:`, error)
      throw error
    }
  }

  async testConnection(): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      const user = await this.makeRequest("/me")
      console.log(`✅ Figma API connection successful for user: ${user.email}`)
      return { success: true, user }
    } catch (error) {
      console.error(`❌ Figma API connection failed:`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  setToken(token: string): void {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem(FIGMA_CONFIG.STORAGE_KEY, token)
    }
  }

  getToken(): string {
    return this.token
  }
}

// Singleton instance
export const figmaApiClient = new FigmaApiClient()
