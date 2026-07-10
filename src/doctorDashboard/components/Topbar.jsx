export default function Topbar({ title, subtitle }) {
  return (
    <header className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        {subtitle && <div className="topbar-sub">{subtitle}</div>}
      </div>
      <div className="topbar-avatar">DN</div>
    </header>
  )
}
