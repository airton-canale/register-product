export const ok = (data) => {
    return {statusCode: 200, data}
}

export const badRequest = (data) => {
    return {statusCode: 400, data}
}

export const created = (data) => {
    return {statusCode: 201, data}
}