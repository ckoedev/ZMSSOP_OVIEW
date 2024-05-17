(function () {
	"use strict";
	jQuery.sap.require("gisa.mss.MSSOnePage.MSSOnePageOview.util.formatter");
	/* controller for custom card  */

	sap.ui.controller("gisa.mss.MSSOnePage.MSSOnePageOview.ext.tvioCard.tvioCard", {

		onInit: function () {
			let oSettingsModel = sap.ui.getCore().byId("mainView").getModel("settingsModel");

			let oView = this.getView();
			oView.setModel(oSettingsModel, "settingsModel");

			let oManagerModel = sap.ui.getCore().byId("mainView").getModel("managerModel");
			oView.setModel(oManagerModel, "managerModel");
		},

		onAfterRendering: function () {

		},

		onExit: function () {

		},

		onDraw: function (oEvent) {
			let oContainer = sap.ui.getCore().byId("card05Original--ovpCardContentContainer");
			if (oContainer) {
				oContainer.addStyleClass("sapUiTinyMargin");
			}
		},

		onCardLinkClick: function (oEvent) {
			let sManagerNumber = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let sNavLink = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + sManagerNumber +
				"/true/RPTBAL00_10H/Tagesarbeitszeit > 10h";

			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: sNavLink
				}
			});
		},

		onCardHeaderLinkClick: function () {
			let sManagerNumber = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let sNavLink = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + sManagerNumber +
				"/true/RPTBAL00_10H/Tagesarbeitszeit > 10h";

			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: sNavLink
				}
			});
		}
	});
})();