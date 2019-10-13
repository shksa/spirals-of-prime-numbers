export function* makeNumberGenerator({startingNumber = 0, generationType = 'increment'} = {}) {
  let currentNumber = startingNumber
  while (true) {
    yield currentNumber
    const nextNumber = generationType === 'increment' ? currentNumber + 1 : currentNumber - 1
    currentNumber = nextNumber
  }
}

function isPrime(numberToVerify) {
  let result = true
  for (let n = 2; n <= Math.sqrt(numberToVerify); n += 1) {
    if (numberToVerify % n === 0) {
      result = false
      break
    }
  }
  return result
}

export function* makePrimeNumberGenerator() {
  const numberGenerator = makeNumberGenerator({startingNumber: 2})
  let nextNumber = numberGenerator.next().value
  while (true) {
    if (isPrime(nextNumber)) {
      yield nextNumber
    }
    nextNumber = numberGenerator.next().value
  }
}

export function getCartesianFromPolarCoordinate({polarCoordinate = {r: 0, θ: 0}}) {
  const { r, θ } = polarCoordinate
  // cartesian coordinate (x, y) = (r*sin(θ), r*cos(θ))
  const { sin, cos } = Math
  
  const cartesianCoordinate = {
    x: r*cos(θ),
    y: r*sin(θ)
  }

  return cartesianCoordinate
}