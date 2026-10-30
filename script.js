'use strict';
const regions = {
  sichuan: {index:'01', title:'成都与四川', subtitle:'地图上，许多条线在这里相遇。', description:'从城市延伸到周边，足迹图中的四川部分，串起了大学以来的一段段出行。', tags:['成都','乐山','绵阳'], image:'assets/landscape.svg'},
  west: {index:'02', title:'川西 · 山野之间', subtitle:'给地图上的山，留一页空白。', description:'足迹图里，路线延伸到甘孜、阿坝与雅安方向。这里先收好这几个名字，等待照片与手记把沿途的细节补齐。', tags:['甘孜方向','阿坝方向','雅安方向'], image:'assets/landscape.svg'},
  yunnan: {index:'03', title:'云南 · 一路向南', subtitle:'向南的线，接着下一页远方。', description:'截图里的南行轨迹，连接着昆明、大理、丽江等地。这里按地区整理，不替代真实的行程顺序。', tags:['昆明','大理','丽江'], image:'assets/south.svg'},
  chongqing: {index:'04', title:'重庆 · 山城一页', subtitle:'在地图向东的地方，折一个角。', description:'从成都附近向东延伸的轨迹，连到了重庆。山城这一页先收好路线，出行日期和具体故事留待继续记录。', tags:['重庆方向','城市漫游'], image:'assets/city.svg'},
  north: {index:'05', title:'甘肃 · 向北出发', subtitle:'地图往上翻，旅途继续展开。', description:'截图北侧的轨迹，延伸至陇南、甘南与兰州方向。这一页收录向北的路线线索，完整旅程之后慢慢整理。', tags:['陇南方向','甘南方向','兰州方向'], image:'assets/north.svg'}
};
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function fillTags(target, tags) {
  target.replaceChildren(...tags.map(tag => {const span=document.createElement('span');span.textContent=tag;return span;}));
}
function selectRegion(key) {
  const region=regions[key]; if(!region) return;
  document.querySelector('#region-index').textContent=region.index;
  document.querySelector('#region-title').textContent=region.title;
  document.querySelector('#region-subtitle').textContent=region.subtitle;
  document.querySelector('#region-description').textContent=region.description;
  fillTags(document.querySelector('#region-tags'),region.tags);
  document.querySelectorAll('.map-pin').forEach(pin=>{const selected=pin.dataset.region===key;pin.classList.toggle('selected',selected);pin.setAttribute('aria-pressed',String(selected));});
  const stamp=document.querySelector('.mini-stamp');stamp.classList.remove('stamped');void stamp.offsetWidth;stamp.classList.add('stamped');
}
document.querySelectorAll('.map-pin').forEach(pin=>{
  pin.addEventListener('click',()=>selectRegion(pin.dataset.region));
  pin.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();selectRegion(pin.dataset.region);}});
});
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(filter=>{const selected=filter===button;filter.classList.toggle('active',selected);filter.setAttribute('aria-pressed',String(selected));});
  document.querySelectorAll('.journal-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});
}));
const footprintDialog=document.querySelector('#footprint-dialog');
document.querySelector('#open-footprint').addEventListener('click',()=>footprintDialog.showModal());
const entryDialog=document.querySelector('#entry-dialog');
document.querySelectorAll('[data-entry]').forEach(button=>button.addEventListener('click',()=>{
  const region=regions[button.dataset.entry];
  document.querySelector('#entry-title').textContent=region.title;
  document.querySelector('#entry-subtitle').textContent=region.subtitle;
  document.querySelector('#entry-description').textContent=region.description;
  const image=document.querySelector('#entry-image'); image.src=region.image;image.alt=region.title+'的风景手绘意象，非旅行实拍';
  fillTags(document.querySelector('#entry-tags'),region.tags);entryDialog.showModal();
}));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
  dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.style.overflow='';});
});
const dialogObserver=new MutationObserver(()=>{document.body.style.overflow=document.querySelector('dialog[open]')?'hidden':'';});
document.querySelectorAll('dialog').forEach(dialog=>dialogObserver.observe(dialog,{attributes:true,attributeFilter:['open']}));
const wishes=['愿你出发时有期待，回家时有故事。','不用赶路，今天的风景也值得慢慢看。','下一次出发，记得给快乐留一点行李空间。','把烦恼折小，把世界翻开。','愿每一次绕路，都遇见一点小惊喜。','带上好奇心，今天也是探索世界的一天。'];
let wishIndex=-1;
document.querySelector('#send-wish').addEventListener('click',event=>{
  const note=document.querySelector('#wish');wishIndex=(wishIndex+1)%wishes.length;note.hidden=false;note.textContent=wishes[wishIndex];
  if(!reducedMotion.matches){note.style.animation='none';void note.offsetWidth;note.style.animation='';
    const rect=event.currentTarget.getBoundingClientRect();const colors=['#b77f50','#a5b18a','#d5b253','#cc9d8d'];
    for(let i=0;i<12;i++){const spark=document.createElement('span');spark.className='spark';spark.setAttribute('aria-hidden','true');spark.style.left=(rect.left+rect.width/2)+'px';spark.style.top=(rect.top+rect.height/2)+'px';spark.style.setProperty('--spark-x',Math.cos(i*Math.PI/6)*90+'px');spark.style.setProperty('--spark-y',(Math.sin(i*Math.PI/6)*70-25)+'px');spark.style.setProperty('--spark-color',colors[i%colors.length]);document.body.append(spark);spark.addEventListener('animationend',()=>spark.remove(),{once:true});setTimeout(()=>spark.remove(),1200);}
  }
});
