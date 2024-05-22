(function () {
	"use strict";
	let JSONModel = sap.ui.require("sap/ui/model/json/JSONModel");
	let FlattenedDataset = sap.ui.require("sap/viz/ui5/data/FlattenedDataset");
	/* controller for custom card  */

	sap.ui.controller("gisa.mss.MSSOnePage.MSSOnePageOview.ext.holidayCard.holidayCard", {
		_oResourceBundle: null,
		_aQuotaTypes: [],
		_oChartData: {},
		_vizProperties: {
			title: {
				visible: false
			},
			plotArea: {},

			valueAxis: {
				title: {
					visible: true,
					text: ""
				}
			},
			categoryAxis: {
				title: {
					visible: true,
					text: ""
				}
			}
		},

		onInit: function () {
			let oSettingsModel = sap.ui.getCore().byId("mainView").getModel("settingsModel");

			let oView = this.getView();
			oView.setModel(oSettingsModel, "settingsModel");
			
			let oManagerModel = sap.ui.getCore().byId("mainView").getModel("managerModel");
			oView.setModel(oManagerModel,"managerModel");
		},

		_buildChartData: function () {
			let oModel = this.getOwnerComponent().getModel("oviewModel");
			if (oModel) {
				oModel.read("/EmployeeTimeHolidayDataSet", {
					sorters: [					
					  new sap.ui.model.Sorter("LeaveRestTotal", true)
					],
					success: function (oData) {
						//build chart dataset
						this._aQuotaTypes = Array.from(new Set(oData.results.map((element) => element.Quotatext)));

						let oHoliday = {};
						for (let oItem of oData.results) {
							if (!oHoliday[oItem.EmployeeNumber]) {
								oHoliday[oItem.EmployeeNumber] = {
									EmployeeNumber: oItem.EmployeeNumber,
									FormattedName: oItem.FormattedName,
									EmployeeOrgunitId: oItem.EmployeeOrgunitId
								};
							}
							oHoliday[oItem.EmployeeNumber][oItem.Quotatext] = oItem.LeaveRest;
						}
						this._oChartData = {
							EmployeeHolidayDataSet: []
						};
						for (let key in oHoliday) {
							if (oHoliday.hasOwnProperty(key)) {
								this._oChartData.EmployeeHolidayDataSet.push(oHoliday[key]);
							}
						}
						//build chart configset
						this._setHolidayChartModel();
					}.bind(this)
				});
			}
		},

		_setHolidayChartModel: function () {
			let oView = this.getView();
			let oHolidayChartModel = new JSONModel();
			oHolidayChartModel.setData(this._oChartData);
			oView.setModel(oHolidayChartModel);

			let oVizFrame = this.oVizFrame = this.getView().byId("holidayChart");

			this._getResourceBundle();

			let sXAxis = "";
			let sYAxis = "";

			if (this._getResourceBundle) {
				sXAxis = this._oResourceBundle.getText("holidayChartXAxis");
				sYAxis = this._oResourceBundle.getText("holidayChartYAxis");
			}

			this._vizProperties.valueAxis.title.text = sYAxis;
			this._vizProperties.categoryAxis.title.text = sXAxis;

			oVizFrame.setVizProperties(this._vizProperties);

			oVizFrame.destroyFeeds();
			oVizFrame.destroyDataset();

			let aMeasures = [];

			for (let key in this._aQuotaTypes) {
				aMeasures.push({
					name: this._aQuotaTypes[key],
					value: "{" + this._aQuotaTypes[key] + "}"
				});
			}

			let oChartSet = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					axis: 2,
					name: "EmployeeNumber",
					value: "#{= parseFloat(${EmployeeNumber}) }"
				}, {
					axis: 2,
					name: "FormattedName",
					value: "{FormattedName}"
				}],
				measures: aMeasures,
				data: {
					path: "/EmployeeHolidayDataSet"
				}
			});

			oVizFrame.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "categoryAxis",
				type: "Dimension",
				values: ["EmployeeNumber"]
			}));

			oVizFrame.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "categoryAxis",
				type: "Dimension",
				values: ["FormattedName"]
			}));

			oVizFrame.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "valueAxis",
				type: "Measure",
				values: this._aQuotaTypes
			}));

			oVizFrame.setDataset(oChartSet);
		},

		_getResourceBundle: function () {
			this._oResourceBundle = new sap.ui.model.resource.ResourceModel({
				bundleUrl: jQuery.sap.getModulePath("gisa.mss.MSSOnePage.MSSOnePageOview", "/i18n/i18n.properties")
			}).getResourceBundle();
		},

		onCardHeaderLinkClick: function () {
			let sManagerNumber = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let sNavLink = "Employee-launchReports?ScenarioId=Z_MSS_REP&/reportResult/" + sManagerNumber + "/true/RPTQTA10/Abwesenheitskontingente/false";

			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: sNavLink
				}
			});
		},

		onSelectData: function (oEvent) {
			let sManagerNumber = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let sNavLink = "Employee-launchReports?ScenarioId=Z_MSS_REP&/reportResult/" + sManagerNumber + "/true/RPTQTA10/Abwesenheitskontingente/false";

			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: sNavLink
				}
			});
		},

		onDraw: function (oEvent) {
			let oContainer = sap.ui.getCore().byId("card02Original--ovpCardContentContainer");
			if (oContainer) {
				oContainer.addStyleClass("sapUiTinyMargin");
			}
		},

		onAfterRendering: function () {
			this._buildChartData();
		},

		onExit: function () {

		}
	});
})();