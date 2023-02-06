import type {ServerRoute} from '@hapi/hapi'
import {showAuth} from './service'


// ------------------------------------------------------------------
// route `GET /required`
// ------------------------------------------------------------------

/** Handles `GET /required` */
const getBasicRequired = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/required',
  options: {
    auth: 'basic-unsafe',
  },
  handler: (req, _h) => showAuth(req.auth),

})

// ------------------------------------------------------------------
// route `GET /optional`
// ------------------------------------------------------------------

/** Handles `GET /optional` */
const getBasicOptional = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/optional',
  options: {
    auth: {
      mode: 'optional',
      strategy: 'basic-unsafe',
    },
  },
  handler: (req, _h) => showAuth(req.auth),
})

// ------------------------------------------------------------------
// route `GET /try`
// ------------------------------------------------------------------

/** Handles `GET /try` */
const getBasicTry = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/try',
  options: {
    auth: {
      mode: 'try',
      strategy: 'basic-unsafe',
    },
  },
  handler: (req, _h) => showAuth(req.auth),
})


// ------------------------------------------------------------------
// all routes
// ------------------------------------------------------------------

/** Routes of the `restricted` plugin  */
export default [
  getBasicRequired,
  getBasicOptional,
  getBasicTry,
]
