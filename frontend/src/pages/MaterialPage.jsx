import { useUserStore } from "../stores/useUserStore"
import MaterialManager from "../components/MaterialManager"
import { Navigate } from "react-router-dom"

const MaterialsPage = () => {
  const { user } = useUserStore()



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <MaterialManager />
      </div>
    </div>
  )
}

export default MaterialsPage
