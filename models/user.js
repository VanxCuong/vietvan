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
  passwordTouch: { type: String,select: false, required: true },
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



/**
 * type: 0: sử dụng passwordTouch
 * type: 1 sử dụng passpord thường
 */
UserSchema.statics.authenticate = function(username, password,type, callback) {
  User.findOne({username}).select('+password').select('+passwordTouch').exec(function(err, user) {
    if (err) {
      return callback(err)
    } else if (!user) {
      var err = new Error('Tài khoản không hợp lệ');
      err.status = 401;
      return callback(err);
    }
    if(type == 0 ){
      bcrypt.compare(password, user.passwordTouch, function(err, result) {
        if (err) {
          return callback(err)
        }
        if (result === true) {
          return callback(null, user);
        } else {
          return callback(new Error('Tài khoản không hợp lệ'))
        }
      })
    }else{
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
    }
  });
}



const User = mongoose.model('User', UserSchema)
module.exports = User
