(function () {
	"use strict";
	jQuery.sap.require("gisa.mss.MSSOnePage.MSSOnePageOview.util.formatter");
	/* controller for custom card  */

	sap.ui.controller("gisa.mss.MSSOnePage.MSSOnePageOview.ext.overtimeCard.overtimeCard", {

		onInit: function () {
			this.c_criticalLabel = "criticalityOverTime";
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

		calculateCriticality: function (oItem) {
			let oModel = this.getOwnerComponent().getModel("oviewModel");
			if (!oModel) return;
			
			let oSettingsModel = this.getOwnerComponent().getModel("settingsModel");
			if (!oSettingsModel) return;
			
			let iCriticalityHigh = parseInt(oSettingsModel.getProperty("/OVERTIME_CRITICALITY_HIGH"));
			let iCriticalityMedium = parseInt(oSettingsModel.getProperty("/OVERTIME_CRITICALITY_MEDIUM"));
			let iCriticalityLow = parseInt(oSettingsModel.getProperty("/OVERTIME_CRITICALITY_LOW"));

			oModel.read("/EmployeeTimeDataSet", {
				filters: [
					new sap.ui.model.Filter({
						path: "Quotatype",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: "01"
					})
				],
				success: function (oData) {
					let sum = 0;
					for (let element in oData.results) {
						sum = sum + parseFloat(oData.results[element].Overtime);
					}
					sum = sum / oData.results.length;

					let roundedValue = (Math.round(sum * 100) / 100);

					oItem.setText(roundedValue.toFixed(2).toString());
					if (sum >= iCriticalityHigh || sum <= -iCriticalityHigh) {
						oItem.addStyleClass("Error");
					} else if (sum >= iCriticalityMedium || sum <= -iCriticalityMedium) {
						oItem.addStyleClass("Critical");
					} else {
						oItem.addStyleClass("Good");
					}
				}
			});
		},

		onDraw: function (oEvent) {
			let oContainer = sap.ui.getCore().byId("card04Original--ovpCardContentContainer");
			if (oContainer) {
				oContainer.addStyleClass("sapUiTinyMargin");
			}

			let oItem = oEvent.getSource();
			if (oItem.getId().search(this.c_criticalLabel)) {
				this.calculateCriticality(oItem);
			}
		},

		onCardLinkClick: function (oEvent) {
			let sManagerNumber = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let sNavLink = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + sManagerNumber + "/true/RPTBAL00_EW/Mehrarbeitsliste";

			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: sNavLink
				}
			});
		},

		onCardHeaderLinkClick: function () {
			let sManagerNumber = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let sNavLink = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + sManagerNumber + "/true/RPTBAL00_EW/Mehrarbeitsliste";

			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: sNavLink
				}
			});
		}
	});
})();