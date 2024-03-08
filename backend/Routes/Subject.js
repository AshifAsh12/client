const express=require('express')
const router=express.Router()


module.exports=(db)=>{



  router.delete('/api/deletesubject/:SubjectName', (req, res) => {
    const { SubjectName } = req.params;
  
    
    db.query('DELETE FROM subject WHERE SubjectName = ?', [SubjectName], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete exam' });
      }
     
      if (results.affectedRows > 0) {
        return res.json({ message: 'deleted' });
      } else {
        return res.status(404).json({ message: 'Exam not found' });
      }
    });
  });


  router.put('/api/updatesubject/:SubjectName/:IId', (req, res) => {
    const newsubjectname= req.body.SubjectName+ "-" + req.params.IId;
 

    const subjectname = req.params.SubjectName;

    const sql= 'Select * From subject where SubjectName=?';
  
    const sql2 = 'UPDATE `subject` SET `SubjectName` = ? WHERE `subject`.`SubjectName` = ?;';
  
    db.query(sql, [newsubjectname], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data fetched successfully');

        if(result.length>0){

            res.json({ message: 'available'});
       
        }
        else{

            db.query(sql2, [newsubjectname,subjectname], (error, result) => {

                if(error){
                    console.error('Database error:', error);
                    res.status(500).json({ error: 'Data insertion failed' });

                }
                else{

                    console.log('Data added successfully');
                    res.json({ message: 'Added'});

                }
            })



            
          
        }
       
        
        
      }
    });
  });

 
  router.get('/api/subject/:SubjectName', (req, res) => {
    const subjectName = req.params.SubjectName;

    const sql = 'SELECT  SubjectName FROM subject where SubjectName=?'
    db.query(sql, [subjectName], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data fetched successfully');
        console.log(result)
        res.json(result);
      }
    });
  });
  
  router.get('/api/teachersubjectdetails/:TId', (req, res) => {
    const iid = req.params.TId;
    console.log(iid)
    const sql = 'SELECT  * FROM subject where SInstituteID =(Select TInstituteID from teacher where TeacherID=?)';
    db.query(sql, [iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data fetched successfully');
        console.log(result)
        res.json(result);
      }
    });
  });

    router.get('/api/subjectdetail/:IId', (req, res) => {
        const iid = req.params.IId;
        const sql = 'SELECT  * FROM subject where SinstituteID=?';
        db.query(sql, [iid], (error, result) => {
          if (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Data retrieval failed' });
          } else {
            console.log('Data fetched successfully');
            res.json(result);
          }
        });
      });
  router.post('/api/subject/:IId', (req, res) => {
    const subjectname= req.body.SubjectName+ "-" + req.params.IId;
    console.log(subjectname)


    const iid = req.params.IId;

    const sql= 'Select * From subject where SubjectName=? AND SInstituteID=?';
  
    const sql2 = 'INSERT INTO subject (SubjectName,SInstituteID) VALUES (?, ?)';
  
    db.query(sql, [subjectname,iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data fetched successfully');

        if(result.length>0){

            res.json({ message: 'available'});
       
        }
        else{

            db.query(sql2, [subjectname,iid], (error, result) => {

                if(error){
                    console.error('Database error:', error);
                    res.status(500).json({ error: 'Data insertion failed' });

                }
                else{

                    console.log('Data added successfully');
                    res.json({ message: 'Added'});

                }
            })



            
          
        }
       
        
        
      }
    });
  });

  return router;

}

