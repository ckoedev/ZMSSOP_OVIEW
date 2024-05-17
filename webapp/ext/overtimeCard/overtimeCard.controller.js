(function () {
	"use strict";
	jQuery.sap.require("gisa.mss.MSSOnePage.MSSOnePageOview.util.formatter");
	sap.ui.controller("gisa.mss.MSSOnePage.MSSOnePageOview.ext.overtimeCard.overtimeCard", {
		onInit: function () {
			this.c_criticalLabel = "criticalityOverTime";
			let e = sap.ui.getCore().byId("mainView").getModel("settingsModel");
			let t = this.getView();
			t.setModel(e, "settingsModel");
			let i = sap.ui.getCore().byId("mainView").getModel("managerModel");
			t.setModel(i, "managerModel")
		},
		onAfterRendering: function () {},
		onExit: function () {},
		calculateCriticality: function (e) {
			let t = this.getOwnerComponent().getModel("oviewModel");
			if (!t) return;
			let i = this.getOwnerComponent().getModel("settingsModel");
			if (!i) return;
			let r = parseInt(i.getProperty("/OVERTIME_CRITICALITY_HIGH"));
			let l = parseInt(i.getProperty("/OVERTIME_CRITICALITY_MEDIUM"));
			let a = parseInt(i.getProperty("/OVERTIME_CRITICALITY_LOW"));
			t.read("/EmployeeTimeDataSet", {
				filters: [new sap.ui.model.Filter({
					path: "Quotatype",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: "01"
				})],
				success: function (t) {
					let i = 0;
					for (let e in t.results) {
						i = i + parseFloat(t.results[e].Overtime)
					}
					i = i / t.results.length;
					let a = Math.round(i * 100) / 100;
					e.setText(a.toFixed(2).toString());
					if (i >= r || i <= -r) {
						e.addStyleClass("Error")
					} else if (i >= l || i <= -l) {
						e.addStyleClass("Critical")
					} else {
						e.addStyleClass("Good")
					}
				}
			})
		},
		onDraw: function (e) {
			let t = sap.ui.getCore().byId("card04Original--ovpCardContentContainer");
			if (t) {
				t.addStyleClass("sapUiTinyMargin")
			}
			let i = e.getSource();
			if (i.getId().search(this.c_criticalLabel)) {
				this.calculateCriticality(i)
			}
		},
		onCardLinkClick: function (e) {
			let t = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let i = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + t + "/true/RPTBAL00_EW/Mehrarbeitsliste/false";
			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: i
				}
			})
		},
		onCardHeaderLinkClick: function () {
			let e = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let t = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + e + "/true/RPTBAL00_EW/Mehrarbeitsliste/false";
			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: t
				}
			})
		}
	})
})();