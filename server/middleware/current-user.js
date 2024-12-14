import { NextFunction, Request, Response } from 'express'
import { ICurrentUser } from '../interfaces'
import jwt from 'jsonwebtoken'



/**
 * Middleware to process jwt token within the cookie and use it to set req.currentUser if it exists and is valid
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export async function currentUserMiddleware(
  req,
  res,
  next,
) {
  // This is made possible by the use of the cookie-parser middleware
  console.log('Entering currentUserMiddleware')
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1] || req.cookies.jwt

  if (!token) {
    return next()
  }

  try {
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET)

    req.currentUser = jwtPayload.user
  } catch (err) {}

  next()
}
