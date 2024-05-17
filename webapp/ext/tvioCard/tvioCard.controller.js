(function () {
	"use strict";
	jQuery.sap.require("gisa.mss.MSSOnePage.MSSOnePageOview.util.formatter");
	sap.ui.controller("gisa.mss.MSSOnePage.MSSOnePageOview.ext.tvioCard.tvioCard", {
		onInit: function () {
			let e = sap.ui.getCore().byId("mainView").getModel("settingsModel");
			let t = this.getView();
			t.setModel(e, "settingsModel");
			let i = sap.ui.getCore().byId("mainView").getModel("managerModel");
			t.setModel(i, "managerModel")
		},
		onAfterRendering: function () {},
		onExit: function () {},
		onDraw: function (e) {
			let t = sap.ui.getCore().byId("card05Original--ovpCardContentContainer");
			if (t) {
				t.addStyleClass("sapUiTinyMargin")
			}
		},
		onCardLinkClick: function (e) {
			let t = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let i = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + t + "/true/RPTBAL00_10H/Tagesarbeitszeit > 10h/false";
			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: i
				}
			})
		},
		onCardHeaderLinkClick: function () {
			let e = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let t = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + e + "/true/RPTBAL00_10H/Tagesarbeitszeit > 10h/false";
			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: t
				}
			})
		}
	})
})();