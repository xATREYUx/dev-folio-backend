const firebase = require("firebase");
var admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
// const path = require("path");

const serviceKey = require("../creds.json");

// const storageRef = admin.storage();
const storage = new Storage();

const bucket = storage.bucket("devport-express-backend");

const uploadImageToStorage = async (file) => {
  return new Promise(async (resolve, reject) => {
    if (!file) {
      reject("---No Image File---");
    }
    console.log("filepath: ", file);

    let newFileName = `${file.originalname}_${Date.now()}`;
    const fileName = bucket.file(`images/${newFileName}`);
    // // console.log("fileName: ", fileName);

    const fileContents = file.buffer;
    // // console.log("fileContents: ", fileContents);

    fileName.save(fileContents, (err) => {
      if (!err) {
        console.log("---Save Successful---");
        console.log(
          `Saved to: https://storage.cloud.google.com/devport-express-backend/images/${newFileName}`
        );
      } else {
        console.log("---Error Occured During Upload---", err);
      }
    });

    // let fileUpload = storageRef.child(newFileName);
    // storageRef
    //   .bucket("images")
    //   .put(file)
    //   .then((snapshot) => {
    //     console.log("Uploaded a blob or faile!");
    //   });
    // .createWriteStream().end(file.buffer);
    //   .then((snapshot) => {
    //     console.log("Uploaded a blob or file!");
    //   });
    // const blobStream = fileUpload.createWriteStream({
    //   metadata: {
    //     contentType: file.mimetype,
    //   },
    // });
    // blobStream.on("error", (error) => {
    //   reject("Something is wrong! Unable to upload at the moment.");
    // });

    // blobStream.on("finish", () => {
    //   // The public URL can be used to directly access the file via HTTP.
    //   const url = format(
    //     `https://storage.googleapis.com/${storageRef.name}/${fileUpload.name}`
    //   );
    //   resolve(url);
    // });

    // blobStream.end(file.buffer);
  });
};
exports.uploadImageToStorage = uploadImageToStorage;
