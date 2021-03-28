import { useCallback, useEffect, useState } from "react"
import "./dashboardStyle.css"
import db, { getTable } from "../lib/database"

const ipcRenderer = window.require("electron").ipcRenderer
console.log(ipcRenderer)
ipcRenderer.on("directoryOpened", (e, d) => {
  console.log(e, d)
})

const DashboardView = () => {
  // eslint-disable-next-line
  const [show, setShow] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      // setShow(false)
    }, 2000)
  }, [])

  const fetchDB = useCallback(() => {
    ipcRenderer.send("openDirectory")
    // getTable("settings").then(rows => console.log("fetch settings", rows))
  })

  return (
    <div className={`view center dashboard ${!show ? "hide" : ""}`}>
      Dashboard
      <button onClick={fetchDB}>Fetch</button>
    </div>
  )
}

export default DashboardView
