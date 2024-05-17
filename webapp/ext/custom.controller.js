sap.ui.define(["sap/ui/model/Filter", "sap/m/MessageToast", "sap/ui/model/json/JSONModel"], function (e, t, i) {
	"use strict";
	return sap.ui.controller("gisa.mss.MSSOnePage.MSSOnePageOview.ext.custom", {
		_settings: {
			BDAY_CARD_VISIBLE: true,
			GENDER_CARD_VISIBLE: false,
			HOLIDAY_CARD_VISIBLE: true,
			FLEXTIME_CARD_VISIBLE: true,
			OVERTIME_CARD_VISIBLE: true,
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
		_manager: {},
		onInit: function () {
			this.byId("ovpGlobalFilter-btnGo").attachPress(this.onSearchPress);
			let e = this.getOwnerComponent();
			if (e) {
				let t = e.getModel("oviewModel");
				t.read("/SettingSet", {
					success: function (e) {
						for (let t of e.results) {
							this._settings[t.Keyname.toUpperCase()] = t.Keyvalue1
						}
						this._setConfiguration()
					}.bind(this)
				});
				t.read("/EmployeeMasterDataSet('')", {
					success: function (e) {
						this._manager = e;
						this._setManager()
					}.bind(this)
				})
			}
		},
		_setConfiguration: function () {
			let e = sap.ui.getCore().byId("mainView");
			let t = new i(this._settings);
			e.setModel(t, "settingsModel")
		},
		_hideCards: function () {
			let e = this.getView().getModel("settingsModel");
			let t = true;
			t = JSON.parse(e.getProperty("/BDAY_CARD_VISIBLE"));
			if (t === false) {
				sap.ui.getCore().byId("mainView--card00").setVisible(false)
			}
			t = JSON.parse(e.getProperty("/HOLIDAY_CARD_VISIBLE"));
			if (t === false) {
				sap.ui.getCore().byId("mainView--card02").setVisible(false)
			}
			t = JSON.parse(e.getProperty("/FLEXTIME_CARD_VISIBLE"));
			if (t === false) {
				sap.ui.getCore().byId("mainView--card03").setVisible(false)
			}
			t = JSON.parse(e.getProperty("/OVERTIME_CARD_VISIBLE"));
			if (t === false) {
				sap.ui.getCore().byId("mainView--card04").setVisible(false)
			}
		},
		_setManager: function () {
			let e = sap.ui.getCore().byId("mainView");
			let t = new i(this._manager);
			e.setModel(t, "managerModel")
		},
		onCustomActionPress: function (e) {
			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					semanticObject: "ZRep",
					action: "empl_overview"
				}
			})
		},
		onCustomParams: function (e) {},
		handleCustomAction: function () {},
		_onFilterChange: function (e) {
			this.onSearchPress()
		},
		onAfterRendering: function () {},
		onSearchPress: function (e) {
			let t = sap.ui.getCore().byId("mainView").getController();
			if (!t) return;
			let i = sap.ui.getCore().byId("mainView--ovpGlobalFilter");
			if (!i) return;
			let r = t._buildFilters(i);
			t._filterBdayCard(r);
			t._filterHolidayCard(r);
			t._filterFlexTimeCard(r);
			t._filterOverTimeCard(r);
			t._filterTimeViolationCard(r)
		},
		_buildFilters: function (e) {
			let t = [];
			let i = e.getFilterData();
			let r = e.getFilters();
			if (i.EmployeeNumber) {
				for (let e in i.EmployeeNumber.ranges) {
					t.push(new sap.ui.model.Filter(i.EmployeeNumber.ranges[e].keyField, i.EmployeeNumber.ranges[e].operation, i.EmployeeNumber.ranges[
						e].value1))
				}
				for (let e in i.EmployeeNumber.items) {
					t.push(new sap.ui.model.Filter("EmployeeNumber", sap.ui.model.FilterOperator.EQ, i.EmployeeNumber.items[e].key))
				}
			}
			if (i.EmployeeOrgunitId) {
				for (let e in i.EmployeeOrgunitId.ranges) {
					t.push(new sap.ui.model.Filter(i.EmployeeOrgunitId.ranges[e].keyField, i.EmployeeOrgunitId.ranges[e].operation, i.EmployeeOrgunitId
						.ranges[e].value1))
				}
				for (let e in i.EmployeeOrgunitId.items) {
					t.push(new sap.ui.model.Filter("EmployeeOrgunitId", sap.ui.model.FilterOperator.EQ, i.EmployeeOrgunitId.items[e].key))
				}
			}
			return t
		},
		_filterBdayCard: function (e) {
			let t = sap.ui.getCore().byId("card00Original");
			if (!t) return;
			let i = t.byId("bdayList");
			if (!i) return;
			let r = i.getBinding("items");
			if (!r) return;
			r.filter(e);
			let n = t.byId("orgUnitsToolbar");
			if (!n) return;
			let a = n.getBinding("items");
			if (!a) return;
			a.filter(e)
		},
		_filterHolidayCard: function (e) {
			let t = sap.ui.getCore().byId("card01Original");
			if (!t) return;
			let i = t.byId("holidayChart");
			if (!i) return;
			let r = i.getDataset().getBinding("data");
			if (!r) return;
			r.filter(e)
		},
		_filterFlexTimeCard: function (e) {
			let t = sap.ui.getCore().byId("card02Original");
			if (!t) return;
			let i = t.byId("flextimeList");
			if (!i) return;
			let r = i.getBinding("items");
			if (!r) return;
			r.filter(e)
		},
		_filterOverTimeCard: function (e) {
			let t = sap.ui.getCore().byId("card03Original");
			if (!t) return;
			let i = t.byId("overtimeList");
			if (!i) return;
			let r = i.getBinding("items");
			if (!r) return;
			r.filter(e)
		},
		_filterTimeViolationCard: function (e) {
			let t = sap.ui.getCore().byId("card04Original");
			if (!t) return;
			let i = t.byId("tvioList");
			if (!i) return;
			let r = i.getBinding("items");
			if (!r) return;
			r.filter(e)
		}
	})
});