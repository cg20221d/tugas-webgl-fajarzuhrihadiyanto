export default {
    data: [
        {
            coordinates: [
                2 / 37, 12 / 37, 0,
                1 / 37, 11 / 37, 0,
                1 / 37, 2 / 37, 0,
                2 / 37, 1 / 37, 0,
                3 / 37, 2 / 37, 0,
                3 / 37, 11 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: true
        },
        {
            coordinates: [
                2 / 37, -12 / 37, 0,
                1 / 37, -11 / 37, 0,
                1 / 37, -2 / 37, 0,
                2 / 37, -1 / 37, 0,
                3 / 37, -2 / 37, 0,
                3 / 37, -11 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: true
        },
        {
            coordinates: [
                14 / 37, 13 / 37, 0,
                13 / 37, 14 / 37, 0,
                4 / 37, 14 / 37, 0,
                3 / 37, 13 / 37, 0,
                4 / 37, 12 / 37, 0,
                13 / 37, 12 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: false
        },
        {
            coordinates: [
                14 / 37, 0 / 37, 0,
                13 / 37, 1 / 37, 0,
                4 / 37, 1 / 37, 0,
                3 / 37, 0 / 37, 0,
                4 / 37, -1 / 37, 0,
                13 / 37, -1 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: true
        },
        {
            coordinates: [
                14 / 37, -13 / 37, 0,
                13 / 37, -14 / 37, 0,
                4 / 37, -14 / 37, 0,
                3 / 37, -13 / 37, 0,
                4 / 37, -12 / 37, 0,
                13 / 37, -12 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: true
        },
        {
            coordinates: [
                15 / 37, 12 / 37, 0,
                14 / 37, 11 / 37, 0,
                14 / 37, 2 / 37, 0,
                15 / 37, 1 / 37, 0,
                16 / 37, 2 / 37, 0,
                16 / 37, 11 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: false
        },
        {
            coordinates: [
                15 / 37, -12 / 37, 0,
                14 / 37, -11 / 37, 0,
                14 / 37, -2 / 37, 0,
                15 / 37, -1 / 37, 0,
                16 / 37, -2 / 37, 0,
                16 / 37, -11 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: false
        },
    ],
    initIsTransform: false,
    transformMultiplier: 1,
    events: (isTransform, transformMultiplier, index) => [
        {
            eventName: 'keydown',
            callback: event => {
                if ([37, 39].includes(event.keyCode)) {
                    isTransform[index] = true
                    transformMultiplier[index] = event.keyCode - 38
                }
            }
        },
        {
            eventName: 'keyup',
            callback: event => {
                if ([37, 39].includes(event.keyCode)) {
                    isTransform[index] = false
                }
            }
        }
    ],
    transformations: [
        // {
        //     type: 'translate',
        //     theta: [1.216, 0, 0],
        //     factor: [0, 0, 0],
        //     addFn: (i, f, m=1) => i.map((e, index) => e + m * f[index]),
        //     transformFn: i => i
        // },
        {
            type: 'rotateY',
            theta: 0,
            factor: 0.01,
            addFn: (i, f, m=1) => i + m * f,
            transformFn: i => i
        },
        // {
        //     type: 'translate',
        //     theta: [-1.216, 0, 0],
        //     factor: [0, 0, 0],
        //     addFn: (i, f, m=1) => i.map((e, index) => e + m * f[index]),
        //     transformFn: i => i
        // },
    ]
}