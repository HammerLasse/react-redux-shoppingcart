const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");

function formatPrice(price) {
  return `${price} kr.`;
}

function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
    <article class="product-card">
      <img
        src="${product.image}"
        alt="${product.name}"
        onerror="this.src='https://placehold.co/600x400?text=${encodeURIComponent(product.name)}'"
      />
      <div class="product-content">
        <h3>${product.name}</h3>
        <p>${formatPrice(product.price)}</p>
        <button data-add="${product.id}">Add to cart</button>
      </div>
    </article>
  `,
    )
    .join("");

  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.add);
      const product = products.find((item) => item.id === productId);
      store.dispatch(addToCart(product));
    });
  });
}

function renderCart() {
  const state = store.getState();
  const items = state.items;

  if (items.length === 0) {
    cartList.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
  } else {
    cartList.innerHTML = items
      .map(
        (item) => `
      <div class="cart-item">
        <div>
          <h3>${item.name}</h3>
          <p>${item.quantity} × ${formatPrice(item.price)}</p>
        </div>
        <button class="remove-button" data-remove="${item.id}">Remove one</button>
      </div>
    `,
      )
      .join("");
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  cartCount.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
  cartTotal.textContent = formatPrice(total);

  document.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      store.dispatch(removeOne(Number(button.dataset.remove)));
    });
  });
}

// Render and print the state after every dispatch
store.subscribe(() => {
  console.log("Redux state after dispatch:", store.getState());
  renderCart();
});

clearCartButton.addEventListener("click", () => {
  store.dispatch(clearCart());
});

renderProducts();
renderCart();
console.log("Initial Redux state:", store.getState());
