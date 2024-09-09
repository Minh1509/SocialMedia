import React, { useState, useEffect } from "react";
import { Typography, Button, TextField } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

// lấy thông tin first_name, last_name, gửi yêu cầu get đến máy chủ
const UserById = async (userId) => {
  try {
    const userDetails = await axios.get(
      `http://localhost:8081/api/user/${userId}`
    );
    return userDetails.data
      ? `${userDetails.data.first_name} ${userDetails.data.last_name}`
      : "Unknown User";
  } catch (error) {
    console.error("Lỗi:", error);
    return "Unknown User";
  }
};

//  lặp qua mảng photos 
// lấy thông tin người dùng cho mỗi bình luận trong từng hình ảnh bằng cách gọi hàm UserById
const UsersForComments = async (photos) => {
try {
  const userPromises = photos.flatMap((photo) =>
    photo.comments.map((comment) => UserById(comment.user_id))
  );
  const users = await Promise.all(userPromises); // đợi cho các promise hoàn thành, trả về mảng các tên người dùng
  return users; 
} catch (error) {
  console.error("Lỗi:", error);
  return [];
}
}
function UserPhotos({ userLoginId }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [commentUsers, setCommentUsers] = useState([]);
  const [comment, setComment] = useState([]);

  const fetchUserPhotos = async () => {
    try {
      // hiện ảnh
      const userPhotos = await axios.get(
        `http://localhost:8081/api/photo/photosOfUser/${userId}`
      );
      setPhotos(userPhotos.data);

      //lấy thông tin người dùng
      const userDetails = await axios.get(
        `http://localhost:8081/api/user/${userId}`
      );
      setUser(userDetails.data);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // lấy lại ảnh , thông tin của người dùng sau khi mà userId thay đổi
  useEffect(() => {
    fetchUserPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]); 

  // lấy thông tin người dùng cho tát cả các bình luận khi state photos thay đổi
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await UsersForComments(photos);
      setCommentUsers(users);
    };

    fetchUsers();
  }, [photos]);

  // xử lý bình luận 1 ảnh bất kì
  const handleCommentSubmit = async ({ photo }) => {
    try {
      const formData = {
        comment: comment[photo._id],
        userId: userLoginId,
      };
      const response = await axios.post(
        `http://localhost:8081/api/comment/commentsOfPhoto/${photo._id}`,
        formData
      );
      if (!response.data) {
        throw new Error("Lỗi");
      }

      // xóa trường nhập comment
      setComment((prevState) => ({ ...prevState, [photo._id]: "" }));

      // cập nhật các ảnh và bình luận, thông tin người nhập comment
      fetchUserPhotos();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  return (
    <div>
      <Typography variant="h4" className="header">
        User Photos
      </Typography>
      {userLoginId === userId && (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/photos/add"
          className="add-photo-button"
        >
          Thêm ảnh
        </Button>
      )}
      <div className="user-photos-container">
        {photos.map((photo) => (
          <div key={photo._id} className="photo-container">
            <img
              src={`http://localhost:8081/api/photo/images/${photo.file_name}`}
              className="photo"
              style={{ width: "200px", height: "200px" }}
            />
            <Typography className="posted-time">
              Posted time: {photo.date_time}
            </Typography>
         
            <div className="comment-input">
              <div className="comment-input-container">
                <TextField
                  label="Thêm bình luận"
                  variant="outlined"
                  value={comment[photo._id] || ""} // Đặt giá trị của trường nhập liệu là nội dung bình luận tương ứng với photo._id
                  onChange={(e) =>
                    setComment((prevState) => ({
                      ...prevState,
                      [photo._id]: e.target.value,
                    }))
                  }
                  className="comment-textfield"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCommentSubmit({ photo })}
                  className="add-comment-button"
                >
                  Thêm bình luận
                </Button>
              </div>
            </div>
            {/* Display existing comments */}
            <Typography className="comments-header">Comments:</Typography>
            {photo.comments &&
              photo.comments.map((comment, commentIndex) => (
                <div
                  key={comment._id}
                  className={`comment ${
                    comment.user_id === userId
                      ? "user-comment"
                      : "other-comment"
                  }`}
                >
                  <Typography className="user">
                    {commentUsers[commentIndex]}{" "}
                  </Typography>
                  <Typography className="comment-comment">
                    {comment.comment}
                  </Typography>
                  <Typography className="comment-time">
                    ({comment.date_time})
                  </Typography>
                  <Typography className="comment-text"></Typography>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPhotos;
