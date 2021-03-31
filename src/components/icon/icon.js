import iconPack from "./iconPack"

const DefinedSizes = {
  small: "8px",
  medium: "16px",
  large: "32px",
  extraLarge: "48px",
}

const iconValue = name => {
  return { __html: iconPack[name] ?? "" }
}

const sizeValue = size => {
  if (size in DefinedSizes) return DefinedSizes[size]

  return size ?? ""
}

const colorValue = color => {
  return color ?? ""
}

const Icon = ({ name = "", color = "", size = "" }) => {
  return (
    <div
      className='icon'
      v-html='iconValue'
      style={{
        color: colorValue(color),
        size: sizeValue(size),
      }}
      dangerouslySetInnerHTML={iconValue(name)}
    ></div>
  )
}

export default Icon
