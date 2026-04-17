import { DRIVERS } from '../data';
import { Panel } from './ui';

export default function KPIs() {
  const active = DRIVERS.filter(d => d.status !== 'idle').length;
  const idle   = DRIVERS.filter(d => d.status === 'idle').length;
  const total  = DRIVERS.reduce((s, d) => s + d.jobs, 0);
  const avg    = (total / DRIVERS.length).toFixed(1);

  const cards = [
    { label: 'Total Active Drivers', value: active,  sub: `of ${DRIVERS.length} total`,    badge: '↑ Online',     bc: 'green' },
    { label: 'Idle Drivers',         value: idle,    sub: '3 idle >20 mins',               badge: '⚠ Attention',  bc: 'amber' },
    { label: 'Jobs Completed Today', value: total,   sub: 'across all drivers',             badge: '↑ On track',   bc: 'blue'  },
    { label: 'Avg Jobs / Driver',    value: avg,     sub: 'target: 8.5/day',               badge: '↗ Improving',  bc: 'amber' },
  ];

  return (
    <div className="kpi-grid">
      {cards.map((c, i) => (
        <div key={i} className="kpi-card">
          <div className="kpi-label">{c.label}</div>
          <div className="kpi-value">{c.value}</div>
          <div className="kpi-sub">{c.sub}</div>
          <div className={`kpi-badge ${c.bc}`}>{c.badge}</div>
        </div>
      ))}
    </div>
  );
}