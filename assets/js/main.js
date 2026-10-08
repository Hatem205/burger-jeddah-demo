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

// تبديل عربي / English — ترجمة شاملة لكل النصوص عبر قاموس
const langBtn = $('#langToggle');
const EN_DICT = {
'موقع تجريبي':'Demo website',
'لمشروع افتراضي لأغراض التدريب فقط — الاسم والأسعار والموقع غير نهائية.':'An imaginary project for training only — name, prices and location are not final.',
'— كل المنتجات والأسعار افتراضية ولا يوجد بيع حقيقي.':'— all products and prices are fictional, no real selling.',
'لقمة':'Lugma',
'اسم تجريبي • جدة':'Demo name • Jeddah',
'لقمة (تجريبي)':'Lugma (demo)',
'لقمة — تجريبي':'Lugma — demo',
'لقمة — نسخة تجريبية':'Lugma — training version',
'مشروع افتراضي للتعلم — كل المحتوى تجريبي.':'An imaginary learning project — all content is fictional.',
'جدة، السعودية':'Jeddah, Saudi Arabia',
'جدة، المملكة العربية السعودية':'Jeddah, Saudi Arabia',
'صُنع بحب في جدة':'Made with love in Jeddah',
'روابط':'Links',
'تابعنا (حسابات تجريبية)':'Follow us (demo accounts)',
'Privacy Policy (تجريبي)':'Privacy Policy (demo)',
'Terms & Conditions (تجريبي)':'Terms & Conditions (demo)',
'الرئيسية':'Home','التجربة':'Experience','القائمة':'Menu','من نحن':'About','الموقع':'Location',
'🍔 مطعم برجر • جدة • تجربة مشاركة':'Burger place • Jeddah • a sharing experience',
'برجر يتاكل بطريقتك.':'Burger, your way.',
'وجبة برجر جماعية: لحم كبير في النص وخبز ومكونات حوله — تقتطع بالخبز وتكوّن لقمتك على مزاجك.':'A sharing burger meal: big meat in the middle with bread and toppings around — cut with bread and build every bite your way.',
'اكتشف التجربة':'Discover the experience',
'صينية المشاركة':'Sharing tray',
'لحم ضخم + خبز عربي + أوعية صغيرة تبني بها لقمتك':'Big meat + Arabic bread + small bowls to build your bite',
'🥘 صينية كبيرة بدل الساندويتش':'🥘 A big tray instead of a sandwich',
'👥 وجبة جماعية وممتعة':'👥 A fun sharing meal',
'🫓 الخبز العربي هو أداة أكلك':'🫓 Arabic bread is your utensil',
'💰 مشبعة وسعر معقول':'💰 Filling at a fair price',
'كيف تعمل التجربة؟':'How does it work?',
'صينية كبيرة في نص الجلسة: لحم ضخم، خبز، وأوعية صغيرة — وانت تبني لقمتك بيدك.':'A big tray in the middle: huge meat, bread and small bowls — you build your bite by hand.',
'خذ خبزك':'Get your bread','اختر قطعة من الخبز العربي الطازج.':'Pick a piece of fresh Arabic bread.',
'خذ اللحم':'Get the meat','خذ قطعة من اللحم المشوي الطري.':'Take a piece of tender grilled meat.',
'اختر مكوناتك':'Pick your toppings','اختر مكوناتك المفضلة لكل لقمة.':'Choose your favorite toppings for each bite.',
'اختر صوصك':'Pick your sauce','أضف الصوص الذي يناسب ذوقك.':'Add the sauce that suits your taste.',
'ابنِ اللقمة':'Build the bite','اجمع كل ما اخترته واستمتع بلقمتك الخاصة.':'Combine your picks and enjoy your own bite.',
'ما في لقمتين لازم يكونون نفس الشي.':'No two bites have to be alike.',
'المكونات':'Toppings','كل شي قدامك، وانت تختار.':'Everything in front of you — you choose.',
'قريبًا':'Coming soon','قسم المكونات قيد التجهيز':'Toppings section coming soon',
'ليه نحن؟':'Why us?','مو أحسن برجر... طريقة مختلفة.':"Not the 'best burger' talk — a different way.",
'اللحم مركز الوجبة':'The meat is the star','قطعة ضخمة في نص الصينية، مو باتي صغيرة.':'A huge cut in the middle of the tray, not a small patty.',
'وجبة مصممة للمشاركة':'Built for sharing','صينية واحدة تجمع 2-3 أشخاص.':'One tray brings 2–3 people together.',
'الخبز أداة الأكل':'Bread is your utensil','خبز تقتطع به اللحم وتبني لقمتك بيدك.':'Bread to cut the meat and build your bite by hand.',
'كل لقمة مختلفة':'Every bite is different','غيّر المكونات والصوص كل مرة.':'Change toppings and sauce every time.',
'سعر مناسب':'Fair price','مشبعة بسعر معقول.':'Filling at a fair price.',
'للأصدقاء والعائلة':'For friends & family','سوالف وضحك حول الصحن.':'Good talk and laughs around the tray.',
'آراء العملاء':'Customer reviews','وش قالوا؟':'What did they say?',
'أمثلة تجريبية — ليست تقييمات حقيقية':'Demo examples — not real reviews',
'"أول مرة آكل برجر بهالطريقة، وكل واحد منا سوّى لقمة مختلفة."':'"My first time eating burger this way — each of us built a different bite."',
'"التجربة نفسها ممتعة، مو بس الأكل. السوالف حول الصحن لها جو."':'"The experience itself is fun, not just the food. Chatting around the tray hits different."',
'"فكرة المشاركة ممتازة للجلسات مع الأصدقاء، وشبعنا بسعر معقول."':'"The sharing idea is perfect for hangouts with friends — filling at a fair price."',
'— سارة، جدة (مثال تجريبي)':'— Sara, Jeddah (demo example)',
'— عبدالله، جدة (مثال تجريبي)':'— Abdullah, Jeddah (demo example)',
'— نورة وفهد (مثال تجريبي)':'— Noura & Fahad (demo example)',
'المكان':'Location',
'موقع المطعم — سيتم تحديده لاحقًا. (لا يوجد عنوان حقيقي، هذا Placeholder للتجربة).':'Restaurant location — to be announced. (No real address; map placeholder for demo.)',
'⏰ يوميًا: 12م – 12ص (تجريبي)':'⏰ Daily: 12pm – 12am (demo)',
'📞 واتساب تجريبي: 0500000000':'📞 Demo WhatsApp: 0500000000',
'اطلب توصيل تجريبي':'Order demo delivery',
'خريطة تجريبية — جدة':'Demo map — Jeddah',
'Placeholder للخريطة • سيتم تحديد الموقع لاحقًا':'Map placeholder • location to be announced',
'جاهز تجرب البرجر بطريقة مختلفة؟':'Ready to try burger differently?',
'صينية في النص وكل لقمة على مزاجك.':'A tray in the middle, every bite your way.',
'شوف القائمة':'See the menu',
'سلتك (تجريبية)':'Your cart (demo)',
'سلتك فاضية — جرب تضيف وجبة مشاركة.':'Your cart is empty — try a sharing tray.',
'الإجمالي':'Total','إتمام الطلب التجريبي':'Complete demo order',
'إغلاق ✕':'Close ✕',
'انضافت للسلة ✓':'Added to cart ✓',
'تم استلام طلبك ✓ شكرًا!':'Order received ✓ Thank you!',
'القائمة التجريبية':'Demo menu','وش تبي تاكل اليوم؟':'What are you craving today?',
'لا ساندويتش تقليدي — كل الأصناف من صينية اللحم: تقتطع بالخبز وتبني لقمتك. الطلب تجريبي.':'No classic sandwich — everything comes from the meat tray: cut with bread and build your bite. Demo ordering.',
'الكل':'All','وجبات فردية':'Single trays','وجبات مشاركة':'Sharing trays','الإضافات':'Extras','الصوصات':'Sauces','المشروبات':'Drinks',
'لحم + خس وطماطم ومخلل وبصل + صوص كلاسيكي وخردل.':'Meat + lettuce, tomato, pickles & onion + classic & mustard sauce.',
'لحم مدخن + بصل مكرمل وفلفل مشوي + BBQ بالعسل.':'Smoked meat + caramelized onion & grilled peppers + honey BBQ.',
'لحم حار + هالبينو وفلفل مشوي + صوص تشيبوتلي.':'Spicy meat + jalapeño & grilled peppers + chipotle sauce.',
'لحم بنكهة سعودية + طماطم وفلفل + طحينة وصوص تمر.':'Saudi-style meat + tomato & peppers + tahini & date sauce.',
'لحم + مقرمشات + صوص جبن بالثوم.':'Meat + crunchies + garlic cheese sauce.',
'ر.س*':'SAR','19 ر.س*':'19 SAR','أضف للطلب':'Add to order',
'جميع الأسعار والصور افتراضية لأغراض التدريب فقط.':'All prices and photos are fictional, for training only.',
'كوّن وجبتك بنفسك (للعرض فقط)':'Build your meal (display only)',
'رجوع للرئيسية':'Back home',
'تخطي للمحتوى':'Skip to content','لقمة - الرئيسية':'Lugma - Home',
'التنقل الرئيسي':'Main navigation','قائمة الجوال':'Mobile menu','تبديل اللغة':'Switch language',
'فتح القائمة':'Open menu','فتح السلة':'Open cart','سلة الطلب التجريبية':'Demo cart',
'خريطة تجريبية لمنطقة جدة':'Demo map of the Jeddah area',
'تصنيفات القائمة':'Menu categories',
'انستقرام تجريبي':'Demo Instagram','تيك توك تجريبي':'Demo TikTok','واتساب تجريبي':'Demo WhatsApp',
'صينية لقمة: قطعة لحم ضخمة مشوية في المنتصف، جبن ذايب فوق جزء منها، وحولها الخبز وأوعية المكونات الصغيرة':'Lugma tray: a huge grilled meat cut in the middle, melted cheese over part of it, with bread and topping bowls around',
'سلة الخبز العربي':'Arabic bread basket','قطعة اللحم المشوي':'Grilled meat cut',
'أوعية المكونات':'Toppings bowls','أوعية الصوصات':'Sauce bowls',
'اللقمة الجاهزة بالخبز العربي':'Finished bite in Arabic bread',
'صينية كلاسيك: لحم مشوي مع الخس والطماطم والمخلل والبصل':'Classic tray: grilled meat with lettuce, tomato, pickles and onion',
'صينية سموكي: لحم مدخن مع البصل المكرمل والفلفل المشوي':'Smoky tray: smoked meat with caramelized onion and grilled peppers',
'صينية فاير: لحم حار مع الهالبينو والفلفل المشوي':'Fire tray: spicy meat with jalapeño and grilled peppers',
'صينية نجدي: لحم بنكهة سعودية مع الطماطم والطحينة':'Najdi tray: Saudi-style meat with tomato and tahini',
'صينية كرنش: لحم مع المخلل المقلي والبصل المقرمش':'Crunch tray: meat with fried pickles and crispy onion'
};
const EN_ATTRS = ['alt','aria-label','placeholder','title'];
const EN_TITLES = {
'مطعم برجر بطريقة مختلفة في جدة | لقمة (اسم تجريبي)':'Different burger restaurant in Jeddah | LUGMA (demo)',
'القائمة | لقمة جدة (تجريبي)':'Menu | Lugma Jeddah (demo)'
};
const EN_METAS = {
'جرّب البرجر بطريقة مختلفة في جدة. وجبة جماعية، لحم مشوي، خبز ومكونات تختار منها كل لقمة بطريقتك.':'Try burger differently in Jeddah. A sharing tray of grilled meat, bread and toppings — build every bite your way.',
'قائمة تجريبية: وجبات فردية ومشاركة وإضافات وصوصات ومشروبات. الأسعار افتراضية.':'Demo menu: singles, sharing trays, extras, sauces and drinks. Fictional prices.'
};
function setLang(l){
  document.documentElement.lang = l === 'en' ? 'en' : 'ar';
  document.documentElement.dir = l === 'en' ? 'ltr' : 'rtl';
  $$('[data-en]').forEach(el=>{
    if(!el.dataset.ar) el.dataset.ar = el.textContent.trim();
    el.textContent = l === 'en' ? el.dataset.en : el.dataset.ar;
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while(walker.nextNode()){
    const n = walker.currentNode, parent = n.parentElement;
    if(!parent) continue;
    const tag = parent.tagName;
    if(tag==='SCRIPT'||tag==='STYLE') continue;
    if(parent.closest('[data-en]')) continue;
    nodes.push(n);
  }
  nodes.forEach(n=>{
    const key = n.nodeValue.trim();
    if(!key) return;
    if(l==='en'){
      if(EN_DICT[key]){
        if(n._ar===undefined) n._ar = n.nodeValue;
        n.nodeValue = n.nodeValue.replace(key, EN_DICT[key]);
      }
    }else if(n._ar!==undefined){ n.nodeValue = n._ar; n._ar = undefined; }
  });
  document.querySelectorAll('[alt],[aria-label],[placeholder],[title]').forEach(el=>{
    EN_ATTRS.forEach(a=>{
      const v = el.getAttribute(a);
      if(!v) return;
      const key = v.trim(), dk = '_ar_'+a;
      if(l==='en'){
        if(EN_DICT[key]){
          if(el[dk]===undefined) el[dk] = v;
          el.setAttribute(a, v.replace(key, EN_DICT[key]));
        }
      }else if(el[dk]!==undefined){ el.setAttribute(a, el[dk]); el[dk] = undefined; }
    });
  });
  if(langBtn) langBtn.textContent = l === 'en' ? 'عربي' : 'EN';
  try{ updateCartUI(); }catch(e){}
  try{localStorage.setItem('lugma-lang',l);}catch(e){}
  const t = document.title.trim();
  if(l==='en'){ if(document._arTitle===undefined) document._arTitle = document.title; if(EN_TITLES[t]) document.title = EN_TITLES[t]; }
  else if(document._arTitle!==undefined){ document.title = document._arTitle; document._arTitle = undefined; }
  const md = document.querySelector('meta[name=description]');
  if(md){
    const d = (md.getAttribute('content')||'').trim();
    if(l==='en'){ if(md._ar===undefined) md._ar = md.getAttribute('content'); if(EN_METAS[d]) md.setAttribute('content', EN_METAS[d]); }
    else if(md._ar!==undefined){ md.setAttribute('content', md._ar); md._ar = undefined; }
  }
}
if(langBtn){
  langBtn.addEventListener('click',()=>{
    const cur = document.documentElement.lang === 'en' ? 'ar':'en';
    setLang(cur);
  });
  try{ const saved = localStorage.getItem('lugma-lang'); if(saved) setLang(saved);}catch(e){}
}

// ---- السلة التجريبية (بدون Backend) ----
const CART_KEY='lugma-cart-demo-v1';
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
  $$('.cart-total').forEach(e=>e.textContent=cartTotal()+(document.documentElement.lang==='en'?' SAR':' ر.س'));
  const box=$('#cartItems');
  if(!box) return;
  const c=getCart();
  if(!c.length){ box.innerHTML = document.documentElement.lang==='en' ? '<p style="color:#7A6F63">Your cart is empty — try a sharing tray.</p>' : '<p style="color:#7A6F63">سلتك فاضية — جرب تضيف وجبة مشاركة.</p>'; return; }
  box.innerHTML='';
  c.forEach(it=>{
    const div=document.createElement('div');
    div.className='cart-item';
    div.innerHTML=`${it.img?`<img src="${it.img}" alt="${it.name}">`:''}<div style="flex:1"><b>${it.name}</b><br><small>${it.price} ${document.documentElement.lang==='en'?'SAR':'ر.س'} × ${it.qty}</small></div>
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
  if(document.documentElement.lang==='en' && EN_DICT[msg]) msg = EN_DICT[msg];
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
// إتمام الطلب: رسالة استلام فقط ثم تفريغ السلة
const coBtn=$('#checkoutBtn');
if(coBtn){ coBtn.addEventListener('click',()=>{
  try{localStorage.removeItem(CART_KEY);}catch(e){}
  updateCartUI();
  if(drawer) drawer.classList.remove('open');
  toast('تم استلام طلبك ✓ شكرًا!');
});}
updateCartUI();

/* الصور والأصناف تُضاف يدويًا من المالك في assets/img/ — بدون صور مدمجة */

// ---- قسم اختر مزاجك (الرئيسية): أمثلة لتركيبات لقمات من الصينية ----
const MOODS={
  classic:{t:'الكلاسيكية',d:'لحم بالخبز + جبن + خس وطماطم + صوص كلاسيكي.',tags:['خبز عربي','جبن','صوص كلاسيكي'],img:'assets/img/classic.jpg'},
  spicy:{t:'الحارة',d:'لحم + صوص حار + فلفل مشوي + مخلل بالخبز.',tags:['خبز عربي','صوص حار','فلفل مشوي'],img:'assets/img/fire.jpg'},
  cheesy:{t:'الجبنية',d:'لحم + دبل جبن + صوص جبن + بصل مكرمل.',tags:['خبز عربي','دبل جبن','صوص جبن']},
  crunchy:{t:'المقرمشة',d:'لحم + مقرمش + خس + صوص خاص بالخبز.',tags:['خبز عربي','مقرمش','صوص خاص'],img:'assets/img/crunch.jpg'},
  sweet:{t:'حلوة / مالحة',d:'لحم + بصل مكرمل + مخلل + الصوص الخاص.',tags:['خبز عربي','بصل مكرمل','الصوص الخاص']},
  special:{t:'الخاصة',d:'لحم + صوصين + جبن + مقرمش بالخبز.',tags:['خبز عربي','صوصين','توقيعك'],img:'assets/img/najdi.jpg'}
};
const moodBtns=$$('.mood-tabs button');
function setMood(key){
  const m=MOODS[key]; if(!m) return;
  moodBtns.forEach(b=>b.classList.toggle('active',b.dataset.mood===key));
  const mi=$('#moodImg'), title=$('#moodTitle'), desc=$('#moodDesc'), tags=$('#moodTags');
  if(mi){ if(m.img){ mi.style.padding='0'; mi.style.border='0'; mi.innerHTML='<img src="'+m.img+'" alt="لقمة '+m.t+'" style="width:100%;height:100%;object-fit:cover;display:block">'; } else { mi.style.padding=''; mi.style.border=''; mi.innerHTML='🍽️ لقمة '+m.t+'<br><small>صورة يضيفها المالك يدويًا</small>'; } }
  if(title) title.textContent='لقمة '+m.t;
  if(desc) desc.textContent=m.d;
  if(tags) tags.innerHTML=m.tags.map(t=>`<span>${t}</span>`).join('');
}
moodBtns.forEach(b=>b.addEventListener('click',()=>setMood(b.dataset.mood)));
if($('#moodTitle')) setMood('classic');
