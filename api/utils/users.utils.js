import moment from "moment";

export const formatUserForDB = (userObj) => {
    const today = moment();

    const birthdate = moment(userObj.birthdate, "MMMM DD, YYYY").startOf("day");
    const userAge = today.diff(birthdate, "years");
    const newUser = {
        id: { type: Number, required: true },
        email: userObj.email,
        password: userObj.password,
        name: userObj.name,
        address: { type: String, required: true },
        age: +userObj.age,
        phoneNumber: { type: String, required: true },
        avatarUrl: { type: String, required: true },
        createdAt: new Date(),
    };
    return newUser;
};
