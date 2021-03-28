import LoadingView from "./components/loadingView"
import DashboardView from "./components/dashboardView"
import TitleBar from "./components/titleBar"
import { useEffect, useState } from "react"

function App() {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false)
    }, 2000)
  }, [])

  return (
    <div id='App'>
      <DashboardView />
      <LoadingView show={showLoading} />

      <TitleBar />
    </div>
  )
}

export default App
