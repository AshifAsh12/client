const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {


  router.get('/api/editmark/:SId/:subject/:examName', (req, res) => {
    const sid = req.params.SId;

  
    const subject = req.params.subject;
    const examname = req.params.examName;

   // console.log(sid + subject + examname)



    const sql = 'select Mark from marks where StudentId=? AND Subjectname=? AND examname=? ';
   	
    
  
    db.query(sql, [sid,subject,examname], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
      }
    });
  });
  



  router.get('/api/institutename/:SId', (req, res) => {
    const sid = req.params.SId;
    const sql = 'SELECT Institute_Name, Regno, Name ,Class_Name  FROM `institute`,`student`,`class` WHERE Class_ID=SClassID AND SInstituteID=InstitutePID AND Regno=? ';
   	
    
  
    db.query(sql, [sid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
      }
    });
  });


  router.get('/api/detailmark/:SId', (req, res) => {
    const sid = req.params.SId;
    const sql = 'SELECT Maxmarks, Mark, marks.Subjectname, exam.ExamName ,marks.StudentId FROM marks INNER JOIN exam ON marks.examname = exam.ExamName WHERE marks.StudentId =? ';
   	
    
  
    db.query(sql, [sid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
      }
    });
  });
  // Define your routes here and use the 'db' connection for database operations

  router.post('/api/addmark/:SId', (req, res) => {

    const examname = req.body.examname;
    const subject = req.body.subjectname;
    const mark = req.body. exammark;
    const Sid = req.params.SId;


    console.log(subject)
    const selectSql = 'SELECT * FROM marks WHERE Subjectname=? AND examname=? AND StudentId=?';

    db.query(selectSql, [subject,examname,Sid], (selectError, selectResult) => {
      if (selectError) {
        console.error('Database error:', selectError);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data retrieved successfully');
        
        if (selectResult.length > 0) {
         
          console.log('Available');
          res.json({ message: 'Available', data: selectResult });
        } else {
          // Class does not exist, insert it
          const insertSql = 'INSERT INTO marks(Mark,StudentId,Subjectname,examname) VALUES (?,?, ?, ?)';
          db.query(insertSql, [mark,Sid,subject,examname], (insertError, insertResult) => {
            if (insertError) {
              console.error('Database error:', insertError);
              res.json({ message: 'failed' });
            } else {
              console.log('Data inserted successfully');
              res.json({ message: 'Added' });
            }
          });
        }
      }
    });
  });



  router.put('/api/updatemark/:SId', (req, res) => {
    
    const mark = req.body.exammark;



    const subject = req.body.subjectname;
    console.log(subject)


    
    const examname =req.body.examname;
    console.log(examname)
    


    const Sid = req.params.SId;

    const sql ='update marks set Mark=? where StudentId=? AND Subjectname=? AND examname=?'
    

    db.query(sql, [mark,Sid,subject,examname], (error, result) => {
        if (error) {
          console.error('Database error:', error);
          res.status(500).json({ error: 'Data insertion failed' });
        } else {
          console.log('Data updated');
          res.json({ message: 'updated' });

         
          
          
        }
      });


      

  
    
  
    
  });
  return router;
};
