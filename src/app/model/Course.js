const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');
const ObjectID = require('mongodb').ObjectID

const Course = new Schema({
  name : {type: String, maxlength : 255, required: true},
  description : {type: String, maxlength : 255},
  image : {type: String, maxlength : 255},
  videoId : {type: String, maxlength : 255, required: true},
  level : {type: String, maxlength : 255},
  slug: { type: String, slug: "name", unique : true },
  
},{
  timestamps : true,
});

mongoose.plugin(slug);
Course.plugin(mongoose_delete, { deletedAt : true , overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course)