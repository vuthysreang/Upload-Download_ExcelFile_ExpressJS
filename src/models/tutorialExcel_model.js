const mongoose = require('mongoose');

const tutorialColumns = {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    },
}
const tutorialSchema = new mongoose.Schema( tutorialColumns, {timestamps: true} );


module.exports = mongoose.model('TutorialsExcel', tutorialSchema);