import React, { Component } from 'react';
import {chartColors} from './round';
import {Bar} from 'react-chartjs-2'

class ChartJs extends Component{
  constructor(props) {
      super(props);
      this.state={
          data:null,
          options:null
      }
  }
  render(){
      return(
          <div style={{maxHeight:400}} className="chartjsDiv">
          {this.state.data&&this.state.options?<Bar data={this.state.data} options={this.state.options} height={400}/>:null}
          </div>
      )
  }
    genBarChart(){
    // Bar chart
        if(this.state.graph){
            this.state.graph.destroy();
        }
        this.setState({
            data: {
                labels: this.props.data.map(function(data){return data[0]}).reverse(),
                datasets: [{ 
                    data: this.props.price,
                    type:'line',
                    label: this.props.name,
                    borderColor: chartColors.blue,
                    fill: false
                },
                { 
                    data: this.props.high,
                    label: "high",
                    type:'line',
                    borderColor: chartColors.purple,
                    fill: false
                },
                { 
                    data: this.props.low,
                    label: "low",
                    type:'line',
                    borderColor: chartColors.purple,
                    fill: false
                },
                { 
                    data: this.props.tenAvg,
                    label: "tenAvg",
                    type:'line',
                    borderColor: chartColors.red,
                    fill: false
                },
                { 
                    data: this.props.thirtyAvg,
                    label: "thirtyAvg",
                    type:'line',
                    borderColor: chartColors.green,
                    fill: false
                },
                { 
                    data: this.props.fiftyAvg,
                    label: "fiftyAvg",
                    type:'line',
                    borderColor: chartColors.orange,
                    fill: false
                },{
                data: this.props.volume,
                label: "Volume",
                type:'bar',
                backgroundColor: chartColors.yellow,
                fill: false,
                yAxisID: 'y-axis-2'
                }]
            },
            options:{
                title: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                responsive:true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            id: 'y-axis-1',
                            gridLines: {
                                display: false
                            },
                            labels: {
                                show: true
                            }
                        },
                        {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            id: 'y-axis-2',
                            gridLines: {
                                display: false
                            },
                            labels: {
                                show: true
                            }
                        }
                    ]
                }
            }
        })
      
    }
  componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.price !== prevProps.price) {
          this.genBarChart()
      }
  }
  componentDidMount(){//after render() only once
      this.genBarChart()
  }
}

export default ChartJs;
