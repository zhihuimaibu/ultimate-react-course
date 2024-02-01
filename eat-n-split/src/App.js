import { useState } from "react";
import img from "./avatar.jpg";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: img,
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: img,
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: img,
    balance: 0,
  },
];
function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [formShow, setFormShow] = useState(false);
  const [selected, setSelected] = useState();
  function handleAddFriend() {
    setFormShow(!formShow);
  }
  function handleAdd(f) {
    setFriends([...friends, f]);
    setFormShow(false);
  }
  function handleSelected(f) {
    setSelected((cur) => (cur?.id === f.id ? null : f));
    setFormShow(false);
  }
  function handleSelectedForm(balance) {
    setFriends(
      friends.map((f) => {
        if (f.id === selected.id) {
          return {
            ...f,
            balance: f.balance + balance,
          };
        } else {
          return f;
        }
      })
    );
    setSelected();
  }
  return (
    <div className='app'>
      <div className='sidebar'>
        <Friends
          friends={friends}
          selected={selected}
          onSelected={handleSelected}
        />
        {formShow && <AddForm onAddFriend={handleAdd} />}
        <Button onClick={handleAddFriend}>
          {formShow ? "Close" : "Add friend"}
        </Button>
      </div>
      {selected && (
        <SelectedForm
          key={selected.id}
          selected={selected}
          onSelectedForm={handleSelectedForm}
        />
      )}
    </div>
  );
}

function Friends({ friends, selected, onSelected }) {
  return (
    <ul>
      {friends.map((f) => {
        return (
          <Friend
            friend={f}
            key={f.id}
            selected={selected}
            onSelected={onSelected}
          />
        );
      })}
    </ul>
  );
}

function SelectedForm({ selected, onSelectedForm }) {
  const [bill, setBill] = useState({
    whoPaying: "you",
  });
  let balance = bill.billValue - bill.yourExpense;

  function handleSplitBill() {
    if (!bill.billValue || !bill.yourExpense) {
      return;
    }
    if (bill.whoPaying === "you") {
      balance = balance;
    } else {
      balance = -balance;
    }
    onSelectedForm(balance);
  }
  return (
    <form className='form form-split-bill'>
      <h2>split a bill with {selected.name}</h2>
      <label>😒Bill value</label>
      <input
        type='text'
        value={bill.billValue}
        onChange={(e) => {
          setBill({
            ...bill,
            billValue: Number(e.target.value),
          });
        }}></input>

      <label>😒Your expense</label>
      <input
        type='text'
        value={bill.yourExpense}
        onChange={(e) => {
          setBill({
            ...bill,
            yourExpense:
              Number(e.target.value) > bill.billValue
                ? bill.yourExpense
                : Number(e.target.value),
          });
        }}></input>

      <label>😒{selected.name}'s expense</label>
      <input
        type='text'
        disabled
        value={balance || null}></input>

      <label>😒Who is paying the bill</label>
      <select
        id='who'
        value={bill.whoPaying}
        onChange={(e) =>
          setBill({
            ...bill,
            whoPaying: e.target.value,
          })
        }>
        <option label='You'>You</option>
        <option label={selected.name}>{selected.name}</option>
      </select>
      <Button onClick={handleSplitBill}>Split bill</Button>
    </form>
  );
}

// 不应该把selectedObj传过来， 怎么解决？
//更好的方法：每个friend独立，添加balance属性
// 只想散出去把绑定的值，然后页面展示，也要把值通过父组件传？
function Friend({ friend, selected, onSelected }) {
  const isSeleted = selected?.id === friend.id;

  return (
    <li className={isSeleted ? "selected" : ""}>
      <img
        src={friend.image}
        alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance === 0 && <p>you and {friend.name} are even</p>}

      {friend.balance > 0 && (
        <p style={{ color: "green" }}>
          {friend.name} own you {friend.balance}
        </p>
      )}

      {friend.balance < 0 && (
        <p style={{ color: "red" }}>
          you own {friend.name} {-friend.balance}
        </p>
      )}

      <Button onClick={() => onSelected(friend)}>
        {isSeleted ? "Close" : "Selected"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  function handleClick(e) {
    e.preventDefault();
    onClick();
  }
  return (
    <button
      className='button'
      onClick={handleClick}>
      {children}
    </button>
  );
}

function AddForm({ onAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [imageURI, setImageURI] = useState(img);

  function handleAddFriend() {
    if (!friendName) {
      return;
    }
    const friend = {
      name: friendName,
      image: imageURI,
      balance: 0,
      id: new Date().getTime(),
    };
    onAddFriend(friend);
    setFriendName("");
    setImageURI(img);
  }

  return (
    <form className='form-add-friend'>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type='text'
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}></input>

      <label>❤️Image URl</label>
      <input
        type='text'
        value={imageURI}
        onChange={(e) => {
          setImageURI(e.target.value);
        }}></input>
      <Button onClick={handleAddFriend}>Add</Button>
    </form>
  );
}

export default App;
