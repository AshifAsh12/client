const express = require('express');
const router = express.Router();
const mysql = require('mysql');


module.exports = (db) => {

  router.post('/api/markvalid/:TId', (req, res) => {
    const iid = req.params.TId;
    const examname = req.body.examname;

    console.log(examname)

    const sql = 'SELECT  Maxmarks FROM exam where ExamName=? AND EInstituteID =(Select TInstituteID from teacher where TeacherID=?)';
    db.query(sql, [examname,iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
      }
    });
  });

  router.get('/api/exam/:ExamName', (req, res) => {
    const Examname = req.params.ExamName
    const sql = 'SELECT  ExamName, DATE_FORMAT(ExamDate,  "%Y-%m-%d") AS ExamDate,Maxmarks FROM exam where ExamName=?';
    db.query(sql, [Examname], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
      }
    });
  });

  router.get('/api/teacherexamdetails/:TId', (req, res) => {
    const iid = req.params.TId;
    const sql = 'SELECT  * FROM exam where EInstituteID =(Select TInstituteID from teacher where TeacherID=?)';
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

    router.delete('/api/deleteexam/:examName', (req, res) => {
        const { examName } = req.params;
      
        
        db.query('DELETE FROM exam WHERE ExamName = ?', [examName], (error, results) => {
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


    router.get('/api/examdetail/:IId', (req, res) => {
        const iid = req.params.IId;
        const sql = 'SELECT ExamName, DATE_FORMAT(ExamDate, "%d-%m-%y") AS ExamDate, Maxmarks FROM exam WHERE EInstituteID = ?';
        
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
  

    router.post('/api/exam/:IId', (req, res) => {
        const examname = req.body.examname+ "-" +req.params.IId;
        const Maxmarks = req.body.Maxmarks;
        const Date = req.body.examdate;
        
        
        
    
    
        const iid = req.params.IId;

        const sql ='select * from exam where ExamName=? AND EInstituteID=?';
        const sql2 = 'INSERT INTO exam (ExamName, ExamDate,Maxmarks,EInstituteID ) VALUES (?,?,?,?)';

        db.query(sql, [examname,iid], (error, result) => {
            if (error) {
              console.error('Database error:', error);
              res.status(500).json({ error: 'Data insertion failed' });
            } else {
              console.log('Data fetchedsuccessfully');
              if(result.length>0){

                res.json({ message: 'Available', result });

              }
             else{

                db.query(sql2, [examname, Date,Maxmarks,iid], (error, result) => {
                    if (error) {
                      console.error('Database error:', error);
                      res.status(500).json({ error: 'Data insertion failed' });
                    } else {
                      console.log('Data inserted successfully');
                      res.json({ message: 'inserted', result });
                     
                      
                      
                    }
                  });

             }
              
              
            }
          });


          

      
        
      
        
      });



      router.put('/api/updateexam/:IId/:ExamName', (req, res) => {
        const newexamname = req.body.examname+ "-" +req.params.IId;
        const Maxmarks = req.body.Maxmarks;
        const Date = req.body.examdate;


        
        const examname =req.params.ExamName;
        
    
    
        const iid = req.params.IId;

        const sql ='select * from exam where ExamName=?'
        const sql2 = 'UPDATE `exam` SET `ExamName` = ?, `ExamDate` = ?, `Maxmarks` = ? WHERE `exam`.`ExamName` = ? ';

        db.query(sql, [newexamname], (error, result) => {
            if (error) {
              console.error('Database error:', error);
              res.status(500).json({ error: 'Data insertion failed' });
            } else {
              console.log('Data fetchedsuccessfully');
              if(result.length>0){

                res.json({ message: 'Available', result });

              }
             else{

                db.query(sql2, [newexamname, Date,Maxmarks,examname], (error, result) => {
                    if (error) {
                      console.error('Database error:', error);
                      res.status(500).json({ error: 'Data insertion failed' });
                    } else {
                      console.log('Data inserted successfully');
                      res.json({ message: 'inserted', result });
                     
                      
                      
                    }
                  });

             }
              
              
            }
          });


          

      
        
      
        
      });

  
  
  
  return router;
};
