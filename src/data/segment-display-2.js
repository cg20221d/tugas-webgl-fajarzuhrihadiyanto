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
    transformations: [
        {
            type: 'translate',
            init: [-1.216, 0, 0],
            factor: [0, 0, 0],
            addFn: (i, f) => i.map((e, index) => e + f[index]),
            transformFn: i => i
        },
        {
            type: 'scale',
            init: [0, 0, 0],
            factor: [0.01, 0.01, 0],
            addFn: (i, f) => i.map((e, index) => e + f[index]),
            transformFn: i => i.map(e => (
              0.75 * Math.sin(e - Math.asin(1/3)) + 0.75 + 0.5
            ))
        },
        {
            type: 'translate',
            init: [1.216, 0, 0],
            factor: [0, 0, 0],
            addFn: (i, f) => i.map((e, index) => e + f[index]),
            transformFn: i => i
        },
    ]
}
