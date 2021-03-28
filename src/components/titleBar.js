import { useCallback } from "react"
import "./titleBarStyle.css"

const ipcRenderer = window.require("electron").ipcRenderer

const DashboardView = () => {
  const emitWindowState = useCallback(state => ipcRenderer.send(state))

  return (
    <nav className='title-bar'>
      <label>Movie Explorer</label>

      <button
        className='minimize'
        title='Minimize'
        onClick={() => emitWindowState("minimize")}
      ></button>

      <button
        className='maximize'
        title='Maximize'
        onClick={() => emitWindowState("maximize")}
      ></button>

      <button
        className='close'
        title='Close'
        onClick={() => emitWindowState("exit")}
      ></button>
    </nav>
  )
}

export default DashboardView
