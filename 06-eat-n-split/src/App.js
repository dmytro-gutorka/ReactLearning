import {useState} from "react";


const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [friends, setFriends] = useState(initialFriends)
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleShowAddFriend() {
        setShowAddFriend(show => !show)
    }

    function handleAddFriend(friend) {
        setFriends(friends => [...friends, friend])
        setShowAddFriend(false)
    }

    function handleSelectedFriend(friend) {
        setSelectedFriend(selected => selected?.id === friend.id ? null : friend)
        setShowAddFriend(false)
    }

    function handleSplitBill(value) {
        setFriends(friends => friends.map(friend =>
            friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} : friend))

        setSelectedFriend(null)
    }

  return (
      <div className="app">
        <div className="sidebar">
            <FriendsList friends={friends} handleSelectedFriend={handleSelectedFriend} selectedFriend={selectedFriend}/>
            {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
            <Button onClick={handleShowAddFriend}>{!showAddFriend ? "Add friend" : "Close"}</Button>
        </div>
          {selectedFriend && <FormSplitBill key={selectedFriend.id} selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}
      </div>
  )
}


function Button({ children, onClick }) {
    return (
        <button className="button" onClick={onClick}>{children}</button>
    )
}


function FriendsList({ friends, handleSelectedFriend, selectedFriend }) {
  return (
      <ul>
        {friends.map(friend => (
            <Friend
                isSelected={selectedFriend?.id === friend.id}
                handleSelectedFriend={handleSelectedFriend}
                friend={friend}
                key={friend.id}
            />
        ))}
      </ul>
  )
}


function Friend({ friend, handleSelectedFriend, isSelected}) {
  return  (
      <li className={isSelected ? 'selected' : ''}>
        <img src={friend.image} alt=""/>
        <h3>{friend.name}</h3>
          {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)}</p>}
          {friend.balance > 0 && <p className="green">{friend.name} owes you {Math.abs(friend.balance)}</p>}
          {friend.balance === 0 && <p>You and {friend.name} are even</p>}
          <Button onClick={() => handleSelectedFriend(friend)}>{isSelected ? 'Close' : 'Select'}</Button>
      </li>
  )
}


function FormAddFriend({ onAddFriend }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('https://i.pravatar.cc/48?u=499476');

    function handleSubmit(e) {
        e.preventDefault();

        if (!name || !image) return;

        const newFriend = { name, image, balance: 0, id: Date.now() }

        onAddFriend(newFriend)

        setName("")
        setImage("https://i.pravatar.cc/48?u=499476")
    }

    return (
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>| Friend Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

            <label htmlFor="">| Image url</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>

            <Button>Add</Button>
        </form>
    )
}


function FormSplitBill({ selectedFriend, onSplitBill }) {
    const [bill, setBill] = useState("")
    const [paidByUser, setPaidByUser] = useState("")
    const paidByFriend = bill ? bill - paidByUser : ""
    const [whoIsPaying, setWoIsPaying] = useState("user")

    function handleSubmit(e) {
        e.preventDefault()

        if (!bill || !paidByUser) return;
        onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
    }

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>| Bill value</label>
            <input type="text" value={bill} onChange={(e) => setBill(+e.target.value)}/>

            <label>| Your expenses</label>
            <input type="text" value={paidByUser} onChange={(e) => setPaidByUser(
                +e.target.value > bill ? paidByUser : +e.target.value
            )}/>

            <label>| {selectedFriend.name}'s expenses</label>
            <input type="text" value={paidByFriend} disabled/>

            <label>| Who is paying the bill ?</label>
            <select value={whoIsPaying} onChange={(e) => setWoIsPaying(e.target.value)}>
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>
            <button>Split bill</button>
        </form>
    )
}
