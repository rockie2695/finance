import React, { Component } from 'react';
import {round,chartColors} from './round'
import {Scatter} from 'react-chartjs-2'
import './Ana2.css'

class Ana2 extends Component {//if 3,5,10day change ?%, next2,3,5 day change ?%
  constructor(props) {
      super(props);
      this.state={
          average:arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length,
          fiveDayPrf:[],
          eightDayPrf:[],
          fifteenDayPrf:[],
          nowDayPrf1:[],
          nowDayPrf2:[],
          nowDayPrf3:[],
          nowThreePast:0,
          nowFivePast:0,
          nowTenPast:0
      }
  }
  prfByPast(pastDay,futrueDay,price){
      let prfArray=[]
      
      for(let i=0;i<price.length;i++){
          if(i>=(pastDay+futrueDay)){
              //get i-pastDay-futrueDay to i-futrueDay-1 ,i-futrueDay,i-futrueDay+1 to i
              let pastDayAvg=this.state.average(price.slice(i-pastDay-futrueDay,i-futrueDay-1+1))
              let nowDay=price[i-futrueDay]
              let futureDayAvg=this.state.average(price.slice(i-futrueDay+1,i+1))
              prfArray.push([round(4,(nowDay-pastDayAvg)/pastDayAvg*100),round(3,(futureDayAvg-nowDay)/nowDay*100)])
          }
      }
      return prfArray
  }
  prfByNow(pastDay,prfByPastArray,price){
      let pastDayAvg=this.state.average(price.slice(price.length-pastDay-1,price.length))
      let nowDay=price[price.length-1]
      let perc=round(3,(nowDay-pastDayAvg)/pastDayAvg*100)
      if(pastDay===3){
        this.setState({nowThreePast:perc})
      }else if(pastDay===5){
        this.setState({nowFivePast:perc})
      }else if(pastDay===10){
        this.setState({nowTenPast:perc})
      }
      let returnArray=[]
      //for(let y in prfByPastArray){
      while(prfByPastArray.length!==0){
          let index=0
          let value=100
          for(let x in prfByPastArray){
              if(Math.abs(perc-prfByPastArray[parseInt(x)][0])<value){
                  index=x
                  value=Math.abs(perc-prfByPastArray[parseInt(x)][0])
              }
          }
          let shiftArray=prfByPastArray.splice(index,1)[0]
          if(returnArray.length<10){
              returnArray.push(shiftArray[1])
          }
      }
      return returnArray
  }
  setData(){
        let fiveDayPrf=this.prfByPast(3,2,this.props.price)
        let eightDayPrf=this.prfByPast(5,3,this.props.price)
        let fifteenDayPrf=this.prfByPast(10,5,this.props.price)
        let nowDayPrf1=this.prfByNow(3,[...fiveDayPrf],this.props.price)
        let nowDayPrf2=this.prfByNow(5,[...eightDayPrf],this.props.price)
        let nowDayPrf3=this.prfByNow(10,[...fifteenDayPrf],this.props.price)
        for(let x in fiveDayPrf){
            fiveDayPrf[parseInt(x)]={x:fiveDayPrf[parseInt(x)][0],y:fiveDayPrf[parseInt(x)][1]}
        }
        for(let x in eightDayPrf){
            eightDayPrf[parseInt(x)]={x:eightDayPrf[parseInt(x)][0],y:eightDayPrf[parseInt(x)][1]}
        }
        for(let x in fifteenDayPrf){
            fifteenDayPrf[parseInt(x)]={x:fifteenDayPrf[parseInt(x)][0],y:fifteenDayPrf[parseInt(x)][1]}
        }

      this.setState({
          fiveDayPrf:{
            datasets: [{ 
                data: fiveDayPrf,
                label: '3days before 2days after',
                backgroundColor: chartColors.blue
            }]
        },
        eightDayPrf:{
            datasets: [{ 
                data: eightDayPrf,
                label: '5days before 3days after',
                backgroundColor: chartColors.blue
            }]
        },
        fifteenDayPrf:{
            datasets: [{ 
                data: fifteenDayPrf,
                label: '10days before 5days after',
                backgroundColor: chartColors.blue
            }]
        },
          nowDayPrf1:nowDayPrf1,
          nowDayPrf2:nowDayPrf2,
          nowDayPrf3:nowDayPrf3
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
          <div className="ana2Div">
              <div>possible net change</div>
              <div style={{display:'flex'}}>
                  <div style={{width:'33.3%'}}>
                  <div>
                  3days before 2days after:
                  </div>
                  <div>
                    {this.state.nowDayPrf1?this.state.nowDayPrf1.map((value, index) => {
                          return <li key={index}>{value}%</li>
                      }):null}
                  </div>
                  </div>
                  <div style={{width:'33.3%'}}>
                      <div>
                      5days before 3days after:
                      </div>
                      <div>
                          {this.state.nowDayPrf2?this.state.nowDayPrf2.map((value, index) => {
                              return <li key={index}>{value}%</li>
                          }):null}
                      </div>
                  </div>
                  <div style={{width:'33.3%'}}>
                      <div>
                      10days before 5days after:
                      </div>
                      <div>
                          {this.state.nowDayPrf3?this.state.nowDayPrf3.map((value, index) => {
                              return <li key={index}>{value}%</li>
                          }):null}
                      </div>
                  </div>
              </div>
              <div style={{display:'flex',flexWrap:'wrap'}}>
              <div className='oneInThree'>
              nowPast:{this.state.nowThreePast}%
              {this.state.fiveDayPrf&&this.state.fiveDayPrf.datasets?<Scatter data={this.state.fiveDayPrf}/>:null}
              </div>
              <div className='oneInThree'>
              nowPast:{this.state.nowFivePast}%
              {this.state.eightDayPrf&&this.state.eightDayPrf.datasets?<Scatter data={this.state.eightDayPrf}/>:null}
              </div>
              <div className='oneInThree'>
              nowPast:{this.state.nowTenPast}%
              {this.state.fifteenDayPrf&&this.state.fifteenDayPrf.datasets?<Scatter data={this.state.fifteenDayPrf}/>:null}
              </div>
              </div>
          </div>
      )
  }
}

export default Ana2;
