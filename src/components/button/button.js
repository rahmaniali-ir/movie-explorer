import { useEffect } from "react"
import Icon from "../icon/icon"
import "./button.sass"

const Button = ({
  icon,
  text,
  color,
  size,
  right = false,
  className = "",
  onClick = () => {},
}) => {
  return (
    <button
      className={`button ${right ? "right" : ""} ${className}`}
      style={{
        color,
        fontSize: size,
      }}
      onClick={onClick}
    >
      <Icon name={icon} />
      <label>{text}</label>
    </button>
  )
}

export default Button
