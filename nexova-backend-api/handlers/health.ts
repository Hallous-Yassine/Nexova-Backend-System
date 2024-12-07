import { RequestHandler } from "express"
import { HealthResponse } from "../types/responses/health"

const healthy: RequestHandler = async (req, res) => {
  const response: HealthResponse = {
    status: "Healthy",
    message: "The server is healthy",
  }
  res.status(200).send(response)
}

export { healthy }
