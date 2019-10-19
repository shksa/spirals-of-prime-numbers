import { thePlane, primeSpiralsSVGcontainer, svgNS } from "./init";

export const primeSpiralsSvgContainerChildrenMap = {}

function createSvgPointElement({cx, cy, r, key, id}) {
  const point = document.createElementNS(svgNS, 'circle')
  point.setAttribute('cx', cx)
  point.setAttribute('cy', cy)
  point.setAttribute('r', r)
  point.setAttribute('key', key)
  point.setAttribute('id', id)
  return point
}

function isElementAlreadyCreated(virtualElement) {
  const elementKey = virtualElement.key
  const element = primeSpiralsSvgContainerChildrenMap[elementKey]
  if (element) {
    return true
  }
  return false
}

function modifyCircleElementAttributes(virtualElement) {
  const element = primeSpiralsSvgContainerChildrenMap[virtualElement.key]
  const {cx, cy, r} = virtualElement
  element.setAttribute('cx', cx)
  element.setAttribute('cy', cy)
  element.setAttribute('r', r)
  element.setAttribute('visibility', 'visible')
}

export function addElementInsidePrimeSpiralsSVG(virtualElement) {
  if (isElementAlreadyCreated(virtualElement)) {
    modifyCircleElementAttributes(virtualElement)
    return
  }
  const element = createSvgPointElement(virtualElement)
  primeSpiralsSvgContainerChildrenMap[virtualElement.key] = element
  primeSpiralsSVGcontainer.appendChild(element)
}

export function addElementListInsidePlane(virtualElementList) {
  hideElements()
  virtualElementList.forEach((virtualElement) => {
    addElementInsidePrimeSpiralsSVG(virtualElement)
  })
}

function hideElements() {
  Object.entries(primeSpiralsSvgContainerChildrenMap).forEach(([elementKey, element]) => {
    element.setAttribute('visibility', 'hidden')
  })
}