function success(res, message, data = {}, code = 200) {
    return res.status(code).json({ message: message, data: data })
}

function error(res, message, data = {}, code = 400) {
    return res.status(code).json({ message: message, data: data })
}

const response = { success, error }


module.exports = response