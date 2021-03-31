import Icon from "./icon/icon"
import Button from "./button/button"
import "./targetFoldersStyle.sass"
import { useCallback, useEffect, useState } from "react"

import { getFolderName } from "../lib/targetFolders"

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
  const [targetFolders, setTargetFolders] = useState([])

  const addFolder = useCallback(() => {
    ipcRenderer.send("openDirectory")
  }, [])

  const deleteFolder = useCallback(
    folder => {
      setTargetFolders(oldFolders =>
        oldFolders.filter(oldFolder => oldFolder !== folder)
      )
    },
    [targetFolders, setTargetFolders]
  )

  useEffect(() => {
    const directoryOpened = (evt, dialogData) => {
      const newFolders = dialogData.filePaths.map(folder => ({
        name: getFolderName(folder),
        path: folder,
      }))

      setTargetFolders(oldFolders => [...oldFolders, ...newFolders])
    }

    ipcRenderer.on("directoryOpened", directoryOpened)

    return () => {
      ipcRenderer.removeListener("directoryOpened", directoryOpened)
    }
  }, [])

  return (
    <div className={`view ${!show ? "hide" : ""} target-folders`}>
      <Icon name='folder' />

      <main>
        <Header />

        <div className='folders'>
          {targetFolders.map((folder, folderIndex) => (
            <div className='folder' key={`${folder.name}-${folderIndex}`}>
              <div className='icon-wrapper'>
                <Icon name='folder' />
              </div>

              <div className='details'>
                <div className='name'>{folder.name}</div>
                <div className='path'>{folder.path}</div>
              </div>

              <Button
                icon='delete'
                text='Delete'
                color='#75787b'
                onClick={() => deleteFolder(folder)}
              />
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
            className={`${targetFolders.length === 0 ? "hide" : ""}`}
            icon='rightArrow'
            text='Continue'
            color='var(--primary)'
            onClick={() => onContinue(targetFolders)}
            right
          />
        </div>
      </main>
    </div>
  )
}

export default TargetFoldersView
