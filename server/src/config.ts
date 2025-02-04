import convict from 'convict'
import "dotenv/config" 

export const config = convict({
    db: {
      host: {
        doc: "The database hostname",
        nullable: true,
        format: String,
        default: 'localhost',
        env: 'DB_HOST'
      },
      port: {
        doc: 'The database port',
        format: 'port',
        nullable: true,
        default: 5432,
        env: 'DB_PORT'
      },
      name: {
        doc: 'The name of the database',
        format: String,
        nullable: true,
        default: 'Movies',
        env: 'DB_NAME'
      },
      user: {
        doc: 'The database user',
        format: String,
        nullable: true,
        default: undefined,
        env: 'DB_USER'
      },
      password: {
        doc: 'The database password',
        format: String,
        nullable: true,
        default: undefined,
        env: 'DB_PASS'
      }
    },
    jwtSecret: {
      doc: 'The JWT secret key to sign the tokens',
      nullable: false,
      format: String,
      default: '',
      env: 'JWT_KEY'
    }  
}).validate()