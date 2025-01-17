// import database
const db = require("../config/database");

// membuat class News
class News {
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from news";

      db.query(sql, (err, results) => {
        resolve(results);
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO news SET ?";
      db.query(sql, data, (err, results) => {
        if (err) {
          reject(err);
        } else {
          // Mengembalikan data yang baru diinsert
          resolve({ id: results.insertId, ...data });
        }
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE news SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) {
          return reject(err);
        }

        // Jika data tidak ditemukan (affectedRows = 0), kembalikan null
        if (results.affectedRows === 0) {
          return resolve(null);
        }

        // Kembalikan data yang diperbarui
        resolve({ id, ...data });
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM news WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM news WHERE id = ? LIMIT 1";
      db.query(sql, [id], (err, results) => {
        if (err) {
          return reject(err);
        }

        // Jika data ditemukan, kembalikan data; jika tidak, kembalikan null
        resolve(results.length > 0 ? results[0] : null);
      });
    });
  }

  static async search(title) {
    try {
      const news = await new Promise((resolve, reject) => {
        const sql = "SELECT * FROM news WHERE title LIKE ?";
        db.query(sql, [`%${title}%`], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
      return news;
    } catch (error) {
      throw error;
    }
  }

  static async findByCategory(category) {
    try {
      const news = await new Promise((resolve, reject) => {
        const sql = "SELECT * FROM news WHERE category = ?";
        db.query(sql, [category], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
      return news;
    } catch (error) {
      throw error;
    }
  }
}

// export class News
module.exports = News;
