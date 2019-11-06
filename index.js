const uploadedimage = document.getElementById("imageUpload");
console.log(faceapi.nets);

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
    // console.log(result[0]);

    // console.log(result[0].age);
    // console.log(result[0].gender);
    let arr = Object.values(result[0].expressions);
    let max = Math.max(...arr);
    if (max == result[0].expressions.angry) express = "Angry";
    else if (max == result[0].expressions.disgusted) express = "Disgusted";
    else if (max == result[0].expressions.fearful) express = "Fearful";
    else if (max == result[0].expressions.happy) express = "Happy";
    else if (max == result[0].expressions.neutral) express = "Neutral";
    else if (max == result[0].expressions.sad) express = "Sad";
    else if (max == result[0].expressions.surprised) express = "Surprised";
    // console.log(express);
    document.body.append(result.length);
  });
}
