import { Link } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

function NavBar({ user, setUser })
{
  const handleLogOut = () =>
  {
    logOut();
    setUser(null);
  };
  return (
    <nav>
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
