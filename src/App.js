import React, { Component } from 'react'
import OptimisticChart from './charts/optimistic'
import './App.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    CO2 Emission Monitoring with Sky optimistic path
                    <div className="Description">
                        Real time monitoring by sectors and global regions for
                        co2 emissions to provide everybody detailed overview of
                        energy consumption and related Co2 emission. This
                        monitoring allows you to see the consumption of energy
                        and produced co2 emissions by analysing real time data
                        of monitored sectors like energy production or passenger
                        transport and freight transport by ship or/and by air.
                    </div>
                </header>
                <OptimisticChart />
            </div>
        )
    }
}

export default App
