import { useState } from "react";

let id = 3;

export default function Form({ addItem }) {
  const [value, setValue] = new useState('');
  const [quantity, setQuantity] = new useState(1)

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