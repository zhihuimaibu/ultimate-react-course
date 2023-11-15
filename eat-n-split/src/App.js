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
  const [friendName, setFriendName] = useState("");
  const [imageURI, setImageURI] = useState(img);
  const [formShow, setFormShow] = useState(false);
  const [selectedShow, setSelectedShow] = useState(false);
  const [selected, setSelected] = useState({});
  function handleAddFriend() {
    setFormShow(!formShow);
  }
  function handleAdd(e) {
    e.preventDefault();
    if (!friendName) {
      return;
    }
    setFriends([
      ...friends,
      {
        name: friendName,
        image: imageURI,
        balance: 0,
        id: new Date().getTime(),
      },
    ]);
    setFriendName("");
    setImageURI(img);
    setFormShow(true);
  }
  function handleSelected(f) {
    if (selected.id === f.id) {
      setSelected({});
      setSelectedShow(false);
    } else {
      setSelected(f);
      setSelectedShow(true);
    }
  }
  function handleSelectedForm(obj) {
    setFriends(
      friends.map((f) => {
        if (f.id === obj.id) {
          return {
            ...f,
            balance: obj.balance,
          };
        } else {
          return f;
        }
      })
    );
    setSelectedShow(false);
    setSelected({});
  }
  return (
    <div className='app'>
      <div className='sidebar'>
        <Friends
          friends={friends}
          selected={selected}
          onSelected={handleSelected}
        />
        {formShow && (
          <AddForm
            friendName={friendName}
            onFriendName={setFriendName}
            imageURI={imageURI}
            onImageURI={setImageURI}
            onAddFriend={handleAdd}
          />
        )}
        <Button onClick={handleAddFriend}>
          {formShow ? "Close" : "Add friend"}
        </Button>
        {/* <button
          className='button'
          onClick={handleAddFriend}>
          {formShow ? "Close" : "Add friend"}
        </button> */}
      </div>
      {selectedShow && (
        <SelectedForm
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
    billValue: 0,
    yourExpense: 0,
    whoPaying: "you",
  });
  function handleSplitBill() {
    let balance = 0;
    if (bill.whoPaying === "you") {
      balance = bill.billValue - bill.yourExpense;
    } else {
      balance = bill.yourExpense - bill.billValue;
    }
    console.log(bill);
    onSelectedForm({
      id: selected.id,
      balance,
    });
  }
  return (
    <form className='form form-split-bill'>
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
            yourExpense: Number(e.target.value),
          });
        }}></input>

      <label>😒{selected.name}'s expense</label>
      <input
        type='text'
        disabled
        value={bill.billValue - bill.yourExpense}></input>

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
      {/* <button
        className='button'
        onClick={handleSplitBill}>
        Split bill
      </button> */}
    </form>
  );
}

// 不应该把selectedObj传过来， 怎么解决？
//更好的方法：每个friend独立，添加balance属性
// 只想散出去把绑定的值，然后页面展示，也要把值通过父组件传？
function Friend({ friend, selected, onSelected }) {
  return (
    <li>
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
        {selected.id === friend.id ? "Close" : "Selected"}
      </Button>
      {/* <button
        className='button'
        onClick={() => onSelected(friend)}>
        {selected.id === friend.id ? "Close" : "Selected"}
      </button> */}
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

function AddForm({
  friendName,
  onFriendName,
  imageURI,
  onImageURI,
  onAddFriend,
}) {
  return (
    <form className='form-add-friend'>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type='text'
        value={friendName}
        onChange={(e) => onFriendName(e.target.value)}></input>

      <label>❤️Image URl</label>
      <input
        type='text'
        value={imageURI}
        onChange={(e) => {
          onImageURI(e.target.value);
        }}></input>
      <button
        className='button'
        onClick={onAddFriend}>
        Add
      </button>
    </form>
  );
}

export default App;
