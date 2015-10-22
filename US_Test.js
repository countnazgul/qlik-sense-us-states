define( ["jquery", "./d3.min", 'text!./styles.css' ], function ( $, cssContent ) {
	'use strict';
	//$('<link rel="stylesheet" type="text/css" href="/extensions/US_Test/styles.css">').appendTo("head");
	return {
		initialProperties: {
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 1,
					qHeight: 100
				}]
			}
		},
		//property panel
		definition: {
			type: "items",
			component: "accordion",
			items: {
				dimensions: {
					uses: "dimensions",
					min: 1,
					max: 1
				},
				measures: {
					uses: "measures",
					min: 1,
					max: 1
				},
				sorting: {
					uses: "sorting"
				},
				settings: {
					uses: "settings"
				},
				color: {  
                    ref: "color",  
                    translation: "properties.color",  
                    type: "integer",  
                    component: "color-picker",  
                    defaultValue: 2  
                },  			  
			}
		},
		snapshot: {
			canTakeSnapshot: true
		},

		paint: function ( $element, layout ) {
		  
		  var html = '<div id="states"></div>';
		  $element.html( html );		  
		  

		  var width = 800;
		  var height = 500;
		  
		  var rectWidth = 50;
		  var rectHeight = 50;
		  var rectDistance = 3;
		  var rectBorderColor = "black";
		  var rectBorderWidth = 2;
		  var rectOpacity = 0.4;
		  var rectFill = "gray";
		  var rectNullFill = "gray";
		  
		  var titleColor = 'purple';
		  var titleSize = '16';
		  var titleFamily = 'Arial';
		  
		  var valueColor = 'blue';
		  var valueSize = '19';
		  var valueFamily = 'Arial Black';
		  
		  var id = 1;
		  
		  var hiddenId = [1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,20,21,22,25,33,36,37,49,60,61,62,71,72,73,74,75,76,91,82,83,84,87,88,90,92,93,95,96];
		  
		  var names = [
			  { id:12, name:"ME", order:0},{ id:19, name:"WI", order:1},{ id:23, name:"VT", order:2}, {id:24, name:"NH", order:3},{ id:26, name:"WA", order:4},{ id:27, name:"ID", order:5},{ id:28, name:"MT", order:6},{ id:29, name:"ND", order:7},{ id:30, name:"MN", order:8},
			  { id:31, name:"IL", order:9},{ id:32, name:"MI", order:10},{ id:34, name:"NY", order:11},{ id:35, name:"MA", order:12},{ id:38, name:"OR", order:13},{ id:39, name:"NV", order:14},{ id:40, name:"WY", order:15},{ id:41, name:"SD", order:16},{ id:42, name:"IA", order:17},
			  { id:43, name:"IN", order:18},{ id:44, name:"OH", order:19},{ id:45, name:"PA", order:20},{ id:46, name:"NJ", order:21},{ id:47, name:"CT", order:22},{ id:48, name:"RI", order:23},{ id:50, name:"CA", order:24},{ id:51, name:"UT", order:25},{ id:52, name:"CO", order:26},
			  { id:53, name:"NE", order:27},{ id:54, name:"MO", order:28},{ id:55, name:"KY", order:29},{ id:56, name:"WV", order:30},{ id:57, name:"VA", order:31},{ id:58, name:"MD", order:32},{ id:59, name:"DE", order:33},{ id:63, name:"AZ", order:34},{ id:64, name:"NM", order:35},
			  { id:65, name:"KS", order:36},{ id:66, name:"AR", order:37},{ id:67, name:"TN", order:38},{ id:68, name:"NC", order:39},{ id:69, name:"SC", order:40},{ id:70, name:"DS", order:41},{ id:77, name:"OK", order:42},{ id:78, name:"LA", order:43},{ id:79, name:"MS", order:44},
			  { id:80, name:"AL", order:45},{ id:81, name:"GA", order:46},{ id:85, name:"HI", order:47},{ id:86, name:"AK", order:48},{ id:89, name:"TX", order:49},{ id:94, name:"FL", order:50}
		  ];		  			
		  
		  function search(nameKey, myArray){
			  for (var i=0; i < myArray.length; i++) {
				  if (myArray[i].id === nameKey) {
					  return myArray[i];
				  }
			  }
		  }
		  
		  function searchData(nameKey, myArray){
			  for (var i=0; i < myArray.length; i++) {
				  if (myArray[i].name === nameKey) {
					  return myArray[i];
				  }
			  }
		  }		

			var self = this,
				dimensions = layout.qHyperCube.qDimensionInfo,
				matrix = layout.qHyperCube.qDataPages[0].qMatrix;
		  
		  var data = [];
		  //console.log(matrix)
		  
		  matrix.forEach(function ( row ) {
			var val = {value:  row[1].qText, name:  row[0].qText, elemNo: row[0].qElemNumber };
			data.push( val )
		  });
		  //console.log(data)

		  var svg = d3.select("#states")
				.append("svg:svg")
				.attr("width", width)    
				.attr("height", height); 
			 
			for (var a = 0; a < 8; a++ ) {
			  for(var i = 0; i < 12; i++) {
				
				var resultObject = search(id, names);				
				var nameIter = null;
				var dataObject = null;
				
				if( resultObject ) {
				  nameIter = resultObject.name;				  
				  //console.log( resultObject.name )
				}
				
				if( nameIter ) {
				  var dataObject = searchData(nameIter, data);
				  //console.log(nameIter)
				  //console.log(dataObject)
				}
				
				if( resultObject ) {
				  svg.append("text")
					  .attr("x", (rectWidth + rectDistance) * i + ( rectWidth /3.5))
					  .attr("y", (rectHeight + rectDistance) * a + 15)
					  .text(function(d) { return resultObject.name; })
					  .attr("font-family", titleFamily)
					  .attr("font-size", titleSize + "px")
					  .attr("fill", titleColor)
					  .attr("class", function(d) {
						if(!dataObject) {
						  return "empty"
						}
					  })
				}		

				  if( dataObject ) {    
					svg.append("text")
						.attr("x", (rectWidth + rectDistance) * i + ( rectWidth /3.5))
						.attr("y", (rectHeight + rectDistance) * a + (rectHeight /1.1))
						.text(function(d) { return dataObject.value; })
						.attr("font-family", valueFamily)
						.attr("font-size", valueSize + "px")
						.attr("fill", valueColor)
				  }				
				
				if( hiddenId.indexOf( id ) == -1 ) {
				  var rectangle = svg.append("rect")
										.attr("x", (rectWidth + rectDistance) * i)
										.attr("y", (rectHeight + rectDistance) * a)
										.attr("width", rectWidth)
										.attr("height", rectHeight)
										.attr("elemno", function(d) {
											//console.log( dataObject );
											if( dataObject ) {
											return dataObject.elemNo;
											}
										
										})
										.style("fill", /*rectFill*/ function(d) {
										  if(dataObject) {
											return "gray"//colorScale(dataObject.value)
										  } else {
											return rectNullFill
										  }
										})
										.style("opacity", function(d) {
										  if(!dataObject) {
											return 0.1
										  } else {                                                
											return rectOpacity}
										})
										.attr("class", function(d) {
										  if(!dataObject) {
											return "empty"
										  }
										})
										.style("stroke", rectBorderColor)
										.style("stroke-width", rectBorderWidth)
										.on({
											  "click":  function() {  
												var elemNo = $(this);
												//console.log( elemNo.attr('elemno') ) 
												self.selectValues( 0, [ parseInt(elemNo.attr('elemno')) ], true );
												d3.select(this).style('fill', "yellow");
											  }, 
										});
				}
				id++;
			  }
			}		
		}
	};

} );
