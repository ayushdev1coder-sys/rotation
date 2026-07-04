// ===============================
// NETWORK (WebSocket)
// ===============================

// Replace this with your server address later.
const SERVER_URL = "ws://localhost:8080";

let socket = null;

function connectNetwork() {

    socket = new WebSocket(SERVER_URL);

    socket.onopen = () => {
        console.log("Connected to server");
    };

    socket.onclose = () => {
        console.log("Disconnected");
    };

    socket.onerror = (e) => {
        console.log(e);
    };

    socket.onmessage = (event) => {

        const data = JSON.parse(event.data);

        if(data.type === "motion"){

            targetX = THREE.MathUtils.degToRad(data.beta);
            targetY = THREE.MathUtils.degToRad(data.alpha);
            targetZ = THREE.MathUtils.degToRad(data.gamma);

        }

    };

}

connectNetwork();

function sendMotion(alpha,beta,gamma){

    if(!socket) return;

    if(socket.readyState !== WebSocket.OPEN) return;

    socket.send(JSON.stringify({

        type:"motion",

        alpha:alpha,

        beta:beta,

        gamma:gamma

    }));

}
