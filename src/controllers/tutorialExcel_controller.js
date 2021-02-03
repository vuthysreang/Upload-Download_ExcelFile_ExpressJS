const Tutorial = require('../models/tutorialExcel_model');
const readXlsxFile = require("read-excel-file/node");
const excelJS = require('exceljs');


// upload-Excel, GetALl-Data and Download-Excel Endpoints
const tutorialExcel_controller = {
  
  // Upload Excel
  uploadExcelTutorial: async (req,res) => {
    try{
      
      if (req.file == undefined){
        return res.status(400).send({message: "Please upload an excel file"});
      }
      let path = __basedir +"/" + req.file.filename;

      const rows = await readXlsxFile(path);

      if(rows) {

        //skip header row
        rows.shift();
  
        var tutorials = [];
  
        rows.forEach((row) => {
          let tutorialRows = {
            title: row[0],
            description: row[1],
            published: row[2],
          };
  
          tutorials.push(tutorialRows);
        }); 
      }
      else {
        return res.status(200).send({message: 'Empty Rows in your excel!'})
      }

      const createTutorialsIntoDB = await Tutorial.create(tutorials);
      if (createTutorialsIntoDB)
        return res.status(200).send({message: `Uploaded the file successfully: ${req.file.originalname}`});
      return res.status(500).send({message: `Please Input the at least one row`});
    
    }
    catch (err) {
      return res.status(500).send({message: err.message || "Could not upload the file: " + req.file.originalname})
    }
  },


  // Get Tutorials from Database
  getTutorials: async (req, res) => {
    try{
      const findTutorials = await Tutorial.find();
      if (findTutorials)
        return res.status(200).send({TutorialRows: findTutorials.length , TutorialRowsResult: findTutorials});
    }
    catch(err) {
      return res.status(500).send({message: err.message || 'INTERNAL SERVER ERROR'})
    }
  },

  // Download Excel from Database
  downloadExcel: async (req, res) => {
    try{
      const rows = await Tutorial.find();
      if (rows){
        var tutorials = [];

        rows.forEach((row) => {

          tutorials.push({
            title: row.title,
            description: row.description,
            published: row.published,
          });
        });

        var workbook = await new excelJS.Workbook();
        var worksheet = await workbook.addWorksheet("Tutorials");

        worksheet.columns = [
          { header: "Title", key: "title", width: 25 },
          { header: "Description", key: "description", width: 50 },
          { header: "Published", key: "published", width: 10 },
        ];

        // Add Array Rows
        worksheet.addRows(tutorials);

        // res is a Stream object
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + "Tutorial_Excel.xlsx"
        );

        const result = await workbook.xlsx.write(res);
        if (result)
          return res.status(200).end();
      }
    }
    catch(err){
      return res.status(500).send({message: 'Something went wrong' || message.err})
    }
    
  }

}



module.exports = tutorialExcel_controller;