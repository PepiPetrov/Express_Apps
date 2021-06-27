function hbsContext(data, isUser, username) {
    const ctx = {}
    Object.assign(ctx, data, { isUser, username })
    return ctx
}

module.exports = hbsContext