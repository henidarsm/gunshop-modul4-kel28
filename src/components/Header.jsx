const NAV = ['Catalog', 'About', 'Contact']

function Header({ tab, onTab, cartCount }) {
  return (
    <header className="header">
      <span className="brand display">Bore &amp; Barrel</span>
      <nav className="nav">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
          >
            {item}
          </button>
        ))}
        <button
          type="button"
          className={tab === 'Cart' ? 'nav-link cart-link active' : 'nav-link cart-link'}
          onClick={() => onTab('Cart')}
          aria-label={`Cart, ${cartCount} items`}
        >
          Cart
          <span className="badge" aria-hidden="true">
            {cartCount}
          </span>
        </button>
      </nav>
    </header>
  )
}

export default Header
