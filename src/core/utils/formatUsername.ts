const formatUsername = (username: string) => {
    if (!username) return ''
    return `@${username}`
}

export default formatUsername