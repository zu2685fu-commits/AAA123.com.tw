const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=path.join(__dirname,'metro-bites','dist');
let html=fs.readFileSync(path.join(source,'index.html'),'utf8');
let styles=0,scripts=0;
html=html.replace(/<link rel="stylesheet" href="([^"]+)">/g,(_,name)=>{
  let css=fs.readFileSync(path.join(source,name),'utf8');
  // A standalone export uses system fonts and needs no network to render.
  css=css.replace(/@import\s+url\([^;]+;/g,'');
  styles++;
  return `<style>\n/* ${name} */\n${css}\n</style>`;
});
html=html.replace(/<script src="([^"]+)"><\/script>/g,(_,name)=>{
  let js=fs.readFileSync(path.join(source,name),'utf8');
  new vm.Script(js,{filename:name});
  // Local-file contexts may lack crypto.randomUUID on older mobile browsers.
  if(name==='expenses.js')js=js.replace('crypto.randomUUID()',"(globalThis.crypto?.randomUUID?.() || 'expense-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2))");
  js=js.replace(/<\/script/gi,'<\\/script');
  new vm.Script(js,{filename:name});
  scripts++;
  return `<script>\n/* ${name} */\n${js}\n</script>`;
});
html=html.replace('<head>','<head>\n<!-- Standalone export: all CSS, JavaScript and station data are embedded. -->\n');
assert.equal(styles,4);assert.equal(scripts,6);
assert.ok(!/<script\s+src=|<link\s+rel="stylesheet"|@import\s/.test(html));
assert.ok(html.includes('id="expenses"')&&html.includes('id="station-finder"')&&html.includes('id="day-plan"'));
const out=path.join(__dirname,'index.html');fs.writeFileSync(out,html,'utf8');
console.log(`Created ${out}\n${fs.statSync(out).size} bytes; ${styles} stylesheets and ${scripts} scripts embedded. Syntax and asset checks passed.`);
