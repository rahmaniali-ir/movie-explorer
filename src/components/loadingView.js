import { useEffect, useState } from "react"
import { shuffleArray } from "../lib/utilities"
import "./loadingStyle.css"

const { app } = window.require("@electron/remote")
const fs = window.require("fs")
const path = window.require("path")

const posters = shuffleArray(
  fs.readdirSync(path.resolve(app.getAppPath(), "src/images/poster/test"))
)

const delayUnit = 0.05

const LoadingView = ({ show = false, title = "Loading", description = "" }) => {
  const [tiles, setTiles] = useState([])
  const [descriptions, setDescriptions] = useState([])

  useEffect(() => {
    let tilesQueue = []

    posters.forEach((poster, i) => {
      const imageSource = require(`../images/poster/test/${poster}`)

      tilesQueue.push({
        delay: i * delayUnit,
        image: imageSource.default,
      })
    })

    setTiles(tilesQueue)
  }, [])

  useEffect(() => {
    const oldDescriptions = descriptions.map(desc => ({ ...desc, show: false }))

    if (!description) setDescriptions(oldDescriptions)
    else
      setDescriptions([...oldDescriptions, { text: description, show: true }])
  }, [description, setDescriptions])

  return (
    <div className={`view center loading ${!show ? "hide" : ""}`}>
      <div className='tiles'>
        {tiles.map((tile, tileIndex) => (
          <div key={tileIndex} style={{ animationDelay: `${tile.delay}s` }}>
            {tile.image ? (
              <img
                src={tile.image}
                onLoad={e => e.target.setAttribute("loaded", null)}
              />
            ) : null}
          </div>
        ))}
      </div>

      <main className='content'>
        <div className='icon'></div>
        <div className='title'>{title}</div>

        <div className='description'>
          {descriptions.map((desc, descIndex) => (
            <span key={descIndex} className={`${desc.show ? "show" : ""}`}>
              {desc.text}
            </span>
          ))}
        </div>
      </main>
    </div>
  )
}

export default LoadingView
