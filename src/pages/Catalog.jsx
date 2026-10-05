import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

const TYPES = ['All', ...new Set(GUNS.map((gun) => gun.type))]

const SORTS = {
  name: (a, b) => a.name.localeCompare(b.name),
  price: (a, b) => a.price - b.price,
}

function Catalog({ cart, onAdd }) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [sort, setSort] = useState({ key: 'name', dir: 1 })

  const needle = query.trim().toLowerCase()
  const guns = GUNS.filter(
    (gun) =>
      (type === 'All' || gun.type === type) && gun.name.toLowerCase().includes(needle),
  ).sort((a, b) => SORTS[sort.key](a, b) * sort.dir)

  // Clicking the active sort flips its direction; clicking the other one switches to it ascending.
  function toggleSort(key) {
    setSort((prev) => (prev.key === key ? { key, dir: -prev.dir } : { key, dir: 1 }))
  }

  function sortLabel(key, label) {
    if (sort.key !== key) return label
    return `${label} ${sort.dir === 1 ? '↑' : '↓'}`
  }

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="toolbar">
          <input
            type="search"
            className="search"
            placeholder="Search by name…"
            aria-label="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="filter"
            aria-label="Filter by type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t === 'All' ? 'All types' : t}
              </option>
            ))}
          </select>
          <div className="sort" role="group" aria-label="Sort">
            {['name', 'price'].map((key) => (
              <button
                key={key}
                type="button"
                className={sort.key === key ? 'sort-btn active' : 'sort-btn'}
                aria-pressed={sort.key === key}
                onClick={() => toggleSort(key)}
              >
                {sortLabel(key, key === 'name' ? 'Name' : 'Price')}
              </button>
            ))}
          </div>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{guns.length} pieces</span>
        </div>
        {guns.length > 0 ? (
          <ul className="stock">
            {guns.map((gun) => (
              <GunCard key={gun.name} gun={gun} inCart={cart[gun.name] ?? 0} onAdd={onAdd} />
            ))}
          </ul>
        ) : (
          <p className="empty">No pieces match your search.</p>
        )}
      </section>
    </>
  )
}

export default Catalog
