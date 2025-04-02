import type { Branch } from "@/lib/types"

// Mock repository data with branches and commits
export const mockBranches: Branch[] = [
  {
    name: "main",
    commits: [
      {
        id: "a1b2c3d",
        message: "Update README with deployment instructions",
        author: "Maria Garcia",
        date: "2023-11-15T14:32:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "e4f5g6h",
        message: "Fix product search pagination bug",
        author: "Alex Chen",
        date: "2023-11-14T09:45:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "i7j8k9l",
        message: "Initial commit with project structure",
        author: "Maria Garcia",
        date: "2023-11-10T16:20:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    name: "feature/payment-gateway",
    commits: [
      {
        id: "m1n2o3p",
        message: "Add Stripe webhook handler",
        author: "James Wilson",
        date: "2023-11-18T11:25:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "q4r5s6t",
        message: "Implement Stripe payment processing",
        author: "Sophia Lee",
        date: "2023-11-17T15:40:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "u7v8w9x",
        message: "Create payment models and database schema",
        author: "James Wilson",
        date: "2023-11-16T10:15:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    name: "bugfix/cart-session",
    commits: [],
  },
  {
    name: "feature/user-reviews",
    commits: [],
  },
  {
    name: "feature/inventory-management",
    commits: [],
  },
]

