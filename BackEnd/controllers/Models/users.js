const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const saltRounds = 10;
const UserSchema = new Schema({
 username: {
  type: String,
  trim: true,  
 },
 email: {
  type: String,
  trim: true,
  required: true
 },
 password: {
  type: String,
  trim: true,
  required: true
 },
 role: { type: String, enum: ['user', 'manager'], default: 'user'}
})
// UserSchema.pre('save', function(next){
//     this.password = bcrypt.hashSync(this.password, saltRounds);
//     next();
//     });
module.exports = mongoose.model('User', UserSchema);