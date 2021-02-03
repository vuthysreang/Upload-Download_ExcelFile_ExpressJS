const multer = require("multer");

const excelFilter = async (req, file, cb) => {
  if (file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")) {
    return await cb(null, true);
  } 
  else {
    return await cb("Please upload only excel file.", false);
  }
};


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, __basedir);
  },

  filename: (req, file, cb) => {
    return cb(null, `${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });



module.exports = uploadFile;