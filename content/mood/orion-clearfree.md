---
title: "獵戶座清晰免費"
date: 2026-04-19T13:00:00+08:00
tags: ["心情"]
cover:
  image: "/images/default-banner.png"
  hidden: true
---

　　不知道各位有沒有發現，台灣冬天就算在光害不小的都市內，也非常容易看到獵戶座喔！腰帶的三顆星星加上上下兩顆超亮的參宿四和參宿七使得它們非常好認（然後如果告訴別人那是獵戶座的話，通常都會誤以為那是弓箭，但獵戶座的弓箭是一小群超不顯眼的星群平常很難用肉眼直接看到 XD）

　　也就是說，無論是在沖繩還是台灣，都是**獵戶座清晰免費**[^1]呢 😇（兩地觀測獵戶座條件幾乎相同喔！）

<div id="orion-wrap" style="position:relative;background:#06101d;border-radius:12px;overflow:hidden;width:100%;aspect-ratio:16/10;max-height:500px;margin:1.5rem 0;">
<svg id="orion-lines" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:5;" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
<div id="orion-tt" style="position:absolute;background:rgba(4,10,24,.94);border:.5px solid rgba(155,185,255,.28);border-radius:8px;padding:8px 13px;pointer-events:none;z-index:100;opacity:0;transition:opacity .13s;min-width:148px;">
  <div id="orion-tt-name" style="font-size:14px;font-weight:500;color:#dde9ff;margin-bottom:2px;font-family:sans-serif;"></div>
  <div id="orion-tt-zh"   style="font-size:12px;color:#607aaa;margin-bottom:4px;font-family:sans-serif;"></div>
  <div style="font-size:12px;color:#95a8d2;font-family:sans-serif;">視星等 <span id="orion-tt-mag" style="color:#f0c060;font-weight:500;"></span></div>
</div>
<div style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);font-size:11px;color:rgba(110,140,195,.42);white-space:nowrap;pointer-events:none;z-index:20;font-family:sans-serif;">游標移到星星以查看資訊</div>
</div>

<script>
(function(){
var data=[
  {id:'meissa',    name:'Meissa',    zh:'參宿增十四 (λ Ori)',mag:'3.54',ra:5.585,dec:9.93, r:4,  c:'#d0e4ff'},
  {id:'betelgeuse',name:'Betelgeuse',zh:'參宿四 (α Ori)',    mag:'0.42',ra:5.920,dec:7.40, r:11, c:'#ffaa60'},
  {id:'bellatrix', name:'Bellatrix', zh:'參宿五 (γ Ori)',    mag:'1.64',ra:5.419,dec:6.35, r:7,  c:'#bdd0ff'},
  {id:'mintaka',   name:'Mintaka',   zh:'參宿三 (δ Ori)',    mag:'2.23',ra:5.534,dec:-0.30,r:5.5,c:'#c8daff'},
  {id:'alnilam',   name:'Alnilam',   zh:'參宿二 (ε Ori)',    mag:'1.69',ra:5.604,dec:-1.20,r:7,  c:'#d0e0ff'},
  {id:'alnitak',   name:'Alnitak',   zh:'參宿一 (ζ Ori)',    mag:'1.88',ra:5.680,dec:-1.95,r:6,  c:'#c8daff'},
  {id:'saiph',     name:'Saiph',     zh:'參宿六 (κ Ori)',    mag:'2.07',ra:5.797,dec:-9.67,r:6,  c:'#b8cbff'},
  {id:'rigel',     name:'Rigel',     zh:'參宿七 (β Ori)',    mag:'0.18',ra:5.242,dec:-8.20,r:11, c:'#cce0ff'},
];
var lines=[
  ['meissa','betelgeuse'],['meissa','bellatrix'],
  ['betelgeuse','bellatrix'],
  ['betelgeuse','mintaka'],['bellatrix','mintaka'],
  ['mintaka','alnilam'],['alnilam','alnitak'],
  ['alnitak','bellatrix'],
  ['alnitak','rigel'],
  ['mintaka','saiph'],
  ['saiph','rigel'],
  ['betelgeuse','saiph'],
];
var labelOff={
  meissa:    {ax:'center',ay:'top'},
  betelgeuse:{ax:'right', ay:'middle'},
  bellatrix: {ax:'left',  ay:'middle'},
  mintaka:   {ax:'left',  ay:'top'},
  alnilam:   {ax:'center',ay:'top'},
  alnitak:   {ax:'right', ay:'middle'},
  saiph:     {ax:'left',  ay:'bottom'},
  rigel:     {ax:'left',  ay:'bottom'},
};
var raMin=5.15,raMax=5.98,decMin=-10.5,decMax=10.8,padX=8,padY=7;
function toXY(ra,dec){
  return {
    x:padX+(raMax-ra)/(raMax-raMin)*(100-padX*2),
    y:padY+(decMax-dec)/(decMax-decMin)*(100-padY*2)
  };
}
data.forEach(function(s){var p=toXY(s.ra,s.dec);s.x=p.x;s.y=p.y;});
var w=document.getElementById('orion-wrap');
var svg=document.getElementById('orion-lines');
var tt=document.getElementById('orion-tt');
for(var i=0;i<115;i++){
  var d=document.createElement('div');
  var sz=Math.random()*1.4+.3;
  d.style.cssText='position:absolute;border-radius:50%;width:'+sz+'px;height:'+sz+'px;background:rgba(200,218,255,'+(Math.random()*.38+.06)+');top:'+(Math.random()*100)+'%;left:'+(Math.random()*100)+'%;pointer-events:none;z-index:1;';
  w.appendChild(d);
}
var mp={};
data.forEach(function(s){mp[s.id]=s;});
lines.forEach(function(pair){
  var sa=mp[pair[0]],sb=mp[pair[1]];
  var ln=document.createElementNS('http://www.w3.org/2000/svg','line');
  ln.setAttribute('x1',sa.x.toFixed(2));ln.setAttribute('y1',sa.y.toFixed(2));
  ln.setAttribute('x2',sb.x.toFixed(2));ln.setAttribute('y2',sb.y.toFixed(2));
  ln.setAttribute('stroke','rgba(148,175,238,.16)');
  ln.setAttribute('stroke-width','.5');
  ln.setAttribute('stroke-dasharray','1.1 1.9');
  svg.appendChild(ln);
});
data.forEach(function(s){
  var dot=document.createElement('div');
  dot.style.cssText='position:absolute;border-radius:50%;width:'+(s.r*2)+'px;height:'+(s.r*2)+'px;left:'+s.x+'%;top:'+s.y+'%;background:'+s.c+';box-shadow:0 0 '+(s.r*2.2)+'px '+(s.r*.75)+'px '+s.c+'40;transform:translate(-50%,-50%);cursor:pointer;transition:transform .18s,filter .18s;z-index:10;';
  dot.addEventListener('mouseenter',function(ss,dd){return function(){
    document.getElementById('orion-tt-name').textContent=ss.name;
    document.getElementById('orion-tt-zh').textContent=ss.zh;
    document.getElementById('orion-tt-mag').textContent=ss.mag;
    var wr=w.getBoundingClientRect(),dr=dd.getBoundingClientRect();
    var tx=dr.left-wr.left+dr.width/2+16;
    var ty=dr.top-wr.top-10;
    if(tx+158>wr.width-6) tx=dr.left-wr.left-162;
    if(ty<6) ty=dr.bottom-wr.top+6;
    tt.style.left=tx+'px';tt.style.top=ty+'px';tt.style.opacity='1';
    dd.style.transform='translate(-50%,-50%) scale(1.55)';dd.style.filter='brightness(2)';
  };}(s,dot));
  dot.addEventListener('mouseleave',function(dd){return function(){
    tt.style.opacity='0';
    dd.style.transform='translate(-50%,-50%)';dd.style.filter='';
  };}(dot));
  w.appendChild(dot);
  var cfg=labelOff[s.id];
  var lbl=document.createElement('div');
  lbl.textContent=s.zh.split(' ')[0];
  var gap=s.r+5;
  var ls='position:absolute;pointer-events:none;z-index:8;white-space:nowrap;font-family:sans-serif;font-size:11.5px;color:rgba(168,192,255,.68);letter-spacing:.02em;';
  if(cfg.ax==='center')     ls+='transform:translateX(-50%);left:'+s.x+'%;';
  else if(cfg.ax==='right') ls+='left:calc('+s.x+'% + '+gap+'px);';
  else                      ls+='transform:translateX(-100%);left:calc('+s.x+'% - '+gap+'px);';
  if(cfg.ay==='top')        ls+='top:calc('+s.y+'% - '+(gap+12)+'px);';
  else if(cfg.ay==='bottom')ls+='top:calc('+s.y+'% + '+gap+'px);';
  else                      ls+='top:calc('+s.y+'% - 6px);';
  lbl.style.cssText=ls;
  w.appendChild(lbl);
});
})();
</script>

### 後記

　　小時候很喜歡天文，房間貼了一張超大的星系地圖，我的志願寫過天文學家。

　　想了解更多獵戶座的知識可以看[這裡](https://starwalk.space/zh-Hant/news/orion-constellation-guide)喔！

[^1]: Wiwi 本日熱騰騰的文章：[沖繩之獵戶座清晰免費（相簿）](https://wiwi.blog/blog/okinawa-clearfree/)