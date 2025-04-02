"use client"

import { useState } from "react"
import { Link, FileCode, HelpCircle, Minus, Square, X, ChevronDown, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface HeaderProps {
  currentProject?: string
}

export function Header({ currentProject = "PyShop" }: HeaderProps) {
  const [isCloneDialogOpen, setIsCloneDialogOpen] = useState(false)
  const [repoUrl, setRepoUrl] = useState("")
  const [recentProjects] = useState([
    { name: "PyShop", path: "/path/to/pyshop" },
    { name: "NextCommerce", path: "/path/to/nextcommerce" },
    { name: "DjangoAdmin", path: "/path/to/djangoadmin" },
  ])

  const handleCloneProject = () => {
    // In a real app, this would trigger the OS file dialog and clone process
    console.log("Cloning repository:", repoUrl)
    // Mock file system dialog
    const mockSelectedPath = "/user/projects/new-project"
    console.log("Selected path:", mockSelectedPath)

    // Close the dialog
    setIsCloneDialogOpen(false)
    setRepoUrl("")
  }

  const handleOpenProject = (projectPath: string) => {
    // In a real app, this would load the selected project
    console.log("Opening project:", projectPath)
  }

  const handleOpenHelp = () => {
    // In a real app, this would open the help documentation
    console.log("Opening help documentation")
  }

  // These would be connected to the window in a real desktop app
  const handleMinimize = () => console.log("Minimize window")
  const handleMaximize = () => console.log("Maximize window")
  const handleClose = () => console.log("Close window")

  return (
    <header className="flex items-center justify-between h-9 bg-[#14213d] text-white px-4 select-none">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link className="h-4 w-4 mr-1" />
          <span className="font-semibold text-base tracking-tight">CodeLink</span>
        </div>

        {/* File dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 text-white hover:bg-white/10 text-xs">
              File
              <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={() => setIsCloneDialogOpen(true)}>
              <FileCode className="mr-2 h-4 w-4" />
              <span>Clone Project</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="p-0">
              <div className="flex flex-col w-full">
                <div className="px-2 py-1.5 text-sm font-medium">
                  <Clock className="inline-block mr-2 h-4 w-4" />
                  Open Recent
                </div>
                {recentProjects.map((project) => (
                  <button
                    key={project.path}
                    className="flex items-center px-2 py-1.5 pl-8 text-sm hover:bg-accent hover:text-accent-foreground w-full text-left"
                    onClick={() => handleOpenProject(project.path)}
                  >
                    {project.name}
                  </button>
                ))}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help button */}
        <Button variant="ghost" size="sm" className="h-7 text-white hover:bg-white/10 text-xs" onClick={handleOpenHelp}>
          <HelpCircle className="mr-1 h-3.5 w-3.5" />
          Help
        </Button>
      </div>

      {/* Middle section - draggable area */}
      <div
        className="flex-1 flex items-center justify-center cursor-move"
        style={{ WebkitAppRegion: "drag" as any }} // For Electron apps
      >
        <div className="px-4 py-0.5 bg-white/5 border border-white/10 rounded-md text-xs font-medium w-[50%] text-center">
          {currentProject}
        </div>
      </div>

      {/* Right section - window controls */}
      <div className="flex items-center space-x-2">
        <button onClick={handleMinimize} className="p-1 hover:bg-white/10 rounded-sm" aria-label="Minimize">
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button onClick={handleMaximize} className="p-1 hover:bg-white/10 rounded-sm" aria-label="Maximize">
          <Square className="h-3.5 w-3.5" />
        </button>
        <button onClick={handleClose} className="p-1 hover:bg-red-500 rounded-sm" aria-label="Close">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Clone Project Dialog */}
      <Dialog open={isCloneDialogOpen} onOpenChange={setIsCloneDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Clone Repository</DialogTitle>
            <DialogDescription>Enter the repository URL to clone a new project.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="repo-url">Repository URL</Label>
              <Input
                id="repo-url"
                placeholder="https://github.com/username/repo.git"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCloneDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCloneProject} disabled={!repoUrl.trim()}>
              Clone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}

