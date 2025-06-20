"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Upload } from "lucide-react"

const AssetValidator = ({ onValidAsset }) => {
  const [validationResults, setValidationResults] = useState({})
  const [previewImages, setPreviewImages] = useState({})

  const validateAsset = async (file, category) => {
    return new Promise((resolve) => {
      const img = new Image()
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        // Check for transparency
        let hasTransparency = false
        let transparentPixels = 0

        for (let i = 3; i < data.length; i += 4) {
          if (data[i] < 255) {
            hasTransparency = true
            if (data[i] === 0) transparentPixels++
          }
        }

        const totalPixels = canvas.width * canvas.height
        const transparencyPercentage = (transparentPixels / totalPixels) * 100

        const validation = {
          hasTransparency,
          transparencyPercentage,
          resolution: `${img.width}x${img.height}`,
          isCorrectSize: img.width === 1024 && img.height === 1024,
          fileSize: file.size,
          isValidSize: file.size < 5 * 1024 * 1024, // 5MB limit
          category,
          fileName: file.name,
        }

        resolve(validation)
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const handleFileUpload = async (file, category) => {
    const validation = await validateAsset(file, category)

    setValidationResults((prev) => ({
      ...prev,
      [category]: validation,
    }))

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImages((prev) => ({
        ...prev,
        [category]: e.target.result,
      }))
    }
    reader.readAsDataURL(file)

    // If validation passes, call parent callback
    if (validation.hasTransparency && validation.isCorrectSize) {
      onValidAsset(category, file, validation)
    }
  }

  const getValidationIcon = (validation) => {
    if (!validation) return null

    const isValid = validation.hasTransparency && validation.isCorrectSize && validation.isValidSize

    if (isValid) return <CheckCircle className="w-5 h-5 text-green-500" />
    return <XCircle className="w-5 h-5 text-red-500" />
  }

  const categories = ["trousers", "shirt", "jacket", "longSleeves"]

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Asset Requirements</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• PNG format with transparent background</li>
          <li>• 1024x1024 resolution (matches base character)</li>
          <li>• Same pose and lighting as base character</li>
          <li>• File size under 5MB</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium capitalize">{category}</h4>
              {getValidationIcon(validationResults[category])}
            </div>

            <div className="space-y-3">
              <input
                type="file"
                accept="image/png"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) handleFileUpload(file, category)
                }}
                className="hidden"
                id={`upload-${category}`}
              />

              <label
                htmlFor={`upload-${category}`}
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-400 transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Upload {category} layer</span>
              </label>

              {previewImages[category] && (
                <div className="relative">
                  <img
                    src={previewImages[category] || "/placeholder.svg"}
                    alt={`${category} preview`}
                    className="w-full h-32 object-contain border rounded"
                  />
                </div>
              )}

              {validationResults[category] && <ValidationReport validation={validationResults[category]} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ValidationReport = ({ validation }) => {
  const issues = []
  const successes = []

  if (!validation.hasTransparency) {
    issues.push("No transparency detected - needs transparent background")
  } else {
    successes.push(`${validation.transparencyPercentage.toFixed(1)}% transparent pixels`)
  }

  if (!validation.isCorrectSize) {
    issues.push(`Wrong size: ${validation.resolution} (needs 1024x1024)`)
  } else {
    successes.push("Correct resolution: 1024x1024")
  }

  if (!validation.isValidSize) {
    issues.push(`File too large: ${(validation.fileSize / 1024 / 1024).toFixed(1)}MB (max 5MB)`)
  } else {
    successes.push(`File size OK: ${(validation.fileSize / 1024 / 1024).toFixed(1)}MB`)
  }

  return (
    <div className="text-xs space-y-1">
      {successes.map((success, i) => (
        <div key={i} className="flex items-center text-green-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          {success}
        </div>
      ))}
      {issues.map((issue, i) => (
        <div key={i} className="flex items-center text-red-600">
          <XCircle className="w-3 h-3 mr-1" />
          {issue}
        </div>
      ))}
    </div>
  )
}

export default AssetValidator
