export const config = () => ({
  database: {
    host: process.env.host,
    port: parseInt(process.env.port) || 3306,
    password: process.env.password,
    user: process.env.user,
    databaseName: process.env.database,
  },
});

export enum ConfigKeys {
  DatabaseHost = 'database.host',
  DatabasePort = 'database.port',
  DatabasePassword = 'database.password',
  DatabaseUser = 'database.user',
  DatabaseName = 'database.databaseName',
}
