const uploadedimage = document.getElementById("imageUpload");
var data = [];

// console.log(faceapi);

function obj(imageObject, emotion, age, sex) {
  this.image_base64 = imageObject;
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
  const container = document.createElement("div");
  container.style.position = "relative";
  document.body.append(container);

  //loading the models
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

    const canvas1 = faceapi.createCanvasFromMedia(image);

    for (let i = 0; i < result.length; i++) {
      //face params to extract
      const regionsToExtract = [
        new faceapi.Rect(
          result[i].detection._box._x,
          result[i].detection._box._y - 50,
          result[i].detection._box._width + 5,
          result[i].detection._box._height + 75
        )
      ];
      // to extract face regions from bounding boxes
      let canvas2 = await faceapi.extractFaces(canvas1, regionsToExtract);
      container.append(canvas2[0]);

      //face extracted, now opening them for saving
      let imageData = canvas2[0]
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

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
      var obj1 = new obj(imageData, express, result[i].age, result[i].gender);
      const len = data.push(obj1);
    }
    console.log(data);
  });
}
