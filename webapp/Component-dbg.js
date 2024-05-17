(function () {
	"use strict";
	/*global sap, jQuery */

	/**
	 * @fileOverview Application component to display information on entities from the GWSAMPLE_BASIC
	 *   OData service.
	 * @version @version@
	 */
	jQuery.sap.declare("gisa.mss.MSSOnePage.MSSOnePageOview.Component");

	jQuery.sap.require("sap.ovp.app.Component");

	sap.ovp.app.Component.extend("gisa.mss.MSSOnePage.MSSOnePageOview.Component", {
		metadata: {
			manifest: "json"
		}
	});
}());