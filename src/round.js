export function round(aftherPoint,value){
  let zero=Math.pow(10,aftherPoint)
  return Math.round(value*zero)/zero
}

export const chartColors={
  blue:"rgb(54,162,235)",
  green:"rgb(75,192,192)",
  red:"rgb(255,99,132)",
  orange:"rgb(255,159,64)",
  purple:"rgb(153,102,255)",
  yellow:"rgb(255,205,86)"
}