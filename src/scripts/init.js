export const primeSpiralsSVGcontainer = document.querySelector('#prime-spirals-svg-container')
// console.log({ primeSpiralsSVGcontainer })

export const svgNS = primeSpiralsSVGcontainer.namespaceURI

export const thePlane = primeSpiralsSVGcontainer.querySelector('circle')
// console.log({thePlane})

export const zoomLevelInputElement = document.querySelector('.controls:nth-of-type(1)')
// console.log({zoomLevelInputElement})

export const planeUnitScaleInputElement = document.querySelector('.controls:nth-of-type(2)')

export const appState = {
  planeUnitScale: 10,
  initZoomLevel: 800,
  initPointRadius: 2,
  currentPointRadius: 2,
  planeCenterPixelPosition: {
    x: thePlane.cx.animVal.value,
    y: thePlane.cy.animVal.value
  },
  initPixelPositionOfCenterOfPlane: Object.freeze({
    x: thePlane.cx.animVal.value,
    y: thePlane.cy.animVal.value
  })
}

console.log({appState})