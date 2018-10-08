import React from 'react';

import ChartistGraph from 'react-chartist';
var Chartist = require("chartist");
 
class Line extends React.Component {
  render() {
 
    var lineChartData = {
        labels: [2014,2015,2016,2017,2018],
        series: [
          [0, 1, 4, 4, 5],
          [0,1,4,4,3],
          [0,0,0,0,2]
        ]
      }
   
      var lineChartOptions = {
        low: 0,
        fullwidth:true,
        showArea: true,
        showPoint: true,
      chartPadding: {
        top: 0,
        right: 60,
        bottom: 0,
        left: 0
      },

    }
    var animation= {
        draw: function(data) {
            if(data.type === 'line' || data.type === 'area') {
                data.element.animate({
                  d: {
                    begin: 2000 * data.index,
                    dur: 2000,
                    from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                });
              }
        }
    }
             
    return (
      <div >
         <ChartistGraph
                  className="ct-chart"
                  data={lineChartData}
                  type={'Line'}
                  options={lineChartOptions}
                 listener={animation}
                 style={{height:300}}
                />
      </div>
    )
  }
}
 export default Line;