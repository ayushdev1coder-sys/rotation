// =====================================
// Phone Motion Controller Server
// =====================================

const WebSocket = require("ws");

const PORT = 8080;

const server = new WebSocket.Server({
    port: PORT
});

console.log("--------------------------------");
console.log("Phone Motion Server Started");
console.log("Port:", PORT);
console.log("--------------------------------");

let clients = [];

server.on("connection", (socket) => {

    console.log("Client Connected");

    clients.push(socket);

    socket.on("message", (message) => {

        for (const client of clients) {

            if (
                client !== socket &&
                client.readyState === WebSocket.OPEN
            ) {

                client.send(message.toString());

            }

        }

    });

    socket.on("close", () => {

        console.log("Client Disconnected");

        clients = clients.filter(c => c !== socket);

    });

});
