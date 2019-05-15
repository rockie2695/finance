import React, { Component } from 'react';
import {round} from './round'

class Ana3 extends Component {//acceptable price
  constructor(props) {
      super(props);
      this.state={
          accept:null,
          avg:null,
          mid:null
      }
  }
  setData(){
      let test=0,times=0
      for(let x in this.props.price){
          test+=this.props.price[x]*(parseInt(x)+1)
          times+=(parseInt(x)+1)
      }
      const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
      let sortprice=this.props.price.concat().sort((a, b) => a - b);
      this.setState({
          accept:round(3,test/times),
          avg:round(3,average(this.props.price)),
          mid:round(3,sortprice[parseInt(this.props.price.length/2)-1])
      })
  }
  componentDidMount() {//after render() only once
      this.setData()
  }
  componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.price.length !== prevProps.price.length) {
          this.setData()
      }
  }
  render(){
      return(
          <div className="ana3Div">
          <div>
          加權平均: {this.state.accept}
          </div>
              <div>
              平均: {this.state.avg}
              </div>
              <div>
              中位: {this.state.mid}
              </div>
          </div>
      )
  }
}

export default Ana3;
