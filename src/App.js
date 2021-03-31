import TitleBar from "./components/titleBar"
import LoadingView from "./components/loadingView"
import TargetFoldersView from "./components/targetFoldersView"
import DashboardView from "./components/dashboardView"
import { useCallback, useEffect, useState } from "react"

const { ipcRenderer } = window.require("electron")

let loadingStateIndex = 0
const loadingStates = [
  "Initializing target folder(s)!",
  "Loading things!",
  "Searching for new movies!",
  "fetching new movies information!",
  "Wrapping up!",
  "",
]

function App() {
  const [showLoading, setShowLoading] = useState(true)
  const [showTargetFolders, setShowTargetFolders] = useState(false)
  const [loadingDescription, setLoadingDescription] = useState("")

  useEffect(() => {
    setLoadingDescription(loadingStates[0])
    setShowTargetFolders(true)
    // ipcRenderer.send("openDirectory")
  }, [])

  const continueTargetFolders = useCallback(() => {
    setLoadingDescription(loadingStates[1])
    setShowTargetFolders(false)
  })

  return (
    <div id='App'>
      <DashboardView />
      <LoadingView
        show={showLoading}
        title={"Loading"}
        description={loadingDescription}
      />
      <TargetFoldersView
        show={showTargetFolders}
        onContinue={continueTargetFolders}
      />

      <TitleBar />
    </div>
  )
}

export default App
