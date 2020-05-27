module.exports = {
    hrPool: {
      connectionLimit : 100,
      host:process.env.DB_HOST ||'localhost',
      port:process.env.DB_PORT || 3306,
      user: 'root',
      password: 'deatnote',
      database:'CONSULTECTI',
      poolMin: 10,
      poolMax: 10,
      poolIncrement: 0
    }
  };