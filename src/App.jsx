import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeOne, clearCart } from "./cart";
import { products } from "./products";

function App() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  return (
    <main>
      <h1>mhmm kager :D</h1>
      <section>
        <h2>Kurv</h2>

        {cartItems.length === 0 ? (
          <p>HEY! Køb nogle kager nu! Din kurv er tom!</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <article key={item.id}>
                <h3>{item.name}</h3>

                <p>
                  {item.quantity} x {item.price} kr.
                </p>

                <button onClick={() => dispatch(removeOne(item.id))}>
                  Fjern en kage!
                </button>
              </article>
            ))}

            <button onClick={() => dispatch(clearCart())}>Ryd kurven</button>
          </div>
        )}
      </section>
      <section>
        <h2>Kager af flere varianter nammenam</h2>

        <div>
          {products.map((product) => (
            <article key={product.id}>
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p>{product.price} kr.</p>

              <button onClick={() => dispatch(addToCart(product))}>
                Ja tilføj den {">"}:D
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
