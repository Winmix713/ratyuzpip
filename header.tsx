import { Code2, Zap, ArrowRight } from "lucide-react"

const Header = () => {
  return (
    <header className="relative w-full bg-black border-b border-gray-800/50 backdrop-blur-xl">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/50 to-black opacity-80"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fillOpacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Left side - Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-black border border-gray-700 rounded-xl p-2.5 group-hover:border-gray-600 transition-all duration-300">
                  <Code2 className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors duration-300" />
                </div>
              </div>

              {/* Title */}
              <div className="flex flex-col">
                <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                  Figma-React
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent ml-2">
                    Konverter
                  </span>
                </h1>
                <p className="text-xs text-gray-400 font-medium tracking-wide">Design to Code, Instantly</p>
              </div>
            </div>
          </div>

          {/* Right side - Status and CTA */}
          <div className="flex items-center space-x-4">
            {/* Status Badge */}
            <div className="hidden sm:flex items-center space-x-2 bg-gray-900/60 border border-gray-700/50 rounded-full px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
                <span className="text-sm font-medium text-gray-300">Sass Dark UI</span>
              </div>
              <div className="w-px h-4 bg-gray-700"></div>
              <Zap className="w-4 h-4 text-yellow-400" />
            </div>

            {/* CTA Button */}
            <button className="group relative inline-flex items-center justify-center px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-100 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>

              {/* Subtle shimmer effect */}
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:animate-[shimmer_0.8s_ease-in-out] opacity-0 group-hover:opacity-100"></div>
            </button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      </div>
    </header>
  )
}

export default Header
