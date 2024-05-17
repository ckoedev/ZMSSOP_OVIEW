(function () {
	"use strict";
	jQuery.sap.require("gisa.mss.MSSOnePage.MSSOnePageOview.util.formatter");
	sap.ui.controller("gisa.mss.MSSOnePage.MSSOnePageOview.ext.bdayCard.bdayCard", {
		onInit: function () {
			this.c_bdayUnitHeaderLabel = "bdayUnitHeader";
			let e = this.getView();
			let t = {
				headerImg: "",
				orgUnits: []
			};
			t.headerImg = jQuery.sap.getModulePath("gisa.mss.MSSOnePage.MSSOnePageOview") + "/img/bday.png";
			let i = new sap.ui.model.json.JSONModel(t);
			e.setModel(i, "Helper");
			let n = sap.ui.getCore().byId("mainView").getModel("settingsModel");
			e.setModel(n, "settingsModel");
			let r = sap.ui.getCore().byId("mainView").getModel("managerModel");
			e.setModel(r, "managerModel")
		},
		_buildOrgunitTexts: function () {
			let e = this.getOwnerComponent().getModel("oviewModel");
			if (e) {
				let t = [];
				let i = [];
				e.read("/EmployeeMasterDataSet", {
					success: function (e) {
						for (let n in e.results) {
							if (t.indexOf(e.results[n].EmployeeOrgunitLongtext) == -1) {
								let r = {
									EmployeeOrgunitId: e.results[n].EmployeeOrgunitId,
									EmployeeOrgunitLongtext: e.results[n].EmployeeOrgunitLongtext
								};
								t.push(e.results[n].EmployeeOrgunitLongtext);
								i.push(r)
							}
						}
						let n = sap.ui.getCore().byId("card00Original").getModel("Helper");
						if (n) {
							n.setProperty("/orgUnits", i)
						}
					}
				})
			}
		},
		onDraw: function (e) {
			let t = sap.ui.getCore().byId("card00Original--ovpCardContentContainer");
			if (t) {
				t.addStyleClass("sapUiTinyMargin")
			}
			let i = e.getSource();
			if (i.getId().search(this.c_bdayUnitHeaderLabel)) {
				this._buildOrgunitTexts()
			}
		},
		onAfterRendering: function () {},
		onExit: function () {},
		onCardHeaderLinkClick: function (e) {
			let t = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let i = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + t + "/true/BIRTHDAYLIST_CUSTOM/Geburtstage/false";
			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: i
				}
			})
		},
		onCardLinkClick: function (e) {
			let t = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let i = e.getSource().getBindingContext().getProperty("EmployeeNumber");
			let n = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + t + "/true/BIRTHDAYLIST_CUSTOM/Geburtstage/false";
			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: n
				}
			})
		}
	})
})();