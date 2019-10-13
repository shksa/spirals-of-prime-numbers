import { makePrimeNumberGenerator } from './utils'
import { primeSpiralsSVGcontainer, svgNS, zoomLevelInputElement } from './setup'
import { drawAxesTicksForThePlane } from './axes'
import { getPixelPositionFromPolarCoordinate, drawPointOnPlaneUsingPolarCoordinate } from './point'

function getQcontrolPointPixelPosition({pointAinPolar, pointBinPolar}) {
  const dθ = pointBinPolar.θ - pointAinPolar.θ
  const controlPointInPolar = {r: pointBinPolar.r + 1, θ: pointAinPolar.θ + (dθ / 2)}
  const controlPointPixelPosition = getPixelPositionFromPolarCoordinate({polarCoordinate: controlPointInPolar})
  return controlPointPixelPosition
}

// zoomLevelInputElement.onchange = function handleZoomLevelChange(evt) {
//   const newZoomLevel = evt.target.value
//   console.log({newZoomLevel})
//   primeSpiralsSVGcontainer.setAttribute('viewBox', `0 0 ${newZoomLevel} ${newZoomLevel}`)
// }

function drawPrimeSpirals() {
  const primeNumberGenerator = makePrimeNumberGenerator()
  
  // let previousPolarCoordinate = {r: 1, θ: 1}
  
  // const pixelPositionOfPreviousPolarCoordinate = getPixelPositionFromPolarCoordinate({polarCoordinate: previousPolarCoordinate})
  
  // let spiralPathShape = `M ${pixelPositionOfPreviousPolarCoordinate.x} ${pixelPositionOfPreviousPolarCoordinate.y}`

  let nextResultOfPrimeNumberGenerator = primeNumberGenerator.next()
  
  while (!nextResultOfPrimeNumberGenerator.done) {
    const nextPrimeNumber = nextResultOfPrimeNumberGenerator.value
    
    const matchingPrimePolarCoordinate = {r: nextPrimeNumber, θ: nextPrimeNumber}
    
    const {
      status, 
      pixelPositionOfPointInsideTheSvgPlane
    } = drawPointOnPlaneUsingPolarCoordinate({polarCoordinate: matchingPrimePolarCoordinate, pointRadius: 1000})
    
    if (status === 'point is over the plane') {
      nextResultOfPrimeNumberGenerator = primeNumberGenerator.return()
    }
    
    // const quadraticCurveControlPointPixelPosition = getQcontrolPointPixelPosition({
    //   pointAinPolar: previousPolarCoordinate,
    //   pointBinPolar: matchingPrimePolarCoordinate
    // })
    
    // spiralPathShape += ` Q ${quadraticCurveControlPointPixelPosition.x} ${quadraticCurveControlPointPixelPosition.y}, ${pixelPositionOfPointInsideTheSvgPlane.x} ${pixelPositionOfPointInsideTheSvgPlane.y}`
    
    // previousPolarCoordinate = matchingPrimePolarCoordinate
    
    nextResultOfPrimeNumberGenerator = primeNumberGenerator.next()
  }
  
  // const spiralPath = document.createElementNS(svgNS, 'path')
  // spiralPath.id = 'spiral-path'
  // spiralPath.setAttribute('d', spiralPathShape)
  // primeSpiralsSVGcontainer.appendChild(spiralPath)
}

drawAxesTicksForThePlane()

drawPrimeSpirals()