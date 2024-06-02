import { getIconCollections, iconsPlugin  } from '@egoist/tailwindcss-icons'
import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["simple-icons"])
    })
  ],
}
export default config
