// =============================
// 3D Model Loader
// =============================

const modelInput = document.getElementById("modelInput");

const loader = new THREE.GLTFLoader();

modelInput.addEventListener("change", loadModel);

function loadModel(event) {

    const file = event.target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    loader.load(

        url,

        function(gltf) {

            // Remove the default cube
            scene.remove(object3D);

            // Replace it with the uploaded model
            object3D = gltf.scene;

            // Resize the model
            object3D.scale.set(1,1,1);

            // Center it
            object3D.position.set(0,0,0);

            scene.add(object3D);

            console.log("Model Loaded Successfully!");

        },

        undefined,

        function(error){

            console.error(error);

            alert("Unable to load this model.");

        }

    );

}
