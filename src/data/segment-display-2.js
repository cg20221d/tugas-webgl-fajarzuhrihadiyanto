export default {
    data: [
        {
            coordinates: [
                -15 / 37, 12 / 37, 0,
                -14 / 37, 11 / 37, 0,
                -14 / 37, 2 / 37, 0,
                -15 / 37, 1 / 37, 0,
                -16 / 37, 2 / 37, 0,
                -16 / 37, 11 / 37, 0,
            ],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: true
        }
        ,
        {
            coordinates: [
                -15 / 37, -12 / 37, 0,
                -14 / 37, -11 / 37, 0,
                -14 / 37, -2 / 37, 0,
                -15 / 37, -1 / 37, 0,
                -16 / 37, -2 / 37, 0,
                -16 / 37, -11 / 37, 0,
            ],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: true
        },
        {
            coordinates: [
                -14 / 37, 13 / 37, 0,
                -13 / 37, 14 / 37, 0,
                -4 / 37, 14 / 37, 0,
                -3 / 37, 13 / 37, 0,
                -4 / 37, 12 / 37, 0,
                -13 / 37, 12 / 37, 0,
            ],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: true
        },
        {
            coordinates: [
                -14 / 37, 0 / 37, 0,
                -13 / 37, 1 / 37, 0,
                -4 / 37, 1 / 37, 0,
                -3 / 37, 0 / 37, 0,
                -4 / 37, -1 / 37, 0,
                -13 / 37, -1 / 37, 0,
            ],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: true
        },
        {
            coordinates: [
                -14 / 37, -13 / 37, 0,
                -13 / 37, -14 / 37, 0,
                -4 / 37, -14 / 37, 0,
                -3 / 37, -13 / 37, 0,
                -4 / 37, -12 / 37, 0,
                -13 / 37, -12 / 37, 0,
            ],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: true
        },
        {
            coordinates: [
                -2 / 37, 12 / 37, 0,
                -1 / 37, 11 / 37, 0,
                -1 / 37, 2 / 37, 0,
                -2 / 37, 1 / 37, 0,
                -3 / 37, 2 / 37, 0,
                -3 / 37, 11 / 37, 0,
            ],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: true
        },
        {
            coordinates: [
                -2 / 37, -12 / 37, 0,
                -1 / 37, -11 / 37, 0,
                -1 / 37, -2 / 37, 0,
                -2 / 37, -1 / 37, 0,
                -3 / 37, -2 / 37, 0,
                -3 / 37, -11 / 37, 0,
            ],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: true
        },
    ],
    initIsTransform: true,
    transformMultiplier: 1,
    transformations: [
        {
            type: 'translate',
            init: [-1.216, 0, 0],
            factor: [0, 0, 0],
            addFn: (i, f, m=1) => i.map((e, index) => e + m * f[index]),
            transformFn: i => i
        },
        {
            type: 'scale',
            init: [0, 0, 0],
            factor: [0.01, 0.01, 0],
            addFn: (i, f, m=1) => i.map((e, index) => e + m * f[index]),
            transformFn: i => i.map(e => {
                const lowerBound = 0.5
                const upperBound = 2
                const range = upperBound - lowerBound
                const initial = 1 // must be between lowerBound (inclusive) and upperBound (exclusive)
                return (range/2) * Math.sin(e - Math.asin(2 * (((lowerBound + upperBound) / 2) - initial)/range)) + (range/2) + lowerBound
            })
        },
        {
            type: 'translate',
            init: [1.216, 0, 0],
            factor: [0, 0, 0],
            addFn: (i, f, m=1) => i.map((e, index) => e + m * f[index]),
            transformFn: i => i
        },
    ]
}
