import { useEffect } from "react"
import Icon from "../icon/icon"
import "./button.sass"

const Button = ({ icon, text, color, size, right = false }) => {
  return (
    <button
      className={`button ${right ? "right" : ""}`}
      style={{
        color,
        fontSize: size,
      }}
    >
      <Icon name={icon} />
      <label>{text}</label>
    </button>
  )
}

export default Button
