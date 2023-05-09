export const ok = (data) => {
    return {status: 200, data}
}

export const badRequest = (data) => {
    return {status: 400, data}
}

export const created = (data) => {
    return {status: 201, data}
}