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
  const [selectedObj, setSelectedObj] = useState({
    billValue: "",
    yourExpense: "",
    whoPaying: "",
  });
  function setBillValue(billValue) {
    setSelectedObj({
      ...selectedObj,
      billValue,
    });
  }
  function setYourExpense(yourExpense) {
    setSelectedObj({
      ...selectedObj,
      yourExpense,
    });
  }
  function setWhoPaying(whoPaying) {
    setSelectedObj({
      ...selectedObj,
      whoPaying,
    });
  }
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
  function handleSelectedForm(e) {
    e.preventDefault();
    setFormShow(false);
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
        <button
          className='button'
          onClick={handleAddFriend}>
          {formShow ? "Close" : "Add friend"}
        </button>
      </div>
      {selectedShow && (
        <SelectedForm
          selected={selected}
          selectedObj={selectedObj}
          setBillValue={setBillValue}
          setYourExpense={setYourExpense}
          setWhoPaying={setWhoPaying}
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

function SelectedForm({
  selected,
  selectedObj,
  setBillValue,
  setYourExpense,
  setWhoPaying,
  onSelectedForm,
}) {
  const otherExpense = selectedObj.billValue - selectedObj.yourExpense;
  return (
    <form className='form form-split-bill'>
      <label>😒Bill value</label>
      <input
        value={selectedObj.billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}></input>
      <label>😒Your expense</label>
      <input
        value={selectedObj.yourExpense}
        onChange={(e) => setYourExpense(Number(e.target.value))}></input>
      <label>😒{selected.name}'s expense</label>
      <input
        disabled
        value={otherExpense}></input>
      <label>😒Who is paying the bill</label>
      <select
        id='who'
        value={selectedObj.whoPaying}
        onChange={(e) => setWhoPaying(Number(e.target.value))}>
        <option>You</option>
        <option>{selected.name}</option>
      </select>
      <button
        className='button'
        onClick={onSelectedForm}>
        Split bill
      </button>
    </form>
  );
}

function Friend({ friend, selected, onSelected }) {
  return (
    <li>
      <img src={friend.image}></img>
      <h3>{friend.name}</h3>
      <p>You own Clark {friend.balance}</p>
      <button
        className='button'
        onClick={() => onSelected(friend)}>
        {selected.id === friend.id ? "Close" : "Selected"}
      </button>
    </li>
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
        value={friendName}
        onChange={(e) => onFriendName(e.target.value)}></input>
      <label>❤️Image URl</label>
      <input
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
