import { compose, withStateHandlers, withProps } from 'recompose'
import { zipWith } from 'lodash'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import { ej_to_kwh, linspace, dateFormat, mWToKwH } from '../../utils'
import {
    consumptionBySource,
    kwhToCo2Coefficient,
} from '../../data/optimisticPath'
import { energyConsMWPerCountry } from '../../data/realData'

const aggregateRealData = () =>
    energyConsMWPerCountry.reduce(
        (acc, { energyConsMW }) =>
            acc +
            Object.values(energyConsMW).reduce(
                (acc2, mWhValue) => acc2 + mWhValue,
                0
            ),
        0
    )

const moment = extendMoment(Moment)
const daysInYear = 365
const getTotal = key =>
    Object.values(consumptionBySource[key]).reduce((value, acc) => acc + value)

const getKwh = deltaDays => {
    const optimisticTotal2015 = getTotal('2015') / daysInYear
    const optimisticTotal2020 = getTotal('2020') / daysInYear
    const yAxisData = linspace(
        ej_to_kwh(optimisticTotal2015),
        ej_to_kwh(optimisticTotal2020),
        deltaDays
    ) //.map(formatNumber)
    return yAxisData
}

const calculateCo2 = key =>
    Object.entries(consumptionBySource[key]).reduce(
        (acc, [key, value]) => acc + value * kwhToCo2Coefficient[key],
        0
    )

const calculateCo2ForRealData = () => {
    debugger
    return energyConsMWPerCountry
        .map(({ energyConsMW }) =>
            Object.entries(energyConsMW).reduce(
                (acc, [key, mWh]) =>
                    acc + mWToKwH(mWh) * kwhToCo2Coefficient[key],
                0
            )
        )
        .reduce((acc, sum) => acc + sum, 0)
}

const getCo2 = deltaDays => {
    const co2_2015 = calculateCo2('2015') / daysInYear
    const co2_2020 = calculateCo2('2020') / daysInYear
    const yAxisData = linspace(co2_2015, co2_2020, deltaDays) //.map(formatNumber)
    return yAxisData
}
const getChartData = ({ selectedValue }) => {
    const start = new Date(2015, 0, 1)
    const end = new Date(2020, 0, 1)
    const dateRange = Array.from(moment.range(start, end).by('day')).map(date =>
        date.format(dateFormat)
    )
    const realTimeData =
        selectedValue === 'KwH'
            ? mWToKwH(aggregateRealData())
            : calculateCo2ForRealData()
    const deltaDays = dateRange.length
    const yAxisData =
        selectedValue === 'KwH' ? getKwh(deltaDays) : getCo2(deltaDays)

    const chartData = zipWith(dateRange, yAxisData, (x, y) => ({
        x,
        y,
    }))
    return {
        chartData,
        minYValue: yAxisData[0],
        realTimeData,
    }
}

const onChange = ({ selectedValue }) => () => ({
    selectedValue: selectedValue === 'KwH' ? 'gCO2eq' : 'KwH',
})

export default compose(
    withStateHandlers({ selectedValue: 'KwH' }, { onChange }),
    withProps(getChartData)
)
