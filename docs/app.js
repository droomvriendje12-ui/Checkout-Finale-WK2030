const SUPABASE_URL = 'https://qoykbhocordugtbvpvsl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveWtiaG9jb3JkdWd0YnZwdnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4Nzc5MzIsImV4cCI6MjA4NzQ1MzkzMn0.Ov-wYwVU73xcdXazqPmK6y2C3UvoDwMYXl2EKkwYnyY';

async function loadProducts() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/producten?select=*`, {
    headers: { 'apikey': SUPABASE_KEY }
  });
  const products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
  const html = products.map(p => `
    <div class="product">
      <h3>${p.naam}</h3>
      <p>${p.korte_naam}</p>
      <button onclick="alert('Added: ${p.naam}')">Add to Cart</button>
    </div>
  `).join('');
  document.getElementById('product-list').innerHTML = '<div class="products-grid">' + html + '</div>';
}

loadProducts();
