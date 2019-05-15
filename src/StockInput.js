import React from 'react';
import { Input ,Sticky} from 'semantic-ui-react'

function StockInput(props) {
  return (
    <div>
      <Sticky>
      <Input fluid icon='search'
        label={{ basic: true, content: 'HK' }}
        labelPosition='left'
        placeholder='Stock code'
        className="stockInput" onChange={props.onChange} style={{ width: "100%" }}
      />
      </Sticky>
      
      {props.value}
    </div>
  )
}

export default StockInput;
