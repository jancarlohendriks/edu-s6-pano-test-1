# Photo Sphere Viewer POC - 360 Tools

## Contents
- [The goal](#the-goal)
- [How it works](#how-it-works)
- [Demos](#demos)

## The goal
This proof of concept was built for experimenting with Photo Sphere Viewer, as well as with its features such as markers positioning, markers list and 360 image upload and import to the 360 viewer.

The plan is to implement this proof of concept into the Habitat 360 project.

## How it works
You can create a new viewer using the folloing basic configurations:


### Using the viewer
```js
const viewer = new Viewer({
	panorama: 'IMAGE PATH OR URL FOR THE 360 IMAGE',
	container: 'HTML DOM ID',
	/* ... a lot more of parameters */
});
```

### Using markers
For the markers you will need to use a plugin which you can import from Photo Sphere Viewer
```js
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
```

```js
/* Within same viewer configuration */
const viewer = new Viewer({
	plugins: [[MarkersPlugin, {markers: initMarkers}]]
	/* ... other parameters */
});
```

Once imported you can asign it to a variable for later manipulation
```js
const markers = viewer.getPlugin(MarkersPlugin);

viewer.on('click', (e, data) => {
	if (!data.rightclick) {
		markers.addMarker({
			id: '#' + Math.random(),
			longitude: data.longitude,
			latitude: data.latitude,
			image: 'IMAGE PATH OR URL FOR THE MARKER',
			width: /* INTEGER FOR THE SIZE IN PIXELS */,
			height: /* INTEGER FOR THE SIZE IN PIXELS */,
			/* ... other parameters */
		});
	}
});
```

For instance, deleting a marker
```js
markers.removeMarker(/* CHOSEN MARKER */);
```

Or updating it
```js
markers.updateMarker(/* OBJECT WITH NEW PARAMETERS */);
```

### Using custom navigation bar with image input
```js
const navbar = [
	{
	  id: 'ANY ID',
	  content: `<input id="UPLOAD BUTTON ID" type="file" accept="image/*" name="myFiles">`,
		/* ... other parameters */
	},
	/* ... other navigation items */
];
```
```js
/* Within same viewer configuration */
const viewer = new Viewer({
	navbar: navbar,
	/* ... other parameters */
});
```

### Using the 360 image uploaded
```js
const uploadButton = document.getElementById('UPLOAD BUTTON ID');
uploadButton.onchange = () => handleFiles();
function handleFiles() {
	const reader = new FileReader();
	reader.readAsDataURL(uploadButton.files[0]); /* pick first file */
	reader.onload = () => viewer.setPanorama(reader.result); /* CHANGE VIEWER IMAGE */
	reader.onerror = error => /* handle error */
}
```

## Demos

Working prototype page: https://jancarlohendriks.github.io/pano-test-1/

### YouTube video
#### [Photo Sphere Viewer POC - 360 Tools](https://www.youtube.com/watch?v=oeGMcHm011g)
[![Photo Sphere Viewer POC - 360 Tools](https://img.youtube.com/vi/oeGMcHm011g/0.jpg)](https://www.youtube.com/watch?v=oeGMcHm011g "Photo Sphere Viewer POC - 360 Tools")