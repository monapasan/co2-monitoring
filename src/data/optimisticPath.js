export const consumptionBySource = {
    '2015': {
        Oil: 0.25,
        'Natural Gas': 1.7,
        Coal: 2.6,
        'Biomass / Waste Solids': 0.48,
        Nuclear: 2.58,
        'Hydro-electricity': 1.73,
        Geothermal: 0.04,
        Solar: 0.38,
        Wind: 0.95,
        'Other Renewables': 0.0,
    },
    '2020': {
        Oil: 0.22,
        'Natural Gas': 1.77,
        Coal: 2.24,
        'Biomass / Waste Solids': 0.73,
        Nuclear: 2.39,
        'Hydro-electricity': 1.63,
        Geothermal: 0.04,
        Solar: 0.64,
        Wind: 1.27,
        'Other Renewables': 0.0,
    },
}

// Solar (solar farms / residential solars/concentrated solar) 48/41/27
export const kwhToCo2Coefficient = {
    Oil: 733,
    'Natural Gas': 490,
    Coal: 820,
    'Biomass / Waste Solids': 740,
    Nuclear: 12,
    'Hydro-electricity': 24,
    Geothermal: 38,
    Solar: 39,
    Wind: 12,
    'Other Renewables': 15,
    unknown: 700,
}

// 0,25
// 1,70
// 2,60
// 0,48
// 2,58
// 1,73
// 0,04
// 0,38
// 0,95
// 0,00

// 0,22
// 1,77
// 2,24
// 0,73
// 2,39
// 1,63
// 0,04
// 0,64
// 1,27
// 0,00
