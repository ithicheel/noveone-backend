const db = require('../config/database.js');
const shortid = require('shortid');


exports.findAll = async () => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query('SELECT * FROM report');
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
      const [rows, fields] = await conn.query('SELECT * FROM report WHERE id = ?', [id]);
      return rows[0];
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };
  exports.create = async (report) => {
    const conn = await db.getConnection();
    try {  
      report.id = shortid.generate();
      const [result] = await conn.query('INSERT INTO report SET ?', [report]);
      return result;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };
  exports.update = async (id, report) => {
    const conn = await db.getConnection();
    try {
      const [result] = await conn.query('UPDATE report SET ? WHERE id = ?', [report, id]);
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
      const [result] = await conn.query('DELETE FROM report WHERE id = ?', [id]);
      return result.affectedRows;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };