export default {
    data: [
        {
            coordinates: [
                19 / 37, 12 / 37, 0,
                18 / 37, 11 / 37, 0,
                18 / 37, 2 / 37, 0,
                19 / 37, 1 / 37, 0,
                20 / 37, 2 / 37, 0,
                20 / 37, 11 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: false
        },
        {
            coordinates: [
                19 / 37, -12 / 37, 0,
                18 / 37, -11 / 37, 0,
                18 / 37, -2 / 37, 0,
                19 / 37, -1 / 37, 0,
                20 / 37, -2 / 37, 0,
                20 / 37, -11 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: true
        },
        {
            coordinates: [
                31 / 37, 13 / 37, 0,
                30 / 37, 14 / 37, 0,
                21 / 37, 14 / 37, 0,
                20 / 37, 13 / 37, 0,
                21 / 37, 12 / 37, 0,
                30 / 37, 12 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: false
        },
        {
            coordinates: [
                31 / 37, 0 / 37, 0,
                30 / 37, 1 / 37, 0,
                21 / 37, 1 / 37, 0,
                20 / 37, 0 / 37, 0,
                21 / 37, -1 / 37, 0,
                30 / 37, -1 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: true
        },
        {
            coordinates: [
                31 / 37, -13 / 37, 0,
                30 / 37, -14 / 37, 0,
                21 / 37, -14 / 37, 0,
                20 / 37, -13 / 37, 0,
                21 / 37, -12 / 37, 0,
                30 / 37, -12 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: true
        },
        {
            coordinates: [
                32 / 37, 12 / 37, 0,
                31 / 37, 11 / 37, 0,
                31 / 37, 2 / 37, 0,
                32 / 37, 1 / 37, 0,
                33 / 37, 2 / 37, 0,
                33 / 37, 11 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: false
        },
        {
            coordinates: [
                32 / 37, -12 / 37, 0,
                31 / 37, -11 / 37, 0,
                31 / 37, -2 / 37, 0,
                32 / 37, -1 / 37, 0,
                33 / 37, -2 / 37, 0,
                33 / 37, -11 / 37, 0,
            ],
            indices: [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5],
            isFilled: true,
            isOn: true
        },
    ],
    initIsTransform: false,
    transformMultiplier: 1,
    events: (isTransform, transformMultiplier, index) => [
        {
            eventName: 'keydown',
            callback: event => {
                if ([38, 40].includes(event.keyCode)) {
                    isTransform[index] = true
                    transformMultiplier[index] = event.keyCode - 39
                }
            }
        },
        {
            eventName: 'keyup',
            callback: event => {
                if ([38, 40].includes(event.keyCode)) {
                    isTransform[index] = false
                }
            }
        }
    ],
    transformations: [
        {
            type: 'rotateX',
            theta: 0,
            factor: 0.01,
            addFn: (i, f, m= 1) => i + m * f,
            transformFn: i => i
        }
    ]
}