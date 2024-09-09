import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import axios from "axios";
function UserList() {
  const [users, setUsers] = useState([]); // State to store the list of users

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userList = await axios.get("http://localhost:8081/api/user/list");
        setUsers(userList.data);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <List component="nav">
        {users.map((user) => (
          <ListItem
            button
            key={user._id}
            component={Link}
            to={`users/${user._id}`}
          >
            <ListItemText primary={`${user.first_name} ${user.last_name}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default UserList;
