function success(res, message, data = {}, code = 200) {
    return res.status(code).json({ message: message, data: data })
}

function error(res, message, data = {}, code = 400) {
    return res.status(code).json({ message: message, data: data })
}

export const response = { success, error }