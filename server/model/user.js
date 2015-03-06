module.exports = function (mongoose) {

    var UserSchema = new mongoose.Schema({
        login: {type: String, unique: true },
        firstName: {type: String},
        lastName: {type: String},
        email: { type: String, unique: true },
        time : { type : Date, default: Date.now },
        comments: { type: String }
    });

    var User = mongoose.model('User', UserSchema);

    return {
        User: User
    }
}