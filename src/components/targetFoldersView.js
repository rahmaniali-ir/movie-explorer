import Icon from "./icon/icon"
import Button from "./button/button"
import "./targetFoldersStyle.sass"
import { useCallback, useEffect, useState } from "react"

import { insertTargetFolders } from "../lib/targetFolders"

const { ipcRenderer } = window.require("electron")

const Header = () => {
  return (
    <header>
      <h1>Where should i look for movies?</h1>
      <h2>Currently there is no folder defined. Add one to start with!</h2>
    </header>
  )
}

const TargetFoldersView = ({ onContinue = () => {}, show = false }) => {
  const [showContinue, setShowContinue] = useState(false)
  const [targetFolders, setTargetFolders] = useState([])

  const addFolder = useCallback(() => {
    ipcRenderer.send("openDirectory")
  })

  useEffect(() => {
    ipcRenderer.on("directoryOpened", (evt, dialogData) => {
      const paths = dialogData.filePaths

      insertTargetFolders(paths).then(newFolders => {
        setTargetFolders(oldFolders => [...oldFolders, ...newFolders])
        setShowContinue(true)
      })
    })
  }, [])

  return (
    <div className={`view ${!show ? "hide" : ""} target-folders`}>
      <Icon name='folder' />

      <main>
        <Header />

        <div className='folders'>
          {targetFolders.map(folder => (
            <div className='folder' key={folder.name}>
              <div className='icon-wrapper'>
                <Icon name='folder' />
              </div>

              <div className='details'>
                <div className='name'>{folder.name}</div>
                <div className='path'>{folder.path}</div>
              </div>

              <Button icon='delete' text='Delete' color='#75787b' />
            </div>
          ))}
        </div>

        <div className='actions'>
          <Button
            icon='add'
            text='Add folder'
            color='var(--secondary)'
            onClick={addFolder}
          />

          <Button
            className={`${!showContinue ? "hide" : ""}`}
            icon='rightArrow'
            text='Continue'
            color='var(--primary)'
            onClick={onContinue}
            right
          />
        </div>
      </main>
    </div>
  )
}

export default TargetFoldersView
