import React from 'react'
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
} from 'recharts'
import { Radio, withStyles } from '@material-ui/core'
import CustomTooltip from '../tooltip'

const styles = {
    unit: {
        marginTop: 50,
    },
    radio: {
        padding: 30,
    },
}

const OptimisticChart = ({
    selectedValue,
    onChange,
    classes,
    chartData,
    minYValue,
}) => {
    return (
        <div>
            <div>
                <h3 className={classes.unit}>Choose the unit:</h3>
                gCO2eq{' '}
                <Radio
                    className={classes.radio}
                    checked={selectedValue === 'gCO2eq'}
                    onChange={onChange}
                    value="gCO2eq"
                    label="gCO2eq"
                    name="radio-button-demo"
                    aria-label="A"
                />
                KwH{' '}
                <Radio
                    className={classes.radio}
                    checked={selectedValue === 'KwH'}
                    onChange={onChange}
                    label="KwH"
                    value="KwH"
                    name="radio-button-demo"
                    aria-label="B"
                />
            </div>
            <LineChart
                width={1230}
                height={550}
                data={chartData}
                margin={{ top: 125, right: 30, left: 120, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis
                    domain={[minYValue, 'auto']}
                    tickFormatter={val => {
                        return val.toExponential(2)
                    }}
                />
                <Tooltip
                    content={
                        <CustomTooltip
                            name={
                                selectedValue === 'KwH'
                                    ? 'Overall consumption per day'
                                    : 'Life cycle CO2 equivalent per day'
                            }
                            unit={selectedValue}
                        />
                    }
                />
                <Legend verticalAlign="top" height={36} />
                <Line
                    name={
                        selectedValue === 'KwH'
                            ? 'Optimistic electricity Total Final Consumption'
                            : 'Life cycle CO2 equivalent per day'
                    }
                    type="monotone"
                    dataKey="y"
                    stroke="#8884d8"
                />
            </LineChart>
        </div>
    )
}

export default withStyles(styles)(OptimisticChart)
