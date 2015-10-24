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
		max: 2
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

// General properties
	var rectUseLasso = {
		ref: "rectUseLasso",
		label: "Use Lasso",
		type: "boolean",
		defaultValue: "true"
	};	
	
// Rectangle properties
	var propRectDynamicWidthHeight = {
		ref: "rectDynamicWidthHeight",
		label: "Dynamic Width/Height",
		type: "boolean",
		expression: "optional",
		defaultValue: "false"
	};
	
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
	
	var propRectSelectingActiveColor = {
		ref: "rectSelectingColor",
		label: "Selecting Active Color",
		type: "string",
		expression: "optional",
		defaultValue: "yellow"
	};
	
	var propRectSelectingNonActiveColor = {
		ref: "rectSelectingNullColor",
		label: "Selecting Non Active Color",
		type: "string",
		expression: "optional",
		defaultValue: "gray"
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
	
	var propTitleDynamicSize = {
		ref: "titleDynamicSize",
		label: "Dynamic Font Size",
		type: "boolean",
		expression: "optional",
		defaultValue: false
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
	
	var propValuesDynamicSize = {
		ref: "valuesDynamicSize",
		label: "Dynamic Font Size",
		type: "boolean",
		expression: "optional",
		defaultValue: false
	};		

	var propValuesFamily = {
		ref: "valuesFontFamily",
		label: "Values Font Family",
		type: "string",
		expression: "optional",
		defaultValue: "Arial Black"
	};		
	
    var titleColor = {
        ref: "props.titleColor",
        label: "Title color",
        type: "string",
        expression: "optional",
        show: function ( data ) {
            return data.props && data.props.layoutMode === 'custom';
        }
	}
			
	

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
				 uses: "settings"
		   },
			myCustomSection: {
				//type: "items", //<== not necessary to define "items"
				component: "expandable-items",
				label: "Extension properties",
				items: {
					header0: {
						type: "items",
						label: "General",
						items: {
							header0_item1: rectUseLasso
						}
					},					
					header1: {
						type: "items",
						label: "Rectangles",
						items: {
							header1_item1: propRectDynamicWidthHeight,
							header1_item2: propRectWidthHeight,
							header1_item3: propRectDistance,
							header1_item4: propRectBorderColor,
							header1_item5: propRectBorderWidth,
							header1_item6: propRectFill,
							header1_item7: propNullFill,
							header1_item8: propRectSelectingActiveColor,							
							header1_item9: propRectSelectingNonActiveColor,
						}
					},
					header2: {
						type: "items",
						label: "Titles",
						items: {
							header2_item1: propTitleDynamicSize,
							header2_item2: propTitleColor,
							header2_item3: propTitleSize,
							header2_item4: propTitleFamily							
						}
					},
					header3: {
						type: "items",
						label: "Values",
						items: {
							header3_item1: propValuesDynamicSize,
							header3_item2: propValuesColor,
							header3_item3: propValuesSize,
							header3_item4: propValuesFamily							
						}
					}
				}
			}
		}
	}
} );