// مشترك لكل الصفحات
const $ = (s, c=document)=>c.querySelector(s);
const $$ = (s, c=document)=>[...c.querySelectorAll(s)];

// سنة
$$('.js-year').forEach(e=>e.textContent=new Date().getFullYear());

// قائمة الجوال
const menuBtn = $('.menu-btn');
const mobileNav = $('.mobile-nav');
if(menuBtn && mobileNav){
  menuBtn.addEventListener('click',()=>{
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true':'false');
  });
}

// ظهور عند التمرير
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); }
  });
},{threshold:.12});
$$('.reveal,.ing').forEach(el=>io.observe(el));

// تبديل عربي / English (تجريبي)
const langBtn = $('#langToggle');
function setLang(l){
  document.documentElement.lang = l === 'en' ? 'en' : 'ar';
  document.documentElement.dir = l === 'en' ? 'ltr' : 'rtl';
  $$('[data-en]').forEach(el=>{
    if(!el.dataset.ar) el.dataset.ar = el.textContent.trim();
    el.textContent = l === 'en' ? el.dataset.en : el.dataset.ar;
  });
  if(langBtn) langBtn.textContent = l === 'en' ? 'عربي' : 'EN';
  try{localStorage.setItem('hatemburger-lang',l);}catch(e){}
  document.title = l === 'en'
    ? 'Different burger restaurant in Jeddah | HATEM BURGER (demo)'
    : 'مطعم برجر بطريقة مختلفة في جدة | برجر حاتم (اسم تجريبي)';
}
if(langBtn){
  langBtn.addEventListener('click',()=>{
    const cur = document.documentElement.lang === 'en' ? 'ar':'en';
    setLang(cur);
  });
  try{ const saved = localStorage.getItem('hatemburger-lang'); if(saved) setLang(saved);}catch(e){}
}

// ---- السلة التجريبية (بدون Backend) ----
const CART_KEY='hatemburger-cart-demo-v1';
function getCart(){ try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch(e){return[]} }
function saveCart(c){ try{localStorage.setItem(CART_KEY,JSON.stringify(c))}catch(e){} updateCartUI(); }
function addToCart(item){
  const c=getCart();
  const found=c.find(x=>x.id===item.id);
  if(found) found.qty++;
  else c.push({...item,qty:1});
  saveCart(c);
  toast('انضافت للسلة ✓');
  const fab=$('#cartFab');
  if(fab){ fab.style.transform='scale(1.12)'; setTimeout(()=>fab.style.transform='',180); }
}
function cartCount(){ return getCart().reduce((a,b)=>a+b.qty,0); }
function cartTotal(){ return getCart().reduce((a,b)=>a+b.qty*b.price,0); }
function updateCartUI(){
  const n=cartCount();
  $$('.cart-count').forEach(e=>e.textContent=n);
  $$('.cart-total').forEach(e=>e.textContent=cartTotal()+' ر.س');
  const box=$('#cartItems');
  if(!box) return;
  const c=getCart();
  if(!c.length){ box.innerHTML='<p style="color:#7A6F63">سلتك فاضية — جرب تضيف وجبة مشاركة.</p>'; return; }
  box.innerHTML='';
  c.forEach(it=>{
    const div=document.createElement('div');
    div.className='cart-item';
    div.innerHTML=`<img src="${it.img}" alt="${it.name}"><div style="flex:1"><b>${it.name}</b><br><small>${it.price} ر.س × ${it.qty}</small></div>
    <button class="lang-toggle" data-dec="${it.id}" aria-label="إنقاص">−</button>
    <button class="lang-toggle" data-inc="${it.id}" aria-label="زيادة">+</button>`;
    box.appendChild(div);
  });
  box.querySelectorAll('[data-inc]').forEach(b=>b.onclick=()=>{const cc=getCart();const f=cc.find(x=>x.id===b.dataset.inc);if(f)f.qty++;saveCart(cc);});
  box.querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>{let cc=getCart();const f=cc.find(x=>x.id===b.dataset.dec);if(f){f.qty--;if(f.qty<=0)cc=cc.filter(x=>x.id!==f.id);}saveCart(cc);});
}
let toastTimer;
function toast(msg){
  const t=$('#toast'); if(!t) return;
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),1800);
}
document.addEventListener('click',(e)=>{
  const btn=e.target.closest('[data-add]');
  if(btn){
    addToCart({id:btn.dataset.add,name:btn.dataset.name,price:Number(btn.dataset.price||0),img:btn.dataset.img||''});
  }
});
const fab=$('#cartFab'), drawer=$('#cartDrawer');
if(fab&&drawer){
  fab.addEventListener('click',()=>drawer.classList.toggle('open'));
  const close=$('#cartClose');
  if(close) close.addEventListener('click',()=>drawer.classList.remove('open'));
}
updateCartUI();

// ---- قسم اختر مزاجك (الرئيسية) ----
const MOODS={
  classic:{t:'الكلاسيكية',d:'لحم مشوي + جبن ذايب + خس وطماطم + صوص خاص. لقمة متوازنة تعجب الكل.',tags:['جبن','صوص خاص','خس'],img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&auto=format&fit=crop'},
  spicy:{t:'الحارة',d:'صوص حار + فلفل مشوي + بصل + مخلل. للي يحب اللقمة تصحّيه.',tags:['صوص حار','فلفل مشوي','مخلل'],img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=900&auto=format&fit=crop'},
  cheesy:{t:'الجبنية',d:'دبل جبن + صوص جبن + بصل مكرمل. ذايبة وتغرق اللقمة.',tags:['دبل جبن','صوص جبن','بصل مكرمل'],img:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=900&auto=format&fit=crop'},
  crunchy:{t:'المقرمشة',d:'إضافات مقرمشة + خس + بصل + صوص خاص. قرمشة مع كل عضة.',tags:['مقرمش','خس','صوص خاص'],img:'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=900&auto=format&fit=crop'},
  sweet:{t:'حلوة / مالحة',d:'بصل مكرمل + صوص خاص + مخلل + جبن. توازن حلا وملوحة.',tags:['بصل مكرمل','مخلل','جبن'],img:'https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=900&auto=format&fit=crop'},
  special:{t:'الخاصة',d:'كل شي على مزاجك: اخلط صوصين + جبن + مقرمش + حار خفيف. لقمتك توقيعك.',tags:['تشكيلة','صوصين','توقيعك'],img:'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop'}
};
const moodBtns=$$('.mood-tabs button');
function setMood(key){
  const m=MOODS[key]; if(!m) return;
  moodBtns.forEach(b=>b.classList.toggle('active',b.dataset.mood===key));
  const img=$('#moodImg'), title=$('#moodTitle'), desc=$('#moodDesc'), tags=$('#moodTags');
  if(img){ img.src=m.img; img.alt='لقمة '+m.t; }
  if(title) title.textContent='لقمة '+m.t;
  if(desc) desc.textContent=m.d;
  if(tags) tags.innerHTML=m.tags.map(t=>`<span>${t}</span>`).join('');
}
moodBtns.forEach(b=>b.addEventListener('click',()=>setMood(b.dataset.mood)));
if($('#moodTitle')) setMood('classic');
