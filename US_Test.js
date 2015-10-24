define( [
			"jquery",
			'./properties',
			'./initialproperties',
			'text!./HexagonalBinning.css',
			"./d3.min",
			"./lasso_adj"
], function ( $, props, initProps, cssContent) {
	'use strict';
		$("<style>").html(cssContent).appendTo("head");
	return {
		definition: props,
        initialProperties: initProps,
		snapshot: {
			canTakeSnapshot: true
		},

		paint: function ( $element, layout ) {
		  
		  var html = '<div id="states"></div>';
		  $element.html( html );		  

		  var width = $element.context.clientWidth;
		  var height = $element.context.clientHeight;
		  
		  var gnrlUseLasso = layout.rectUseLasso;
		  
		  var rectWH = layout.rectWidthHeight.split('/');	
		  var rectWidth = parseInt( rectWH[0] );
		  var rectHeight = parseInt( rectWH[1] );
		  var rectDistance = parseInt( layout.rectDistance );
		  var rectBorderColor = layout.rectBorderColor;
		  var rectBorderWidth = parseInt( layout.rectBorderWidth );
		  var rectOpacity = 0.4;
		  var rectFill = layout.rectFill;
		  var rectNullFill = layout.rectNullFill;
		  var rectSelectingColor = layout.rectSelectingColor;
		  var rectSelectingNullColor = layout.rectSelectingNullColor;		  
		  
		  var titleColor = layout.titleColor;
		  var titleSize = layout.titleSize;
		  var titleFamily = layout.titleFontFamily;
		  
		  var valueColor = layout.valuesColor;
		  var valueSize = layout.valuesSize;
		  var valueFamily = layout.valuesFontFamily;
		  
		  var id = 1;
		  var binningMode = -1
		  
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
		  
			var lasso_start = function() {
				// keep mouse cursor arrow instead of text select (auto)
				//$("#"+id).css('cursor','default');
				
				// clear all of the fills 
				if (binningMode > 0) {
					// Area binning mode
					lasso.items()
						.style("fill",rectFill);
				}

				lasso.items()
					.classed({"not_possible":true,"selected":false}); // style as not possible
			};
			
	var lasso_draw = function() {
		// Style the possible dots
		lasso.items().filter(function(d) {return d.possible===true})
			.classed({"not_possible":false,"possible":true})
			.style('fill', rectSelectingColor)
			//.style("stroke-width", 4)			
			;

		// Style the not possible dot
		lasso.items().filter(function(d) {return d.possible===false})
			.classed({"not_possible":true,"possible":false});
	};

	var lasso_end = function(data) {
		var selectedItems = lasso.items().filter(function(d) {return d.selected===true});	
		//console.log(selectedItems)
		if (selectedItems[0].length > 0) {			
			// Set up an array to store the data points in the selected hexagon
			var selectarray = [];
			//Push the Dim1_key from the data array to get the unique selected values
			for (var index = 0; index < selectedItems[0].length; index++) {
				//for (var item = 0; item < selectedItems[0][index].__data__.length; item++) {
					//selectarray.push(selectedItems[0][index].__data__[item][3]);	
					var s = selectedItems[0][index].outerHTML;
					var t = s.substring( s.indexOf('elemno') )
						t = t.substring( 0, t.indexOf(' ') )
						t = t.replace(/\D/g,'');
					selectarray.push( parseInt(t) )
				//}
			}
			//console.log(selectarray);
			
			//Make the selections
			self.selectValues(0,selectarray,true);
		} else {
			if (binningMode > 0) {
				lasso.items()
					.style("fill", function(d) { return areaColor; });
			}
		}
	};			

			var self = this,
				dimensions = layout.qHyperCube.qDimensionInfo,
				matrix = layout.qHyperCube.qDataPages[0].qMatrix;
		  
		  var data = [];
		  
		  matrix.forEach(function ( row ) {
			var val = {value:  row[1].qText, name:  row[0].qText, elemNo: row[0].qElemNumber };
			data.push( val )
		  });

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
				}
				
				if( nameIter ) {
				  var dataObject = searchData(nameIter, data);
				}
				
				if( resultObject ) {
				  var title = svg.append("text")					  
					  .text(function(d) { return resultObject.name; })
					  .attr("font-family", titleFamily)
					  .attr("font-size", titleSize + "px")
					  .attr("fill", titleColor)
					  //.attr("text-anchor", "middle")
					  .attr("class", function(d) {
						if(!dataObject) {							
						  return "empty"
						}
					  })
					  .attr("x",  function() {
						return (((rectWidth + rectDistance) * i) + ( rectWidth / 2 - this.getComputedTextLength() / 2 )) }
					  )
					  .attr("y", function() {						  
						  return (rectHeight + rectDistance) * a + this.getBoundingClientRect().height / 2 + rectHeight * 0.1
					  })
				}		

				 if( dataObject ) {    
					svg.append("text")
						.text(function(d) { return dataObject.value; })
						.attr("font-family", valueFamily)
						.attr("font-size", valueSize + "px")
						.attr("fill", valueColor)
					    .attr("x",  function() {							
							return (((rectWidth + rectDistance) * i) + ( rectWidth / 2 - this.getComputedTextLength() / 2 )) }
						)
					  .attr("y", function() {						  
						  return (rectHeight + rectDistance) * a + rectHeight - rectHeight * 0.1
					  })						
				 }				
				
				if( hiddenId.indexOf( id ) == -1 ) {
				  var rectangle = svg.append("rect")
										.attr("x", (rectWidth + rectDistance) * i)
										.attr("y", (rectHeight + rectDistance) * a)
										.attr("width", rectWidth)
										.attr("height", rectHeight)
										.attr("elemno", function(d) {
											//if( dataObject ) {
												try {
											return dataObject.elemNo;
												} catch (ex) {
													
												}
											//}										
										})
										.style("fill", function(d) {
										  if(dataObject) {
											return rectFill
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
											  "click":  function( d ) {  
												var elemNo = $(this);
												
												if( elemNo.attr('elemno') ) {
													self.selectValues( 0, [ parseInt(elemNo.attr('elemno')) ], true );
													var selected = elemNo[0].outerHTML.indexOf(rectSelectingColor);
													
													if( elemNo[0].outerHTML.indexOf(rectSelectingColor) > -1 ) {
														d3.select(this).style('fill', rectFill);
													} else {
														d3.select(this).style('fill', rectSelectingColor);
													}
												}
												
											  }, 
										});
				}
				id++;
			  }
			}

			if( gnrlUseLasso == true ) {
				var lasso_area = d3.selectAll("rect");
				var lasso = d3.lasso()
					  .closePathDistance(75)
					  .closePathSelect(true)
					  .hoverSelect(true)
					  .area(lasso_area)
					  .on("start",lasso_start)
					  .on("draw",lasso_draw)
					  .on("end",lasso_end);

				svg.call(lasso);	
				lasso.items(d3.selectAll("rect"));
			}
		}
	};

} );
