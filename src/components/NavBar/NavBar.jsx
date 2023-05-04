import { Link } from "react-router-dom";
import { logOut } from "../../utilities/users-service";
import SearchBar from "../SearchBar/SearchBar";
import styles from './NavBar.module.css'

function NavBar({ user, setUser })
{
  const handleLogOut = () =>
  {
    logOut();
    setUser(null);
  };
  return (
    <nav className={styles.NavBar}>
      <h1>mikeSPACE</h1>
      <SearchBar />
      <Link to={`/users/${user._id}/friends`}>Friends</Link>
      &nbsp; | &nbsp;
      <Link to={`/users/${user._id}/requests`}>Friend Requests</Link>
      &nbsp; | &nbsp;
      <Link to={`/users/${user._id}`}>Your Profile</Link>
      {" "}<span>Welcome, {user.name}</span>{" "}
      <Link to="" onClick={handleLogOut}>
        Logout
      </Link>
    </nav>
  );
}

export default NavBar;
