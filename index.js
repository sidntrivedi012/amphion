const uploadedimage = document.getElementById("imageUpload");
console.log(faceapi.nets);

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  faceapi.nets.ageGenderNet.loadFromUri("/models")
]).then(hello);

async function hello() {
  document.body.append("Hello");
  uploadedimage.addEventListener("change", async () => {
    const image = await faceapi.bufferToImage(uploadedimage.files[0]);

    const result = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceDescriptors();

    document.body.append(result.length);
  });
}
