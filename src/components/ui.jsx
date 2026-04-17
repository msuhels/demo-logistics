// src/components/ui.jsx

export function StatusPill({ status }) {
  const map = {
    active:  { cls: 'active',  label: 'Active'   },
    idle:    { cls: 'idle',    label: 'Idle'      },
    enroute: { cls: 'enroute', label: 'En Route'  },
  };
  const s = map[status] || map.active;
  return (
    <span className={`status-pill ${s.cls}`}>
      <span className="status-dot" />
      {s.label}
    </span>
  );
}

export function Panel({ title, badge, badgeColor = 'blue', action, children, style }) {
  return (
    <div className="panel" style={style}>
      <div className="panel-header">
        <div className="panel-title">{title}</div>
        {badge && (
          <span className={`kpi-badge ${badgeColor}`}>{badge}</span>
        )}
        {action && <span className="panel-action">{action}</span>}
      </div>
      {children}
    </div>
  );
}

export function AssignBtn({ primary, disabled, onClick, children }) {
  return (
    <button
      className={`assign-btn ${primary ? 'primary' : 'secondary'}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}