const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
//A library convert name to slug
const slug = require("mongoose-slug-updater");
//Add plugin
mongoose.plugin(slug);

const Course = new Schema(
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

module.exports = mongoose.model("Course", Course);
