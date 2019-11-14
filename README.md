# amphion

> A simple face extraction module built on tensorflow.js(face-api.js).

## Usage

1. Clone the repository and install the dependencies.
2. Run `http-server` and open the link of the hosted server.
3. Upload the image and the module returns the faces in the image as independent Canvas elements alongwith the following params:
```json
[{
	"face0": {
		"image_base64": "the base64 encoded string of the image",
		"age": 12,
		"emotion": "Happy",
		"gender": "Male"
	},
	"face1": {
		"image_base64": "the base64 encoded string of the image",
		"age": 11,
		"emotion": "Surprised",
		"gender": "Female"
	}
}]
```
