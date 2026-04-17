import { NEXT_JOB } from '../data';
import { Panel } from './ui';

export default function NextJobPanel({ show }) {
  if (!show) return (
    <div className="panel empty-panel">
      <div className="empty-icon">🏁</div>
      <div className="empty-text">
        Next job recommendation<br />appears when a driver completes a job
      </div>
    </div>
  );

  return (
    <Panel title="⚡ Next Job Recommendation" badge="Instant" badgeColor="green">

      {/* Completed job notice */}
      <div className="completed-notice">
        <div className="completed-title">✓ Job #4421 completed by {NEXT_JOB.driver}</div>
        <div className="completed-sub">Completed 2 mins ago · Manchester City Centre</div>
      </div>

      {/* Suggested next job */}
      <div className="suggested-job">
        <div className="sj-label">💡 SUGGESTED FOR {NEXT_JOB.driver.toUpperCase()}</div>
        <div className="sj-id">Job {NEXT_JOB.id}</div>
        <div className="sj-pickup">📍 {NEXT_JOB.pickup}</div>
        <div className="sj-meta">
          <span>🚗 {NEXT_JOB.dist} away</span>
          <span>⏱ Pickup in {NEXT_JOB.eta}</span>
        </div>
      </div>

      {/* Reasons */}
      <div className="reasons-title">WHY THIS JOB?</div>
      {NEXT_JOB.reasons.map((r, i) => (
        <div key={i} className="reason-row">
          <span className="reason-check">✓</span>{r}
        </div>
      ))}

      <button className="accept-btn">Accept for {NEXT_JOB.driver}</button>
    </Panel>
  );
}