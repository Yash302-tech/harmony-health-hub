import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Stethoscope, Star, Leaf } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/consultations', label: 'Consultations', icon: Stethoscope },
  { to: '/reviews', label: 'Reviews', icon: Star },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Leaf className="leaf" size={26} />
        <div>
          <div className="label-title">Dr. Nandita</div>
          <div className="label-sub">Doctor Dashboard</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-foot">Classical Homeopathy · Bhopal, MP</div>
    </aside>
  )
}
