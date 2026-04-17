import { DRIVERS } from '../data';
import { StatusPill } from './ui';

export default function DriverList() {
  return (
    <div>
      {DRIVERS.slice(0, 8).map(d => (
        <div key={d.id} className="driver-row">
          <div className="driver-avatar" style={{ background: d.color + '22', color: d.color }}>
            {d.initials}
          </div>
          <div>
            <div className="driver-name">{d.name}</div>
            <div className="driver-loc">📍 {d.location}</div>
          </div>
          <div className="driver-right">
            <StatusPill status={d.status} />
            {d.idleMins > 0 && <div className="idle-time">{d.idleMins}m idle</div>}
          </div>
        </div>
      ))}
    </div>
  );
}