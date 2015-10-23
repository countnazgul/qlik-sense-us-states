define( [], function () {
	'use strict';

	// ****************************************************************************************
	// Dimensions & Measures
	// ****************************************************************************************
	var dimensions = {
		uses: "dimensions",
		min: 1,
		max: 1
	};

	var measures = {
		uses: "measures",
		min: 1,
		max: 1
	};

	var sorting = {
		uses: "sorting"
	};

	// ****************************************************************************************
	// Other Settings
	// ****************************************************************************************

	var showMyAccordion = {
		ref: "props.showMyAccordionPanel",
		label: "Show \"My Accordion Panel\"",
		type: "boolean",
		defaultValue: true
	};

	// ****************************************************************************************
	// New Accordion Panel
	// ****************************************************************************************

// Rectangle properties
	var propRectWidthHeight = {
		ref: "rectWidthHeight",
		label: "Width/Height",
		type: "string",
		expression: "optional",
		defaultValue: "50/50"		
	};
	var propRectDistance = {
		ref: "rectDistance",
		label: "Distance",
		type: "string",
		expression: "optional",
		defaultValue: "3"		
	};
	
	var propRectBorderColor  = {
		ref: "rectBorderColor",
		label: "Border Color",
		type: "string",
		expression: "optional",
		defaultValue: "black"
	};

	var propRectBorderWidth = {
		ref: "rectBorderWidth",
		label: "Border Width",
		type: "string",
		expression: "optional",
		defaultValue: "2"		
	};

	var propRectFill = {
		ref: "rectFill",
		label: "Fill Color",
		type: "string",
		expression: "optional",
		defaultValue: "gray"		
	};

	var propNullFill = {
		ref: "rectNullFill",
		label: "Null Fill",
		type: "string",
		expression: "optional",
		defaultValue: "gray"		
	};
	
	var propRectSelectingColor = {
		ref: "rectSelectingColor",
		label: "Selecting Color",
		type: "string",
		expression: "optional",
		defaultValue: "yellow"
	};
	
// Titles properties	
	var propTitleColor = {
		ref: "titleColor",
		label: "Titles Color",
		type: "string",
		expression: "optional",
		defaultValue: "purple"		
	};

	var propTitleSize = {
		ref: "titleSize",
		label: "Titles Font Size",
		type: "string",
		expression: "optional",
		defaultValue: "16"	
	};

	var propTitleFamily = {
		ref: "titleFontFamily",
		label: "Titles Font Family",
		type: "string",
		expression: "optional",
		defaultValue: "Arial"		
	};	
	
// Values properties	
	var propValuesColor = {
		ref: "valuesColor",
		label: "Values Color",
		type: "string",
		expression: "optional",
		defaultValue: "blue"		
	};

	var propValuesSize = {
		ref: "valuesSize",
		label: "Values Font Size",
		type: "string",
		expression: "optional",
		defaultValue: "19"	
	};

	var propValuesFamily = {
		ref: "valuesFontFamily",
		label: "Values Font Family",
		type: "string",
		expression: "optional",
		defaultValue: "Arial Black"
	};		
	
	

//)};

	// ****************************************************************************************
	// Property Panel Definition
	// ****************************************************************************************

	return {
		//type: "items", //<== working also without type: "items"
		component: "accordion",
		items: {
			dimensions: dimensions,
			measures: measures,
			sorting: sorting,
			appearance: {
				uses: "settings",
				items: {
					settings: {
						type: "items",
						label: "Settings",
						items: {
							testSetting: showMyAccordion
						}
					}
				}
			},
			myCustomSection: {
				//type: "items", //<== not necessary to define "items"
				component: "expandable-items",
				label: "My Accordion Section",
				items: {
					header1: {
						type: "items",
						label: "Rectangles",
						items: {
							header1_item1: propRectWidthHeight,
							header1_item2: propRectDistance,
							header1_item3: propRectBorderColor,
							header1_item4: propRectBorderWidth,
							header1_item5: propRectFill,
							header1_item6: propNullFill,
							header1_item7: propRectSelectingColor							
						}
					},
					header2: {
						type: "items",
						label: "Titles",
						items: {
							header2_item1: propTitleColor,
							header2_item2: propTitleSize,
							header2_item3: propTitleFamily							
						}
					},
					header3: {
						type: "items",
						label: "Values",
						items: {
							header3_item1: propValuesColor,
							header3_item2: propValuesSize,
							header3_item3: propValuesFamily							
						}
					}
				}
			}
		}
	}
} );