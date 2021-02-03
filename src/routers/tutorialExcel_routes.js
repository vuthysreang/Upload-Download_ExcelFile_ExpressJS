const Router = require('express').Router();
const tutorialsRoutes = require('../controllers/tutorialExcel_controller');
const uploadExcel = require('../middlewares/uploadExcel');

// Upload excel file endpoint
Router.post('/api/excel/upload', uploadExcel.single('file'), tutorialsRoutes.uploadExcelTutorial);

// Get All Tutorials in Database
Router.get('/api/excel/tutorials', tutorialsRoutes.getTutorials);

// Download Excel from
Router.get('/api/excel/download', tutorialsRoutes.downloadExcel);







module.exports = Router;