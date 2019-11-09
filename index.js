const uploadedimage = document.getElementById("imageUpload");
var data = [];

function obj(imageObject, emotion, age, sex) {
  this.imageObject = imageObject;
  this.emotion = emotion;
  this.age = age;
  this.sex = sex;
}

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  faceapi.nets.ageGenderNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models")
]).then(detectFaces);

async function detectFaces() {
  document.body.append("Loaded the models. Please upload the file.");
  uploadedimage.addEventListener("change", async () => {
    // create an HTMLImageElement from a Blob
    const image = await faceapi.bufferToImage(uploadedimage.files[0]);

    const result = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender()
      .withFaceDescriptors();

    console.log(result);

    for (let i = 0; i < result.length; i++) {
      const imageObject = result[i].detection;
      let arr = Object.values(result[i].expressions);
      let max = Math.max(...arr);
      switch (max) {
        case result[i].expressions.angry:
          express = "Angry";
          break;
        case result[i].expressions.disgusted:
          express = "Disgusted";
          break;
        case result[i].expressions.fearful:
          express = "Fearful";
          break;
        case result[i].expressions.happy:
          express = "Happy";
          break;
        case result[i].expressions.neutral:
          express = "Neutral";
          break;
        case result[i].expressions.sad:
          express = "Sad";
          break;
        case result[i].expressions.surprised:
          express = "Surprised";
          break;
        default:
          express = "No emotion";
          break;
      }

      var obj1 = new obj(imageObject, express, result[i].age, result[i].gender);
      const len = data.push(obj1);
    }
    console.log(data);
  });
}
