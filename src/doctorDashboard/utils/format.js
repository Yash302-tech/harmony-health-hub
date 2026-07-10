// Small shared helpers used across pages.

/** Accepts a Firestore Timestamp, JS Date, or date string and returns a readable date. */
export function formatDate(value, opts = {}) {
  if (!value) return '—'
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value)
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...opts,
  })
}

export function formatDateTime(value) {
  if (!value) return '—'
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value)
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function timeAgo(value) {
  if (!value) return '—'
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value)
  if (isNaN(date.getTime())) return '—'
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [name, secs] of units) {
    const val = Math.floor(seconds / secs)
    if (val >= 1) return `${val} ${name}${val > 1 ? 's' : ''} ago`
  }
  return 'just now'
}

export function formatCurrency(value) {
  const n = Number(value) || 0
  return `₹${n.toLocaleString('en-IN')}`
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

/** Stable, pleasant color for an avatar fallback, derived from a string. */
export function colorFromString(str = '') {
  const palette = ['#4f7d62', '#c9a24c', '#7a6a8f', '#a3633f', '#3f7a8f', '#8f6a4f']
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = (hash + str.charCodeAt(i) * (i + 1)) % palette.length
  return palette[hash]
}
