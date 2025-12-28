(function(){
  const STORAGE_KEY = 'shoppingCart_v1';

  function formatPrice(num){
    if(isNaN(num)) return 'Rs 0';
    return 'Rs ' + Number(num).toLocaleString();
  }

  // more robust price parser: strip non-digit, dot and comma then handle comma thousands
  function parsePriceFromString(str){
    if(!str) return 0;
    try{
      const cleaned = String(str).replace(/[^0-9.,]/g, '').trim();
      // if there are commas and dots, remove commas (thousand separators)
      const normalized = cleaned.replace(/,/g, '');
      const num = parseFloat(normalized);
      return isNaN(num) ? 0 : num;
    }catch(e){ return 0; }
  }

  // quick debug helper
  function debugLog(...args){
    if(window && window.console) console.log('[CART]', ...args);
  }

  class Cart {
    constructor(){
      this.items = {};
      this.load();
    }
    load(){
      try{
        const raw = localStorage.getItem(STORAGE_KEY);
        if(raw){ this.items = JSON.parse(raw); }
      }catch(e){ this.items = {}; }
    }
    save(){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      this.updateBadges();
    }
    addItem(item){
      const id = item.id || this.slug(item.name);
      if(this.items[id]){ this.items[id].qty += item.qty || 1; }
      else{ this.items[id] = {...item, qty: item.qty || 1, id}; }
        this.save();
      this.render();
      debugLog('item added', item, this.items);
    }
    removeItem(id){
      delete this.items[id];
      this.save();
      this.render();
      debugLog('item removed', id, this.items);
    }
    updateQty(id, qty){
      if(this.items[id]){
        this.items[id].qty = Math.max(0, parseInt(qty) || 0);
        if(this.items[id].qty === 0) delete this.items[id];
        this.save();
        this.render();
      }
    }
    clear(){ this.items = {}; this.save(); this.render(); }
    getTotal(){
      return Object.values(this.items).reduce((s,i)=> s + (i.price * i.qty), 0);
    }
    getTotalItems(){
      return Object.values(this.items).reduce((s,i)=> s + i.qty, 0);
    }
    slug(str){ return str.toString().toLowerCase().replace(/[^a-z0-9]+/g,'-'); }
    updateBadges(){
      const total = this.getTotalItems();
      const cntEl = document.querySelector('#cart-count');
      const mobileCnt = document.querySelector('#cart-count-mobile');
      const panelCount = document.querySelector('#cartTotalItems');
      if(cntEl) { cntEl.textContent = total; debugLog('badge updated (desktop)', total); }
      if(mobileCnt) { mobileCnt.textContent = total; debugLog('badge updated (mobile)', total); }
      if(panelCount) { panelCount.textContent = total; }
    }
    render(){
      const container = document.querySelector('#cart-items');
      if(!container) return;
      container.innerHTML = '';
      const items = Object.values(this.items);
      if(items.length === 0){
        container.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
      }else{
        items.forEach(i => {
          const row = document.createElement('div');
          row.className = 'cart-item';
          row.innerHTML = `
            <img src="${i.image||'./assets/images/placeholder.png'}" alt="${i.name}">
            <div class="meta">
              <h4>${i.name}</h4>
              <div class="price">${formatPrice(i.price)}</div>
            </div>
            <div>
              <input type="number" min="1" value="${i.qty}" data-id="${i.id}" class="form-control qty-input">
              <div class="text-end mt-1"><small class="text-muted">${formatPrice(i.price * i.qty)}</small></div>
              <button class="btn btn-link text-danger remove-item" data-id="${i.id}">Remove</button>
            </div>
          `;
          container.appendChild(row);
        });
      }
      const totalEl = document.querySelector('#cart-total');
      if(totalEl) totalEl.textContent = formatPrice(this.getTotal());
      this.updateBadges();
    }
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', ()=>{
    const cart = new Cart();
    cart.render();

    // helper to get product data from a card element
    function getProductData(cardEl){
      const nameEl = cardEl.querySelector('.card-title');
      const priceEl = cardEl.querySelector('.text-danger');
      const imgEl = cardEl.querySelector('.card-img-top');
      const name = nameEl ? nameEl.textContent.trim() : 'Product';
      const price = priceEl ? parsePriceFromString(priceEl.textContent) : 0;
      const image = imgEl ? imgEl.src : '';
      return {name, price, image};
    }

    // Ensure each product card has stable product data attributes and an Add button
    document.querySelectorAll('.add-to-cart').forEach(card => {
      const data = getProductData(card);
      // store parsed values on the card for quick access
      card.dataset.name = data.name;
      card.dataset.price = data.price;
      card.dataset.image = data.image;

      if(!card.querySelector('.add-cart-btn')){
        const wrapper = card.querySelector('.card-body') || card;
        const container = document.createElement('div');
        container.className = 'mt-3';
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary add-cart-btn';
        btn.type = 'button';
        btn.innerHTML = '<i class="fa-solid fa-cart-plus me-2"></i> Add to cart';
        container.appendChild(btn);
        wrapper.appendChild(container);
      }
    });

    // Use event delegation for Add to cart (supports injected buttons and icons inside button)
    document.addEventListener('click', (e)=>{
      const addBtn = e.target.closest('.add-cart-btn');
      if(!addBtn) return;
      const card = addBtn.closest('.card') || addBtn.closest('.add-to-cart');
      if(!card){ debugLog('No product card found for add button'); return; }
      // read from dataset - fallback to parsing DOM
      const name = card.dataset.name || getProductData(card).name;
      let price = Number(card.dataset.price);
      if(!price || isNaN(price)){
        // try to parse from DOM text (more robust)
        const parsed = getProductData(card).price;
        price = Number(parsed) || 0;
      }
      const image = card.dataset.image || getProductData(card).image || '';
      debugLog('Add clicked', {name, price, image});
      cart.addItem({ name, price, image, qty: 1 });
      // visual badge bump for feedback
      const cntEl = document.querySelector('#cart-count');
      if(cntEl){ cntEl.classList.add('bump'); setTimeout(()=> cntEl.classList.remove('bump'), 350); }
      const mobileCnt = document.querySelector('#cart-count-mobile');
      if(mobileCnt){ mobileCnt.classList.add('bump'); setTimeout(()=> mobileCnt.classList.remove('bump'), 350); }
      openCart();
    });

    // cart open/close
    const panel = document.querySelector('#cart-panel');
    const cartBtn = document.querySelector('#cartBtn');
    const cartBtnMobile = document.querySelector('#cartBtnMobile');
    const closeCart = document.querySelector('#closeCart');
    function openCart(){
      if(!panel) return;
      panel.classList.remove('hidden');
      setTimeout(()=> panel.classList.add('open'), 10);
      cart.render();
    }
    function closeCartFn(){
      if(!panel) return;
      panel.classList.remove('open');
      setTimeout(()=> panel.classList.add('hidden'), 260);
    }
    if(cartBtn) cartBtn.addEventListener('click', openCart);
    if(cartBtnMobile) cartBtnMobile.addEventListener('click', openCart);
    if(closeCart) closeCart.addEventListener('click', closeCartFn);

    // delegation inside cart panel for qty change and remove
    const itemsContainer = document.querySelector('#cart-items');
    if(itemsContainer){
      itemsContainer.addEventListener('click', (e)=>{
        if(e.target.matches('.remove-item')){
          const id = e.target.dataset.id;
          cart.removeItem(id);
        }
      });
      itemsContainer.addEventListener('change', (e)=>{
        if(e.target.matches('.qty-input')){
          const id = e.target.dataset.id;
          const qty = parseInt(e.target.value) || 1;
          cart.updateQty(id, qty);
        }
      });
    }

    // clear & checkout
    const clearBtn = document.querySelector('#clearCartBtn');
    const checkoutBtn = document.querySelector('#checkoutBtn');
    if(clearBtn) clearBtn.addEventListener('click', ()=>{
      if(confirm('Clear the cart?')){ cart.clear(); }
    });
    if(checkoutBtn) checkoutBtn.addEventListener('click', ()=>{
      if(cart.getTotalItems() === 0){ alert('Cart is empty'); return; }
      // Simple demo checkout behaviour
      alert('Thank you! Your order total is ' + formatPrice(cart.getTotal()));
      cart.clear();
      closeCartFn();
    });

    // click outside to close
    document.addEventListener('click', (e)=>{
      if(panel && panel.classList.contains('open')){
        const within = e.composedPath().includes(panel) || (cartBtn && e.composedPath().includes(cartBtn));
        if(!within && window.innerWidth > 768){ closeCartFn(); }
      }
    });

    // expose small API for debugging (optional)
    window.__shopCart = cart;

  });
})();