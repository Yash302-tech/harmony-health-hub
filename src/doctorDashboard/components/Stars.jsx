import { Star } from 'lucide-react'

export default function Stars({ value = 0, size = 14 }) {
  const rounded = Math.round(value)
  return (
    <span className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < rounded ? 'currentColor' : 'none'} strokeWidth={1.5} />
      ))}
    </span>
  )
}
