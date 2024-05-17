(function () {
	"use strict";

	/* controller for custom card  */

	sap.ui.controller("gisa.mss.MSSOnePage.MSSOnePageOview.ext.genderChart.genderChart", {

		onInit: function () {
			this._buildChart();
			
			let oSettingsModel = sap.ui.getCore().byId("mainView").getModel("settingsModel");
			
			let oView = this.getView();
			oView.setModel(oSettingsModel,"settingsModel");
			
			let oManagerModel = sap.ui.getCore().byId("mainView").getModel("managerModel");
			oView.setModel(oManagerModel,"managerModel");
		},

		_buildChart: function () {
			let oChart = this.byId("genderChart");
			if (!oChart) return;

			oChart.setVizProperties({
				title: {
					visible: false
				},

				plotArea: {
					dataLabel: {
						visible: true
					}
				}
			});
		},

		onCardHeaderLinkClick: function () {
			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					semanticObject: "ZRep",
					action: "empl_overview"
				}
			});
		},
		
		onSelectData: function(oEvent){
			let sGenderTxt = oEvent.getParameter("data")[0].data.GenderTxt;
			if(!sGenderTxt)return;
		},

		onDraw: function(oEvent){
			let oContainer = sap.ui.getCore().byId("card01Original--ovpCardContentContainer");
			if(oContainer){
				oContainer.addStyleClass("sapUiTinyMargin");
			}
		},
		
		onAfterRendering: function () {
			
		},

		onExit: function () {

		}

	});
})();