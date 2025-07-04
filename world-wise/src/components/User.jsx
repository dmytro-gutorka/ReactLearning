import styles from "./User.module.css";
import {useAuth} from "../contexts/FakeAuthContex";
import {useNavigate} from "react-router-dom";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function User() {
  const { user, logout } = useAuth()
    const navigation = useNavigate()

    function handleClick() {
        logout()
        navigation('/')
    }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
