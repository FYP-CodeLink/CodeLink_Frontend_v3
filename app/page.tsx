"use client"

import { useState } from "react"
import { CodeProvider } from "@/context/code-context"
import BranchExplorer from "@/components/branch-explorer"
import { CommitChangesViewer } from "@/components/commit-changes-viewer"

export default function Home() {
  const [selectedCommitId, setSelectedCommitId] = useState<string | null>(null)

  // This function will be passed to BranchExplorer
  const handleCommitSelect = (commitId: string) => {
    setSelectedCommitId(commitId)
  }

  return (
    <CodeProvider>
      <div className="flex h-screen dark">
        {/* Left panel - fixed width */}
        <div className="w-80 flex-shrink-0">
          <BranchExplorer onCommitSelect={handleCommitSelect} />
        </div>

        {/* Right main tab */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto">
            {selectedCommitId ? (
              <CommitChangesViewer commitId={selectedCommitId} />
            ) : (
              <div className="p-8 border border-dashed border-border rounded-lg text-center">
                <p className="text-muted-foreground">Select a commit from the sidebar to view changes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </CodeProvider>
  )
}

