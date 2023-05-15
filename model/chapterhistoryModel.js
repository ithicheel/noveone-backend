const db = require('../config/database.js');
const shortid = require('shortid');


exports.findAll = async () => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query('SELECT * FROM chapterhistory');
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
      const [rows, fields] = await conn.query('SELECT * FROM chapterhistory WHERE id = ?', [id]);
      return rows[0];
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };
  exports.create = async (history) => {
    const conn = await db.getConnection();
    try {  
      history.id = shortid.generate();
      const [result] = await conn.query('INSERT INTO chapterhistory SET ?', [history]);
      return result;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };
  exports.update = async (id, history) => {
    const conn = await db.getConnection();
    try {
      const [result] = await conn.query('UPDATE chapterhistory SET ? WHERE id = ?', [history, id]);
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
      const [result] = await conn.query('DELETE FROM chapterhistory WHERE id = ?', [id]);
      return result.affectedRows;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };