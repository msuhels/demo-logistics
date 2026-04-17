export const DRIVERS = [
  { id:1,  name:'Dave H.',  initials:'DH', color:'#3b82f6', status:'idle',    idleMins:26, location:'Manchester', jobs:9,  util:72, day:[{t:'active',w:20},{t:'idle',w:5},{t:'transit',w:12},{t:'active',w:18},{t:'idle',w:8},{t:'active',w:22},{t:'idle',w:15}] },
  { id:2,  name:'Sarah K.', initials:'SK', color:'#a855f7', status:'active',  idleMins:0,  location:'Manchester', jobs:8,  util:68, day:[{t:'active',w:25},{t:'transit',w:10},{t:'active',w:20},{t:'idle',w:5},{t:'active',w:15},{t:'transit',w:8},{t:'idle',w:17}] },
  { id:3,  name:'Tom W.',   initials:'TW', color:'#22c55e', status:'enroute', idleMins:0,  location:'Leeds',      jobs:10, util:81, day:[{t:'active',w:22},{t:'transit',w:8},{t:'active',w:25},{t:'transit',w:6},{t:'active',w:18},{t:'transit',w:9},{t:'active',w:12}] },
  { id:4,  name:'Priya M.', initials:'PM', color:'#f59e0b', status:'idle',    idleMins:31, location:'Manchester', jobs:4,  util:38, day:[{t:'active',w:18},{t:'idle',w:25},{t:'active',w:10},{t:'idle',w:22},{t:'active',w:8},{t:'idle',w:17}] },
  { id:5,  name:'James L.', initials:'JL', color:'#ef4444', status:'active',  idleMins:0,  location:'Sheffield',  jobs:7,  util:62, day:[{t:'active',w:20},{t:'transit',w:7},{t:'active',w:18},{t:'idle',w:8},{t:'active',w:22},{t:'transit',w:10},{t:'idle',w:15}] },
  { id:6,  name:'Maria C.', initials:'MC', color:'#06b6d4', status:'idle',    idleMins:22, location:'Manchester', jobs:5,  util:44, day:[{t:'idle',w:15},{t:'active',w:20},{t:'idle',w:18},{t:'active',w:15},{t:'idle',w:12},{t:'active',w:20}] },
  { id:7,  name:'Ben A.',   initials:'BA', color:'#10b981', status:'active',  idleMins:0,  location:'Leeds',      jobs:9,  util:75, day:[{t:'active',w:28},{t:'transit',w:9},{t:'active',w:22},{t:'idle',w:6},{t:'active',w:20},{t:'transit',w:7},{t:'active',w:8}] },
  { id:8,  name:'Leah P.',  initials:'LP', color:'#f97316', status:'enroute', idleMins:0,  location:'Bradford',   jobs:8,  util:70, day:[{t:'transit',w:8},{t:'active',w:25},{t:'transit',w:6},{t:'active',w:22},{t:'idle',w:5},{t:'active',w:20},{t:'transit',w:14}] },
  { id:9,  name:'Omar F.',  initials:'OF', color:'#8b5cf6', status:'active',  idleMins:0,  location:'Sheffield',  jobs:6,  util:55, day:[{t:'active',w:22},{t:'idle',w:12},{t:'active',w:18},{t:'transit',w:8},{t:'active',w:20},{t:'idle',w:10},{t:'active',w:10}] },
  { id:10, name:'Nina R.',  initials:'NR', color:'#ec4899', status:'idle',    idleMins:14, location:'Manchester', jobs:5,  util:46, day:[{t:'idle',w:10},{t:'active',w:22},{t:'idle',w:14},{t:'active',w:18},{t:'idle',w:12},{t:'active',w:16},{t:'idle',w:8}] },
  { id:11, name:'Carl V.',  initials:'CV', color:'#14b8a6', status:'active',  idleMins:0,  location:'Leeds',      jobs:8,  util:67, day:[{t:'active',w:24},{t:'transit',w:8},{t:'active',w:20},{t:'transit',w:6},{t:'active',w:18},{t:'idle',w:8},{t:'active',w:16}] },
  { id:12, name:'Amy T.',   initials:'AT', color:'#84cc16', status:'enroute', idleMins:0,  location:'Bradford',   jobs:7,  util:61, day:[{t:'transit',w:6},{t:'active',w:20},{t:'transit',w:8},{t:'active',w:22},{t:'idle',w:6},{t:'active',w:18},{t:'transit',w:20}] },
];

export const NEW_JOB = {
  id: '#5531', pickup: 'Deansgate, Manchester',
  dropoff: 'Salford Quays, M50', window: '14:30 – 15:00',
  type: 'Parcel Delivery', priority: 'High',
};

export const CANDIDATES = [
  { id:2, name:'Sarah K.', score:94, dist:'1.8 mi', status:'Available now',   reason:'Nearest, free, prev route match' },
  { id:10,name:'Nina R.',  score:81, dist:'2.4 mi', status:'Free in 5 mins',  reason:'Close, idle, matches route' },
  { id:6, name:'Maria C.', score:73, dist:'3.1 mi', status:'Available now',   reason:'Free, slightly longer detour' },
  { id:1, name:'Dave H.',  score:61, dist:'4.2 mi', status:'Idle 26 mins',    reason:'Available but further away' },
];

export const NEXT_JOB = {
  id: '#4437', pickup: 'Piccadilly, Manchester',
  dist: '1.4 mi', eta: '12 mins', driver: 'Dave H.',
  reasons: [
    'Nearest available job to current location',
    'Pickup fits within 15-min window',
    'No route detour required',
    'Keeps driver utilisation above 70%',
  ],
};