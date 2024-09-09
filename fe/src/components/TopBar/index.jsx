import React , {useState} from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import "./styles.css"

function TopBar ( {isLoggedIn, onLogout, user }) {
  const navigate = useNavigate();
  const [logOut, setLogOut] = useState(false);
  const handleLogOut = () => {
    onLogout();
    setLogOut(true);
    navigate ("/login");
  }


  return (
    <AppBar position="static">
      <Toolbar className="toolbar">
        <div className="left-content">
          <Typography variant="h5" color="inherit">
            PhotoSharing
          </Typography>
        </div>
        <div className="right-content">
          {isLoggedIn ? (
            <>
              <Typography variant="body1">Hi, {user.first_name}</Typography>
              <Button color="inherit" className="button" onClick={handleLogOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              {!logOut && (
                <>
                  <Button color="inherit" className="button" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" className="button" component={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
