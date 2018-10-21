const fs = require('fs')
const fetch = require('node-fetch')
const zonesEu = [
    'GE',
    'CY',
    'GR',
    'BG',
    'RO',
    'RS',
    'HU',
    'SK',
    'SI',
    'CZ',
    'PL',
    'LT',
    'LV',
    'EE',
    'FL',
    'NO',
    'SE',
    'BA',
    'DE',
    'NL',
    'BE',
    'FR',
    'IT',
    'ES',
    'PT',
    'GB',
    'IE',
]

const getUrl = country =>
    `https://api.electricitymap.org/v3/power-consumption-breakdown/history?zone=${country}`

const url = getUrl('DE')

const promises = zonesEu.map(zone => {
    const url = getUrl(zone)
    return fetch(url, {
        headers: {
            'auth-token': 'k8cUrcrjApGeuG7DM1VtuqaG',
        },
    })
        .then(response => response.json())
        .then(values => {
            const energyConsMW = values.history.reduce(
                (acc, { powerConsumptionBreakdown }) => {
                    Object.entries(powerConsumptionBreakdown).forEach(
                        ([energyType, valueInMW]) => {
                            acc[energyType] =
                                (acc[energyType] ? acc[energyType] : 0) +
                                (valueInMW || 0)
                        }
                    )
                    return acc
                },
                {}
            )

            return {
                zone: values.zone,
                energyConsMW,
            }
        })
        .catch(err => {
            console.log('zone', zone)

            console.log(err)
        })
})

Promise.all(promises).then(data => {
    fs.writeFile('./realData.json', JSON.stringify(data), err => {
        if (err) console.log('fuck ooooof')
        else console.log('fuck yeeeah')
    })
})
