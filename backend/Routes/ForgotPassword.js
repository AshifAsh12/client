const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jstoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = (db) => {

  router.post('/api/forgot-password', (req, res) => {
    const email = req.body.email;
    

    const sql = "SELECT * FROM `user` WHERE Email=?";

    db.query(sql,[email] ,(error, result) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Data Fetch failed' });
      }
      if (result.length > 0) {
       
       const token =jstoken.sign({id:email} ,"jswtoken_keys",{expiresIn:"1d"})
       var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ashigasif@gmail.com',
          pass: 'efzu drcv oqlk xkjq'
        }
      });
      
      var mailOptions = {
        from: 'ashigasif@gmail.com',
        to: email,
        subject: 'Reset Password ',
        text: `http://localhost:3000/reset-password/${email}/${token}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          return res.send({status:"success"})
        }
      });

      } else {
        return res.send({status:"Failed"})
      }
    });
  });
  router.post('/api/reset-password/:email/:token', (req, res) => {
    const {email,token} = req.params;
    const password = req.body.password;
    const sql = "UPDATE user SET password = ? WHERE Email = ?";

    jstoken.verify(token, "jswtoken_keys" ,(err,decoded) => {
        if(err){
            return res.json({status: "error with token"});
        } else {
            bcrypt.hash(password, 10).then(hash => {
                // Truncate the hash to fit within 25 characters
                console.log(hash)

                db.query(sql, [hash, email], (error, result) => {
                    if (error) {
                        console.error('Database error:', error);
                        return res.status(500).json({ error: 'Data Fetch failed' });
                    } else {
                        console.log("updated");
                        return res.json({status: "success"});
                    }
                });
            });
        }
    });
});
   

  

  return router;
};
