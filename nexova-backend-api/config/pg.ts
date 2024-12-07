import { DataSource } from "typeorm"

const appDataSource = new DataSource({
  type: "postgres",
  host: String(process.env.HOST),
  port: Number(process.env.DBPORT),
  username: String(process.env.DBUSER) || "default",
  password: String(process.env.PASS) || "",
  database: String(process.env.DATABASE) || "",
  entities: [__dirname + "/../models/*.ts"],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
})

export default appDataSource
