/**
 * This is a function to specifically convert all the segment object from flat geometry to 3d geometry by adding some depth
 * @param segmentDisplay all the segment object to be converted
 * @param depth how deep the object will be. 0.05 might be ideal in this case
 * @return new list of segment object
 * */
export default (segmentDisplay, depth = 0.05) => segmentDisplay.map((character) => {

  //#region  //*=========== Duplicate each segment and adjust the z coordinates to get some depth ===========
  const additionalData = character.data.map(value => ({
    ...value,
    coordinates: value.coordinates.map((val, index) => index % 3 === 2 ? -depth : val)
  }))
  //#endregion  //*======== Duplicate each segment and adjust the z coordinates to get some depth ===========

  const data = [...character.data, ...additionalData]

  const sides = character.data.map((segment, index) => {
    //#region  //*=========== Reshape little segment coordinate from array to 2d array ===========
    const frontSegment = [...segment.coordinates]
    const listOfFrontCoordinates = []
    while (frontSegment.length) listOfFrontCoordinates.push(frontSegment.splice(0, 3))

    const backSegment = [...additionalData[index].coordinates]
    const listOfBackCoordinates = []
    while (backSegment.length) listOfBackCoordinates.push(backSegment.splice(0,3))
    //#endregion  //*======== Reshape little segment coordinate from array to 2d array ===========

    const result = []

    for (let i = 0; i < listOfFrontCoordinates.length; i++) {

      //#region  //*=========== If segment is filled, then add face, otherwise, just add a line ===========
      const coordinate = [...listOfFrontCoordinates[i]]
      if (segment.isFilled) {
        coordinate.push(...listOfFrontCoordinates[(i+1) %  6])
        coordinate.push(...listOfBackCoordinates[(i+1) % 6])
      }
      coordinate.push(...listOfBackCoordinates[i])
      //#endregion  //*======== If segment is filled, then add face, otherwise, just add a line ===========

      result.push({
        coordinates: coordinate,
        indices: segment.isFilled ? [0, 1, 2, 0, 2, 3] : [0, 1],
        isFilled: segment.isFilled,
        isOn: segment.isOn,
      })
    }

    return result
  })

  sides.forEach(side => {
    data.push(...side)
  })

  return {
    ...character,
    data
  }
})