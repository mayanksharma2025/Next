export function sortBy<T>(array: T[], key: keyof T, ascending = true) {
    return [...array].sort((a, b) => {
        if (a[key] < b[key]) return ascending ? -1 : 1
        if (a[key] > b[key]) return ascending ? 1 : -1
        return 0
    })
}

export function filterBy<T>(array: T[], key: keyof T, value: any) {
    return array.filter((item) => item[key] === value)
}
