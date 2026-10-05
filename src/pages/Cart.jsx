import GUNS from '../data/guns.js'

function Cart({ cart, onQty, onBrowse }) {
  const items = GUNS.filter((gun) => cart[gun.name]).map((gun) => ({
    ...gun,
    qty: cart[gun.name],
  }))
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <section className="page">
      <h1 className="display">Cart</h1>

      {items.length === 0 ? (
        <>
          <p className="lede">Your cart is empty.</p>
          <button type="button" className="popup-close" onClick={onBrowse}>
            Browse catalog
          </button>
        </>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.name} className="cart-row">
                <span className="card-frame cart-thumb">
                  <img className="card-img" src={item.image} alt="" width="120" height="90" />
                </span>
                <div className="cart-info">
                  <span className="name display">{item.name}</span>
                  <span className="type">${item.price.toLocaleString()} each</span>
                </div>
                <div className="qty" role="group" aria-label={`Quantity of ${item.name}`}>
                  <button
                    type="button"
                    aria-label="Decrease"
                    onClick={() => onQty(item.name, item.qty - 1)}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.qty}</span>
                  <button
                    type="button"
                    aria-label="Increase"
                    onClick={() => onQty(item.name, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="price cart-subtotal">
                  ${(item.price * item.qty).toLocaleString()}
                </span>
                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => onQty(item.name, 0)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span>Total</span>
            <span className="price">${total.toLocaleString()}</span>
          </div>
        </>
      )}
    </section>
  )
}

export default Cart
