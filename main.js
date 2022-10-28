//Author: Lauren Sampson - sampsonl@bc.edu
/* global d3 */

import {StackedAreaChart} from './stackedChart.js';
import {AreaChart} from './areaChart.js';

var csv_data;

var data = d3.csv('unemployment.csv', d3.autoType).then(data => {
    console.log("reached data loading")
    csv_data = data;
    console.log(data);

    var columns = csv_data.columns.slice(1,-1);

    csv_data.forEach(
        d=>{let sum = 0; 
        columns.forEach(col=>sum = sum+ d[col]); 
        console.log(sum); 
        d.total = sum;}
    );

    var chart = AreaChart(".total_chart");
    chart.update(csv_data);
    chart.on("brushed", (range)=>{
        chart2.filterByDate(range); 
    });

    var chart2 = StackedAreaChart(".stacked_chart");
    chart2.update(csv_data);

    
});