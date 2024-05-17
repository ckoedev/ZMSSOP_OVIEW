sap.ui.require.preload({
	"gisa/mss/MSSOnePage/MSSOnePageOview/ext/overtimeCard/Component-dbg.js": "!function(){\"use strict\";jQuery.sap.declare(\"gisa.mss.MSSOnePage.MSSOnePageOview.ext.overtimeCard.Component\"),jQuery.sap.require(\"sap.ovp.cards.custom.Component\"),sap.ovp.cards.custom.Component.extend(\"gisa.mss.MSSOnePage.MSSOnePageOview.ext.overtimeCard.Component\",{metadata:{properties:{contentFragment:{type:\"string\",defaultValue:\"gisa.mss.MSSOnePage.MSSOnePageOview.ext.overtimeCard.overtimeCard\"},headerFragment:{type:\"string\",defaultValue:\"\"},footerFragment:{type:\"string\",defaultValue:\"\"}},version:\"@version@\",library:\"sap.ovp\",includes:[],dependencies:{libs:[\"sap.m\"],components:[]},config:{},customizing:{\"sap.ui.controllerExtensions\":{\"sap.ovp.cards.generic.Card\":{controllerName:\"gisa.mss.MSSOnePage.MSSOnePageOview.ext.overtimeCard.overtimeCard\"}}}}})}();",
	"gisa/mss/MSSOnePage/MSSOnePageOview/ext/overtimeCard/Component.js": "!function(){\"use strict\";jQuery.sap.declare(\"gisa.mss.MSSOnePage.MSSOnePageOview.ext.overtimeCard.Component\"),jQuery.sap.require(\"sap.ovp.cards.custom.Component\"),sap.ovp.cards.custom.Component.extend(\"gisa.mss.MSSOnePage.MSSOnePageOview.ext.overtimeCard.Component\",{metadata:{properties:{contentFragment:{type:\"string\",defaultValue:\"gisa.mss.MSSOnePage.MSSOnePageOview.ext.overtimeCard.overtimeCard\"},headerFragment:{type:\"string\",defaultValue:\"\"},footerFragment:{type:\"string\",defaultValue:\"\"}},version:\"@version@\",library:\"sap.ovp\",includes:[],dependencies:{libs:[\"sap.m\"],components:[]},config:{},customizing:{\"sap.ui.controllerExtensions\":{\"sap.ovp.cards.generic.Card\":{controllerName:\"gisa.mss.MSSOnePage.MSSOnePageOview.ext.overtimeCard.overtimeCard\"}}}}})}();",
	"gisa/mss/MSSOnePage/MSSOnePageOview/ext/overtimeCard/overtimeCard-dbg.controller.js": "!function(){\"use strict\";jQuery.sap.require(\"gisa.mss.MSSOnePage.MSSOnePageOview.util.formatter\"),sap.ui.controller(\"gisa.mss.MSSOnePage.MSSOnePageOview.ext.overtimeCard.overtimeCard\",{onInit:function(){this.c_criticalLabel=\"criticalityOverTime\";let e=sap.ui.getCore().byId(\"mainView\").getModel(\"settingsModel\"),t=this.getView();t.setModel(e,\"settingsModel\");let r=sap.ui.getCore().byId(\"mainView\").getModel(\"managerModel\");t.setModel(r,\"managerModel\")},onAfterRendering:function(){},onExit:function(){},calculateCriticality:function(e){let t=this.getOwnerComponent().getModel(\"oviewModel\");if(!t)return;let r=this.getOwnerComponent().getModel(\"settingsModel\");if(!r)return;let i=parseInt(r.getProperty(\"/OVERTIME_CRITICALITY_HIGH\")),a=parseInt(r.getProperty(\"/OVERTIME_CRITICALITY_MEDIUM\"));parseInt(r.getProperty(\"/OVERTIME_CRITICALITY_LOW\"));t.read(\"/EmployeeTimeDataSet\",{filters:[new sap.ui.model.Filter({path:\"Quotatype\",operator:sap.ui.model.FilterOperator.EQ,value1:\"01\"})],success:function(t){let r=0;for(let e in t.results)r+=parseFloat(t.results[e].Overtime);r/=t.results.length;let l=Math.round(100*r)/100;e.setText(l.toFixed(2).toString()),r>=i||r<=-i?e.addStyleClass(\"Error\"):r>=a||r<=-a?e.addStyleClass(\"Critical\"):e.addStyleClass(\"Good\")}})},onDraw:function(e){let t=sap.ui.getCore().byId(\"card04Original--ovpCardContentContainer\");t&&t.addStyleClass(\"sapUiTinyMargin\");let r=e.getSource();r.getId().search(this.c_criticalLabel)&&this.calculateCriticality(r)},onCardLinkClick:function(e){let t=\"Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/\"+this.getView().getModel(\"managerModel\").getProperty(\"/EmployeeNumber\")+\"/true/RPTBAL00_EW/Mehrarbeitsliste\";sap.ushell.Container.getService(\"CrossApplicationNavigation\").toExternal({target:{shellHash:t}})},onCardHeaderLinkClick:function(){let e=\"Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/\"+this.getView().getModel(\"managerModel\").getProperty(\"/EmployeeNumber\")+\"/true/RPTBAL00_EW/Mehrarbeitsliste\";sap.ushell.Container.getService(\"CrossApplicationNavigation\").toExternal({target:{shellHash:e}})}})}();",
	"gisa/mss/MSSOnePage/MSSOnePageOview/ext/overtimeCard/overtimeCard.controller.js": "!function(){\"use strict\";jQuery.sap.require(\"gisa.mss.MSSOnePage.MSSOnePageOview.util.formatter\"),sap.ui.controller(\"gisa.mss.MSSOnePage.MSSOnePageOview.ext.overtimeCard.overtimeCard\",{onInit:function(){this.c_criticalLabel=\"criticalityOverTime\";let e=sap.ui.getCore().byId(\"mainView\").getModel(\"settingsModel\"),t=this.getView();t.setModel(e,\"settingsModel\");let r=sap.ui.getCore().byId(\"mainView\").getModel(\"managerModel\");t.setModel(r,\"managerModel\")},onAfterRendering:function(){},onExit:function(){},calculateCriticality:function(e){let t=this.getOwnerComponent().getModel(\"oviewModel\");if(!t)return;let r=this.getOwnerComponent().getModel(\"settingsModel\");if(!r)return;let i=parseInt(r.getProperty(\"/OVERTIME_CRITICALITY_HIGH\")),a=parseInt(r.getProperty(\"/OVERTIME_CRITICALITY_MEDIUM\"));parseInt(r.getProperty(\"/OVERTIME_CRITICALITY_LOW\"));t.read(\"/EmployeeTimeDataSet\",{filters:[new sap.ui.model.Filter({path:\"Quotatype\",operator:sap.ui.model.FilterOperator.EQ,value1:\"01\"})],success:function(t){let r=0;for(let e in t.results)r+=parseFloat(t.results[e].Overtime);r/=t.results.length;let l=Math.round(100*r)/100;e.setText(l.toFixed(2).toString()),r>=i||r<=-i?e.addStyleClass(\"Error\"):r>=a||r<=-a?e.addStyleClass(\"Critical\"):e.addStyleClass(\"Good\")}})},onDraw:function(e){let t=sap.ui.getCore().byId(\"card04Original--ovpCardContentContainer\");t&&t.addStyleClass(\"sapUiTinyMargin\");let r=e.getSource();r.getId().search(this.c_criticalLabel)&&this.calculateCriticality(r)},onCardLinkClick:function(e){let t=\"Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/\"+this.getView().getModel(\"managerModel\").getProperty(\"/EmployeeNumber\")+\"/true/RPTBAL00_EW/Mehrarbeitsliste/false\";sap.ushell.Container.getService(\"CrossApplicationNavigation\").toExternal({target:{shellHash:t}})},onCardHeaderLinkClick:function(){let e=\"Employee-launchReports?ScenarioId=SAP_EXAMPLE&/reportResult/\"+this.getView().getModel(\"managerModel\").getProperty(\"/EmployeeNumber\")+\"/true/RPTBAL00_EW/Mehrarbeitsliste/false\";sap.ushell.Container.getService(\"CrossApplicationNavigation\").toExternal({target:{shellHash:e}})}})}();",
	"gisa/mss/MSSOnePage/MSSOnePageOview/ext/overtimeCard/overtimeCard.fragment.xml": "<core:FragmentDefinition xmlns=\"sap.m\" xmlns:core=\"sap.ui.core\" xmlns:ovp=\"sap.ovp.ui\" xmlns:l=\"sap.ui.layout\"\r\n\txmlns:micro=\"sap.suite.ui.microchart\" xmlns:template=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1\"><Panel headerText=\"{i18n>card04_title}\" width=\"100%\" height=\"100%\"><List id=\"overtimeList\" growing=\"true\" growingThreshold=\"5\"\r\n\t\t\titems=\"{ path: '/EmployeeTimeDataSet', sorter: [ { path: 'Overtime', descending: true } ], filters : [ { path : 'Quotatype', operator : 'EQ', value1 : '01'} ] }\"><items><CustomListItem><Link class=\"sapUiTinyMarginBegin\" text=\"#{= parseFloat(${EmployeeNumber}) }\" press=\"onCardLinkClick\"/><micro:InteractiveBarChart labelWidth=\"40%\" max=\"100\" min=\"-100\" press=\"onCardLinkClick\"><micro:bars><micro:InteractiveBarChartBar label=\"{FormattedName}\" tooltip=\"{EmployeeNumber}\"\r\n\t\t\t\t\t\t\t\tvalue=\"{ path : 'Overtime', formatter : 'gisa.mss.MSSOnePage.util.formatter.overtime' }\"\r\n\t\t\t\t\t\t\t\tcolor=\"{ path : 'OvertimeAbs', formatter : 'gisa.mss.MSSOnePage.util.formatter.formatOverTimeBarColor' }\"/></micro:bars></micro:InteractiveBarChart></CustomListItem></items></List><headerToolbar><ToolbarSpacer/><OverflowToolbar active=\"true\" press=\"onCardHeaderLinkClick\" height=\"7rem\"><VBox class=\"sapUiMediumMarginBegin sapUiMediumMarginTopBottom\"><Title level=\"H2\" text=\"{i18n>card04_title}\"/><Label text=\"{i18n>criticalityFlexTimeUnit}\"/><FlexBox alignItems=\"Center\"><Label id=\"criticalityOverTime\" text=\"0\" class=\"sapMNCValue\" modelContextChange=\".onDraw\"/><Label text=\"{i18n>criticalityOverTimeMeaning}\" class=\"sapUiSmallMarginBegin\"/></FlexBox></VBox></OverflowToolbar></headerToolbar></Panel><ToolbarSpacer/></core:FragmentDefinition>"
}, "gisa/mss/MSSOnePage/MSSOnePageOview/ext/overtimeCard/Component-preload");