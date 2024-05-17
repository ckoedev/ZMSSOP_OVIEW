(function () {
	"use strict";
	jQuery.sap.require("gisa.mss.MSSOnePage.MSSOnePageOview.util.formatter");
	/* controller for custom card  */

	sap.ui.controller("gisa.mss.MSSOnePage.MSSOnePageOview.ext.bdayCard.bdayCard", {
		
		onInit: function () {
			this.c_bdayUnitHeaderLabel = "bdayUnitHeader";

			let oView = this.getView();

			let oHelperData = {
				headerImg: "",
				orgUnits: []
			};

			oHelperData.headerImg = jQuery.sap.getModulePath("gisa.mss.MSSOnePage.MSSOnePageOview") + "/img/bday.png";

			let oModelHelper = new sap.ui.model.json.JSONModel(oHelperData);
			oView.setModel(oModelHelper, "Helper");
			
			let oSettingsModel = sap.ui.getCore().byId("mainView").getModel("settingsModel");
			oView.setModel(oSettingsModel,"settingsModel");
			
			let oManagerModel = sap.ui.getCore().byId("mainView").getModel("managerModel");
			oView.setModel(oManagerModel,"managerModel");
		},
		
		_buildOrgunitTexts: function(){
			let oModel = this.getOwnerComponent().getModel("oviewModel");
			if (oModel) {
				let aUnitKeys = [];
				let aOrgUnits = [];
				oModel.read("/EmployeeMasterDataSet", {
					success: function (oData) {
						for(let nItem in oData.results){
							if(aUnitKeys.indexOf(oData.results[nItem].EmployeeOrgunitLongtext)==-1){
								let oUnit = {
									EmployeeOrgunitId: oData.results[nItem].EmployeeOrgunitId,
									EmployeeOrgunitLongtext: oData.results[nItem].EmployeeOrgunitLongtext
								};
								aUnitKeys.push(oData.results[nItem].EmployeeOrgunitLongtext);
								aOrgUnits.push(oUnit);
							}
						}
						
						let oModelHelper = sap.ui.getCore().byId("card00Original").getModel("Helper");
						if(oModelHelper){
							oModelHelper.setProperty("/orgUnits",aOrgUnits);
						}
					}
				});
			}
		},

		onDraw: function (oEvent) {
			let oContainer = sap.ui.getCore().byId("card00Original--ovpCardContentContainer");
			if (oContainer) {
				oContainer.addStyleClass("sapUiTinyMargin");
			}
			
			let oItem = oEvent.getSource();
			if (oItem.getId().search(this.c_bdayUnitHeaderLabel)) {
				this._buildOrgunitTexts();
			}
		},

		onAfterRendering: function () {
			
		},

		onExit: function () {

		},

		onCardHeaderLinkClick: function (oEvent) {
			let sManagerNumber = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let sNavLink = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + sManagerNumber + "/true/BIRTHDAYLIST_CUSTOM/Geburtstage";

			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: sNavLink
				}
			});
		},

		onCardLinkClick: function (oEvent) {
			let sManagerNumber = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let sEmployeeNumber = oEvent.getSource().getBindingContext().getProperty("EmployeeNumber");
			let sNavLink = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + sManagerNumber + "/true/BIRTHDAYLIST_CUSTOM/Geburtstage";

			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: sNavLink
				}
			});
		}
	});
})();