import {GLTFLoader} from "./GLTFLoader.js";
const canvas = document.querySelector('canvas');
var scene = new THREE.Scene();

let gridWidth = $(".banner .half-grid-two").width();
let gridHeight = $(".banner .half-grid-two").height();



let thirdgridWidth = $(".third-sec .half-grid-two").width();
let thirdgridHeight = $(".third-sec .half-grid-two").height();

var camera = new THREE.PerspectiveCamera(
    75,
    gridWidth / gridHeight,
    0.1,
    1000
);

var renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});
renderer.setSize(gridWidth, gridHeight);
renderer.shadowMap.enabled = true;

var gui = new dat.GUI();

var loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();

var obj;
loader.setDRACOLoader( dracoLoader );

loader.load("scene.gltf", function (gltf){
    
    scene.add(gltf.scene);

    gltf.scene.scale.set(0.4, 0.4, 0.4);
    gltf.scene.position.set(0, 11, -100);

    
    gltf.scene.castShadow = true;

    obj = gltf.scene;
    test();

    var objectBase = gui.addFolder('Object')
    objectBase.add(gltf.scene.rotation, 'x').min(-10).max(10)
    objectBase.add(gltf.scene.rotation, 'y').min(-10).max(10)
    objectBase.add(gltf.scene.rotation, 'z').min(-10).max(10)
    objectBase.add(gltf.scene.position, 'x').min(-100).max(100)
    objectBase.add(gltf.scene.position, 'y').min(-100).max(100)
    objectBase.add(gltf.scene.position, 'z').min(-100).max(100)

}, 
function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

});

function test() {

    var tl = new gsap.timeline();
    tl.from(obj.position, { z: -400, duration: 2})
    tl.from(dlight.position, {x: 8, duration: 1})

    gsap.registerPlugin(ScrollTrigger);

    var banner = gsap.timeline({
        scrollTrigger: {
            trigger: ".banner",
            start: "0% 0%",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1
        }
    });

    banner.to(dlight.position, {y: -4.1, duration: 1})
    banner.to(dlight.position, {y: 0.7, y: 0.5, z: 1, duration: 1})
    banner.to(obj.position, {x: 0, y: 8, duration: 1})
    banner.fromTo(obj.position, {z: -100}, {z: -65, duration: 1})
    banner.to(obj.rotation, {y: -0.5, duration: 1})

    

    var bannertl = gsap.timeline({
        scrollTrigger: {
            trigger: ".banner",
            start: "10% 0%",
            scrub: 0.5,
            anticipatePin: 1
        }
    });
    bannertl.to("canvas", {css:{top:topPosTwo, left: "0"}, duration: 4});
    bannertl.to(obj.rotation, {y: 0.5, duration: 1})

    

    var third = gsap.timeline({
        scrollTrigger: {
            trigger: ".second-sec",
            start: "100% 100%",
            scrub: 0.5,
            markers: true,
            anticipatePin: 1
        }
    });
    third.to("canvas", {css:{top:topPosThree, left: leftPosThree}, duration: 4});
    third.fromTo(obj.position, {z: -65}, {x: -35, y: 17, z: -120, duration: 3}, "-=3")
    third.to(obj.rotation, {y: -0.1, z: -0.05, duration: 1}, "-=1.5")

    // banner.to(obj.scale, { x: 0.45, y: 0.45, z: 0.45, duration: 4}, "rotatecar")
    // banner.to(obj.position, { y: -0.25, duration: 4}, "rotatecar")
    // banner.to("canvas#car", {css:{top:topPos, left: -leftPos/1.5}, duration: 4}, "rotatecar");
    // banner.to(obj.rotation, {y: 1, duration: 10}, "rotatecar")
}


var dlight = new THREE.DirectionalLight(0xffffff, 1);
dlight.rotation.set(-2,0,-2);
dlight.position.set(6,4.5,-5);
dlight.castShadow = true;
dlight.castShadow = true;
dlight.shadowDarkness = 0.2;
dlight.shadow.bias = 0.0001;
dlight.shadow.camera.visible = true; 
scene.add(dlight)

const plight = new THREE.PointLight( 0xffffff, 1, 1000 );
plight.position.set( -20, 1, -67 );
plight.castShadow = true;
plight.shadowDarkness = 0.2;
plight.shadow.bias = 0.0001;
scene.add( plight );

var pointLight = gui.addFolder('PointLight')
pointLight.add(plight.rotation, 'x').min(-9).max(9)
pointLight.add(plight.rotation, 'y').min(-9).max(9)
pointLight.add(plight.rotation, 'z').min(-9).max(9)
pointLight.add(plight.position, 'x').min(-20).max(20)
pointLight.add(plight.position, 'y').min(-20).max(40)
pointLight.add(plight.position, 'z').min(-100).max(100)

var directionLight = gui.addFolder('DirectionLight')
directionLight.add(dlight.rotation, 'x').min(-9).max(9)
directionLight.add(dlight.rotation, 'y').min(-9).max(9)
directionLight.add(dlight.rotation, 'z').min(-9).max(9)
directionLight.add(dlight.position, 'x').min(-20).max(20)
directionLight.add(dlight.position, 'y').min(-20).max(40)
directionLight.add(dlight.position, 'z').min(-100).max(100)

// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( plight, sphereSize );
// scene.add( pointLightHelper );

// const helper = new THREE.DirectionalLightHelper( dlight, 1 );
// scene.add( helper );

// var light = new THREE.HemisphereLight( 0xffffff, 0x000000, 1 );
// scene.add( light );

camera.position.set(0, 0.5, 2);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {

    let gridWidth = $(".half-grid-two").width();
    let gridHeight = $(".half-grid-two").height();

    camera.aspect = gridWidth/ gridHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( gridWidth, gridHeight );
}

animate();