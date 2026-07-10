const STYLES = {
  pending: 'amber',
  completed: 'green',
  cancelled: 'red',
  active: 'green',
  inactive: 'gray',
  online: 'blue',
  offline: 'gray',
}

export default function StatusBadge({ value }) {
  if (!value) return <span className="badge gray">Unknown</span>
  const key = String(value).toLowerCase()
  const color = STYLES[key] || 'gray'
  const label = key.charAt(0).toUpperCase() + key.slice(1)
  return <span className={`badge ${color}`}>{label}</span>
}
