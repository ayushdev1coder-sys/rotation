// ===== THREE.JS SCENE =====

const viewer = document.getElementById("viewer");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// Camera
const camera = new THREE.PerspectiveCamera(
    70,
    viewer.clientWidth / viewer.clientHeight,
    0.1,
    1000
);

camera.position.z = 4;

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    viewer.clientWidth,
    viewer.clientHeight
);

renderer.setPixelRatio(window.devicePixelRatio);

viewer.appendChild(renderer.domElement);

// ===== LIGHTS =====

const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);

// ===== DEFAULT CUBE =====

const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

const material = new THREE.MeshStandardMaterial({
    color: 0x2d89ef,
    metalness: 0.4,
    roughness: 0.3
});

let object3D = new THREE.Mesh(
    geometry,
    material
);

scene.add(object3D);

// ===== ROTATION VALUES =====

let targetX = 0;
let targetY = 0;
let targetZ = 0;

// ===== ANIMATION LOOP =====

function animate() {

    requestAnimationFrame(animate);

    object3D.rotation.x += (targetX - object3D.rotation.x) * 0.15;
    object3D.rotation.y += (targetY - object3D.rotation.y) * 0.15;
    object3D.rotation.z += (targetZ - object3D.rotation.z) * 0.15;

    renderer.render(scene, camera);
}

animate();

// ===== WINDOW RESIZE =====

window.addEventListener("resize", () => {

    camera.aspect = viewer.clientWidth / viewer.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        viewer.clientWidth,
        viewer.clientHeight
    );

});

// ===== FULLSCREEN BUTTON =====

document
.getElementById("fullscreenBtn")
.addEventListener("click", () => {

    viewer.requestFullscreen();

});
