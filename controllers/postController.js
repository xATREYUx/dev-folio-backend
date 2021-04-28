const firebase = require("firebase");
var admin = require("firebase-admin");
require("firebase/storage");

const storageRef = admin.storage();

const uploadImageToStorage = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("---No Image File---");
    }

    console.log("file: ", file);
    let newFileName = `${file.originalname}_${Date.now()}`;
    // let fileUpload = bucket.file(newFileName);

    // let fileUpload = storageRef.child(newFileName);
    storageRef.bucket().upload(file);
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
