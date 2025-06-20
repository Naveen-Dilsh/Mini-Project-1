// Sample clothing data for testing auto-fit functionality

export const SAMPLE_TROUSERS = [
  {
    _id: "trouser_1",
    name: "Classic Khaki Trousers",
    description: "Comfortable cotton khaki trousers",
    category: "trousers",
    basePrice: 89,
    images: {
      trousers: "/placeholder.svg?height=600&width=400&text=Khaki+Trousers",
    },
    properties: {
      texture: "smooth",
      pattern: "solid",
      weight: "medium",
      stretch: false,
    },
  },
  {
    _id: "trouser_2",
    name: "Slim Fit Jeans",
    description: "Modern slim fit denim jeans",
    category: "trousers",
    basePrice: 120,
    images: {
      trousers: "/placeholder.svg?height=600&width=400&text=Slim+Jeans",
    },
    properties: {
      texture: "textured",
      pattern: "solid",
      weight: "heavy",
      stretch: true,
    },
  },
  {
    _id: "trouser_3",
    name: "Formal Dress Pants",
    description: "Elegant wool dress pants",
    category: "trousers",
    basePrice: 150,
    images: {
      trousers: "/placeholder.svg?height=600&width=400&text=Dress+Pants",
    },
    properties: {
      texture: "smooth",
      pattern: "solid",
      weight: "medium",
      stretch: false,
    },
  },
]

export const SAMPLE_SHIRTS = [
  {
    _id: "shirt_1",
    name: "White Dress Shirt",
    description: "Classic white cotton dress shirt",
    category: "shirt",
    basePrice: 75,
    images: {
      shirt: "/placeholder.svg?height=600&width=400&text=White+Shirt",
    },
    properties: {
      texture: "smooth",
      pattern: "solid",
      weight: "light",
      stretch: false,
    },
  },
]
