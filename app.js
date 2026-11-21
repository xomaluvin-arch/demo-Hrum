const P=[
{id:1,n:'Бургер Классик',d:'Говяжья котлета, чеддер, салат, фирменный соус',p:290,c:'burger',e:'🍔',hit:1},
{id:2,n:'Чиз-бекон',d:'Двойной сыр, хрустящий бекон, маринованный огурец',p:340,c:'burger',e:'🥓'},
{id:3,n:'Шаурма классическая',d:'Курица, свежие овощи, чесночный соус в лаваше',p:260,c:'shawarma',e:'🌯',hit:1},
{id:4,n:'Шаурма сырная',d:'Курица, плавленый сыр, томаты, острый соус',p:290,c:'shawarma',e:'🧀'},
{id:5,n:'Хот-дог',d:'Сочная сосиска, жареный лук, горчица, кетчуп',p:180,c:'snacks',e:'🌭'},
{id:6,n:'Картофель фри',d:'Золотистый, с солью и паприкой',p:130,c:'snacks',e:'🍟',hit:1},
{id:7,n:'Наггетсы 9 шт.',d:'Куриное филе в хрустящей панировке, два соуса',p:210,c:'snacks',e:'🍗'},
{id:8,n:'Кусок пиццы',d:'Пепперони, моцарелла, томатный соус',p:150,c:'snacks',e:'🍕'},
{id:9,n:'Лимонад',d:'Домашний, лимон и мята, 0,4 л',p:120,c:'drinks',e:'🥤'},
{id:10,n:'Морс клюквенный',d:'Холодный, без лишнего сахара, 0,4 л',p:100,c:'drinks',e:'🧃'}];
const CATS={all:'Всё',burger:'Бургеры',shawarma:'Шаурма',snacks:'Закуски',drinks:'Напитки'};
const $=(s,r=document)=>r.querySelector(s);
const fmt=n=>n.toLocaleString('ru-RU')+' ₽';
let cart={};try{cart=JSON.parse(localStorage.getItem('hrum-cart'))||{}}catch(e){}
const find=id=>P.find(p=>p.id==id);
const qty=()=>Object.values(cart).reduce((a,b)=>a+b,0);
const total=()=>Object.entries(cart).reduce((s,[i,q])=>s+find(i).p*q,0);
function badge(){const b=$('#cnt');b.textContent=qty();b.hidden=!qty()}
function save(){try{localStorage.setItem('hrum-cart',JSON.stringify(cart))}catch(e){}badge()}
let tt;function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('show'),1800)}
const page=document.body.dataset.page;
const pages=[['index','Главная'],['menu','Меню'],['cart','Корзина'],['contacts','Контакты']];
document.body.insertAdjacentHTML('afterbegin',
`<div class="orb o1" data-d="40"></div><div class="orb o2" data-d="-30"></div><div class="orb o3" data-d="20"></div>
<header class="top glass"><a class="logo" href="index.html">Хрум</a><nav aria-label="Основная навигация">${pages.map(([h,t])=>`<a href="${h}.html" class="${h==page?'on':''}"${h==page?' aria-current="page"':''}>${t}${h=='cart'?'<span id="cnt" hidden>0</span>':''}</a>`).join('')}</nav></header>`);
document.body.insertAdjacentHTML('beforeend','<footer>© Хрум — демо-сайт закусочной. Все данные вымышленные.</footer><div class="toast glass" id="toast" role="status"></div>');
badge();
const card=p=>`<article class="card glass tilt"><span class="em">${p.e}</span><h3>${p.n}</h3><p>${p.d}</p><div class="row"><b>${fmt(p.p)}</b><button class="btn sm" data-add="${p.id}">В корзину</button></div></article>`;
function drawCart(){
const box=$('#items'),ids=Object.keys(cart);
if(!ids.length){box.innerHTML='<div class="glass pad empty"><h3>В корзине пока пусто</h3><p>Выберите что-нибудь вкусное в меню.</p><a class="btn" href="menu.html">Открыть меню</a></div>';$('#sum').hidden=true;return}
$('#sum').hidden=false;
box.innerHTML=ids.map(i=>{const p=find(i);return `<div class="glass line"><span class="em">${p.e}</span><div><b>${p.n}</b><br><small>${fmt(p.p)}</small></div><div class="qty"><button data-dec="${i}" aria-label="Убавить">−</button><span>${cart[i]}</span><button data-add="${i}" aria-label="Добавить">+</button></div><b>${fmt(p.p*cart[i])}</b></div>`}).join('');
const t=total(),d=t>=800?0:150;
$('#calc').innerHTML=`<div><span>Товары</span><span>${fmt(t)}</span></div><div><span>Доставка</span><span>${d?fmt(d):'бесплатно'}</span></div>${d?`<small>Ещё ${fmt(800-t)} до бесплатной доставки</small>`:''}<div class="tot"><span>Итого</span><span>${fmt(t+d)}</span></div>`}
const rv=$('#revs');
if(rv){
const R=[{n:'Анна',s:5,t:'Шаурма огонь: курица сочная, лаваш не размок по дороге. Взяли второй раз.'},{n:'Максим',s:5,t:'Бургер Классик — лучший в районе. Котлета горячая, соус не перебивает вкус.'},{n:'Ольга',s:4,t:'Быстро привезли, картошка фри ещё хрустела. Хотелось бы больше соусов в комплекте.'},{n:'Дмитрий',s:5,t:'Заходим после работы, берём хот-доги и морс. Цены честные.'}];
let mine=[];try{mine=JSON.parse(localStorage.getItem('hrum-rev'))||[]}catch(e){}
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const drawR=()=>{rv.innerHTML=[...mine,...R].map(r=>`<article class="card glass tilt"><div class="stars" aria-label="Оценка ${r.s} из 5">${'★'.repeat(r.s)}${'☆'.repeat(5-r.s)}</div><p>${esc(r.t)}</p><b>${esc(r.n)}</b></article>`).join('')};
drawR();
$('#rf').onsubmit=e=>{e.preventDefault();const f=e.target.elements;mine.unshift({n:f.n.value.trim(),s:+f.s.value,t:f.t.value.trim()});mine=mine.slice(0,6);try{localStorage.setItem('hrum-rev',JSON.stringify(mine))}catch(er){}e.target.reset();drawR();toast('Спасибо за отзыв!')}}
if(page=='index')$('#hits').innerHTML=P.filter(p=>p.hit).map(card).join('');
if(page=='menu'){
const draw=c=>{$('#list').innerHTML=P.filter(p=>c=='all'||p.c==c).map(card).join('');document.querySelectorAll('.chip').forEach(b=>b.classList.toggle('on',b.dataset.cat==c))};
$('#chips').innerHTML=Object.entries(CATS).map(([k,v])=>`<button class="chip" data-cat="${k}">${v}</button>`).join('');
$('#chips').onclick=e=>{const c=e.target.dataset.cat;c&&draw(c)};draw('all')}
if(page=='cart'){drawCart();$('#order').onsubmit=e=>{e.preventDefault();cart={};save();$('#items').innerHTML='<div class="glass pad empty"><h3>Заказ принят 🎉</h3><p>Позвоним через пару минут и уточним детали. (Это демо — заказ не отправляется.)</p><a class="btn" href="menu.html">Вернуться в меню</a></div>';$('#sum').hidden=true}}
if(page=='contacts')$('#msg').onsubmit=e=>{e.preventDefault();e.target.reset();toast('Сообщение отправлено (демо)')};
document.addEventListener('click',e=>{
const a=e.target.closest('[data-add]'),d=e.target.closest('[data-dec]'),f=e.target.closest('.flip'),s=e.target.closest('.scene');
if(a){const i=a.dataset.add;cart[i]=(cart[i]||0)+1;save();page=='cart'?drawCart():toast('Добавлено: '+find(i).n)}
if(d){const i=d.dataset.dec;if(--cart[i]<=0)delete cart[i];save();drawCart()}
if(f)f.classList.toggle('on');
if(s)$('.burger').classList.toggle('open')});
let last;
document.addEventListener('pointermove',e=>{
const t=e.target.closest&&e.target.closest('.tilt');
if(last&&last!==t)last.style.transform='';
if(t){const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`perspective(800px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(6px)`}
last=t;
const px=e.clientX/innerWidth-.5,py=e.clientY/innerHeight-.5;
document.querySelectorAll('.orb').forEach(o=>o.style.transform=`translate(${px*o.dataset.d*2}px,${py*o.dataset.d*2}px)`)});
const bg=$('.burger');
if(bg&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
let rz=20,mx=0,my=0;
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
(function f(){rz+=.35;bg.style.transform=`rotateX(${58+my*30}deg) rotateZ(${rz+mx*60}deg)`;requestAnimationFrame(f)})()}
