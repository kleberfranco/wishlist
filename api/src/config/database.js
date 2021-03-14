module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  dialect: 'mysql',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
