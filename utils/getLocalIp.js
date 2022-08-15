import os from "os"

/**
 * @description return local IP
 * @returns {string} address 
 */
function ipGetter() {
	const ifaces = os.networkInterfaces()
	const address = ifaces.wlan0[0].address
	return address
}
export default ipGetter