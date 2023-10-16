import { useState } from "react";

let id = 3;

function App() {
  const [initialItems, setItems] = useState([
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
  ]);

  function addItem(item) {
    setItems([...initialItems, item]
    )
  }

  function deleteItem(id) {
    setItems(initialItems.filter(i => i.id !== id))
  }

  function checkedItem(item) {
    setItems(initialItems.map(i => {
      if (i.id === item.id) {
        return {
          ...i,
          packed: !i.packed
        }
      } else return i
    }))
  }

  function clearItem() {
    setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItem} />
      <PackingList items={initialItems} deleteItem={deleteItem} checkedItem={checkedItem} clearItem={clearItem} />
      <Stats items={initialItems} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳 </h1>
}

function Form({ addItem }) {
  const [value, setValue] = new useState('');
  const [quantity, setQuantity] = new useState(0)

  function handleAdd() {
    if (!value) return

    addItem({
      id: id++,
      description: value,
      packed: false,
      quantity: quantity,
    });
    setValue('')
    setQuantity(1)
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleQuantity(e) {
    setQuantity(e.target.value);
  }

  return <div className='add-form'>
    <h3>What do you need for your 😍 trip?</h3>
    <select onChange={handleQuantity} value={quantity}>
      {
        Array.from({ length: 20 }, (_, i) => {
          return <option value={i + 1} key={i}>{i + 1}</option>
        })
      }
    </select>
    <input type="text" placeholder="item..." value={value} onChange={handleChange}></input>
    <button onClick={handleAdd} value={value}>add</button>
  </div >
}


function PackingList({ items, deleteItem, checkedItem, clearItem }) {
  const [sort, setSort] = new useState('packed')
  let sortItems = items;
  if (sort === 'packed') {
    console.log(1);
  } else if (sort === 'description') {
    console.log(2);
  } else if (sort === 'input') {
    console.log(3);
  }

  function handleClear() {
    clearItem()
  }

  return <div className="list">
    <ul>
      {
        sortItems.map(m => {
          return <Item item={m} key={m.id} deleteItem={deleteItem} checkedItem={checkedItem}></Item>
        })
      }
    </ul>
    <div className="actions">
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="packed">sort by packed status</option>
        <option value="description">sort by description</option>
        <option value="input">sort by input order</option>
      </select>
      <button onClick={handleClear}>clear list</button>
    </div>
  </div>
}

function Item({ item, deleteItem, checkedItem }) {

  function handleClick(id) {
    deleteItem(id)
  }

  function handleCheckClick(item) {
    checkedItem(item)
  }

  return <li>
    <input type="checkbox" checked={item.packed} onChange={() => handleCheckClick(item)}></input>
    <span style={item.packed ? { 'text-decoration': 'line-through' } : {}}>{item.quantity} {item.description}</span>
    <button onClick={() => handleClick(item.id)} >❌</button>
  </li >
}

function Stats({ items }) {
  const count = items.filter(i => i.packed).length
  return <div className="stats">have {items.length} items on your list, already packed {count}</div>
}
export default App;
