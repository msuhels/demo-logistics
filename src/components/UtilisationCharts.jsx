import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { DRIVERS } from '../data';
import { Panel } from './ui';

export default function UtilisationCharts() {
  const chartRef = useRef(null);
  const instance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (instance.current) instance.current.destroy();

    instance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: DRIVERS.map(d => d.name.split(' ')[0]),
        datasets: [{
          label: 'Jobs today',
          data: DRIVERS.map(d => d.jobs),
          backgroundColor: DRIVERS.map(d =>
            d.util < 50 ? 'rgba(245,158,11,.6)' :
            d.util > 70 ? 'rgba(34,197,94,.6)'  : 'rgba(59,130,246,.5)'
          ),
          borderColor: DRIVERS.map(d =>
            d.util < 50 ? '#f59e0b' : d.util > 70 ? '#22c55e' : '#3b82f6'
          ),
          borderWidth: 1,
          borderRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => `${ctx.raw} jobs` } },
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,.04)' }, ticks: { color: '#64748b', font: { size: 10 } } },
          y: { grid: { color: 'rgba(255,255,255,.04)' }, ticks: { color: '#64748b', stepSize: 2 }, min: 0, max: 12 },
        },
      },
    });
    return () => { if (instance.current) instance.current.destroy(); };
  }, []);

  const avgUtil = Math.round(DRIVERS.reduce((s, d) => s + d.util, 0) / DRIVERS.length);
  const below50 = DRIVERS.filter(d => d.util < 50).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Panel title="📊 Jobs Per Driver Today">
        <div className="legend">
          <span className="leg-item"><span className="leg-dot" style={{ background: 'rgba(34,197,94,.6)' }} />&gt;70% util</span>
          <span className="leg-item"><span className="leg-dot" style={{ background: 'rgba(59,130,246,.5)' }} />50–70%</span>
          <span className="leg-item"><span className="leg-dot" style={{ background: 'rgba(245,158,11,.6)' }} />&lt;50% util</span>
        </div>
        <div style={{ position: 'relative', width: '100%', height: 200 }}>
          <canvas ref={chartRef} role="img" aria-label="Jobs per driver bar chart" />
        </div>
        <div className="callout-box">
          ⚠ Driver utilisation avg: {avgUtil}% — {below50} drivers below 50%
        </div>
      </Panel>

      <Panel title="📅 Driver Day Timeline">
        <div className="legend">
          <span className="leg-item"><span className="leg-dot" style={{ background: 'var(--green)' }} />Active</span>
          <span className="leg-item"><span className="leg-dot" style={{ background: 'var(--amber)', opacity: .7 }} />Idle</span>
          <span className="leg-item"><span className="leg-dot" style={{ background: 'var(--blue)', opacity: .8 }} />In Transit</span>
        </div>
        {DRIVERS.map(d => {
          const total = d.day.reduce((s, seg) => s + seg.w, 0);
          return (
            <div key={d.id} className="gantt-row">
              <div className="gantt-label" title={d.name}>{d.name}</div>
              <div className="gantt-track">
                {d.day.map((seg, i) => (
                  <div key={i} className={`gantt-seg ${seg.t}`} style={{ width: (seg.w / total * 100) + '%' }} />
                ))}
              </div>
              <div style={{ fontSize: 10, color: d.util < 50 ? 'var(--amber)' : 'var(--text3)', minWidth: 34, textAlign: 'right' }}>
                {d.util}%
              </div>
            </div>
          );
        })}
      </Panel>
    </div>
  );
}