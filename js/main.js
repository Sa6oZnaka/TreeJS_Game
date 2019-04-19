let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
let renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth,window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;

	camera.updateProjectionMatrix();
})

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

meshX = -10;
for(var i = 0; i<15;i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -10 * i/2;
    mesh.position.y = -10 * i/2;
    mesh.position.z = -54;
    scene.add(mesh);
    meshX ++;
}

var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0,0,0);
scene.add(light);

var render = function() {
	requestAnimationFrame(render);

	renderer.render(scene, camera);
}

render();