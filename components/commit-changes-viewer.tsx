"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, File } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCodeContext } from "@/context/code-context"
import { FeatureExplanationCard } from "@/components/feature-explanation"
import { UnitTestViewer } from "@/components/unit-test-viewer"
import { ImpactsViewer } from "@/components/impacts-viewer"
import React from "react"

// Simple syntax highlighting function
const highlightSyntax = (code: string, isAddedLine: boolean, isRemovedLine: boolean): JSX.Element => {
  // Define regex patterns for different code elements
  const patterns = [
    {
      type: "keyword",
      regex:
        /\b(const|let|var|function|return|import|export|from|default|if|else|for|while|switch|case|break|continue|class|interface|type|extends|implements|new|this|super|try|catch|finally|throw|async|await|static|public|private|protected)\b/g,
      className: "text-purple-400",
    },
    { type: "string", regex: /(["'`])(.*?)\1/g, className: "text-amber-300" },
    { type: "comment", regex: /(\/\/.*|\/\*[\s\S]*?\*\/)/g, className: "text-slate-500 italic" },
    { type: "function", regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, className: "text-blue-400" },
    { type: "component", regex: /(<\/?)([A-Z][a-zA-Z0-9]*)/g, className: "text-cyan-400" },
    { type: "jsx-attr", regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(=)(?=["'{])/g, className: "text-yellow-300" },
    { type: "number", regex: /\b(\d+(\.\d+)?)\b/g, className: "text-orange-400" },
    {
      type: "type",
      regex: /\b(boolean|string|number|null|undefined|any|void|never|object|symbol|bigint)\b/g,
      className: "text-green-400",
    },
    { type: "bracket", regex: /[{}[\]()]/g, className: "text-slate-400" },
  ]

  // Base class for the line based on whether it's added or removed
  let baseClass = ""
  if (isAddedLine) baseClass = "text-green-500"
  else if (isRemovedLine) baseClass = "text-red-500"

  // Replace HTML special characters to prevent rendering issues
  let highlightedCode = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  // Apply syntax highlighting patterns
  patterns.forEach((pattern) => {
    highlightedCode = highlightedCode.replace(pattern.regex, (match) => {
      return `<span class="${pattern.className}">${match}</span>`
    })
  })

  return React.createElement("span", { className: baseClass, dangerouslySetInnerHTML: { __html: highlightedCode } })
}

interface CommitChangesViewerProps {
  commitId: string | null
}

export function CommitChangesViewer({ commitId }: CommitChangesViewerProps) {
  const [currentChangeIndex, setCurrentChangeIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const { setCurrentChangeId, currentChanges, currentExplanation, isLoading } = useCodeContext()

  const currentChange = currentChanges[currentChangeIndex] || null

  // Update the context when the current change changes
  React.useEffect(() => {
    if (currentChange) {
      setCurrentChangeId(currentChange.id)
    }
  }, [currentChange, setCurrentChangeId])

  // Handle navigation
  const goToPrevious = () => {
    if (currentChangeIndex > 0) {
      setCurrentChangeIndex(currentChangeIndex - 1)
      setIsExpanded(false)
    }
  }

  const goToNext = () => {
    if (currentChangeIndex < currentChanges.length - 1) {
      setCurrentChangeIndex(currentChangeIndex + 1)
      setIsExpanded(false)
    }
  }

  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-lg">
        <p className="text-muted-foreground">Loading changes...</p>
      </div>
    )
  }

  if (!commitId || currentChanges.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-lg">
        <p className="text-muted-foreground">Select a commit to view changes</p>
      </div>
    )
  }

  // Process the diff to separate into lines with line numbers
  const diffLines = currentChange?.diff.split("\n") || []

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden shadow-md">
        {/* Navigation header */}
        <div className="flex items-center justify-between p-3 bg-muted/30 border-b">
          <button
            onClick={goToPrevious}
            disabled={currentChangeIndex === 0}
            className="p-1 rounded hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous change"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium">
              Change {currentChangeIndex + 1} of {currentChanges.length}
            </span>
          </div>

          <button
            onClick={goToNext}
            disabled={currentChangeIndex === currentChanges.length - 1}
            className="p-1 rounded hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next change"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* File path */}
        <div className="flex items-center gap-2 p-3 bg-background border-b">
          <File className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-mono">{currentChange?.filePath}</span>
          <span
            className={cn(
              "text-xs px-1.5 py-0.5 rounded-full ml-2",
              currentChange?.changeType === "added"
                ? "bg-green-500/10 text-green-500"
                : currentChange?.changeType === "deleted"
                  ? "bg-red-500/10 text-red-500"
                  : "bg-blue-500/10 text-blue-500",
            )}
          >
            {currentChange?.changeType}
          </span>
        </div>

        {/* Code diff with editor-like styling */}
        <div className="relative">
          <button
            onClick={toggleExpanded}
            className="absolute right-2 top-2 p-1 rounded-md bg-muted/80 hover:bg-muted z-10"
            aria-label={isExpanded ? "Collapse code" : "Expand code"}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          <div
            className={cn(
              "font-mono text-xs overflow-x-auto bg-slate-900 text-slate-200",
              isExpanded ? "max-h-[600px]" : "max-h-[200px]",
              "transition-all duration-300 ease-in-out",
            )}
          >
            {/* Code editor header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-slate-400">{currentChange?.filePath.split("/").pop()}</div>
              <div></div> {/* Empty div for flex spacing */}
            </div>

            {/* Code content with line numbers */}
            <div className="flex">
              {/* Line numbers */}
              <div className="flex-none py-1 pl-2 pr-3 text-right select-none bg-slate-800 border-r border-slate-700 text-slate-500">
                {diffLines.map((_, i) => (
                  <div key={i} className="h-6 leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Code with syntax highlighting */}
              <div className="flex-grow py-1 pl-4 pr-4">
                {diffLines.map((line, i) => {
                  const isAddedLine = line.startsWith("+") && !line.startsWith("+++")
                  const isRemovedLine = line.startsWith("-") && !line.startsWith("---")
                  const isDiffHeader = line.startsWith("@@")

                  let lineClass = "h-6 leading-6"
                  if (isAddedLine) lineClass += " bg-green-900/20"
                  else if (isRemovedLine) lineClass += " bg-red-900/20"
                  else if (isDiffHeader) lineClass += " bg-blue-900/20"

                  // Remove the first character (+ or -) for syntax highlighting
                  const codeLine = isAddedLine || isRemovedLine ? line.substring(1) : line

                  return (
                    <div key={i} className={lineClass}>
                      {isDiffHeader ? (
                        <span className="text-blue-400">{line}</span>
                      ) : (
                        <>
                          {(isAddedLine || isRemovedLine) && (
                            <span className={isAddedLine ? "text-green-500 mr-2" : "text-red-500 mr-2"}>
                              {line.charAt(0)}
                            </span>
                          )}
                          {highlightSyntax(codeLine, isAddedLine, isRemovedLine)}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature explanation card */}
      {currentExplanation && <FeatureExplanationCard explanation={currentExplanation} isActive={true} />}

      {/* Unit test viewer */}
      <UnitTestViewer />

      {/* Impacts viewer */}
      <ImpactsViewer />
    </div>
  )
}

