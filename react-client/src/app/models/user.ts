export type User = {
    email: string,
    roles: string[]
}

export type Address = {
    name: string,
    line1: string,
    line2?: string | null,
    city: string,
    state: string,
    country: string,
    postal_code: string,
}