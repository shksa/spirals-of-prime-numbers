import { svgNS, primeSpiralsSVGcontainer, appState, thePlane } from './init'
import {getCartesianFromPolarCoordinate} from './utils'

export function getPixelPositionInsideTheSvgPlane({cartesianCoordinate}) {
  // const pixelPositionX = pixelPositionOfCenterOfThePlane.x + (cartesianCoordinate.x * PLANE_UNIT_TO_PIXELS_SCALING_FACTOR)
  // const pixelPositionY = pixelPositionOfCenterOfThePlane.y - (cartesianCoordinate.y * PLANE_UNIT_TO_PIXELS_SCALING_FACTOR)
  // console.log({cartesianCoordinate})
  const pixelPositionX = cartesianCoordinate.x * appState.planeUnitScale
  const pixelPositionY = -(cartesianCoordinate.y * appState.planeUnitScale)
  const pixelPositionInsideSVG = {x: pixelPositionX, y: pixelPositionY}
  // console.log({pixelPositionInsideSVG})
  return pixelPositionInsideSVG
}

export function isPointOutOfPlane({pixelPositionOfPointInsideTheSvgPlane}) {
  let result = true
  const svgPoint = primeSpiralsSVGcontainer.createSVGPoint()
  svgPoint.x = pixelPositionOfPointInsideTheSvgPlane.x
  svgPoint.y = pixelPositionOfPointInsideTheSvgPlane.y
  if (thePlane.isPointInFill(svgPoint)) {
    result = false
  }
  return result
}

export function createVirtualPointOnPlaneUsingCartesianCoordinate({
  cartesianCoordinate = {x: 0, y: 0}, pointRadius = appState.initPointRadius, 
  pointLabelText = null, key
}) {
  let status, pointLabelVirtualElement = null, pointVirtualElement = null

  const pixelPositionOfPointInsideTheSvgPlane = getPixelPositionInsideTheSvgPlane({cartesianCoordinate})
  
  if (isPointOutOfPlane({pixelPositionOfPointInsideTheSvgPlane})) {
    return {
      status: 'point is over the plane',
      pointVirtualElement,
      pointLabelVirtualElement
    }
  }

  pointVirtualElement = {
    type: 'circle',
    key,
    attributes: {
      cx: pixelPositionOfPointInsideTheSvgPlane.x,
      cy: pixelPositionOfPointInsideTheSvgPlane.y,
      r: pointRadius,
      id: 'point',
      key
    }
  }
  
  if (pointLabelText) {
    pointLabelVirtualElement = {
      type: 'text',
      child: pointLabelText,
      key: `${pointLabelText}-${key}`,
      attributes: {
        id: 'point-label',
        x: pixelPositionOfPointInsideTheSvgPlane.x + 2,
        y: pixelPositionOfPointInsideTheSvgPlane.y - 5,
        key
      }
    }
  }
  
  return {
    status: 'successfull placed point in the plane',
    pointVirtualElement,
    pointLabelVirtualElement
  }
}

export function createVirtualPointOnPlaneUsingPolarCoordinate({polarCoordinate = {r: 0, θ: 0}, pointRadius = appState.initPointRadius, showLabel = false}) {
  const cartesianCoordinate = getCartesianFromPolarCoordinate({polarCoordinate})
  let pointLabelText = null
  if (showLabel) {
    pointLabelText = `(${polarCoordinate.r}, ${polarCoordinate.θ})`
  }
  const key = `cc:(${polarCoordinate.r},${polarCoordinate.r})`
  const result = createVirtualPointOnPlaneUsingCartesianCoordinate({cartesianCoordinate, pointRadius, pointLabelText, key})
  return result
}

export function getPixelPositionFromPolarCoordinate({polarCoordinate = {r: 0, θ: 0}}) {
  const cartesianCoordinate = getCartesianFromPolarCoordinate({polarCoordinate})
  const pixelPosition = getPixelPositionInsideTheSvgPlane({cartesianCoordinate})
  return pixelPosition
}