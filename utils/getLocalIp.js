import os from "os"

/**
 * @description return local IP
 * @returns {string} address 
 */
function ipGetter() {
	const ifaces = os.networkInterfaces()
	// const address = ifaces.wlan0[0].address
	for (let i of ifaces.WLAN) {
		if (i.family == "IPv4") {
			return i.address
		} 
	}
}

export default ipGetter