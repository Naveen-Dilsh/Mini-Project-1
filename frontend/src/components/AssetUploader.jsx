"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, Check } from "lucide-react"

const AssetUploader = ({ onAssetsUploaded, category = "shirt" }) => {
  const [uploadedAssets, setUploadedAssets] = useState({})
  const [uploading, setUploading] = useState(false)

  const assetTypes = {
    shirt: ["shirt", "collar", "pockets", "cuffs", "buttons"],
    trousers: ["trousers", "pockets", "belt"],
    jacket: ["jacket", "collar", "pockets", "buttons"],
    accessories: ["collar", "pockets", "cuffs", "buttons", "belt"],
  }

  const onDrop = useCallback((acceptedFiles, rejectedFiles, assetType) => {
    if (rejectedFiles.length > 0) {
      alert("Please upload only PNG/JPG images under 5MB")
      return
    }

    const file = acceptedFiles[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedAssets((prev) => ({
        ...prev,
        [assetType]: {
          file,
          preview: e.target.result,
          name: file.name,
        },
      }))
    }
    reader.readAsDataURL(file)
  }, [])

  const removeAsset = (assetType) => {
    setUploadedAssets((prev) => {
      const newAssets = { ...prev }
      delete newAssets[assetType]
      return newAssets
    })
  }

  const handleUpload = async () => {
    if (Object.keys(uploadedAssets).length === 0) {
      alert("Please select at least one asset to upload")
      return
    }

    setUploading(true)
    try {
      // Convert files to base64 for upload
      const assetsData = {}
      for (const [type, asset] of Object.entries(uploadedAssets)) {
        assetsData[type] = asset.preview
      }

      await onAssetsUploaded(assetsData)
      setUploadedAssets({})
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assetTypes[category]?.map((assetType) => (
          <AssetDropzone
            key={assetType}
            assetType={assetType}
            uploadedAsset={uploadedAssets[assetType]}
            onDrop={onDrop}
            onRemove={removeAsset}
          />
        ))}
      </div>

      {Object.keys(uploadedAssets).length > 0 && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setUploadedAssets({})}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={uploading}
          >
            Clear All
          </button>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Upload Assets</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

const AssetDropzone = ({ assetType, uploadedAsset, onDrop, onRemove }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (accepted, rejected) => onDrop(accepted, rejected, assetType),
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  })

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 capitalize">
        {assetType.replace(/([A-Z])/g, " $1")}
      </label>

      {uploadedAsset ? (
        <div className="relative border-2 border-green-300 rounded-lg p-4 bg-green-50">
          <img
            src={uploadedAsset.preview || "/placeholder.svg"}
            alt={assetType}
            className="w-full h-32 object-cover rounded"
          />
          <div className="absolute top-2 right-2 flex space-x-1">
            <div className="bg-green-600 text-white rounded-full p-1">
              <Check className="w-3 h-3" />
            </div>
            <button
              onClick={() => onRemove(assetType)}
              className="bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2 truncate">{uploadedAsset.name}</p>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            {isDragActive ? "Drop the file here" : "Drag & drop or click to select"}
          </p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
        </div>
      )}
    </div>
  )
}

export default AssetUploader
