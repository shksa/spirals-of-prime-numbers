import { makePrimeNumberGenerator, makeNumberGenerator } from './utils'
import { 
  primeSpiralsSVGcontainer, svgNS, zoomLevelInputElement, appState, planeUnitScaleInputElement, thePlane
} from './init'
import { createAxesTicksVirtualElements } from './axes'
import { 
  getPixelPositionFromPolarCoordinate, createVirtualPointOnPlaneUsingPolarCoordinate, createVirtualPointOnPlaneUsingCartesianCoordinate 
} from './point'
import * as vdom from './vdom'

// function getQcontrolPointPixelPosition({pointAinPolar, pointBinPolar}) {
//   const dθ = pointBinPolar.θ - pointAinPolar.θ
//   const controlPointInPolar = {r: pointBinPolar.r + 1, θ: pointAinPolar.θ + (dθ / 2)}
//   const controlPointPixelPosition = getPixelPositionFromPolarCoordinate({polarCoordinate: controlPointInPolar})
//   return controlPointPixelPosition
// }
function removeAllChildren(params) {
  primeSpiralsSVGcontainer.innerHTML = ''
}

function createCircularPlane(params) {
  const circularPlane = document.createElementNS(svgNS, 'circle')
  circularPlane.setAttribute('cx', 0)
  circularPlane.setAttribute('cy', 0)
  circularPlane.setAttribute('r', '50%')
  primeSpiralsSVGcontainer.appendChild(circularPlane)
  appState.thePlane = circularPlane
}

zoomLevelInputElement.onchange = function handleZoomLevelChange(evt) {
  const newZoomLevel = Number(evt.target.value)
  console.log({newZoomLevel})
  const multiplicationFactorForPlaneReCentering = newZoomLevel / appState.initZoomLevel
  appState.planeCenterPixelPosition.x = appState.initPixelPositionOfCenterOfPlane.x * multiplicationFactorForPlaneReCentering
  appState.planeCenterPixelPosition.y = appState.initPixelPositionOfCenterOfPlane.y * multiplicationFactorForPlaneReCentering
  primeSpiralsSVGcontainer.setAttribute('viewBox', `${-(newZoomLevel/2)} ${-(newZoomLevel/2)} ${newZoomLevel} ${newZoomLevel}`)
  const newPointRadius = appState.initPointRadius * multiplicationFactorForPlaneReCentering
  appState.currentPointRadius = newPointRadius
  // removeAllChildren()
  // createCircularPlane()
  // createAxesTicksVirtualElements()
  vdom.addElementListInsidePlane(createVirtualElementListForPrimesInPolarForm())
}

planeUnitScaleInputElement.onchange = function handlePlaneUnitScaleChange(evt) {
  const newPlaneUnitScale = Number(evt.target.value)
  console.log({newPlaneUnitScale})
  appState.planeUnitScale = newPlaneUnitScale
  // removeAllChildren()
  // createCircularPlane()
  vdom.addElementListInsidePlane(createVirtualElementListForPrimesInPolarForm())
  // vdom.addElementListInsidePlane(createAxesTicksVirtualElements())
}

function createVirtualElementListForPrimesInPolarForm(pointRadius = appState.currentPointRadius) {
  const virtualElements = []

  const primeNumberGenerator = makePrimeNumberGenerator()

  let nextResultOfPrimeNumberGenerator = primeNumberGenerator.next()
  
  while (!nextResultOfPrimeNumberGenerator.done) {
    const nextPrimeNumber = nextResultOfPrimeNumberGenerator.value
    
    const matchingPrimePolarCoordinate = {
      r: nextPrimeNumber,
      θ: nextPrimeNumber
    }
    
    const { status, virtualElement } = createVirtualPointOnPlaneUsingPolarCoordinate({
      polarCoordinate: matchingPrimePolarCoordinate, pointRadius, showLabel: false
    })
    
    if (status === 'point is over the plane') {
      nextResultOfPrimeNumberGenerator = primeNumberGenerator.return()
    } else {
      virtualElements.push(virtualElement)
      nextResultOfPrimeNumberGenerator = primeNumberGenerator.next() 
    }
  }
  
  return virtualElements
}

vdom.addElementListInsidePlane(createVirtualElementListForPrimesInPolarForm())

// vdom.addElementListInsidePlane(createAxesTicksVirtualElements())

// drawPrimeSpirals()

// drawPointOnPlaneUsingCartesianCoordinate({
//   cartesianCoordinate: {x: 4, y: 4}
// })