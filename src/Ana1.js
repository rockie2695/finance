import React, { Component } from 'react';
import Pie from 'react-chartjs-2'
import {chartColors} from './round'

class Ana1 extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:{}
        }
    }
    componentDidMount() {//after render() only once
        this.setData()
    }
    setData(){
        let price=this.props.price
        let lastDaySmallerThanDays=0
        let lastDayLargerThanDays=0
        for(let x in price){
            if(price[price.length-1]<price[parseInt(x)]){
                lastDaySmallerThanDays++
            }else if(price[price.length-1]>price[parseInt(x)]){
                lastDayLargerThanDays++
            }
        }
        this.setState({
            lastDayLargerThanDays:lastDayLargerThanDays,
            lastDaySmallerThanDays:lastDaySmallerThanDays,
            data:{
                labels:["days smaller than last day","days larger than last day"],
                datasets:[
                    {
                        data: [lastDayLargerThanDays,lastDaySmallerThanDays],
                        label: '',
                        backgroundColor: [chartColors.green,chartColors.purple]
                    }
                ]
            },
            options:{
                responsive:true,
                maintainAspectRatio: false,
            }
        })
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.price.length !== prevProps.price.length) {
            this.setData()
        }
    }
  render(){
      return(
          <div className="ana1Div">
          <div>{this.state.lastDaySmallerThanDays} days larger than Last day,</div>
          <div>{this.state.lastDayLargerThanDays} days smaller than Last day</div>
          <div style={{maxHeight:250}}><Pie data={this.state.data} options={this.state.options} maxHeight={200}/></div>
          </div>
      )
  }
}

export default Ana1;
