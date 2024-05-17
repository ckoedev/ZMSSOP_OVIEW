sap.ui.define([
	"sap/ui/model/Filter",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Filter, MessageToast, JSONModel) {
	"use strict";

	// controller for custom filter, navigation param, action(quick view and global filter), navigation target 
	return sap.ui.controller("gisa.mss.MSSOnePage.MSSOnePageOview.ext.custom", {
		_settings: {
			BDAY_CARD_VISIBLE : true,
			GENDER_CARD_VISIBLE : false,
			HOLIDAY_CARD_VISIBLE : true,
			FLEXTIME_CARD_VISIBLE : true,
			OVERTIME_CARD_VISIBLE : true,
			FLEXTIME_CRITICALITY_HIGH: 30,
			FLEXTIME_CRITICALITY_MEDIUM: 10,
			FLEXTIME_CRITICALITY_LOW: 0,
			OVERTIME_CRITICALITY_HIGH: 30,
			OVERTIME_CRITICALITY_MEDIUM: 10,
			OVERTIME_CRITICALITY_LOW: 0,
			TIMEVIOLATION_CRITICALITY_HIGH: 5,
			TIMEVIOLATION_CRITICALITY_MEDIUM: 1,
			TIMEVIOLATION_CRITICALITY_LOW: 0
		},
		
		_manager:{
			
		},
		
		onInit: function(){
			this.byId("ovpGlobalFilter-btnGo").attachPress(this.onSearchPress);
			//TEST BEGIN
			// let oContent = this.getLayout().getContent();
			
			// let oDashboard = this.getLayout().getDashboardLayoutUtil();
			// if(oDashboard){
			// 	let aCards = oDashboard.getCards();
			// 	let oLayout = oDashboard.getLayout();
				
			// 	oDashboard.setLayout(oLayout);
			// }
			
			//TEST END
			let oParent = this.getOwnerComponent();
			if(oParent){
				let oModel = oParent.getModel("oviewModel");
				oModel.read("/SettingSet", {
					success: function (oData) {
						for(let oItem of oData.results){
							this._settings[oItem.Keyname.toUpperCase()] = oItem.Keyvalue1;
						}
						this._setConfiguration();
					}.bind(this)
				});
				
				
				oModel.read("/EmployeeMasterDataSet('')", {
					success: function (oData) {
						this._manager = oData;
						this._setManager();
					}.bind(this)
				});
			}
		},
		
		_setConfiguration: function(){
			let oView = sap.ui.getCore().byId("mainView");
			let oSettingsModel = new JSONModel(this._settings);
			oView.setModel(oSettingsModel,"settingsModel");
			
			//this._hideCards();
		},
		
		_hideCards: function(){
			let oModel = this.getView().getModel("settingsModel");
			let bIsVisible = true;
			
			//Birthday Card
			bIsVisible = JSON.parse(oModel.getProperty("/BDAY_CARD_VISIBLE"));
			if(bIsVisible === false){
				sap.ui.getCore().byId("mainView--card00").setVisible(false);
			}
			
			//Holiday Card
			bIsVisible = JSON.parse(oModel.getProperty("/HOLIDAY_CARD_VISIBLE"));
			if(bIsVisible === false){
				sap.ui.getCore().byId("mainView--card02").setVisible(false);
			}
			
			//Flextime Card
			bIsVisible = JSON.parse(oModel.getProperty("/FLEXTIME_CARD_VISIBLE"));
			if(bIsVisible === false){
				sap.ui.getCore().byId("mainView--card03").setVisible(false);
			}
			
			//Overtime Card
			bIsVisible = JSON.parse(oModel.getProperty("/OVERTIME_CARD_VISIBLE"));
			if(bIsVisible === false){
				sap.ui.getCore().byId("mainView--card04").setVisible(false);
			}
		},
		
		_setManager: function(){
			let oView = sap.ui.getCore().byId("mainView");
			let oManagerModel = new JSONModel(this._manager);
			oView.setModel(oManagerModel,"managerModel");
		},
		
		onCustomActionPress: function (sCustomAction) {
			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					semanticObject: "ZRep",
					action: "empl_overview"
				}});
		},

		onCustomParams: function (sCustomParams) {

		},

		handleCustomAction: function () {

		},
		
		_onFilterChange: function(e){
			this.onSearchPress();
		},
		
		onAfterRendering: function(){
	
		},

		onSearchPress: function(e){
			
			let oController = sap.ui.getCore().byId("mainView").getController();
			if(!oController)return;
			
			let oSmartFilterBar = sap.ui.getCore().byId("mainView--ovpGlobalFilter");
			if(!oSmartFilterBar)return;
			
			let oFilters = oController._buildFilters(oSmartFilterBar);
			oController._filterBdayCard(oFilters);
			oController._filterHolidayCard(oFilters);
			oController._filterFlexTimeCard(oFilters);
			oController._filterOverTimeCard(oFilters);
			oController._filterTimeViolationCard(oFilters);
		},
		
		_buildFilters: function(oSmartFilterBar){
			let oFilters = [];
			let aFilters = oSmartFilterBar.getFilterData();
			let aFilterData = oSmartFilterBar.getFilters();
			
			if(aFilters.EmployeeNumber){
				for(let nFilterItem in aFilters.EmployeeNumber.ranges){
					oFilters.push(new sap.ui.model.Filter(aFilters.EmployeeNumber.ranges[nFilterItem].keyField, aFilters.EmployeeNumber.ranges[nFilterItem].operation, aFilters.EmployeeNumber.ranges[nFilterItem].value1));
				}
				for(let nFilterItem in aFilters.EmployeeNumber.items){
					oFilters.push(new sap.ui.model.Filter("EmployeeNumber", sap.ui.model.FilterOperator.EQ, aFilters.EmployeeNumber.items[nFilterItem].key));
				}
			}
			
			if(aFilters.EmployeeOrgunitId){
				for(let nFilterItem in aFilters.EmployeeOrgunitId.ranges){
					oFilters.push(new sap.ui.model.Filter(aFilters.EmployeeOrgunitId.ranges[nFilterItem].keyField, aFilters.EmployeeOrgunitId.ranges[nFilterItem].operation, aFilters.EmployeeOrgunitId.ranges[nFilterItem].value1));
				}
				for(let nFilterItem in aFilters.EmployeeOrgunitId.items){
					oFilters.push(new sap.ui.model.Filter("EmployeeOrgunitId", sap.ui.model.FilterOperator.EQ, aFilters.EmployeeOrgunitId.items[nFilterItem].key));
				}
			}
			
			return oFilters;
		},
		
		_filterBdayCard: function(oFilters){
			let oBdayCard = sap.ui.getCore().byId("card00Original");
			if(!oBdayCard)return;
			let oBdayList = oBdayCard.byId("bdayList");
			if(!oBdayList)return;
			let oBdayBinding = oBdayList.getBinding("items");
			if(!oBdayBinding)return;
			oBdayBinding.filter(oFilters);
			
			let oBdayToolBar = oBdayCard.byId("orgUnitsToolbar");
			if(!oBdayToolBar)return;
			let oBdayBindingToolBar = oBdayToolBar.getBinding("items");
			if(!oBdayBindingToolBar)return;
			oBdayBindingToolBar.filter(oFilters);
		},
		
		_filterHolidayCard: function(oFilters){
			let oHolidayCard = sap.ui.getCore().byId("card01Original");
			if(!oHolidayCard)return;
			let oHolidayChart = oHolidayCard.byId("holidayChart");
			if(!oHolidayChart)return;
			let oHolidayBinding = oHolidayChart.getDataset().getBinding("data");
			if(!oHolidayBinding)return;
			
			oHolidayBinding.filter(oFilters);
		},
		
		_filterFlexTimeCard: function(oFilters){
			let oFlexTimeCard = sap.ui.getCore().byId("card02Original");
			if(!oFlexTimeCard)return;
			let oFlexTimeList = oFlexTimeCard.byId("flextimeList");
			if(!oFlexTimeList)return;
			let oFlexTimeBinding = oFlexTimeList.getBinding("items");
			if(!oFlexTimeBinding)return;
			oFlexTimeBinding.filter(oFilters);
		},
		
		_filterOverTimeCard: function(oFilters){
			let oOverTimeCard = sap.ui.getCore().byId("card03Original");
			if(!oOverTimeCard)return;
			let oOverTimeList = oOverTimeCard.byId("overtimeList");
			if(!oOverTimeList)return;
			let oOverTimeBinding = oOverTimeList.getBinding("items");
			if(!oOverTimeBinding)return;
			oOverTimeBinding.filter(oFilters);
		},
		
		_filterTimeViolationCard: function(oFilters){
			let oTimeViolationCard = sap.ui.getCore().byId("card04Original");
			if(!oTimeViolationCard)return;
			let oTimeViolationList = oTimeViolationCard.byId("tvioList");
			if(!oTimeViolationList)return;
			let oTimeViolationBinding = oTimeViolationList.getBinding("items");
			if(!oTimeViolationBinding)return;
			oTimeViolationBinding.filter(oFilters);
		}
	});
});