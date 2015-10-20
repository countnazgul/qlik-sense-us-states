define( ["jquery", "./d3.min"], function ( $ ) {
	'use strict';

	return {
		initialProperties: {
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 2,
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
		  var rectOpacity = 0.8;
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
			  { id:12, name:"ME"},{ id:19, name:"WI"},{ id:23, name:"VT"}, {id:24, name:"NH"},{ id:26, name:"WA"},{ id:27, name:"ID"},{ id:28, name:"MT"},{ id:29, name:"ND"},{ id:30, name:"MN"},
			  { id:31, name:"IL"},{ id:32, name:"MI"},{ id:34, name:"NY"},{ id:35, name:"MA"},{ id:38, name:"OR"},{ id:39, name:"NV"},{ id:40, name:"WY"},{ id:41, name:"SD"},{ id:42, name:"IA"},
			  { id:43, name:"IN"},{ id:44, name:"OH"},{ id:45, name:"PA"},{ id:46, name:"NJ"},{ id:47, name:"CT"},{ id:48, name:"RI"},{ id:50, name:"CA"},{ id:51, name:"UT"},{ id:52, name:"CO"},
			  { id:53, name:"NE"},{ id:54, name:"MO"},{ id:55, name:"KY"},{ id:56, name:"WV"},{ id:57, name:"VA"},{ id:58, name:"MD"},{ id:59, name:"DE"},{ id:63, name:"AZ"},{ id:64, name:"NM"},
			  { id:65, name:"KS"},{ id:66, name:"AR"},{ id:67, name:"TN"},{ id:68, name:"NC"},{ id:69, name:"SC"},{ id:70, name:"DS"},{ id:77, name:"OK"},{ id:78, name:"LA"},{ id:79, name:"MS"},
			  { id:80, name:"AL"},{ id:81, name:"GA"},{ id:85, name:"HI"},{ id:86, name:"AK"},{ id:89, name:"TX"},{ id:94, name:"FL"}
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
		  console.log(matrix)
		  matrix.forEach(function ( row ) {
			var val = {value:  row[1].qText, name:  row[0].qText, elemNo: row[0].qElemNumber };
			//if(row[0].qText === 'WY') {
			  console.log(row[0].qText);
			//}
			data.push( val )
		  });
		  console.log(data.length)

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
				
				if( hiddenId.indexOf( id ) == -1 ) {
				  var rectangle = svg.append("rect")
										.attr("x", (rectWidth + rectDistance) * i)
										.attr("y", (rectHeight + rectDistance) * a)
										.attr("width", rectWidth)
										.attr("height", rectHeight)
										.style("fill", /*rectFill*/ function(d) {
										  if(dataObject) {
											return "gray"//colorScale(dataObject.value)
										  } else {
											return rectNullFill
										  }
										})
										.style("opacity", function(d) {
										  if(!dataObject) {
											return null
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
				
				id++;
			  }
			}		  
		  
		  
		  
		  /*
			if ( dimensions && dimensions.length > 0 ) {
				matrix.forEach(function ( row ) {
					html += "<div class='selectable' ' data-value='" + row[0].qElemNumber + "'>";
					html += row[0].qText + ": " + row[1].qText;
					html += "</div>";
				} );
			}
			html += "</div>";
			$element.html( html );
			if ( this.selectionsEnabled ) {
				$element.find( '.selectable' ).on( 'qv-activate', function () {
					if ( this.hasAttribute( "data-value" ) ) {
						var value = parseInt( this.getAttribute( "data-value" ), 10 ), dim = 0;
						self.selectValues( dim, [value], true );
						$( this ).toggleClass( "selected" );
					}
				} );
			}*/
		  
		}
	};

} );
