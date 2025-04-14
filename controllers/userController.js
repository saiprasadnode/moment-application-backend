const db = require('../db/mysqlconnection.js');
const bcrypt = require('bcryptjs');



exports.addUser = (req, res) => {
    const { firstName,lastName, email, password, mobile, city } = req.body;

    if (!firstName || !lastName || !email || !password || !mobile || !city) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const saltRounds = 10;
    const hashedpassword =  bcrypt.hash(password, saltRounds)

    const sql = 'INSERT INTO users (firstName,lastName, email, password, mobile, city) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [firstName,lastName, email, hashedpassword, mobile, city], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      res.status(201).json({ message: 'User added successfully', user_id: result.insertId });
    });
  };
  

  //adding images and tags 
  exports.addMoment = async (req, res) => {
    const { title, tags, userId } = req.body;
    const images = req.files;
  
    if (!images || images.length === 0 || !title || !userId) {
      return res.status(400).json({ message: "Images, comment, and userId are required" });
    }
  
    try {
      const imagePaths = images.map(file => file.path);
      const tagString = Array.isArray(tags) ? tags.join(',') : tags;
  
      for (const images of imagePaths) {
        await db.execute(
          `INSERT INTO moments (images, title, tags, userId) VALUES (?, ?, ?, ?)`,
          [images, title, tagString, userId]
        );
      }
  
      res.status(201).json({ message: "Moments added successfully" });
    } catch (err) {
      console.log("ERROR", err);
      res.status(500).json({ error: err.message });
    }
  };
  

  //get all users
exports.getUsers = (req, res) => {
  const sql = 'SELECT id, firstName, lastName, email, city FROM users';

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json({ users: result });
  });
};
