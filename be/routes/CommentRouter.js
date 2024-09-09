const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();

router.post("/commentsOfPhoto/:photo_id",async (req, res) => {
    const { photo_id } = req.params;
    const  comment  = req.body.comment;
    // Validate the comment
    console.log(req.body);
    try {
      const photo = await Photo.findById(photo_id);
  
      photo.comments.push({
        comment: comment,
        user_id: req.body.userId,
        date_time: new Date(),
      });
      // Save the updated photo
      const updatedPhoto = await photo.save();
      res.status(200).json(updatedPhoto);
    } catch (error) {
      console.error("Failed to add comment:", error);
      res.status(500).json({ error: "Failed to add comment" });
    }
  });

module.exports = router;