const firebase = require("firebase");
var admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
// const path = require("path");

const serviceKey = require("../creds.json");
const db = admin.firestore();
const storage = new Storage();

const bucket = storage.bucket("devport-express-backend");

const uploadImageToStorage = async (files) => {
  return new Promise(async (resolve, reject) => {
    if (!files) {
      reject("---No Image File---");
    }
    console.log("filepath: ", files["image-one"][0].buffer);

    let newFileNameOne = `${Date.now()}_${files["image-one"][0].originalname}`;
    let newFileNameTwo = `${Date.now()}_${files["image-two"][0].originalname} `;
    let newFileNameThree = `${Date.now()}_${
      files["image-three"][0].originalname
    }}`;

    const fileNameOne = bucket.file(`images/${newFileNameOne}`);
    const fileOneURL = await fileNameOne.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    console.log("signedURL: ", fileOneURL);

    const fileNameTwo = bucket.file(`images/${newFileNameTwo}`);
    const fileTwoURL = await fileNameOne.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    console.log("signedURL: ", fileTwoURL);

    const fileNameThree = bucket.file(`images/${newFileNameThree}`);
    const fileThreeURL = await fileNameOne.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    console.log("signedURL: ", fileThreeURL);

    const fileContentsOne = files["image-one"][0].buffer;
    const fileContentsTwo = files["image-two"][0].buffer;
    const fileContentsThree = files["image-three"][0].buffer;

    fileNameOne
      .save(fileContentsOne, (err) => {
        if (!err) {
          console.log("---Save Successful---");
        } else {
          console.log("---Error Occured During Upload---", err);
        }
      })
      .then(
        fileNameTwo.save(fileContentsTwo, (err) => {
          if (!err) {
            console.log("---Save Successful---");
          } else {
            console.log("---Error Occured During Upload---", err);
          }
        })
      )
      .then(
        fileNameThree.save(fileContentsThree, (err) => {
          if (!err) {
            console.log("---Save Successful---");
          } else {
            console.log("---Error Occured During Upload---", err);
          }
        })
      )
      .then(() => {
        const imageURLs = {
          fileOneURL: fileOneURL,
          fileTwoURL: fileTwoURL,
          fileThreeURL: fileThreeURL,
        };
        resolve(imageURLs);
      });
  });
};

const uploadPost = (urls) => {
  //   db.collection(`posts`).doc(`${userData.uid}`).set({
  //     email: email,
  //     passwordHash: passwordHash,
  //     userrId: userData.uid,
  //   });
};

exports.uploadImageToStorage = uploadImageToStorage;
exports.uploadPost = uploadPost;
