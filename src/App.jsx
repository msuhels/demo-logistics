import { useState } from 'react';
import './index.css';
import './components/components.css';

import KPIs             from './components/KPIs';
import DriverList       from './components/DriverList';
import AllocationPanel  from './components/AllocationPanel';
import NextJobPanel     from './components/NextJobPanel';
import UtilisationCharts from './components/UtilisationCharts';
import { DRIVERS }      from './data';

const NAV = [
  { id: 'dashboard',  icon: '⬛', label: 'Dashboard'     },
  { id: 'allocation', icon: '🔀', label: 'Job Allocation' },
  { id: 'insights',   icon: '📊', label: 'Utilisation'   },
  { id: 'roi',        icon: '💰', label: 'Before / After' },
];

const TITLES = {
  dashboard:  'Operational Intelligence Dashboard',
  allocation: 'Smart Job Allocation',
  insights:   'Driver Utilisation Insights',
  roi:        'ROI — Before vs After',
};

const BEFORE = [
  { k: 'Job assignment time',   v: '~8 mins'        },
  { k: 'Avg jobs / driver / day', v: '6.0'          },
  { k: 'Driver idle time',      v: 'avg 28%'        },
  { k: 'Dispatcher workload',   v: 'High — manual'  },
  { k: 'Utilisation rate',      v: '~52%'           },
  { k: 'Missed time windows',   v: '~18%'           },
];
const AFTER = [
  { k: 'Job assignment time',   v: '< 10 secs'      },
  { k: 'Avg jobs / driver / day', v: '8.5'          },
  { k: 'Driver idle time',      v: 'avg 18%'        },
  { k: 'Dispatcher workload', v: 'Low — Automated' },
  { k: 'Utilisation rate',      v: '~74%'           },
  { k: 'Missed time windows',   v: '< 5%'           },
];

export default function App() {
  const [tab, setTab]             = useState('dashboard');
  const [assigned, setAssigned]   = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showNext, setShowNext]   = useState(false);
  const [assignedTo, setAssignedTo] = useState('');

  function handleAssign(name) {
    setAssigned(true);
    setAssignedTo(name);
    setTimeout(() => setShowToast(true), 800);
    setTimeout(() => setShowNext(true), 2200);
  }

  const idleAlert = DRIVERS.filter(d => d.idleMins > 20);
  const totalJobs = DRIVERS.reduce((s, d) => s + d.jobs, 0);
  const target    = DRIVERS.length * 8;
  const pct       = Math.round(totalJobs / target * 100);

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">FO</div>
          <div>
            <div className="logo-text">FleetOps</div>
            <div className="logo-sub">Smart Dispatch</div>
          </div>
        </div>
        {NAV.map(n => (
          <div key={n.id} className={`nav-item${tab === n.id ? ' active' : ''}`} onClick={() => setTab(n.id)}>
            <span className="nav-icon">{n.icon}</span>
            {n.label}
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 4 }}>Data source</div>
          <div style={{ fontSize: 11, color: 'var(--text2)' }}>HNF / VINDeliver</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
            <span style={{ fontSize: 10, color: 'var(--text3)' }}>Live sync active</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="main">
        <div className="topbar">
          <div>
            <div className="topbar-title">{TITLES[tab]}</div>
            <div className="topbar-sub">Thursday, 16 Apr 2026 · Manchester Fleet</div>
          </div>
          <div className="topbar-right">
            <div className="live-dot" />
            <span className="live-label">Live</span>
          </div>
        </div>

        <div className="content">

          {/* DASHBOARD */}
          {tab === 'dashboard' && <>
            <div className="alert-banner">
              <span>⚠</span>
              <span className="alert-text">
                <strong>{idleAlert.length} drivers idle &gt;20 mins</strong> in Manchester region — {idleAlert.map(d => d.name).join(', ')}
              </span>
              <span className="alert-dismiss">Dismiss</span>
            </div>
            <KPIs />
            {/* Jobs progress */}
            <div className="panel" style={{ gridColumn: '1/-1' }}>
              <div className="progress-label">
                <span>Jobs in Progress</span>
                <span style={{ color: 'var(--blue)', fontWeight: 600 }}>{totalJobs} / {target} target</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: pct + '%' }} />
              </div>
              <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>{pct}% of daily target reached</div>
            </div>
            <div className="two-col">
              <div className="panel">
                <div className="panel-header">
                  <div className="panel-title">Driver Status — Live</div>
                  <span className="panel-action">View all</span>
                </div>
                <DriverList />
              </div>
              <div className="panel">
                <div className="panel-header"><div className="panel-title">Active Regions</div></div>
                {[['Manchester','7 drivers','var(--blue)'],['Leeds','3 drivers','var(--green)'],['Sheffield','2 drivers','var(--purple)'],['Bradford','2 drivers','var(--amber)']].map(([city,count,col],i,arr) => (
                  <div key={city} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom: i < arr.length-1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:col }} />
                      <span style={{ fontSize:12, color:'var(--text1)' }}>{city}</span>
                    </div>
                    <span style={{ fontSize:11, color:'var(--text3)' }}>{count}</span>
                  </div>
                ))}
                <div style={{ marginTop:12, padding:8, background:'var(--bg2)', borderRadius:'var(--radius)', fontSize:11, color:'var(--text2)' }}>
                  📦 <strong style={{ color:'var(--text1)' }}>14 jobs</strong> in progress across all regions
                </div>
              </div>
            </div>
          </>}

          {/* ALLOCATION */}
          {tab === 'allocation' && (
            <div className="two-col">
              <AllocationPanel onAssign={handleAssign} assigned={assigned} />
              <NextJobPanel show={showNext} />
            </div>
          )}

          {/* INSIGHTS */}
          {tab === 'insights' && <UtilisationCharts />}

          {/* ROI */}
          {tab === 'roi' && (
            <div className="panel">
              <div className="panel-header" style={{ marginBottom: 14 }}>
                <div className="panel-title">💰 Before vs After — Smart Dispatch ROI</div>
                <span style={{ fontSize:11, color:'var(--text3)' }}>Data pulled from existing systems</span>
              </div>
              <div className="before-after">
                <div className="ba-card before">
                  <div className="ba-label">❌ Without Smart Dispatch</div>
                  {BEFORE.map((r,i) => <div key={i} className="ba-row"><span className="ba-key">{r.k}</span><span className="ba-val">{r.v}</span></div>)}
                </div>
                <div className="ba-card after">
                  <div className="ba-label">✅ With Smart Dispatch</div>
                  {AFTER.map((r,i) => <div key={i} className="ba-row"><span className="ba-key">{r.k}</span><span className="ba-val">{r.v}</span></div>)}
                </div>
              </div>
              <div style={{ marginTop:14, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                {[['↓ 34%','Idle time reduction'],['↑ 42%','More jobs per driver'],['↑ 22pts','Utilisation gain']].map(([v,l],i) => (
                  <div key={i} style={{ textAlign:'center', padding:12, background:'rgba(34,197,94,.06)', border:'1px solid rgba(34,197,94,.15)', borderRadius:'var(--radius)' }}>
                    <div style={{ fontSize:22, fontWeight:700, color:'var(--green)' }}>{v}</div>
                    <div style={{ fontSize:11, color:'var(--text3)', marginTop:3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast">
          <div className="toast-title">✓ Job Assigned</div>
          <div className="toast-body">Job #5531 assigned to <strong>{assignedTo}</strong> · ETA 8 mins</div>
          <div className="toast-body" style={{ color:'var(--blue)', fontWeight:500, marginBottom:6 }}>
            ⚡ Next job recommendation loading for Dave H…
          </div>
          <button className="toast-close" onClick={() => setShowToast(false)}>✕ Close</button>
        </div>
      )}
    </div>
  );
}