module.exports = {
    hrPool: {
      connectionLimit : 100,
      host:process.env.DB_HOST ||'localhost',
      port:process.env.DB_PORT || 8889,
      user: 'root',
      password: 'root',
      database:'CONSULTECTI',
      poolMin: 10,
      poolMax: 10,
      poolIncrement: 0
    }
  };