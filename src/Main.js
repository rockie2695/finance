import React, { Component } from 'react';
import StockAna from './StockAna'
import StockInput from './StockInput'
import 'semantic-ui-css/semantic.min.css'
import { Button} from 'semantic-ui-react'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            error: null,
            isLoaded: null,
            respone: null,
            dayNumber: 100,
        }
    }
    handleChange(value) {
        this.setState({ value: value, error: null }, () => {
            if (this.state.value) {
                this.setState({ isLoaded: false })
                this.getStockData()
            } else {
                this.setState({ isLoaded: null })
            }
        })
    }
    changeDays(value) {
        this.setState({ dayNumber: value })
    }
    getStockData() {
        this.setState({
            value: this.state.value.padStart(5, '0')
        })
        fetch(`https://www.quandl.com/api/v3/datasets/HKEX/${this.state.value.padStart(5, '0')}.json?api_key=xCJuSM5DeG9s9PtmNbFg`)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.quandl_error) {
                        this.setState({
                            error: true
                        });
                    } else if (result.dataset.dataset_code === this.state.value) {
                        this.setState({
                            isLoaded: true,
                            respone: result
                        });
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        return (
            <div>
                <div className="stockInputDiv" style={{ textAlign: 'center' }}>
                    <StockInput
                        onChange={(event) => { this.handleChange(event.target.value) }}
                        value={this.state.value}
                    />
                </div>
                <div className="stockAnaDiv" style={{ textAlign: 'center' }}>
                    {this.state.error
                        ? <div>error</div>
                        : (this.state.isLoaded != null && !this.state.isLoaded)
                            ? <div>loading</div>
                            : this.state.value
                                ? <div>
                                    <Button.Group widths='3'>
                                    <Button onClick={() => this.changeDays(100)}>100Days</Button>
                                    <Button onClick={() => this.changeDays(200)}>200Days</Button>
                                    <Button onClick={() => this.changeDays(300)}>300Days</Button>
                                    </Button.Group>
                                    
                                    day: {this.state.dayNumber}
                                    <StockAna value={this.state.value} respone={this.state.respone} dayNumber={this.state.dayNumber} />
                                </div>
                                : null
                    }
                </div>
            </div>
        )
    }
}

export default App;
