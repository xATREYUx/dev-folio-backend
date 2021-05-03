const router = require("express").Router();

const authCheck = require("../middleware/auth");
const postController = require("../controllers/postController");
const Multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// const firebase = require("firebase");
require("firebase/storage");
// const db = firebase.firestore();
// const storage = firebase.storage();
// const storageRef = firebase.storage().ref();

const multer = Multer({
  storage: Multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

router.post(
  "/",
  multer.fields([
    {
      name: "image-one",
      maxCount: 1,
    },
    {
      name: "image-two",
      maxCount: 1,
    },
    {
      name: "image-three",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    console.log("--Post Image Initiated---");
    console.log("req.files", req.file);

    let files = req.files;

    if (files) {
      console.log("--File Present---");
      console.log("file: ", files);

      postController
        .uploadImageToStorage(files)
        .then((success) => {
          console.log("success");
          res.status(200).send({
            status: "success",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
);

module.exports = router;
