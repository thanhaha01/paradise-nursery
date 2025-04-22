const products = [
  { id: 1, name: 'Snake Plant', price: 15.99, image: 'plant1.jpg' },
  { id: 2, name: 'Peace Lily', price: 18.99, image: 'plant2.jpg' },
  { id: 3, name: 'Spider Plant', price: 12.99, image: 'plant3.jpg' },
  { id: 4, name: 'Fiddle Leaf Fig', price: 25.99, image: 'plant4.jpg' },
  { id: 5, name: 'ZZ Plant', price: 20.00, image: 'plant5.jpg' },
  { id: 6, name: 'Pothos', price: 10.00, image: 'plant6.jpg' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
}

function updateCartCount() {
  const count = cart.reduce((sum, p) => sum + p.qty, 0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

function loadCart() {
  updateCartCount();
  const container = document.getElementById('cart-items');
  if (!container) return;
  container.innerHTML = '';

  let total = 0, totalItems = 0;
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const cost = product.price * item.qty;
    total += cost;
    totalItems += item.qty;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${product.image}" width="100" />
      <h3>${product.name}</h3>
      <p>Unit Price: $${product.price.toFixed(2)}</p>
      <p>Quantity: <button onclick="changeQty(${item.id}, -1)">-</button>
      ${item.qty}
      <button onclick="changeQty(${item.id}, 1)">+</button></p>
      <p>Total: $${cost.toFixed(2)}</p>
      <button onclick="removeItem(${item.id})">Delete</button>
    `;
    container.appendChild(div);
  });
  document.getElementById('total-cost').textContent = total.toFixed(2);
  document.getElementById('total-items').textContent = totalItems;
}

function changeQty(id, change) {
  const item = cart.find(p => p.id === id);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) cart = cart.filter(p => p.id !== id);
  saveCart();
  loadCart();
}

function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  loadCart();
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  loadCart();
});
