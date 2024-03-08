const express=require('express')
const router=express.Router()


module.exports=(db)=>{
  router.post('/api/addteacher/:IId', (req, res) => {
    const Regno = req.body.Regno;
    const Name = req.body.Name;
    const Dob = req.body.Dob;
    
    const Address=req.body.Address;
    const password=req.body.password;
    


    const iid = req.params.IId;
  
    const sql = 'INSERT INTO teacher (TeacherID, Name, TD_O_B,Address,TInstituteID,Password) VALUES (?, ?, ?, ?,?,?)';
  
    db.query(sql, [Regno, Name, Dob,Address,iid,password], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data inserted successfully');
        res.json({ message: 'Data inserted successfully2', result });
       
        
        
      }
    });
  });

  return router;

}

