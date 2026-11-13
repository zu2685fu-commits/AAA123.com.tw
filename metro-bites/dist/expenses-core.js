(() => {
const categories=['早餐','午餐','晚餐','飲料點心','交通','其他'];
function parseAmount(value){const s=String(value).trim();if(!/^\d{1,7}(\.\d{1,2})?$/.test(s))return null;const [whole,fraction='']=s.split('.');const cents=Number(whole)*100+Number(fraction.padEnd(2,'0'));return cents>0&&cents<=999999999?cents:null;}
function validDate(s){if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T12:00:00Z');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===s;}
function validRecord(r){return r&&typeof r.id==='string'&&r.id.length>0&&validDate(r.date)&&categories.includes(r.category)&&typeof r.title==='string'&&r.title.length<=80&&Number.isSafeInteger(r.cents)&&r.cents>0&&r.cents<=999999999;}
function decode(raw){if(raw===null)return [];const rows=JSON.parse(raw);if(!Array.isArray(rows)||!rows.every(validRecord)||new Set(rows.map(r=>r.id)).size!==rows.length)throw new Error('Invalid expense data');return rows;}
function summary(rows,date){const selected=rows.filter(r=>r.date===date);return {rows:selected,total:selected.reduce((sum,r)=>sum+r.cents,0),categories:Object.fromEntries(categories.map(c=>[c,selected.filter(r=>r.category===c).reduce((sum,r)=>sum+r.cents,0)]))};}
function today(now=new Date()){const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);const get=t=>parts.find(p=>p.type===t).value;return `${get('year')}-${get('month')}-${get('day')}`;}
window.ExpenseLedger={categories,parseAmount,validDate,validRecord,decode,summary,today};
})();
