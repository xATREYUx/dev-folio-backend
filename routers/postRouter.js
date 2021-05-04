const router = require("express").Router();

const auth = require("../middleware/auth");
var admin = require("firebase-admin");
var db = admin.firestore();

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
  auth,
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
    let body = req.body;
    console.log("req.body", req.body);

    if (files) {
      console.log("--Files Present---");
      console.log("files: ", files);

      postController
        .uploadImageToStorage(files)
        .then((urls, req) => {
          console.log("urls", urls);
          postController.uploadPost(urls, body).then((snapshot) => {
            console.log("---Post Snapshot---", snapshot);

            db.collection("users")
              .doc(req.user)
              .update({
                posts: admin.firestore.FieldValue.arrayUnion(snapshot.id),
              });
          });

          res.status(200).send({
            status: "Success",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
);

router.delete("/", auth, (req, res) => {
  let body = req.body;
  db.collection("posts")
    .doc(body.docId)
    .delete()
    .then((x) => console.log("delete initiatiated", res));
});

module.exports = router;
