import React, { Component } from 'react';
import Ana1 from './Ana1'
import Ana2 from './Ana2'
import Ana3 from './Ana3'
import ChartJs from './ChartJs'
import {round} from './round'

class StockAna extends Component {
  constructor(props) {
      super(props);
      this.state={
          name:null,
      }
  }
  takeAvg(howMany,price){
      let avgVal=[]
      for(let i=0;i<price.length;i++){
          if(i>(howMany-1)){
              let avg=0
              let avgSlice=price.slice(i-howMany,i)
              for(let x in avgSlice){
                  avg+=avgSlice[parseInt(x)]
              }
              avg/=howMany
              avgVal.push(round(3,avg))
          }else{
              avgVal.push(null)
          }
      }
      return avgVal
  }
  cutSetData(){
      let data=this.props.respone.dataset.data.slice(0, this.props.dayNumber)
      let price=data.map(function(data){return data[1]}).reverse()
      let high=data.map(function(data){return data[7]}).reverse()
      let low=data.map(function(data){return data[8]}).reverse()
      let tenAvg=this.takeAvg(10,price)
      let thirtyAvg=this.takeAvg(30,price)
      let fiftyAvg=this.takeAvg(50,price)
      let volume=data.map(function(data){return data[11]}).reverse()
      this.setState({
          name:this.props.respone.dataset.name,
          data:data,
          price:price,
          tenAvg:tenAvg,
          thirtyAvg:thirtyAvg,
          fiftyAvg:fiftyAvg,
          high:high,
          low:low,
          volume:volume
      })
  }
  componentDidMount() {//after render() only once
      if(this.props.respone){
          this.cutSetData()
      }
  }
  componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.dayNumber !== prevProps.dayNumber) {
          this.cutSetData()
      }
  }
  render(){
      if(this.props.value && this.props.respone && this.props.respone.dataset.dataset_code === this.props.value&&this.state.name){
          const title="Stock Analysis"
      return(
          <div>
              <div>
              {title}
              </div>
              <div>
                stock: {this.state.name}
              </div>
              <div>
                price: {this.state.price[this.state.price.length-1]}
              </div>
              <ChartJs data={this.state.data} name={this.state.name} price={this.state.price} high={this.state.high} low={this.state.low} tenAvg={this.state.tenAvg} fiftyAvg={this.state.fiftyAvg} thirtyAvg={this.state.thirtyAvg} volume={this.state.volume}/>
              <Ana1 data={this.state.data} price={this.state.price}/>
              <Ana3 price={this.state.price}/>
              <Ana2 price={this.state.price}/>
          </div>
      )
      }else{
          return(null)
      }
  }
}

export default StockAna;
