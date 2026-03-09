const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()

    const diffInMilliseconds = now.getTime() - date.getTime()

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)
    const diffInWeeks = Math.floor(diffInDays / 7)

    if (diffInSeconds < 60) return 'now'
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInHours < 24) return `${diffInHours}h`
    if (diffInDays < 7) return `${diffInDays}d`
    if (diffInWeeks < 4) return `${diffInWeeks}w`

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

export default formatDate
