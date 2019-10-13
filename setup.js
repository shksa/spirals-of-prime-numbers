export const PLANE_UNIT_TO_PIXELS_SCALING_FACTOR = 20 // 10 pixels

export const primeSpiralsSVGcontainer = document.querySelector('#prime-spirals-svg-container')
// console.log({ primeSpiralsSVGcontainer })

export const svgNS = primeSpiralsSVGcontainer.namespaceURI

export const thePlane = primeSpiralsSVGcontainer.querySelector('circle')
// console.log({thePlane})

export const pixelPositionOfCenterOfThePlane = {
  x: thePlane.cx.animVal.value,
  y: thePlane.cy.animVal.value
}
// console.log({ pixelPositionOfCenterOfThePlane })


// export const zoomLevelInputElement = document.getElementById('plane-zoom-level-input')
// console.log({zoomLevelInputElement})