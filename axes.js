import {getPixelPositionInsideTheSvgPlane, isPointOutOfPlane} from './point'
import {svgNS, primeSpiralsSVGcontainer} from './setup'
import {makeNumberGenerator} from './utils'

function drawAnAxisTick({cartesianCoordinate, quadrant, axis, tickText, tickRadius}) {
  const pixelPositionOfPointInsideTheSvgPlane = getPixelPositionInsideTheSvgPlane({cartesianCoordinate})
  const isTrue = isPointOutOfPlane({pixelPositionOfPointInsideTheSvgPlane})
  if (isTrue) {
    return 'tick is over the plane'
  }
  const tickCircle = document.createElementNS(svgNS, 'circle')
  const {x, y} = pixelPositionOfPointInsideTheSvgPlane
  tickCircle.setAttribute('cx', x)
  tickCircle.setAttribute('cy', y)
  tickCircle.setAttribute('r', tickRadius)
  tickCircle.setAttribute('fill', 'white')
  if (tickText) {
    const tickTextElement = document.createElementNS(svgNS, 'text')
    tickTextElement.id = 'axes-tick-text'
    tickTextElement.setAttribute('x', axis === 'X' ? x - 2 : x - 20)
    tickTextElement.setAttribute('y', axis === 'X' ? y + 15 : y)
    tickTextElement.appendChild(document.createTextNode(tickText))
    primeSpiralsSVGcontainer.appendChild(tickTextElement)
  }
  // console.log({point})
  primeSpiralsSVGcontainer.appendChild(tickCircle)
  return 'successfull placed tick in the plane'
}

export function drawAxesTicksForThePlane({showTickNumbers = false} = {}) {
  const quadrantsNeededToCoverAllAxes = [1, 3]
  const axes = ['X', 'Y']
  quadrantsNeededToCoverAllAxes.forEach((quadrant) => {
    axes.forEach((axis) => {
      let numberGenerator = makeNumberGenerator()
      if (quadrant === 3) {
        numberGenerator = makeNumberGenerator({generationType: 'decrement'})
      }
      let cartesianCoordinateGenerator
      
      let nextResultOfNumberGenerator = numberGenerator.next()
      
      switch (axis) {
        case 'X':
          cartesianCoordinateGenerator = function () {
            const nextCartesianCoordinate = {x: nextResultOfNumberGenerator.value, y: 0}
            return nextCartesianCoordinate
          }
          break;
      
        case 'Y':
          cartesianCoordinateGenerator = function () {
            const nextCartesianCoordinate = {x: 0, y: nextResultOfNumberGenerator.value}
            return nextCartesianCoordinate
          }
          break;
      }
      
      while (!nextResultOfNumberGenerator.done) {
        const cartesianCoordinate = cartesianCoordinateGenerator()
        const status = drawAnAxisTick({
          cartesianCoordinate, quadrant, axis, 
          tickText: showTickNumbers ? nextResultOfNumberGenerator.value : null, 
          tickRadius: 2
        })
        if (status === 'tick is over the plane') {
          numberGenerator.return()
        }
        nextResultOfNumberGenerator = numberGenerator.next()
      }
    })
  })
}