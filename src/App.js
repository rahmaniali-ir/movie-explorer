import LoadingView from "./components/loadingView"
import DashboardView from "./components/dashboardView"
import TitleBar from "./components/titleBar"
import { useEffect, useState } from "react"

let loadingStateIndex = 0
const loadingStates = [
  "Loading things!",
  "Searching for new movies!",
  "fetching new movies information!",
  "Wrapping up!",
  "",
]

function App() {
  const [showLoading, setShowLoading] = useState(true)
  const [loadingDescription, setLoadingDescription] = useState(
    "Fetching things"
  )

  // useEffect(() => {
  //   setInterval(() => {
  //     setShowLoading(o => !o)
  //   }, 2000)
  // }, [])

  useEffect(() => {
    setInterval(() => {
      loadingStateIndex++
      if (loadingStateIndex >= loadingStates.length) loadingStateIndex = 0

      setLoadingDescription(loadingStates[loadingStateIndex])
    }, 2000)
    // setTimeout(() => {
    //   setLoadingDescription("Checking for new movies")
    // }, 2000)

    // setTimeout(() => {
    //   setLoadingDescription("")
    // }, 4000)
  }, [])

  return (
    <div id='App'>
      <DashboardView />
      <LoadingView
        show={showLoading}
        title={"Loading"}
        description={loadingDescription}
      />

      <TitleBar />
    </div>
  )
}

export default App
