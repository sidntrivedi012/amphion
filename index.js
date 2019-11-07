const uploadedimage = document.getElementById("imageUpload");
var data = [];
function obj(emotion, age, sex) {
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
]).then(hello);

async function hello() {
  document.body.append("Hello");
  uploadedimage.addEventListener("change", async () => {
    const image = await faceapi.bufferToImage(uploadedimage.files[0]);

    const result = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender()
      .withFaceDescriptors();

    document.body.append(result.length);
    console.log(result);

    for (let i = 0; i < result.length; i++) {
      let arr = Object.values(result[i].expressions);
      let max = Math.max(...arr);
      if (max == result[i].expressions.angry) express = "Angry";
      else if (max == result[i].expressions.disgusted) express = "Disgusted";
      else if (max == result[i].expressions.fearful) express = "Fearful";
      else if (max == result[i].expressions.happy) express = "Happy";
      else if (max == result[i].expressions.neutral) express = "Neutral";
      else if (max == result[i].expressions.sad) express = "Sad";
      else if (max == result[i].expressions.surprised) express = "Surprised";

      var obj1 = new obj(express, result[i].age, result[i].gender);
      const len = data.push(obj1);
    }
    console.log(data);
  });
}
