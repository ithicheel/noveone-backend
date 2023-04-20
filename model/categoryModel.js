const db = require('../config/database.js');
const shortid = require('shortid');

const dateNow = () => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

exports.findAll = async () => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query('SELECT * FROM categories');
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
      const [rows, fields] = await conn.query('SELECT * FROM categories WHERE id = ?', [id]);
      return rows[0];
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };
  exports.create = async (category) => {
    const conn = await db.getConnection();
    try {  
      category.id = shortid.generate();
      const [result] = await conn.query('INSERT INTO categories SET ?', [category]);
      return result;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };
  exports.update = async (id, category) => {
    const conn = await db.getConnection();
    try {
      const [result] = await conn.query('UPDATE categories SET ? WHERE id = ?', [category, id]);
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
      const [result] = await conn.query('DELETE FROM categories WHERE id = ?', [id]);
      return result.affectedRows;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
  };