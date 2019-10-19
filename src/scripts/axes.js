import {getPixelPositionInsideTheSvgPlane, isPointOutOfPlane} from './point'
import {svgNS, primeSpiralsSVGcontainer} from './init'
import {makeNumberGenerator} from './utils'


function createAxisTickVirtualElement({cartesianCoordinate, axis, tickText, tickRadius}) {
  const pixelPositionOfPointInsideTheSvgPlane = getPixelPositionInsideTheSvgPlane({cartesianCoordinate})
  const isTrue = isPointOutOfPlane({pixelPositionOfPointInsideTheSvgPlane})
  if (isTrue) {
    return {
      status: 'tick is over the plane',
      virtualElement: null
    }
  }
  const key = `cc:(${cartesianCoordinate.x},${cartesianCoordinate.y})`
  const virtualElement = {
    key,
    cx: pixelPositionOfPointInsideTheSvgPlane.x,
    cy: pixelPositionOfPointInsideTheSvgPlane.y,
    r: tickRadius,
    id: 'axes-tick-point'
  }
  // if (tickText) {
  //   const tickTextElement = document.createElementNS(svgNS, 'text')
  //   tickTextElement.id = 'axes-tick-text'
  //   tickTextElement.setAttribute('x', axis === 'X' ? x - 2 : x - 20)
  //   tickTextElement.setAttribute('y', axis === 'X' ? y + 15 : y)
  //   tickTextElement.appendChild(document.createTextNode(tickText))
  //   primeSpiralsSVGcontainer.appendChild(tickTextElement)
  // }
  // console.log({point})
  // primeSpiralsSVGcontainer.appendChild(tickCircle)
  return {
    status: 'successfull placed tick in the plane',
    virtualElement
  }
}

export function createAxesTicksVirtualElements({showTickNumbers = false} = {}) {
  const axesTicksVirtualElements = []
  const quadrantsNeededToCoverAllAxes = [1, 3]
  const axes = ['X', 'Y']
  quadrantsNeededToCoverAllAxes.forEach((quadrant) => {
    axes.forEach((axis) => {
      let numberGenerator = makeNumberGenerator()
      if (quadrant === 3) {
        numberGenerator = makeNumberGenerator({generationType: 'decrement'})
      }
      let getNextCartesianCoordinate
      
      let nextResultOfNumberGenerator = numberGenerator.next()
      
      switch (axis) {
        case 'X':
          getNextCartesianCoordinate = function () {
            const nextCartesianCoordinate = {x: nextResultOfNumberGenerator.value, y: 0}
            return nextCartesianCoordinate
          }
          break;
      
        case 'Y':
          getNextCartesianCoordinate = function () {
            const nextCartesianCoordinate = {x: 0, y: nextResultOfNumberGenerator.value}
            return nextCartesianCoordinate
          }
          break;
      }
      const virtualElementsForThisAxis = []
      while (!nextResultOfNumberGenerator.done) {
        const cartesianCoordinate = getNextCartesianCoordinate()
        const {status, virtualElement} = createAxisTickVirtualElement({
          cartesianCoordinate, axis, tickText: showTickNumbers ? nextResultOfNumberGenerator.value : null, tickRadius: 2
        })
        
        if (status === 'tick is over the plane') {
          nextResultOfNumberGenerator = numberGenerator.return()
        } else {
          virtualElementsForThisAxis.push(virtualElement)
          axesTicksVirtualElements.push(virtualElement)
          nextResultOfNumberGenerator = numberGenerator.next()
        }
      }
      console.log({quadrant, axis, virtualElementsForThisAxis})
    })
  })
  console.log({axesTicksVirtualElements})
  return axesTicksVirtualElements
}