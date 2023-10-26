import { useState } from "react";
import Logo from './components/Logo.js'
import Form from './components/Form.js'
import PackingList from "./components/PackingList.js";
import Stats from "./components/Stats.js";

function App() {
  const [initialItems, setItems] = useState([
    // { id: 1, description: "Passports", quantity: 2, packed: false },
    // { id: 2, description: "Socks", quantity: 12, packed: false },
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
    if (window.confirm("Do you really want to leave?")) {
      setItems([])
    }
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

export default App;
