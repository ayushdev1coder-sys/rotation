const motionBtn = document.getElementById("motionBtn");
const motionStatus = document.getElementById("motionStatus");

motionBtn.addEventListener("click", enableMotion);

async function enableMotion() {

    // iPhone / iPad permission
    if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
    ) {

        try {

            const permission =
                await DeviceOrientationEvent.requestPermission();

            if (permission !== "granted") {
                alert("Motion permission denied.");
                return;
            }

        } catch (err) {
            alert(err);
            return;
        }

    }

    window.addEventListener(
        "deviceorientation",
        handleOrientation,
        true
    );

    motionStatus.textContent = "Enabled";
}

function handleOrientation(event) {

    const alpha = event.alpha || 0;
    const beta = event.beta || 0;
    const gamma = event.gamma || 0;

    // Show values on screen
    document.getElementById("alpha").textContent =
        alpha.toFixed(1);

    document.getElementById("beta").textContent =
        beta.toFixed(1);

    document.getElementById("gamma").textContent =
        gamma.toFixed(1);

    // Rotate cube
    targetX = THREE.MathUtils.degToRad(beta);
    targetY = THREE.MathUtils.degToRad(alpha);
    targetZ = THREE.MathUtils.degToRad(gamma);

}
