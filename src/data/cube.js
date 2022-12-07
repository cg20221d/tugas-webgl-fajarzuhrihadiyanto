export default {
    data: [
        {
            coordinates: [
                -6/37, 6/37, 6/37,
                6/37, 6/37, 6/37,
                6/37, -6/37, 6/37,
                -6/37, -6/37, 6/37,
            ],
            normal: [0,0,1],
            indices: [0, 1, 2, 0, 2, 3],
            color: [255, 255, 255],
            isFilled: true,
        },
        {
            coordinates: [
                -6/37, 6/37, -6/37,
                6/37, 6/37, -6/37,
                6/37, -6/37, -6/37,
                -6/37, -6/37, -6/37,
            ],
            normal: [0,0,-1],
            indices: [0, 1, 2, 0, 2, 3],
            color: [255, 255, 255],
            isFilled: true,
        },
        {
            coordinates: [
                -6/37, 6/37, 6/37,
                6/37, 6/37, 6/37,
                6/37, 6/37, -6/37,
                -6/37, 6/37, -6/37,
            ],
            normal: [0,1,0],
            indices: [0, 1, 2, 0, 2, 3],
            color: [255, 255, 255],
            isFilled: true,
        },
        {
            coordinates: [
                -6/37, -6/37, 6/37,
                6/37, -6/37, 6/37,
                6/37, -6/37, -6/37,
                -6/37, -6/37, -6/37,
            ],
            normal: [0,-1,0],
            indices: [0, 1, 2, 0, 2, 3],
            color: [255, 255, 255],
            isFilled: true,
        },
        {
            coordinates: [
                6/37, -6/37, 6/37,
                6/37, 6/37, 6/37,
                6/37, 6/37, -6/37,
                6/37, -6/37, -6/37,
            ],
            normal: [1,0,0],
            indices: [0, 1, 2, 0, 2, 3],
            color: [255, 255, 255],
            isFilled: true,
        },
        {
            coordinates: [
                -6/37, -6/37, 6/37,
                -6/37, 6/37, 6/37,
                -6/37, 6/37, -6/37,
                -6/37, -6/37, -6/37,
            ],
            normal: [-1,0,0],
            indices: [0, 1, 2, 0, 2, 3],
            color: [255, 255, 255],
            isFilled: true,
        },
    ],
    isCube: true,
    initIsTransform: false,
    transformMultiplier: 1,
    transformationData: [
        {
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
                    type: 'translate',
                    theta: [0, 0, 0],
                    factor: [0.0248, 0, 0],
                    addFn: (i, f, m= 1) => i + m * f,
                    transformFn: i => i
                }
            ]
        },
    ]
}