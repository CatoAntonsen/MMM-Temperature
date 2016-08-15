/* global Module */

/* Magic Mirror
 * Module: Temperature
 *
 * By Cato Antonsen
 * MIT Licensed.
 */
 

Module.register("MMM-Temperature",{

	defaults: {
	},

	start: function() {
		this.temperature = null;
		Log.info('Starting module: ' + this.name);
		this.sendSocketNotification('CONFIG', this.config);
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		var temp = document.createTextNode("Temperature: " + this.temperature + "°");
		wrapper.appendChild(temp);
		return wrapper;
	},
	
	socketNotificationReceived: function(notification, payload) {
		if (notification === "Temperature"){
			this.temperature = payload;
			this.updateDom(2000);
		}
	}
});
