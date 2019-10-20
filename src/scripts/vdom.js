import { thePlane, primeSpiralsSVGcontainer, svgNS } from "./init";

export const primeSpiralsSvgContainerChildrenMap = {}

function createSvgElement(virtualElement) {
  const element = document.createElementNS(svgNS, virtualElement.type)
  Object.entries(virtualElement.attributes).forEach(([attributeName, attributeValue]) => {
    element.setAttribute(attributeName, attributeValue)
  })
  if (virtualElement.child) {
    element.appendChild(document.createTextNode(virtualElement.child))
  }
  return element
}

function isElementAlreadyCreated(virtualElement) {
  const elementKey = virtualElement.key
  const element = primeSpiralsSvgContainerChildrenMap[elementKey]
  if (element) {
    return true
  }
  return false
}

function updateElementAttributes(virtualElement) {
  const element = primeSpiralsSvgContainerChildrenMap[virtualElement.key]
  Object.entries(virtualElement.attributes).forEach(([attributeName, attributeValue]) => {
    element.setAttribute(attributeName, attributeValue)
  })
  element.setAttribute('visibility', 'visible')
}

export function addElementInsidePrimeSpiralsSVG(virtualElement) {
  if (isElementAlreadyCreated(virtualElement)) {
    updateElementAttributes(virtualElement)
    return
  }
  const element = createSvgElement(virtualElement)
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