sap.ui.define(["sap/ovp/cards/custom/Component"], function (Component) {
	"use strict";

	/* component for custom card */
	return Component.extend("gisa.mss.MSSOnePage.MSSOnePageOview.ext.genderChart.Component", {
		// use inline declaration instead of component.json to save 1 round trip
		metadata: {
			properties: {
				"contentFragment": {
					"type": "string",
					"defaultValue": "gisa.mss.MSSOnePage.MSSOnePageOview.ext.genderChart.genderChart"
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
						controllerName: "gisa.mss.MSSOnePage.MSSOnePageOview.ext.genderChart.genderChart"
					}
				}
			}
		}
	});
});