// import Model News
const News = require("../models/News");

// buat class NewsController
class NewsController {
  // buat fungsi

  async index(req, res) {
    try {
      const news = await News.all();
      res.json({ message: "Get All Resource", data: news });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching news", error: error.message });
    }
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
    try {
      const news = await News.create(req.body);
      res.json({ message: "Resource is added successfully", data: news });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding news", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const news = await News.find(id);
      if (!news) {
        return res
          .status(404)
          .json({ message: "Resource not found", data: null });
      }
      const updatedNews = await News.update(id, req.body);
      res.json({ message: "Resource updated successfully", data: updatedNews });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating news", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const news = await News.find(id);
      if (!news) {
        return res
          .status(404)
          .json({ message: "Resource not found", data: null });
      }
      await News.delete(id);
      res.json({ message: "Resource deleted successfully", data: null });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting news", error: error.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const news = await News.find(id);
      if (!news) {
        return res
          .status(404)
          .json({ message: "Resource not found", data: null });
      }
      res.json({ message: "Get detail resource", data: news });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching news", error: error.message });
    }
  }

  async search(req, res) {
    try {
      const { title } = req.params;
      const news = await News.search(title);
      if (news.length === 0) {
        return res
          .status(404)
          .json({ message: `No news found with title '${title}'`, data: null });
      }
      res.json({ message: "Search results", data: news });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error searching news", error: error.message });
    }
  }

  async findByCategory(req, res) {
    try {
      const { category } = req.params;
      const news = await News.findByCategory(category);
      if (news.length === 0) {
        return res.status(404).json({
          message: `No news found in category '${category}'`,
          data: null,
        });
      }
      res.json({ message: `Get category '${category}' resource`, data: news });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching category news",
        error: error.message,
      });
    }
  }

  async getCategory(req, res, category) {
    try {
      const news = await News.findByCategory(category);
      res.json({ message: `Get '${category}' resource`, data: news });
    } catch (error) {
      res.status(500).json({
        message: `Error fetching '${category}' news`,
        error: error.message,
      });
    }
  }

  async sport(req, res) {
    return this.getCategory(req, res, "sport");
  }

  async finance(req, res) {
    return this.getCategory(req, res, "finance");
  }

  async automotive(req, res) {
    return this.getCategory(req, res, "automotive");
  }
}

// membuat object NewsController
const object = new NewsController();

// export object NewsController
module.exports = object;
