export default {
    data: [
        {
            coordinates: [
                -32 / 37, 12 / 37, 0,
                -31 / 37, 11 / 37, 0,
                -31 / 37, 2 / 37, 0,
                -32 / 37, 1 / 37, 0,
                -33 / 37, 2 / 37, 0,
                -33 / 37, 11 / 37, 0,
            ],
            normal: [0,0,1],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: true
        },
        {
            coordinates: [
                -32 / 37, -12 / 37, 0,
                -31 / 37, -11 / 37, 0,
                -31 / 37, -2 / 37, 0,
                -32 / 37, -1 / 37, 0,
                -33 / 37, -2 / 37, 0,
                -33 / 37, -11 / 37, 0,
            ],
            normal: [0,0,1],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: false
        },
        {
            coordinates: [
                -31 / 37, 13 / 37, 0,
                -30 / 37, 14 / 37, 0,
                -21 / 37, 14 / 37, 0,
                -20 / 37, 13 / 37, 0,
                -21 / 37, 12 / 37, 0,
                -30 / 37, 12 / 37, 0,
            ],
            normal: [0,0,1],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: false
        },
        {
            coordinates: [
                -31 / 37, 0 / 37, 0,
                -30 / 37, 1 / 37, 0,
                -21 / 37, 1 / 37, 0,
                -20 / 37, 0 / 37, 0,
                -21 / 37, -1 / 37, 0,
                -30 / 37, -1 / 37, 0,
            ],
            normal: [0,0,1],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: true
        },
        {
            coordinates: [
                -31 / 37, -13 / 37, 0,
                -30 / 37, -14 / 37, 0,
                -21 / 37, -14 / 37, 0,
                -20 / 37, -13 / 37, 0,
                -21 / 37, -12 / 37, 0,
                -30 / 37, -12 / 37, 0,
            ],
            normal: [0,0,1],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: false
        },
        {
            coordinates: [
                -19 / 37, 12 / 37, 0,
                -18 / 37, 11 / 37, 0,
                -18 / 37, 2 / 37, 0,
                -19 / 37, 1 / 37, 0,
                -20 / 37, 2 / 37, 0,
                -20 / 37, 11 / 37, 0,
            ],
            normal: [0,0,1],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: true
        },
        {
            coordinates: [
                -19 / 37, -12 / 37, 0,
                -18 / 37, -11 / 37, 0,
                -18 / 37, -2 / 37, 0,
                -19 / 37, -1 / 37, 0,
                -20 / 37, -2 / 37, 0,
                -20 / 37, -11 / 37, 0,
            ],
            normal: [0,0,1],
            indices: [0, 1, 2, 3, 4, 5],
            isFilled: false,
            isOn: true
        },
    ],
    shininessConstant: 10,
    initIsTransform: true,
    transformMultiplier: 1,
    transformations: [
        {
            type: 'translate',
            theta: [0, 0, 0],
            factor: [0.0248, 0, 0],
            addFn: (i, f, m=1) => i.map((e, index) => e + m * f[index]),
            transformFn: i => i.map(e => {
                const lowerBound = -1.3
                const upperBound = 8.2
                const range = upperBound - lowerBound
                const initial = 0 // must be between lowerBound (inclusive) and upperBound (exclusive)

                return (range/2) * Math.sin(e - Math.asin(2 * (((lowerBound + upperBound) / 2) - initial)/range)) + (range/2) + lowerBound
            })
        }
    ],
}