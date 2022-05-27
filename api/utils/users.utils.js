import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export const formatUserForDB = (userObj) => {
    const newUser = {
        id: uuidv4(),
        email: userObj.email,
        password: userObj.password,
        name: userObj.name,
        address: userObj.address,
        age: +userObj.age,
        phoneNumber: userObj.phoneNumber,
        avatarUrl: userObj.avatarUrl,
        createdAt: `${new Date()}`,
    };
    return newUser;
};
