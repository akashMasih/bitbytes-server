// src/adapters/repositories/UserRepository.ts
import User from '../../models/User';


export async function findByMobileNumber(mobileNumber) {
    return User.findOne({ mobileNumber }).exec();
}

export async function create(user) {
    await User.create(user);
}

export async function update(user) {
    await User.findOneAndUpdate({ mobileNumber: user.mobileNumber }, user).exec();
}
