import { Knex } from "knex";
import { config } from "./src/config";

const { host, port, name, user, password } = config.get('db')

export default {
  client: "pg",
  connection: {
    host,
    port,
    user,
    password,
    database: name
  },
} as Knex.Config;
