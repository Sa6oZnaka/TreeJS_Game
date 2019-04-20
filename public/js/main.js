let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
let renderer = new THREE.WebGLRenderer({antialias: true});

let objLoader = new THREE.OBJLoader();
    objLoader.setPath("./assets/")

let raycaster = new THREE.Raycaster();

let geometry = new THREE.BoxBufferGeometry( 1, 2, 1 );
let material = new THREE.MeshPhongMaterial( { color: 0x3794cf , shininess: 80} );    

renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var i = 0;
var ObjArr = [];

class Structure{

    constructor(path, scale, x, y, z, rotation, type, name){

        this.scale = scale;
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotation = rotation;
        this.type = type;
        this.name = name;

        this.id = load(path, scale);
    }

    update(){
        ObjArr[this.id].position.x = this.x;
        ObjArr[this.id].position.y = this.y;
        ObjArr[this.id].position.z = this.z;
        ObjArr[this.id].scale.set = this.scale;
    }

};

class Movable extends Structure{

    constructor(path, scale, x, y, z, rotation, type, id, speed, owner){
        super(path, x, y, z, rotation, type, id);

        this.speed = speed;
        this.owner = owner;
    }

}

function load(path, scale){
    i++;

    objLoader.load(
        path,
                        
        function ( object ) {
            ObjArr.push(object);

            scene.add(object);
        },
    );
    
    return i - 1;
}

// Creating objects
var c = new Movable("mustang.obj", 0.02, 5, 6, -100, 0, "static", "house", 10, 10);
var o = new Structure("house_01.obj" , 0.2, 5, 6, -200, 0, "static", "house");

var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0,0,0);
scene.add(light);


for(var i = 0; i<25;i++) {
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.x = -10 * i/2;
    mesh.position.y = -10 * i/2;
    mesh.position.z = -54;

    scene.add(mesh);
}

var render = function() {
    requestAnimationFrame(render);

    o.update();

    o.z -= 0.2;
    //ObjArr[1].scale.set(0.02 , 0.02, 0.02);
    //ObjArr[1].rotation.x = 105.2;
    //ObjArr[1].position.z += 0.05;
    //o.update();


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