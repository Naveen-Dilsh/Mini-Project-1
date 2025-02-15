import React, { useState, useRef } from "react";
import { Camera, Lock, Check, X } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const Input = ({ className, ...props }) => (
  <input
    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${className}`}
    {...props}
  />
);

const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const UserProfile = () => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [imageError, setImageError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { user, setUser } = useUserStore();

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setIsEditingPassword(false);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageError("Please upload an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size should be less than 5MB");
      return;
    }

    setImageError("");
    setIsUploading(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        
        try {
          // Send to backend
          const response = await axios.post("/auth/addImage", {
            image: base64Image
          });
          
          
          toast.success("Image uploaded successfully");
        } catch (error) {
          toast.error("Failed to upload image");
          setImageError("Failed to upload image. Please try again.");
          console.error("Image upload error:", error);
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to process image");
      setImageError("Failed to process image. Please try again.");
      console.error("File reading error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100">
        <div className="text-center border-b border-gray-100 p-6">
          <h1 className="text-3xl font-serif text-gray-800 tracking-wide">Personal Profile</h1>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="relative inline-block group">
                <img
                  src={user?.image || "/api/placeholder/150/150"}
                  alt="Profile"
                  className={`w-32 h-32 rounded-full object-contain border-4 border-gray-100 shadow-md mx-auto transition-transform group-hover:opacity-90 ${
                    isUploading ? 'opacity-50' : ''
                  }`}
                />
                <button 
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  disabled={isUploading}
                >
                  <Camera className="w-5 h-5 text-gray-600" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              {imageError && (
                <div className="text-red-500 text-sm">{imageError}</div>
              )}
              {isUploading && (
                <div className="text-gray-500 text-sm">Uploading...</div>
              )}
              <h3 className="text-xl font-medium text-gray-800">{user?.name}</h3>
              <p className="text-gray-500 text-sm">Member since 2024</p>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                  <Input 
                    value={user?.name || ''}
                    readOnly
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                  <Input 
                    value={user?.email || ''}
                    readOnly
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Size</label>
                  <Input 
                    value={user?.preferredSize || ''}
                    readOnly
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                  <Input 
                    value={user?.address || ''}
                    readOnly
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
              </div>

              {!isEditingPassword ? (
                <Button
                  onClick={() => setIsEditingPassword(true)}
                  className="mt-4 bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </Button>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-4 border-t pt-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Current Password</label>
                    <Input 
                      type="password" 
                      className="bg-gray-50 border-gray-200 hover:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">New Password</label>
                    <Input 
                      type="password" 
                      className="bg-gray-50 border-gray-200 hover:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Confirm New Password</label>
                    <Input 
                      type="password" 
                      className="bg-gray-50 border-gray-200 hover:bg-white transition-colors"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      type="submit" 
                      className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Save Password
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setIsEditingPassword(false)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {showSuccessAlert && (
            <div className="mt-6 p-4 rounded-lg bg-green-50 text-green-800 border border-green-100">
              Password successfully updated
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;