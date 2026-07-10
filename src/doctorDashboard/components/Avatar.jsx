import { initials, colorFromString } from '../utils/format'

export default function Avatar({ name = '', photoURL, size = 34 }) {
  const style = {
    width: size,
    height: size,
    fontSize: size * 0.36,
  }

  if (photoURL) {
    return <img src={photoURL} alt={name} className="avatar" style={style} />
  }

  return (
    <div className="avatar" style={{ ...style, background: colorFromString(name) }}>
      {initials(name) || '?'}
    </div>
  )
}
