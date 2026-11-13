/* Station names/codes checked 2026-11-13 against operator route maps. No live service feed. */
(() => {
const source='https://www.metro.taipei/cp.aspx?n=73B51F32ED23C5E1',nt='https://www.ntmetro.com.tw/',airport='https://www.tymetro.com.tw/tymetro-new/tw/_pages/travel-guide/road.php';
const seq=(prefix,first,names)=>names.split(' ').map((name,i)=>({code:prefix+String(first+i).padStart(2,'0'),name}));
const routes=[
{id:'R',name:'淡水信義線',color:'#c84743',source,stations:[...seq('R',1,'廣慈/奉天宮 象山 台北101/世貿 信義安和 大安 大安森林公園 東門 中正紀念堂 台大醫院 台北車站 中山 雙連 民權西路 圓山 劍潭 士林 芝山 明德 石牌 唭哩岸 奇岩 北投 復興崗 忠義 關渡 竹圍 紅樹林 淡水'),{code:'R22A',name:'新北投',branch:'新北投支線'}]},
{id:'BL',name:'板南線',color:'#3477ae',source,stations:seq('BL',1,'頂埔 永寧 土城 海山 亞東醫院 府中 板橋 新埔 江子翠 龍山寺 西門 台北車站 善導寺 忠孝新生 忠孝復興 忠孝敦化 國父紀念館 市政府 永春 後山埤 昆陽 南港 南港展覽館')},
{id:'G',name:'松山新店線',color:'#398060',source,stations:[...seq('G',1,'新店 新店區公所 七張 大坪林 景美 萬隆 公館 台電大樓 古亭 中正紀念堂 小南門 西門 北門 中山 松江南京 南京復興 台北小巨蛋 南京三民 松山'),{code:'G03A',name:'小碧潭',branch:'小碧潭支線'}]},
{id:'O',name:'中和新蘆線',color:'#c28d21',source,stations:[...seq('O',1,'南勢角 景安 永安市場 頂溪 古亭 東門 忠孝新生 松江南京 行天宮 中山國小 民權西路 大橋頭 台北橋 菜寮 三重 先嗇宮 頭前庄 新莊 輔大 丹鳳 迴龍'),...seq('O',50,'三重國小 三和國中 徐匯中學 三民高中 蘆洲').map(s=>({...s,branch:'蘆洲支線'}))]},
{id:'BR',name:'文湖線',color:'#927143',source,stations:seq('BR',1,'動物園 木柵 萬芳社區 萬芳醫院 辛亥 麟光 六張犁 科技大樓 大安 忠孝復興 南京復興 中山國中 松山機場 大直 劍南路 西湖 港墘 文德 內湖 大湖公園 葫洲 東湖 南港軟體園區 南港展覽館')},
{id:'Y',name:'環狀線',color:'#a18c00',source:nt,stations:seq('Y',7,'大坪林 十四張 秀朗橋 景平 景安 中和 橋和 中原 板新 板橋 新埔民生 頭前庄 幸福 新北產業園區')},
{id:'LB',name:'三鶯線',color:'#61a6cb',source:nt,stations:seq('LB',1,'頂埔 媽祖田 長壽山 橫溪 龍埔 三峽 臺北大學 鶯歌車站 陶瓷老街 國華 永吉公園 鶯桃福德')},
{id:'V',name:'淡海輕軌',color:'#b16b86',source:nt,stations:[...seq('V',1,'紅樹林 竿蓁林 淡金鄧公 淡江大學 淡金北新 新市一路 淡水行政中心 濱海義山 濱海沙崙 淡海新市鎮 崁頂'),{code:'V28',name:'台北海洋大學',branch:'藍海線'},{code:'V27',name:'沙崙',branch:'藍海線'},{code:'V26',name:'淡水漁人碼頭',branch:'藍海線'}]},
{id:'K',name:'安坑輕軌',color:'#899348',source:nt,stations:seq('K',1,'雙城 玫瑰中國城 台北小城 耕莘安康院區 景文科大 安康 陽光運動公園 新和國小 十四張')},
{id:'A',name:'機場捷運',color:'#855b98',source:airport,stations:[...['台北車站','三重','新北產業園區','新莊副都心','泰山','泰山貴和','體育大學','長庚醫院','林口','山鼻','坑口','機場第一航廈','機場第二航廈'].map((name,i)=>({name,code:'A'+(i+1)})),{name:'機場旅館',code:'A14a'},...['大園','橫山','領航','高鐵桃園站','桃園體育園區','興南','環北','老街溪'].map((name,i)=>({name,code:'A'+(i+15)}))]}
];
const stations=[];for(const route of routes)for(const stop of route.stations){let station=stations.find(s=>s.name===stop.name);if(!station){station={name:stop.name,stops:[]};stations.push(station)}station.stops.push({...stop,line:route.id});}
const normalize=s=>s.trim().toLowerCase().replaceAll('臺','台').replace(/[\s／/]/g,'').replace(/站$/,'');
function find({query='',line='',saved=null}={}){const q=normalize(query);return stations.filter(s=>(!line||s.stops.some(t=>t.line===line))&&(!saved||saved.includes(s.name))&&(!q||normalize(s.name).includes(q)||s.stops.some(t=>normalize(t.code).includes(q))));}
window.Metro={routes,stations,find,normalize,checked:'2026/11/13'};
})();
