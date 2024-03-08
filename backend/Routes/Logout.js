const express = require('express');

const router = express.Router();


module.exports = () => {
  router.get('/api/logout', (req, res) => {
   res.clearCookie('token')
   return res.json({status:true})

    
  });

 
  return router;
}
