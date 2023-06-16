export const ok = (data) => {
    return {statusCode: 200, data}
}

export const badRequest = (data) => {
    return {statusCode: 400, data}
}

export const created = (data) => {
    return {statusCode: 201, data}
}

export const serverError = () => {
    return {statusCode: 500, data: 'Houve um problema interno com nosso servidor!'}
}