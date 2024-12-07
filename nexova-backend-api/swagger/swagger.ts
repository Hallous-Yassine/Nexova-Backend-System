const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for the application",
  },
  servers: [
    {
      url: "http://localhost:3002",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
}

const options = {
  swaggerDefinition,
  apis: ["./routes/*.ts"],
}

export default options
