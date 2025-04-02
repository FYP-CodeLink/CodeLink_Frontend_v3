import type { Branch, FileChange, FeatureExplanation, UnitTest, CodeImpact } from "@/lib/types"
import { mockBranches, mockFileChanges, mockExplanations, mockUnitTests, mockImpacts } from "@/lib/mock-data"

/**
 * Fetch all branches and commits
 */
export async function fetchBranches(): Promise<Branch[]> {
  // In a real app, this would be an API call
  // Example: return fetch('/api/branches').then(res => res.json())

  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBranches)
    }, 300) // Simulate network delay
  })
}

/**
 * Fetch file changes for a specific commit
 */
export async function fetchFileChanges(commitId: string): Promise<FileChange[]> {
  // In a real app, this would be an API call
  // Example: return fetch(`/api/commits/${commitId}/changes`).then(res => res.json())

  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFileChanges[commitId] || [])
    }, 300)
  })
}

/**
 * Fetch explanation for a specific file change
 */
export async function fetchExplanation(changeId: string): Promise<FeatureExplanation | null> {
  // In a real app, this would be an API call
  // Example: return fetch(`/api/changes/${changeId}/explanation`).then(res => res.json())

  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockExplanations[changeId] || null)
    }, 300)
  })
}

/**
 * Fetch unit tests for a specific file change
 */
export async function fetchUnitTests(changeId: string): Promise<UnitTest[]> {
  // In a real app, this would be an API call
  // Example: return fetch(`/api/changes/${changeId}/tests`).then(res => res.json())

  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUnitTests[changeId] || [])
    }, 300)
  })
}

/**
 * Fetch code impacts for a specific file change
 */
export async function fetchImpacts(changeId: string): Promise<CodeImpact[]> {
  // In a real app, this would be an API call
  // Example: return fetch(`/api/changes/${changeId}/impacts`).then(res => res.json())

  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockImpacts[changeId] || [])
    }, 300)
  })
}

/**
 * Submit edge cases for a specific file change
 */
export async function submitEdgeCases(changeId: string, edgeCases: string): Promise<{ success: boolean }> {
  // In a real app, this would be an API call
  // Example: return fetch(`/api/changes/${changeId}/edge-cases`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ edgeCases })
  // }).then(res => res.json())

  // For now, simulate a successful response
  return new Promise((resolve) => {
    console.log(`Submitting edge cases for change ${changeId}:`, edgeCases)
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}

