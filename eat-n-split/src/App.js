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
    whoPaying: "You",
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
    setSelectedObj({
      billValue: "",
      yourExpense: "",
      whoPaying: "You",
    });
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
    setSelectedShow(false);
    setSelected({});
    console.log(selectedObj);
  }
  return (
    <div className='app'>
      <div className='sidebar'>
        <Friends
          friends={friends}
          selected={selected}
          selectedObj={selectedObj}
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

function Friends({ friends, selected, selectedObj, onSelected }) {
  return (
    <ul>
      {friends.map((f) => {
        return (
          <Friend
            friend={f}
            key={f.id}
            selected={selected}
            selectedObj={selectedObj}
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
  selectedObj.otherExpense = selectedObj.billValue - selectedObj.yourExpense;
  selectedObj.otherName = selected.name;
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
        value={selectedObj.otherExpense}></input>
      <label>😒Who is paying the bill</label>
      <select
        id='who'
        value={selectedObj.whoPaying}
        onChange={(e) => setWhoPaying(e.target.value)}>
        <option label='You'>You</option>
        <option label={selected.name}>{selected.name}</option>
      </select>
      <button
        className='button'
        onClick={onSelectedForm}>
        Split bill
      </button>
    </form>
  );
}

// 不应该把selectedObj传过来， 怎么解决？更好的方法
// 只想散出去把绑定的值，然后页面展示，也要把值通过父组件传？
function Friend({ friend, selected, selectedObj, onSelected }) {
  return (
    <li>
      <img src={friend.image}></img>
      <h3>{friend.name}</h3>
      <p>
        {selectedObj.whoPaying === "You"
          ? `${selectedObj.otherName} own you ${selectedObj.otherExpense}`
          : `you own ${selectedObj.otherName} ${selectedObj.yourExpense}`}
      </p>
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
