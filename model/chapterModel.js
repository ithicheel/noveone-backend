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
    const [rows, fields] = await conn.query('SELECT * FROM chapters');
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
      const [rows, fields] = await conn.query('SELECT * FROM chapters WHERE id = ?', [id]);
      return rows[0];
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
};
exports.create = async (chapter) => {
    const conn = await db.getConnection();
    try {  
      chapter.id = shortid.generate();
      chapter.dated = dateNow();
      const [result] = await conn.query('INSERT INTO chapters SET ?', [chapter]);
      return result;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
};
  
exports.update = async (id, chapter) => {
    const conn = await db.getConnection();
    try {
      const [result] = await conn.query('UPDATE chapters SET ? WHERE id = ?', [chapter, id]);
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
      const [result] = await conn.query('DELETE FROM chapters WHERE id = ?', [id]);
      return result.affectedRows;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
};
// Addition
exports.findByNovelId = async (id) => {
    const conn = await db.getConnection();
    try {
      const [rows, fields] = await conn.query('SELECT * FROM chapters WHERE novelId = ?', [id]);
      return rows;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        conn.release();
    }
}
exports.findByNovelIdCount = async (id) => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query('SELECT COUNT(*) as count FROM chapters WHERE novelId = ?', [id]);
    return rows;
  } catch (err) {
      console.log(err);
      return null;
  } finally {
      conn.release();
  }
}
exports.findByCateNovel = async () => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query('SELECT n.id, n.image , n.`type` , n.name , c.numbers , c.dated FROM chapters c INNER JOIN novels n ON c.novelId = n.id')
    return rows;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    conn.release();
  }
}
exports.findByPageNumBer = async (id, pageNumber) => {
  const conn = await db.getConnection();
  try {
    const [rows, fields] = await conn.query(
      'SELECT * FROM chapters c WHERE c.novelId = ? ORDER BY numbers LIMIT ?, 1',
      [id, parseInt(pageNumber)]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    conn.release();
  }
};