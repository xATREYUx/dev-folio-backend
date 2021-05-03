const firebase = require("firebase");
var admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
// const path = require("path");

const serviceKey = require("../creds.json");

// const storageRef = admin.storage();
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
    const fileNameTwo = bucket.file(`images/${newFileNameTwo}`);
    const fileNameThree = bucket.file(`images/${newFileNameThree}`);

    // // console.log("fileName: ", fileName);

    const fileContentsOne = files["image-one"][0].buffer;
    const fileContentsTwo = files["image-two"][0].buffer;
    const fileContentsThree = files["image-three"][0].buffer;

    // // console.log("fileContents: ", fileContents);
    fileNameOne
      .save(fileContentsOne, (err) => {
        if (!err) {
          console.log("---Save Successful---");
          console.log(
            `Saved to: https://storage.cloud.google.com/devport-express-backend/images/${newFileNameOne}`
          );
        } else {
          console.log("---Error Occured During Upload---", err);
        }
      })
      .then(
        fileNameTwo.save(fileContentsTwo, (err) => {
          if (!err) {
            console.log("---Save Successful---");
            console.log(
              `Saved to: https://storage.cloud.google.com/devport-express-backend/images/${newFileNameTwo}`
            );
          } else {
            console.log("---Error Occured During Upload---", err);
          }
        })
      )
      .then(
        fileNameThree.save(fileContentsThree, (err) => {
          if (!err) {
            console.log("---Save Successful---");
            console.log(
              `Saved to: https://storage.cloud.google.com/devport-express-backend/images/${newFileNameThree}`
            );
          } else {
            console.log("---Error Occured During Upload---", err);
          }
        })
      );
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
