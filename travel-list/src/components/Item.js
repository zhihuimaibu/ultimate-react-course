export default function Item({ item, deleteItem, checkedItem }) {

  function handleClick(id) {
    deleteItem(id)
  }

  function handleCheckClick(item) {
    checkedItem(item)
  }

  return <li>
    <input type="checkbox" checked={item.packed} onChange={() => handleCheckClick(item)}></input>
    <span style={item.packed ? { 'textDecoration': 'line-through' } : {}}>{item.quantity} {item.description}</span>
    <button onClick={() => handleClick(item.id)} >❌</button>
  </li >
}