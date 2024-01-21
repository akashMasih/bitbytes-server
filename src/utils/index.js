const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString()



const isEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);
const isEmptyArray = (arr) => {
    return (
        arr === undefined ||
        arr === null ||
        (Array.isArray(arr) && arr.length === 0)
    );
};

const utils = {
    isEmpty, isEmptyArray, generateOtp
}


module.exports = utils