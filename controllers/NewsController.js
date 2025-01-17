// import Model News
const News = require("../models/News");

// buat class NewsController
class NewsController {
  // buat fungsi

  async index(req, res) {
    // memanggil method static all dengan async await.
    const news = await News.all();

    const data = {
      message: "Get All Resource",
      data: news,
    };

    res.json(data);
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

  async store(req, res) {
    const news = await News.create(req.body);

    const data = {
      message: "Resource is added successfully",
      data: news,
    };

    res.json(data);
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      // Cari news berdasarkan ID
      const news = await News.find(id);

      if (!news) {
        return res.status(404).json({
          message: "Resource not found",
          data: null,
        });
      }

      // Update news
      const updateNews = await News.update(id, req.body);

      const data = {
        message: "Resource is update successfully",
        data: updateNews,
      };

      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({
        message: "Resource not found",
        error: error.message,
      });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const news = await News.find(id);

    if (news) {
      await News.delete(id);
      const data = {
        message: "Resource is delete successfully",
        data: null,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Resource not found",
        data: null,
      };
      res.status(404).json(data);
    }
  }

  async show(req, res) {
    try {
      const { title } = req.params; // Ambil parameter `title` dari URL

      if (!title) {
        return res.status(400).json({
          message: "Parameter title diperlukan",
          data: null,
        });
      }

      // Cari students berdasarkan title
      const news = await News.findByName(title);

      if (news.length === 0) {
        return res.status(404).json({
          message: `Resource not found '${title}'`,
          data: null,
        });
      }

      const data = {
        message: `Get detail resource '${title}'`,
        data: students,
      };

      res.status(200).json(data);
    } catch (error) {
      console.error("Error saat mencari berdasarkan title:", error); // Debugging
      res.status(500).json({
        message: "Error saat mencari news",
        error: error.message,
      });
    }
  }

  async findByCategory(req, res) {
    try {
      const { category } = req.params; // Ambil parameter `jurusan` dari URL

      if (!category) {
        return res.status(400).json({
          message: "Parameter category diperlukan",
          data: null,
        });
      }

      // Cari students berdasarkan jurusan
      const news = await News.findByCategory(category);

      if (news.length === 0) {
        return res.status(404).json({
          message: `Resource not found '${category}'`,
          data: null,
        });
      }

      const data = {
        message: `Menampilkan students dengan jurusan '${category}'`,
        data: students,
      };

      res.status(200).json(data);
    } catch (error) {
      console.error("Error saat mencari berdasarkan jurusan:", error); // Debugging
      res.status(500).json({
        message: "Error saat mencari students",
        error: error.message,
      });
    }
  }
}

// membuat object NewsController
const object = new NewsController();

// export object NewsController
module.exports = object;
