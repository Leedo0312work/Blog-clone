const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
//A library convert name to slug
const slug = require("mongoose-slug-updater");
//A library cover soft delete
const mongooseDelete = require('mongoose-delete');

const CourseScheme = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoID: { type: String, require: true },
    level: { type: String },
    slug: { type: String, slug: "name", unique: true },

    // createAt: { type: Date, default: Date.now },
    // updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

//Custome query helper
CourseScheme.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    //Validate query
    const isValidateType = ['asc', 'desc'].includes(req.query.type)
    return this.sort({
      [req.query.column]: isValidateType ? req.query.type : 'desc'
    })
  }
  return this
}

//Add plugin
mongoose.plugin(slug);
//Add plugin delete and override all methods to display 
CourseScheme.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true
})

module.exports = mongoose.model("Course", CourseScheme);
