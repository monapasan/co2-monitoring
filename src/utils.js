import { range } from 'lodash'

export const ej_to_kwh = ej_value => ej_value * 2.778e11

export const linspace = (a, b, steps) => {
    const every = (b - a) / (steps - 1)
    const ranged = range(a, b, every)

    return ranged.length === steps ? ranged : ranged.concat(b)
}

export const mWToKwH = value => {
    return value / (1000 * 24)
}

export const dateFormat = 'Do MMMM YYYY'

export const formatNumber = number => Number(number.toExponential(1))
