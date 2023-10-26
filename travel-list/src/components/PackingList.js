import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, deleteItem, checkedItem, clearItem }) {
  const [sort, setSort] = new useState('input')
  let sortItems;
  if (sort === 'input') {
    sortItems = items
  } else if (sort === 'description') {
    sortItems = items.slice().sort((a, b) => {
      if (a.description > b.description) {
        return 1
      } else {
        return -1
      }
    })
  } else if (sort === 'packed') {
    sortItems = items.slice().sort((a, b) => {
      return Number(a.packed) - Number(b.packed)
    })
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
      <select onChange={(e) => setSort(e.target.value)} value={sort}>
        <option value="input">sort by input order</option>
        <option value="packed">sort by packed status</option>
        <option value="description">sort by description</option>
      </select>
      <button onClick={handleClear}>clear list</button>
    </div>
  </div>
}