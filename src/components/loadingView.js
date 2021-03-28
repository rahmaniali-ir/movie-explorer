import { useEffect, useState } from "react"
import "./loadingStyle.css"

const LoaddingView = ({ show = false }) => {
  return (
    <div className={`view center loading ${!show ? "hide" : ""}`}>
      Loading...
    </div>
  )
}

export default LoaddingView
