(function () {
	"use strict";
	let e = sap.ui.require("sap/ui/model/json/JSONModel");
	let t = sap.ui.require("sap/viz/ui5/data/FlattenedDataset");
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
			let e = sap.ui.getCore().byId("mainView").getModel("settingsModel");
			let t = this.getView();
			t.setModel(e, "settingsModel");
			let a = sap.ui.getCore().byId("mainView").getModel("managerModel");
			t.setModel(a, "managerModel")
		},
		_buildChartData: function () {
			let e = this.getOwnerComponent().getModel("oviewModel");
			if (e) {
				e.read("/EmployeeTimeHolidayDataSet", {
					sorters: [new sap.ui.model.Sorter("LeaveRestTotal", true)],
					success: function (e) {
						this._aQuotaTypes = Array.from(new Set(e.results.map(e => e.Quotatext)));
						let t = {};
						for (let a of e.results) {
							if (!t[a.EmployeeNumber]) {
								t[a.EmployeeNumber] = {
									EmployeeNumber: a.EmployeeNumber,
									FormattedName: a.FormattedName,
									EmployeeOrgunitId: a.EmployeeOrgunitId
								}
							}
							t[a.EmployeeNumber][a.Quotatext] = a.LeaveRest
						}
						this._oChartData = {
							EmployeeHolidayDataSet: []
						};
						for (let e in t) {
							if (t.hasOwnProperty(e)) {
								this._oChartData.EmployeeHolidayDataSet.push(t[e])
							}
						}
						this._setHolidayChartModel()
					}.bind(this)
				})
			}
		},
		_setHolidayChartModel: function () {
			let t = this.getView();
			let a = new e;
			a.setData(this._oChartData);
			t.setModel(a);
			let i = this.oVizFrame = this.getView().byId("holidayChart");
			this._getResourceBundle();
			let o = "";
			let s = "";
			if (this._getResourceBundle) {
				o = this._oResourceBundle.getText("holidayChartXAxis");
				s = this._oResourceBundle.getText("holidayChartYAxis")
			}
			this._vizProperties.valueAxis.title.text = s;
			this._vizProperties.categoryAxis.title.text = o;
			i.setVizProperties(this._vizProperties);
			i.destroyFeeds();
			i.destroyDataset();
			let l = [];
			for (let e in this._aQuotaTypes) {
				l.push({
					name: this._aQuotaTypes[e],
					value: "{" + this._aQuotaTypes[e] + "}"
				})
			}
			let r = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					axis: 2,
					name: "EmployeeNumber",
					value: "#{= parseFloat(${EmployeeNumber}) }"
				}, {
					axis: 2,
					name: "FormattedName",
					value: "{FormattedName}"
				}],
				measures: l,
				data: {
					path: "/EmployeeHolidayDataSet"
				}
			});
			i.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "categoryAxis",
				type: "Dimension",
				values: ["EmployeeNumber"]
			}));
			i.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "categoryAxis",
				type: "Dimension",
				values: ["FormattedName"]
			}));
			i.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "valueAxis",
				type: "Measure",
				values: this._aQuotaTypes
			}));
			i.setDataset(r)
		},
		_getResourceBundle: function () {
			this._oResourceBundle = new sap.ui.model.resource.ResourceModel({
				bundleUrl: jQuery.sap.getModulePath("gisa.mss.MSSOnePage.MSSOnePageOview", "/i18n/i18n.properties")
			}).getResourceBundle()
		},
		onCardHeaderLinkClick: function () {
			let e = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let t = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + e + "/true/ZGET_EMPLOYEE_TIMEDATA/Urlaub%20und%20GLZ/false";
			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: t
				}
			})
		},
		onSelectData: function (e) {
			let t = this.getView().getModel("managerModel").getProperty("/EmployeeNumber");
			let a = "Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/" + t + "/true/ZGET_EMPLOYEE_TIMEDATA/Urlaub%20und%20GLZ/false";
			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					shellHash: a
				}
			})
		},
		onDraw: function (e) {
			let t = sap.ui.getCore().byId("card02Original--ovpCardContentContainer");
			if (t) {
				t.addStyleClass("sapUiTinyMargin")
			}
		},
		onAfterRendering: function () {
			this._buildChartData()
		},
		onExit: function () {}
	})
})();