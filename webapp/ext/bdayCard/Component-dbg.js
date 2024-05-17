(function () {
	"use strict";

	/* component for custom card */

	jQuery.sap.declare("gisa.mss.MSSOnePage.MSSOnePageOview.ext.bdayCard.Component");
	jQuery.sap.require("sap.ovp.cards.custom.Component");

	sap.ovp.cards.custom.Component.extend("gisa.mss.MSSOnePage.MSSOnePageOview.ext.bdayCard.Component", {
		// use inline declaration instead of component.json to save 1 round trip
		metadata: {
			properties: {
				"contentFragment": {
					"type": "string",
					"defaultValue": "gisa.mss.MSSOnePage.MSSOnePageOview.ext.bdayCard.bdayCard"
				},
				"headerFragment": {
					"type": "string",
					"defaultValue": ""
				},
				"footerFragment": {
					"type": "string",
					"defaultValue": ""
				}
			},

			version: "@version@",

			library: "sap.ovp",

			includes: [],

			dependencies: {
				libs: ["sap.m"],
				components: []
			},
			config: {},
			customizing: {
				"sap.ui.controllerExtensions": {
					"sap.ovp.cards.generic.Card": {
						controllerName: "gisa.mss.MSSOnePage.MSSOnePageOview.ext.bdayCard.bdayCard"
					}
				}
			}
		}
	});
})();