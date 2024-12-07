import jwt from "jsonwebtoken"

import { RequestHandler } from "express"

const auth: RequestHandler = async (req, res, next) => {
  let token: any = req.headers.authorization
  if (!token) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }
  token = token.split(" ")[1]

  try {
    console.log("here", process.env.SECRET)
    const decoded = jwt.verify(token, process.env.SECRET as string)
    console.log({ decoded })

    res.locals.user = decoded
    next()
  } catch (e: any) {
    res.status(401).json({ message: e.message })
    return
  }
}

export default auth
