const db = require("../config/database.js");
const shortid = require("shortid");

const dateNow = () => {
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

exports.findAll = async () => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query("SELECT * FROM comments");
    return rows;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    conn.release();
  }
};
exports.findById = async (id) => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query(
      "SELECT * FROM comments WHERE id = ?",
      [id]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    conn.release();
  }
};
exports.create = async (comment) => {
  const conn = await db.getConnection();
  try {
    comment.id = shortid.generate();
    comment.dated = dateNow();
    const [result] = await conn.query("INSERT INTO comments SET ?", [comment]);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    conn.release();
  }
};
exports.update = async (id, comment) => {
  const conn = await db.getConnection();
  try {
    const [result] = await conn.query("UPDATE comments SET ? WHERE id = ?", [
      comment,
      id,
    ]);
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
    const [result] = await conn.query("DELETE FROM comments WHERE id = ?", [
      id,
    ]);
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    conn.release();
  }
};
// Addition

exports.findByNovelId = async (id, userId) => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query(
      `SELECT c.* , u.username , u.image  FROM comments c INNER JOIN users u ON  c.novelId = ? AND u.id = ?`,
      [id, userId]
    );
    return rows;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    conn.release();
  }
}
