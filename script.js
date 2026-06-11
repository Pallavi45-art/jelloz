// ===== Data =====
const categories = [
  { name: "Jelly Candies", emoji: "🍓" },
  { name: "Jelly Chocolates", emoji: "🍫" },
  { name: "Gummies", emoji: "🐻" },
  { name: "Kids Specials", emoji: "🧸" },
  { name: "Gift Packs", emoji: "🎁" },
  { name: "Combo Packs", emoji: "🎀" },
  { name: "Best Sellers", emoji: "⭐" },
  { name: "New Arrivals", emoji: "✨" },
];

const IMG = {
  jelly: "assets/product-jelly.jpg",
  choc: "assets/product-chocolate.jpg",
  gum: "assets/product-gummies.jpg",
  gift: "assets/product-giftpack.jpg",
  kids: "assets/product-kids.jpg",
  combo: "assets/product-combo.jpg",
};

const bestSellers = [
  { id:"1", name:"Strawberry Bliss Jellies", category:"Jelly Candies", price:12.99, oldPrice:16.99, img:IMG.jelly, tag:"Best Seller" },
  { id:"2", name:"Berry Truffle Jelly Chocolates", category:"Jelly Chocolates", price:18.5, img:IMG.choc, tag:"New" },
  { id:"3", name:"Rainbow Gummy Bears", category:"Gummies", price:9.99, img:IMG.gum, tag:"Best Seller" },
  { id:"4", name:"The Pink Ribbon Gift Box", category:"Gift Packs", price:34.0, oldPrice:42.0, img:IMG.gift, tag:"Limited" },
  { id:"5", name:"Lil' Stars Kids Mix", category:"Kids Specials", price:7.5, img:IMG.kids },
  { id:"6", name:"Jelloz Signature Combo", category:"Combo Packs", price:48.0, oldPrice:60.0, img:IMG.combo, tag:"Combo" },
];

const newArrivals = [
  { id:"n1", name:"Mango Tango Gummies", category:"Gummies", price:10.99, img:IMG.gum, tag:"New" },
  { id:"n2", name:"Berry Bouquet Jellies", category:"Jelly Candies", price:14.5, img:IMG.jelly, tag:"New" },
  { id:"n3", name:"Purple Velvet Chocolates", category:"Jelly Chocolates", price:19.99, img:IMG.choc, tag:"New" },
  { id:"n4", name:"Sunset Combo Pack", category:"Combo Packs", price:39.0, img:IMG.combo, tag:"New" },
];

const features = [
  { icon:"leaf", title:"Real Fruit Flavours", desc:"Crafted from real fruit extracts, never artificial syrup." },
  { icon:"shield-check", title:"Premium Quality", desc:"Small batch confectionery with rigorous quality checks." },
  { icon:"gift", title:"Gift-Ready Packaging", desc:"Every pack designed to be unboxed and remembered." },
  { icon:"truck", title:"Fast Delivery", desc:"Free shipping on orders over $40, delivered fresh." },
];

const reviews = [
  { name:"Aisha K.", text:"These are the softest jellies I've ever had. The gift box made my sister cry happy tears.", role:"Verified buyer" },
  { name:"Daniel R.", text:"Real fruit flavour, not the fake stuff. Combo pack is now a monthly ritual at home.", role:"Verified buyer" },
  { name:"Sana M.", text:"Packaging is gorgeous, taste is even better. My kids ration them like treasure.", role:"Verified buyer" },
];

const igImgs = [IMG.jelly, IMG.choc, IMG.gum, IMG.gift, IMG.kids, IMG.combo];

// ===== State =====
const wishlist = new Set();

// ===== Render helpers =====
const $ = (s, el=document) => el.querySelector(s);
const el = (html) => { const d=document.createElement("div"); d.innerHTML=html.trim(); return d.firstElementChild; };

function renderCategories(){
  const grid = $("#catGrid");
  categories.forEach(c => {
    grid.appendChild(el(`
      <button class="cat-card">
        <div class="cat-emoji">${c.emoji}</div>
        <div class="cat-name">${c.name}</div>
        <div class="cat-sub">Shop now <i data-lucide="arrow-right"></i></div>
      </button>`));
  });
}

function productCard(p){
  return `
    <article class="product" data-id="${p.id}">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
        <button class="wish-btn" data-wish="${p.id}" aria-label="Wishlist"><i data-lucide="heart"></i></button>
        <div class="hover-actions">
          <button class="btn btn-primary"><i data-lucide="shopping-bag"></i> Add to Cart</button>
          <button class="icon-square" aria-label="Quick view"><i data-lucide="eye"></i></button>
        </div>
      </div>
      <div class="product-body">
        <div class="product-cat">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-meta">
          <span class="price">₹${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span class="old-price">₹${p.oldPrice.toFixed(2)}</span>` : ""}
          <span class="rate">4.9</span>
        </div>
      </div>
    </article>`;
}

function renderProducts(){
  $("#bestGrid").innerHTML = bestSellers.map(productCard).join("");
  $("#newGrid").innerHTML = newArrivals.map(productCard).join("");
}

function renderWhy(){
  $("#whyGrid").innerHTML = features.map(f => `
    <div class="why-item">
      <div class="why-icon"><i data-lucide="${f.icon}"></i></div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>`).join("");
}

function renderReviews(){
  $("#reviews").innerHTML = reviews.map(r => `
    <div class="review">
      <span class="stars">★★★★★</span>
      <p>"${r.text}"</p>
      <div class="reviewer">
        <div class="avatar">${r.name[0]}</div>
        <div>
          <div class="name">${r.name}</div>
          <div class="role">${r.role}</div>
        </div>
      </div>
    </div>`).join("");
}

function renderIG(){
  $("#igGrid").innerHTML = igImgs.map(img => `
    <a href="#" class="ig">
      <img src="${img}" alt="Instagram" loading="lazy" />
      <div class="ig-overlay"><i data-lucide="instagram"></i></div>
    </a>`).join("");
}

function renderDrawerCats(){
  $("#drawerCats").innerHTML = categories.map(c =>
    `<a href="#"><span>${c.emoji}</span> ${c.name}</a>`).join("");
}

// ===== Interactions =====
function bindWishlist(){
  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-wish]");
    if (!btn) return;
    const id = btn.dataset.wish;
    if (wishlist.has(id)) wishlist.delete(id); else wishlist.add(id);
    btn.classList.toggle("active", wishlist.has(id));
    const count = $("#wishCount");
    count.textContent = wishlist.size;
    count.hidden = wishlist.size === 0;
  });
}

function bindScroll(){
  const nav = $("#navbar"); const top = $("#topBtn");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
    top.hidden = window.scrollY <= 600;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function bindSearch(){
  const overlay = $("#searchOverlay");
  $("#searchBtn").addEventListener("click", () => {
    overlay.hidden = false;
    setTimeout(() => $("#searchInput").focus(), 50);
  });
  const close = () => overlay.hidden = true;
  $("#searchClose").addEventListener("click", close);
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

function bindDrawer(){
  const drawer = $("#drawer");
  $("#menuBtn").addEventListener("click", () => drawer.hidden = false);
  const close = () => drawer.hidden = true;
  $("#drawerClose").addEventListener("click", close);
  drawer.querySelector(".drawer-backdrop").addEventListener("click", close);
  drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
}

function bindNewsletter(){
  $("#nsForm").addEventListener("submit", e => {
    e.preventDefault();
    const input = e.target.querySelector("input");
    if (input.value) { input.value = ""; alert("Thanks for subscribing!"); }
  });
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  
  renderCategories();
  renderProducts();
  renderWhy();
  renderReviews();
  renderIG();
  renderDrawerCats();
  bindWishlist();
  bindScroll();
  bindSearch();
  bindDrawer();
  bindNewsletter();
  if (window.lucide) window.lucide.createIcons();
  // Re-run icon creation after dynamic render
  const mo = new MutationObserver(() => { if (window.lucide) window.lucide.createIcons(); });
  mo.observe(document.body, { childList: true, subtree: true });
});
