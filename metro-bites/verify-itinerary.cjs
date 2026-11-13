const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const code=fs.readFileSync('dist/itinerary.js','utf8');const start=code.indexOf('const stops = ');const end=code.indexOf('const storageKey=');const stops=vm.runInNewContext(code.slice(start,end)+';stops');
const mins=t=>t.split(':').reduce((h,m)=>Number(h)*60+Number(m));
assert.equal(stops[0].start,'10:00');assert.equal(stops.at(-1).end,'18:00');
assert.equal(stops.reduce((sum,s)=>sum+mins(s.end)-mins(s.start),0),480);
for(let i=0;i<stops.length;i++){assert.ok(mins(stops[i].end)>mins(stops[i].start));if(i)assert.equal(stops[i-1].end,stops[i].start);}
assert.equal(stops.filter(s=>s.meal).length,3);assert.equal(stops.find(s=>s.id==='dinner').start,'17:00');assert.equal(stops[0].title.includes('松山車站'),true);
for(const meal of stops.filter(s=>s.meal)){assert.ok(meal.source.startsWith('https://'));assert.ok(meal.map);}
const html=fs.readFileSync('dist/index.html','utf8');for(const ref of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css))"/g))assert.ok(fs.existsSync('dist/'+ref[1]),ref[1]);
console.log('PASS: 480 minutes, contiguous 10:00–18:00 schedule, three meals, 17:00 dinner, official links and local assets.');
