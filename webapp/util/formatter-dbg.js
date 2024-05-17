jQuery.sap.declare("gisa.mss.MSSOnePage.util.formatter");

gisa.mss.MSSOnePage.util.formatter = {
	bday: function (sValue) {
		let parts = sValue.split('.');

		if (parts.length != 3) return null;

		let day = parseInt(parts[0]),
			mon = parseInt(parts[1]),
			year = parseInt(parts[2]);

		if (parts[2].length == 2) year += 2000;
		if (day <= 31 && mon <= 12) {
			let oDate = new Date(year, mon - 1, day);
			return oDate.toLocaleString('de-de', {
				weekday: 'long'
			}) + ', ' + oDate.toLocaleDateString();
		}
	},

	photo: function (sPhoto) {
		sPhoto = "data:image/jpeg;base64," + sPhoto;
		return sPhoto;
	},

	flextime: function (sValue) {
		let roundedValue = (Math.round(parseFloat(sValue) * 100) / 100);
		return roundedValue;
	},

	formatFlexTimeBarColor: function (sValue) {
		let oModel = sap.ui.getCore().byId("mainView").getModel("settingsModel");
		if(!oModel)return;
		
		let iCriticalityHigh = parseInt(oModel.getProperty("/FLEXTIME_CRITICALITY_HIGH"));
		let iCriticalityMedium = parseInt(oModel.getProperty("/FLEXTIME_CRITICALITY_MEDIUM"));
		let iCriticalityLow = parseInt(oModel.getProperty("/FLEXTIME_CRITICALITY_LOW"));
		
		let roundedValue = (Math.round(parseFloat(sValue) * 100) / 100);
		let absValue = roundedValue.toFixed(2);
		
		if (absValue >= iCriticalityHigh) {
			return "Error";
		} else if (absValue >= iCriticalityMedium) {
			return "Critical";
		} else {
			return "Good";
		}
	},
	
	formatOverTimeBarColor: function (sValue) {
		let oModel = sap.ui.getCore().byId("mainView").getModel("settingsModel");
		if(!oModel)return;
		
		let iCriticalityHigh = parseInt(oModel.getProperty("/OVERTIME_CRITICALITY_HIGH"));
		let iCriticalityMedium = parseInt(oModel.getProperty("/OVERTIME_CRITICALITY_MEDIUM"));
		let iCriticalityLow = parseInt(oModel.getProperty("/OVERTIME_CRITICALITY_LOW"));
		
		let roundedValue = (Math.round(parseFloat(sValue) * 100) / 100);
		let absValue = roundedValue.toFixed(2);
		
		if (absValue >= iCriticalityHigh) {
			return "Error";
		} else if (absValue >= iCriticalityMedium) {
			return "Critical";
		} else {
			return "Good";
		}
	},
	
	formatViolationColor: function (sValue) {
		let oModel = sap.ui.getCore().byId("mainView").getModel("settingsModel");
		if(!oModel)return;
		
		let iCriticalityHigh = parseInt(oModel.getProperty("/TIMEVIOLATION_CRITICALITY_HIGH"));
		let iCriticalityMedium = parseInt(oModel.getProperty("/TIMEVIOLATION_CRITICALITY_MEDIUM"));
		let iCriticalityLow = parseInt(oModel.getProperty("/TIMEVIOLATION_CRITICALITY_LOW"));
		
		if (parseInt(sValue) >= iCriticalityHigh) {
			return "Error";
		} else if (parseInt(sValue) >= iCriticalityMedium) {
			return "Critical";
		} else {
			return "Good";
		}
	},
	
	overtime: function (sValue) {
		let roundedValue = (Math.round(parseFloat(sValue) * 100) / 100);
		return roundedValue;
	}
};