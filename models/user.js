const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * UserSchema: Collections User
 * codeTax: Mã số thuế
 * city: Thành phố
 * district: Quận huyện
 * address: Gộp city + district + wards + vị trí gửi lên
 * company: Tên Cty
 */
let UserSchema = new Schema({
  fullname: String,
  username: { type: String, lowercase: true, required: true, trim: true, unique: true},
  password: { type: String,select: false, required: true },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  toJSON:{
    virtuals:true
  },
  toObject:{
    virtuals:true
  },
})

UserSchema.post('save', function(doc) {
  console.log('%s -------USER SAVE-------', doc._id);
});
UserSchema.post('remove', function(doc) {
  console.log('%s ------USER REMOVE -----', doc._id);
});




UserSchema.statics.authenticate = function(username, password, callback) {
  User.findOne({username}).select('+password').exec(function(err, user) {
    if (err) {
      return callback(err)
    } else if (!user) {
      var err = new Error('Tài khoản không hợp lệ');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (err) {
        return callback(err)
      }
      if (result === true) {
        return callback(null, user);
      } else {
        return callback(new Error('Tài khoản không hợp lệ'))
      }

    })
  });
}



const User = mongoose.model('User', UserSchema)
module.exports = User
