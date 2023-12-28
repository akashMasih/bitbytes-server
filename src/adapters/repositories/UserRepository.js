// src/adapters/repositories/UserRepository.ts
const User = require('../../models/User.js');

async function findByMobileNumber(mobileNumber) {
    return User.findOne({ mobileNumber }).exec();
}

async function create(user) {
    await User.create(user);
}
async function update(user) {
    await User.findOneAndUpdate({ mobileNumber: user.mobileNumber }, user).exec();
}


const userRepository = {
    findByMobileNumber,
    create,
    update
}

module.exports = userRepository