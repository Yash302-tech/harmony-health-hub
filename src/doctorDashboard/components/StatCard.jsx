export default function StatCard({ icon: Icon, value, label, tint = 'var(--green-tint)', iconColor = 'var(--green-600)' }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: tint }}>
        <Icon size={18} color={iconColor} />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
