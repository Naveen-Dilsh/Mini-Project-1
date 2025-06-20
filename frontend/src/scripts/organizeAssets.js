import fs from "fs"
import path from "path"

const createAssetFolders = () => {
  const baseDir = "public/assets"

  const folders = [
    "characters/base",
    "characters/poses",
    "clothing/shirts/materials/cotton",
    "clothing/shirts/materials/silk",
    "clothing/shirts/materials/linen",
    "clothing/shirts/materials/wool",
    "clothing/shirts/styles/casual",
    "clothing/shirts/styles/formal",
    "clothing/shirts/colors/white",
    "clothing/shirts/colors/blue",
    "clothing/shirts/colors/black",
    "clothing/trousers/materials/cotton",
    "clothing/trousers/materials/wool",
    "clothing/trousers/styles/casual",
    "clothing/trousers/styles/formal",
    "clothing/jackets/materials/wool",
    "clothing/jackets/materials/cotton",
    "clothing/jackets/styles/blazer",
    "clothing/jackets/styles/suit",
    "clothing/accessories/collars",
    "clothing/accessories/pockets",
    "clothing/accessories/buttons",
    "clothing/accessories/cuffs",
    "clothing/accessories/belts",
    "patterns/stripes",
    "patterns/checks",
    "patterns/dots",
    "patterns/florals",
  ]

  folders.forEach((folder) => {
    const fullPath = path.join(baseDir, folder)
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true })
      console.log(`Created folder: ${fullPath}`)
    }
  })

  console.log("Asset folder structure created successfully!")
}

createAssetFolders()
