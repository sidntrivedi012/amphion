const uploadedimage = document.getElementById("imageUpload");
var data = [];

// console.log(faceapi);

function obj(imageObject, emotion, age, gender) {
  this.image_base64 = imageObject;
  this.emotion = emotion;
  this.age = age;
  this.gender = gender;
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

  document.body.append("Loaded the models. Please upload the file.");
  uploadedimage.addEventListener("change", async () => {
    const image = await faceapi.bufferToImage(uploadedimage.files[0]);

    const result = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender()
      .withFaceDescriptors();

    const canvas1 = faceapi.createCanvasFromMedia(image);

    for (let i = 0; i < result.length; i++) {
      const regionsToExtract = [
        new faceapi.Rect(
          result[i].detection._box._x,
          result[i].detection._box._y,
          result[i].detection._box._width,
          result[i].detection._box._height
        )
      ];
      let canvas2 = await faceapi.extractFaces(canvas1, regionsToExtract);
      container.append(canvas2[0]);

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
