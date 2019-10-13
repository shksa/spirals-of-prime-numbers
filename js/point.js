import {
  pixelPositionOfCenterOfThePlane, thePlane, PLANE_UNIT_TO_PIXELS_SCALING_FACTOR, svgNS, primeSpiralsSVGcontainer
} from './setup'
import {getCartesianFromPolarCoordinate} from './utils'

export function getPixelPositionInsideTheSvgPlane({cartesianCoordinate}) {
  const pixelPositionX = pixelPositionOfCenterOfThePlane.x + (cartesianCoordinate.x * PLANE_UNIT_TO_PIXELS_SCALING_FACTOR)
  const pixelPositionY = pixelPositionOfCenterOfThePlane.y - (cartesianCoordinate.y * PLANE_UNIT_TO_PIXELS_SCALING_FACTOR)
  const pixelPositionInsideSVG = {x: pixelPositionX, y: pixelPositionY}
  // console.log({pixelPositionInsideSVG})
  return pixelPositionInsideSVG
}

export function isPointOutOfPlane({pixelPositionOfPointInsideTheSvgPlane}) {
  const heightOf2DplaneInPx = pixelPositionOfCenterOfThePlane.y + thePlane.r.animVal.value
  const widthOf2DplaneInPx = pixelPositionOfCenterOfThePlane.x + thePlane.r.animVal.value
  // console.log({ heightOf2DplaneInPx, widthOf2DplaneInPx})
  let result = false
  if (
    pixelPositionOfPointInsideTheSvgPlane.x > widthOf2DplaneInPx || 
    pixelPositionOfPointInsideTheSvgPlane.x < 0 ||
    pixelPositionOfPointInsideTheSvgPlane.y < 0 ||
    pixelPositionOfPointInsideTheSvgPlane.y > heightOf2DplaneInPx
  ) {
    result = true
  }
  return result
}

function drawPointOnPlane({cartesianCoordinate, pointRadius, pointLabelText = null}) {
  const pixelPositionOfPointInsideTheSvgPlane = getPixelPositionInsideTheSvgPlane({cartesianCoordinate})
  const isTrue = isPointOutOfPlane({pixelPositionOfPointInsideTheSvgPlane})
  let status
  if (isTrue) {
    return {
      status: 'point is over the plane',
      pixelPositionOfPointInsideTheSvgPlane
    }
  }
  const {x, y} = pixelPositionOfPointInsideTheSvgPlane
  const point = document.createElementNS(svgNS, 'circle')
  point.id = 'point'
  point.setAttribute('cx', x)
  point.setAttribute('cy', y)
  point.setAttribute('r', pointRadius)
  // console.log({point})
  if (pointLabelText) {
    const pointLabelElement = document.createElementNS(svgNS, 'text')
    pointLabelElement.id = 'point-label'
    pointLabelElement.setAttribute('x', x + 5)
    pointLabelElement.setAttribute('y', y - 10)
    pointLabelElement.appendChild(document.createTextNode(pointLabelText))
    primeSpiralsSVGcontainer.appendChild(pointLabelElement)
  }
  primeSpiralsSVGcontainer.appendChild(point)
  return {
    status: 'successfull placed point in the plane',
    pixelPositionOfPointInsideTheSvgPlane
  }
}

export function drawPointOnPlaneUsingPolarCoordinate({polarCoordinate = {r: 0, θ: 0}, pointRadius = 5, showLabel = false}) {
  const cartesianCoordinate = getCartesianFromPolarCoordinate({polarCoordinate})
  let pointLabelText = null
  if (showLabel) {
    pointLabelText = `(${polarCoordinate.r}, ${polarCoordinate.θ})`
  }
  const result = drawPointOnPlane({cartesianCoordinate, pointRadius, pointLabelText})
  return result
}

export function getPixelPositionFromPolarCoordinate({polarCoordinate = {r: 0, θ: 0}}) {
  const cartesianCoordinate = getCartesianFromPolarCoordinate({polarCoordinate})
  const pixelPosition = getPixelPositionInsideTheSvgPlane({cartesianCoordinate})
  return pixelPosition
}