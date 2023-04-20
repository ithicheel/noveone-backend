const db = require('../config/database.js');
const shortid = require('shortid');
const bcrypt = require("bcrypt");

exports.findAll = async () => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query('SELECT * FROM users');
    return rows;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    conn.release();
  }
}
exports.findById = async (id) => {
    const conn = await db.getConnection();
    try {
      const [rows, fields] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };
  exports.create = async (user) => {
    const conn = await db.getConnection();
    try {  
      user.id = shortid.generate();
      user.ranks = 0;
      user.wallet = 0;
      user.role = "user";
      const salt = await bcrypt.genSalt(10);
      const hashedPAssword = await bcrypt.hash(user.password, salt);
      user.password = hashedPAssword;
      const [result] = await conn.query('INSERT INTO users SET ?', [user]);
      return result;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };
  
  exports.update = async (id, user) => {
    const conn = await db.getConnection();
    try {
      const [result] = await conn.query('UPDATE users SET ? WHERE id = ?', [user, id]);
      return result.affectedRows;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };
  
  exports.delete = async (id) => {
    const conn = await db.getConnection();
    try {
      const [result] = await conn.query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };

  // Addition
  exports.comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
  }

  exports.findByEmail = async (email) => {
    const conn = await db.getConnection();
    try {
      const [rows, fields] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };
  