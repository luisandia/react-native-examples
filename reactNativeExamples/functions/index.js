const functions = require('firebase-functions');

const cors = require('cors')({ origin: true })
const fs = require('fs');
const uuidv4 = require('uuid/v4');


const gcconfig = {
    projectId: "react-native-shareplace-9762b",
    keyFilename: "awesome-places.json"
}
const { Storage } = require('@google-cloud/storage');

const gcs = new Storage(gcconfig);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.storeImage = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        const body = JSON.parse(request.body);
        console.log(request.body)
        fs.writeFileSync("/tmp/upload-image.jpg", body.image, "base64", err => {
            console.error(err);
            return response.status(500).json({ error: err });
        });
        const bucket = gcs.bucket("react-native-shareplace-9762b.appspot.com");
        const uuid = uuidv4();
        bucket.upload("/tmp/upload-image.jpg", {
            uploadType: "media",
            destination: "/places/" + uuid + ".jpg",
            metadata: {
                metadata: {
                    contentType: "image/jpeg",
                    firebaseStorageDownloadTokens: uuid
                }
            }
        }, (err, file) => {
            if (!err) {
                response.status(201).json({
                    imageUrl: "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid
                })
            } else {
                console.error(err);
                return response.status(500).json({ error: err })
            }
        });


    });

    // response.send("Hello from Firebase!");
});