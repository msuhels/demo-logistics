import { NEW_JOB, CANDIDATES } from '../data';
import { Panel, AssignBtn } from './ui';

export default function AllocationPanel({ onAssign, assigned }) {
  return (
    <Panel title="🔀 Smart Job Allocation" badge="Smart Suggestion" badgeColor="blue">

      {/* New job card */}
      <div className="job-card-new">
        <div className="jc-title">📦 New Job {NEW_JOB.id}</div>
        <div className="jc-row"><span className="jc-label">Pickup</span>   <span className="jc-val">{NEW_JOB.pickup}</span></div>
        <div className="jc-row"><span className="jc-label">Drop-off</span> <span className="jc-val">{NEW_JOB.dropoff}</span></div>
        <div className="jc-row"><span className="jc-label">Window</span>   <span className="jc-val">{NEW_JOB.window}</span></div>
        <div className="jc-row">
          <span className="jc-label">Priority</span>
          <span className="kpi-badge red">{NEW_JOB.priority}</span>
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--text3)', margin: '10px 0 6px' }}>
        Ranked driver suggestions
      </div>

      {/* Ranked candidates */}
      <div className="driver-match-list">
        {CANDIDATES.map((c, i) => (
          <div key={c.id} className={`match-row${i === 0 ? ' top' : ''}`}>
            <div className={`match-score${i === 0 ? ' top-score' : ''}`}>{c.score}%</div>
            <div className="match-info">
              <div className="match-name">
                {c.name}
                {i === 0 && <span className="best-badge">BEST MATCH</span>}
              </div>
              <div className="match-detail">{c.dist} away · {c.status}</div>
              <div className="match-detail dim">{c.reason}</div>
            </div>
            <AssignBtn
              primary={i === 0}
              disabled={assigned}
              onClick={() => i === 0 && !assigned && onAssign(c.name)}
            >
              {assigned && i === 0 ? '✓ Assigned' : 'Assign'}
            </AssignBtn>
          </div>
        ))}
      </div>
    </Panel>
  );
}