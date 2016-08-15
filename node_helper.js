'use strict';

/* Magic Mirror
 * Module: SpotifyConnectUI
 *
 * By Cato Antonsen
 * MIT Licensed.
 */

var NodeHelper = require('node_helper');
var http = require('http');
var ds18b20 = require("ds18b20");

module.exports = NodeHelper.create({
	log: function(message) {
		console.log("[" + this.name + "] " + message);
	},

	error: function(message) {
		console.log("[" + this.name + "] " + message);
	},
	
    start: function () {
        this.started = false;
        this.config = null;
    },
	
	startPolling: function() {
		var self = this;
		setInterval(function() {
				self.getTemperature();
			}, 1000
		);
	},
	
	getTemperature: function() {
		var self = this;
		self.log("getTemperature")

		// ds18b20.sensors(function(err, ids) {
			// self.log(ids);
		// });

		ds18b20.temperature('28-0214660d94ff', function(err, value) {
		  self.log('Current temperature is', value);
		  self.sendSocketNotification("Temperature", value);
		});
	},

	socketNotificationReceived: function (notification, payload) {
		var self = this;
        self.log("Notification received: " + notification);
        if (notification === 'CONFIG' && !self.started) {
            self.config = payload;
            self.started = true;
			self.startPolling();
		}
    }
});
	


