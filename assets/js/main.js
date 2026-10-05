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

// صور احتياطية: لو أي صورة ما حملت، نعرض صورة اللحم الأساسية
const IMG_FALLBACK='assets/img/siniya.jpg';
function guardImg(im){ im.addEventListener('error',()=>{ if(!im.dataset.fb){ im.dataset.fb='1'; im.src=IMG_FALLBACK; } }); }
$$('img').forEach(guardImg);

// ---- قسم اختر مزاجك (الرئيسية): أمثلة لتركيبات لقمات من الصينية ----
const MOODS={
  classic:{t:'الكلاسيكية',d:'اقتطع قطعة لحم بالخبز العربي + جبن ذايب + خس وطماطم + صوص كلاسيكي. لقمة متوازنة تعجب الكل.',tags:['خبز عربي','جبن','صوص كلاسيكي'],img:'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop'},
  spicy:{t:'الحارة',d:'لحم + صوص حار + فلفل مشوي + مخلل وبصل، كلها بالخبز العربي. للي يحب اللقمة تصحّيه.',tags:['خبز عربي','صوص حار','فلفل مشوي'],img:'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=900&auto=format&fit=crop'},
  cheesy:{t:'الجبنية',d:'لحم + دبل جبن + صوص جبن + بصل مكرمل. جزء من اللحم يجي مغطى بجبن ذايب.',tags:['خبز عربي','دبل جبن','صوص جبن'],img:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=900&auto=format&fit=crop'},
  crunchy:{t:'المقرمشة',d:'لحم + مكون مقرمش + خس وبصل + صوص خاص بالخبز العربي. قرمشة مع كل لقمة.',tags:['خبز عربي','مقرمش','صوص خاص'],img:'https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=900&auto=format&fit=crop'},
  sweet:{t:'حلوة / مالحة',d:'لحم + بصل مكرمل + مخلل + جبن + الصوص الخاص. توازن حلا وملوحة في لقمة واحدة.',tags:['خبز عربي','بصل مكرمل','الصوص الخاص'],img:'assets/img/siniya.jpg',p:'86% 78%'},
  special:{t:'الخاصة',d:'لقمتك توقيعك: لحم + خلطة صوصين + جبن + مقرمش + حار خفيف بالخبز العربي.',tags:['خبز عربي','صوصين','توقيعك'],img:'assets/img/siniya.jpg'}
};
const moodBtns=$$('.mood-tabs button');
function setMood(key){
  const m=MOODS[key]; if(!m) return;
  moodBtns.forEach(b=>b.classList.toggle('active',b.dataset.mood===key));
  const img=$('#moodImg'), title=$('#moodTitle'), desc=$('#moodDesc'), tags=$('#moodTags');
  if(img){ img.src=m.img; img.alt='لقمة '+m.t; img.style.objectPosition=m.p||'50% 50%'; }
  if(title) title.textContent='لقمة '+m.t;
  if(desc) desc.textContent=m.d;
  if(tags) tags.innerHTML=m.tags.map(t=>`<span>${t}</span>`).join('');
}
moodBtns.forEach(b=>b.addEventListener('click',()=>setMood(b.dataset.mood)));
if($('#moodTitle')) setMood('classic');
