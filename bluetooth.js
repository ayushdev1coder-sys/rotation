const bluetoothBtn = document.getElementById("bluetoothBtn");
const btStatus = document.getElementById("btStatus");

let bluetoothDevice = null;
let gattServer = null;

bluetoothBtn.addEventListener("click", connectBluetooth);

async function connectBluetooth() {

    if (!navigator.bluetooth) {
        alert("Web Bluetooth is not supported in this browser.");
        return;
    }

    try {

        bluetoothDevice = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: []
        });

        btStatus.textContent = "Connecting...";

        gattServer = await bluetoothDevice.gatt.connect();

        btStatus.textContent =
            "Connected: " + bluetoothDevice.name;

        bluetoothDevice.addEventListener(
            "gattserverdisconnected",
            () => {

                btStatus.textContent = "Disconnected";

            }
        );

    }
    catch (error) {

        console.error(error);

        btStatus.textContent = "Connection Failed";

    }

}
