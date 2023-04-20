const db = require("../config/database.js");
const shortid = require("shortid");

exports.findAll = async () => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query("SELECT * FROM novels");
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
      "SELECT * FROM novels WHERE id = ?",
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
exports.create = async (novel) => {
  const conn = await db.getConnection();
  try {
    novel.id = shortid.generate();
    novel.view = 0;
    novel.voted = 0;
    const [result] = await conn.query("INSERT INTO novels SET ?", [novel]);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    conn.release();
  }
};

exports.update = async (id, novel) => {
  const conn = await db.getConnection();
  try {
    const [result] = await conn.query("UPDATE novels SET ? WHERE id = ?", [
      novel,
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
    const [result] = await conn.query("DELETE FROM novels WHERE id = ?", [id]);
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    conn.release();
  }
};

// Addition
exports.findShortAll = async () => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query("SELECT char FROM novels");
    return rows;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    conn.release();
  }
};
exports.findByType = async (type) => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query("SELECT n.name, n.image FROM novels n WHERE n.type = ?", [type])
    return rows;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    conn.release();
  }
}