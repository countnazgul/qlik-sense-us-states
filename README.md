Kinda by request from Alexander Karlsson (https://twitter.com/mindspank/status/654129751519395840)

This Qlik Sense extension provide simplified US map where each state is represent by rectangle. 

##### Dimension
The extension accept 1 dimension which should be the short state names ( FL, OR, OH etc. )

##### Expressions
Max two expressions can be used:
* the first expression is the actual value that need to be shown
* the second one is optional and is used to specify the color of the cells based on the values or other rules.

##### Selecting
You can use the usual click selection method (default) or using the d3 lasso (https://github.com/skokenes/D3-Lasso-Plugin)

##### Options
Various options are available to control the colors and fonts properties of the rectangles, titles and values. 
Also through the options the whole chart can be made to auto size dynamically based on the size of the object and the screen resolution. 

Gifs how the auto size and the lasso are used can be found [here](https://github.com/countnazgul/qlik-sense-us-states/tree/master/media)
