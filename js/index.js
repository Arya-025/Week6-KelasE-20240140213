/**
 * @file index.js — halaman Bursa Motor (Data Motor Manual/Custom).
 * Menampilkan katalog jual beli motor lengkap dengan pencarian dan filter kategori.
 */

const statusEl = document.getElementById("status");
const gridEl = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");

/**
 * Data statis khusus Jual Beli Motor dengan URL gambar yang sudah diperbaiki & dipastikan aktif.
 */
const allMotors = [
  {
    id: 1,
    title: "Honda Beat Street eSP",
    category: "Matic",
    brand: "Honda",
    price: 18500000,
    discountPercentage: 5,
    rating: 4.8,
    stock: 8,
    thumbnail: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Yamaha NMAX 155 Connected",
    category: "Maxi",
    brand: "Yamaha",
    price: 32000000,
    discountPercentage: 7,
    rating: 4.9,
    stock: 5,
    thumbnail: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80"
  },
{
    id: 4,
    title: "Yamaha Aerox 155 VVA",
    category: "Sport Matic",
    brand: "Yamaha",
    price: 29000000,
    discountPercentage: 6,
    rating: 4.8,
    stock: 12,
    thumbnail: "https://images.unsplash.com/photo-1558980664-3a031cf67ea8?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 6,
    title: "Kawasaki Ninja 250 SL",
    category: "Sport",
    brand: "Kawasaki",
    price: 38000000,
    discountPercentage: 10,
    rating: 4.6,
    stock: 4,
    thumbnail: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80"
  },
  
  {
    id: 8,
    title: "Yamaha Fazzio Hybrid Connected",
    category: "Retro Matic",
    brand: "Yamaha",
    price: 23500000,
    discountPercentage: 8,
    rating: 4.8,
    stock: 15,
    thumbnail: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=600&q=80"
  }
];

let allProducts = allMotors;

/**
 * Format harga ke dalam format Rupiah.
 */
function formatRupiah(number) {
  return Number(number).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  });
}

/**
 * Render kartu daftar motor ke halaman web.
 */
function renderProducts(products) {
  gridEl.innerHTML = "";

  if (products.length === 0) {
    statusEl.textContent = "Motor tidak ditemukan.";
    statusEl.classList.remove("error");
    statusEl.style.display = "block";
    return;
  }

  statusEl.style.display = "none";

  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    const isLowStock = product.stock < 5;

    card.innerHTML = `
      <span class="stock-badge ${isLowStock ? "low" : ""}">
        ${isLowStock ? "Stok Menipis" : "Ready Unit"}
      </span>
      <div class="thumb-wrap">
        <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
      </div>
      <div class="body">
        <div class="category">${product.category} &bull; ${product.brand}</div>
        <h3>${product.title}</h3>
        <div class="meta">Sisa unit di showroom: ${product.stock}</div>
        <div class="footer-row">
          <div class="price-tag">
            ${formatRupiah(product.price)}
            <span class="discount">Diskon ${product.discountPercentage}%</span>
          </div>
          <div class="rating">★ ${product.rating.toFixed(1)}</div>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  gridEl.appendChild(fragment);
}

/**
 * Mengisi opsi kategori secara otomatis berdasarkan data motor.
 */
function populateCategoryOptions(products) {
  const categories = [...new Set(products.map((p) => p.category))].sort();

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

/**
 * Filter produk berdasarkan kata kunci pencarian dan kategori yang dipilih.
 */
function applyFilters() {
  const keyword = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filtered = allProducts.filter((product) => {
    const matchKeyword = product.title.toLowerCase().includes(keyword) || 
                         product.brand.toLowerCase().includes(keyword);
    const matchCategory = category ? product.category === category : true;
    return matchKeyword && matchCategory;
  });

  renderProducts(filtered);
}

// Simulasi proses async "fetch" data motor
async function loadMotorData() {
  try {
    statusEl.textContent = "Memuat data bursa motor...";
    statusEl.classList.remove("error");
    statusEl.style.display = "block";

    await new Promise((resolve) => setTimeout(resolve, 300));

    populateCategoryOptions(allProducts);
    renderProducts(allProducts);
  } catch (error) {
    statusEl.textContent = `Gagal memuat data: ${error.message}`;
    statusEl.classList.add("error");
    statusEl.style.display = "block";
  }
}

// Event listener
searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);

// Jalankan saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadMotorData);