import { Viewer } from "photo-sphere-viewer";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import '../scss/style.scss'

const navbar = [
	{
	  id: 'my-button',
	  content: `<input id="uploadInput" type="file" accept="image/*" name="myFiles">`,
	  title: 'Hello world',
	  className: 'custom-button',
	  onClick: () => {
	    // alert('Hello from custom button');
	  },
	},
	'autorotate',
	'zoom',
	// 'move',
	// 'download',
	'markers',
	'markersList',
	'description',
	'caption',
	'fullscreen',
];

const initMarkers = [
	{
		id: 'circle',
		circle: 20,
		longitude: 0,
		latitude: 0,
		// x: 0,
		// y: 0,
		tooltip: 'A circle marker'
	}
];

const viewer = new Viewer({
  panorama: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
  container: 'app',
  caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
  loadingImg: 'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
  defaultLat: 0.3,
  touchmoveTwoFingers: true,
  // mousewheelCtrlKey: true,
	navbar: navbar,
	plugins: [[MarkersPlugin, {markers: initMarkers}]]
});


const uploadButton = document.getElementById('uploadInput');
uploadButton.onchange = () => handleFiles();
function handleFiles() {
	const reader = new FileReader();
	reader.readAsDataURL(uploadButton.files[0]);
	reader.onload = () => viewer.setPanorama(reader.result);
	reader.onerror = error => console.log(error);
}

const markers = viewer.getPlugin(MarkersPlugin);

viewer.on('click', (e, data) => {
	if (!data.rightclick) {
		markers.addMarker({
			id: '#' + Math.random(),
			longitude: data.longitude,
			latitude: data.latitude,
			image: 'https://photo-sphere-viewer.js.org/assets/pin-red.png',
			width: 32,
			height: 32,
			anchor: 'bottom center',
			tooltip: 'Generated pin',
			data: {
				generated: true,
				deletable: true
			}
		});
	}
});

markers.on('select-marker', (e, marker, data) => {
	console.log('select', marker.id);

	if (marker.data && marker.data.deletable) {
		if (data.dblclick) {
			markers.removeMarker(marker);
		}
		else if (data.rightclick) {
			markers.updateMarker({
				id   : marker.id,
				image: 'https://photo-sphere-viewer.js.org/assets/pin-blue.png',
			});
		}
	}
});

markers.on('unselect-marker', (e, marker) => {
	console.log('unselect', marker.id);
});

markers.on('over-marker', (e, marker) => {
	console.log('over', marker.id);
});

markers.on('leave-marker', (e, marker) => {
	console.log('leave', marker.id);
});

markers.on('select-marker-list', (e, marker) => {
	console.log('select-list', marker.id);
});

markers.on('goto-marker-done', (e, marker) => {
	console.log('goto-done', marker.id);
});