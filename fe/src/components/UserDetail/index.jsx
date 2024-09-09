import React, { useState, useEffect } from "react";
import { Typography , Link } from "@mui/material";
import "./styles.css";
import { useParams} from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserDetail() {
  const { userId } = useParams(); // Extract userId from route params
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const userData = await axios.get(`http://localhost:8081/api/user/${userId}`);
        setUser(userData.data);
      } catch (error) {
        console.error("Error fetching user detail:", error);
      }
    };

    fetchUserDetail();
  }, [userId]);
  const handleViewPhotos = () => {
    navigate (`/photos/${userId}`);
  }
  if (user)
    return (
      <div>
        <Typography variant="h4" className="heading">
          User Detail
        </Typography>
        <div className="user-detail-container">
          <Typography variant="h5" className="user-name">
            {user.last_name}
          </Typography>
          <Typography className="user-info">
            Location: {user.location}
          </Typography>
          <Typography className="user-info">
            Description: {user.description}
          </Typography>
          <Typography className="user-info">
            Occupation: {user.occupation}
          </Typography>
          <button>
            <Link onClick={handleViewPhotos} className="view-photos-link">
              View Photos
            </Link>
          </button>
        </div>
      </div>
    );
}

export default UserDetail;
