"use client"

import { useEffect } from "react"
import { useUserStore } from "../stores/useUserStore"
import { useSuitDesignStore } from "../stores/useSuitDesignStore"
import SuitDesigner from "../components/SuitDesigner"
import LoadingSpinner from "../components/LoadingSpinner"

const SuitDesignerPage = () => {
  const { user } = useUserStore()
  const { getUserSuitDesigns, loading } = useSuitDesignStore()

  useEffect(() => {
    if (user) {
      getUserSuitDesigns()
    }
  }, [user, getUserSuitDesigns])

  if (loading) {
    return <LoadingSpinner />
  }

  return <SuitDesigner />
}

export default SuitDesignerPage
