const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const bcrypt = require('bcrypt');

module.exports = (db) => {
  // Assuming db is a connection pool
  router.post('/api/registration/', async (req, res) => {
    try {
      const iid = req.body.iid;
      const iname = req.body.iname;
      const iaddress = req.body.iaddress;
      const fname = req.body.fname;
      const lname = req.body.lname;
      const email = req.body.email;
      const PhoneNo = req.body.pnumber;
      const password = req.body.password;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
  
      // Start the transaction
      await db.beginTransaction();
  
      // Insert into the institute table
      const sql1 = 'INSERT INTO institute (InstitutePID, Institute_Name, Institute_Address) VALUES (?, ?, ?)';
      await db.query(sql1, [iid, iname, iaddress]);
  
      // Insert into the user table with hashed password
      const sql2 = 'INSERT INTO user (Fname, Lname, Email, PhoneNo, InstituteFID, Password) VALUES (?, ?, ?, ?, ?, ?)';
      await db.query(sql2, [fname, lname, email, PhoneNo, iid, hashedPassword]);
  
      // Update the user table
      const sql3 = 'UPDATE user SET Password = ? WHERE InstituteFID = ?';
      await db.query(sql3, [hashedPassword, iid]);
  
      // Commit the transaction
      await db.commit();
  
      console.log('Data inserted successfully');
      res.json({ message: 'Data inserted successfully', result: {} });
    } catch (error) {
      // Rollback the transaction if an error occurs
      await db.rollback();
  
      console.error('Database error:', error);
      res.status(500).json({ error: 'Data insertion failed' });
    }
  });

  

  router.get('/api/checkInstitute/', (req, res) => {
    const { Iid } = req.query;
    console.log(req.query);
    // ...
 
  
    const sql = 'SELECT * FROM institute where InstitutePID=?';
    
    db.query(sql, [Iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Data retrieval failed' });
      } else {
        console.log('Data fetched successfully', result);
        res.status(200).json({ message: 'Data retrieved successfully', data: result });
      }
    });
  });
  
  router.get('/api/checkphonenumber/', (req, res) => {
    const { number, email } = req.query;
    console.log(req.query);
  
    const sql = 'SELECT * FROM user WHERE PhoneNo=? OR Email=?';
    
    db.query(sql, [number, email], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Data retrieval failed' });
      } else {
        console.log('Data fetched successfully', result);
        res.status(200).json({ message: 'Data retrieved successfully', data: result });
      }
    });
  });
  
  
  
  return router;
};
