const express = require('express');
const cookieParser = require('cookie-parser'); // Import the cookie-parser middleware
const router = express.Router();
const jstoken = require('jsonwebtoken');
const jswkey = 'jwtsecretkey'
const bcrypt = require('bcrypt');


module.exports = (db) => {
  router.post('/api/login', (req, res) => {
    const InsId = req.body.Iid;
    const password = req.body.password;

    const sql = "SELECT * FROM user WHERE InstituteFID = ?";

    db.query(sql, [InsId], async (error, result) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Data Fetch failed' });
        }
        if (result.length > 0) {
            const hashedPassword = result[0].Password;
            
            
                bcrypt.compare(password,hashedPassword,(err,response)=>{
                
                  if(response){
                    jstoken.sign({ result }, jswkey, { expiresIn: "1d" }, (error, token) => {
                      if (error) {
                          return res.status(500).json({ error: 'Token generation failed' });
                      }
                      // Set the token as a cookie
                      res.cookie('token', token, { httpOnly: true });
                      res.json({ message: 'Success', IId: result[0].InstituteFID });
                  });

                  }
                  else{
                    res.json({ message: 'wrong password', result: 'Incorrect password' });
                  }
                })
                    
              
        } else {

            res.json({ message: 'Fail', result: 'User not found' });
            
        }
    });
});

  router.post('/api/Teacherlogin', (req, res) => {
    const InsId = req.body.Iid;
    const password = req.body.password;

    const sql = "SELECT * FROM teacher WHERE TeacherID = ? AND Password = ?";

    db.query(sql, [InsId, password], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Data Fetch failed' });
      }
      if (result.length > 0) {
        jstoken.sign({ result }, jswkey, { expiresIn: "1d" }, (error, token) => {
          if (error) {
            return res.status(500).json({ error: 'Token generation failed' });
          }
          // Set the token as a cookie
          res.cookie('token', token, { httpOnly: true });
          res.json({ message: 'Success', TId:result[0].TeacherID });
          
        });
      } else {
        res.json({ message: 'Fail', result });
      }
    });
  });
  return router;
}
