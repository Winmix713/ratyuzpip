// Figma API konfiguráció
export const FIGMA_CONFIG = {
  TOKEN: "figd_SUor8zw1rY08EsiZ-oGmOQi3aFmll4IsqwqkgCXk",
  API_BASE_URL: "https://api.figma.com/v1",
  STORAGE_KEY: "figma-token",
  CONNECTION_STATUS_KEY: "figma-connection-status",
}

export interface FigmaFileResponse {
  document: any
  components: any
  schemaVersion: number
  styles: any
  name: string
  lastModified: string
  thumbnailUrl: string
  version: string
  role: string
  editorType: string
  linkAccess: string
}

// Token inicializálás és validálás
export async function initializeFigmaToken(): Promise<boolean> {
  try {
    // Ellenőrizzük, hogy van-e már token a localStorage-ban
    const existingToken = localStorage.getItem(FIGMA_CONFIG.STORAGE_KEY)

    if (!existingToken) {
      // Ha nincs token, beállítjuk az alapértelmezettet
      localStorage.setItem(FIGMA_CONFIG.STORAGE_KEY, FIGMA_CONFIG.TOKEN)
      console.log("✅ Figma token automatikusan beállítva")
    }

    // Teszteljük a kapcsolatot
    const isConnected = await testFigmaConnection()

    // Státusz mentése
    localStorage.setItem(FIGMA_CONFIG.CONNECTION_STATUS_KEY, isConnected.toString())

    return isConnected
  } catch (error) {
    console.error("❌ Figma token inicializálás sikertelen:", error)
    localStorage.setItem(FIGMA_CONFIG.CONNECTION_STATUS_KEY, "false")
    return false
  }
}

// API kapcsolat tesztelése
export async function testFigmaConnection(): Promise<boolean> {
  try {
    const token = localStorage.getItem(FIGMA_CONFIG.STORAGE_KEY)
    if (!token) return false

    const response = await fetch(`${FIGMA_CONFIG.API_BASE_URL}/me`, {
      headers: {
        "X-Figma-Token": token,
      },
    })

    if (response.ok) {
      const userData = await response.json()
      console.log("✅ Figma API kapcsolat sikeres:", userData.email)
      return true
    } else {
      console.warn("⚠️ Figma API kapcsolat sikertelen:", response.status)
      return false
    }
  } catch (error) {
    console.error("❌ Figma API kapcsolat hiba:", error)
    return false
  }
}

// Token lekérése
export function getFigmaToken(): string | null {
  return localStorage.getItem(FIGMA_CONFIG.STORAGE_KEY)
}

// Kapcsolat státusz lekérése
export function getFigmaConnectionStatus(): boolean {
  const status = localStorage.getItem(FIGMA_CONFIG.CONNECTION_STATUS_KEY)
  return status === "true"
}
