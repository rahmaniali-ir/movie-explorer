import { useCallback } from "react"
import "./titleBarStyle.sass"

const ipcRenderer = window.require("electron").ipcRenderer

const DashboardView = () => {
  const emitWindowState = useCallback(state => ipcRenderer.send(state))

  return (
    <nav className='title-bar'>
      <div class='bar'>
        <label>Movie Explorer</label>
      </div>

      <div className='control-box'>
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
      </div>
    </nav>
  )
}

export default DashboardView
