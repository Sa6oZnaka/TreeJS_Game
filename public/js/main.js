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

var geometry = new THREE.BoxBufferGeometry( 1, 2, 1 );
var material = new THREE.MeshPhongMaterial( { color: 0x3794cf , shininess: 80} );

for(var i = 0; i<25;i++) {
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.x = -10 * i/2;
    mesh.position.y = -10 * i/2;
    mesh.position.z = -54;

    scene.add(mesh);
}

var objLoader = new THREE.OBJLoader();
objLoader.setPath("./assets/")
objLoader.material = new THREE.MeshPhongMaterial();
objLoader.load("house.obj", function( object ) {
    object.position.z -= 30;

    scene.add( object );
});


var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0,0,0);
scene.add(light);

var render = function() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);

}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        camera.position.z --;
    } else if (keyCode == 83) {
        camera.position.z ++;
    } else if (keyCode == 65) {
        camera.position.x --;
    } else if (keyCode == 68) {
        camera.position.x ++;
    } else if (keyCode == 32) {
        camera.position.y ++;
    }
     else if (keyCode == 16) {
        camera.position.y --;
    }
};

render();