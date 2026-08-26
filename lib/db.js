import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const sqlconfig = {
  server: process.env.SQLSERVER,
  authentication: {
    type: "default",
    options: {
      userName: process.env.SQLSERVER_USERNAME,
      password: process.env.SQLSERVER_PASSWORD,
    },
  },
  options: {
    database: process.env.SQLSERVER_DATABASE,
    encrypt: true,
    trustServerCertificate: Boolean(process.env.SQLSERVER_TRUSTCERT),
    port: Number(process.env.SQLSERVER_PORT),
  },
};

let poolPromise;

export async function getDbConnection() {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(sqlconfig)
      .connect()
      .then((pool) => {
        console.log("Connected to SQL Server");
        return pool;
      })
      .catch((err) => {
        poolPromise = null;
        console.error("Database connection failed: ", err);
        throw err;
      });
  }
  return poolPromise;
}
