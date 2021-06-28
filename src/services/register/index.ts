import axios from "axios"

const baseUrl = 'http://localhost:3333'

interface UserToCreate {
    name: string,
    email: string,
    password: string
}

interface User {
    name: string,
    email: string,
    password: string,
    favoritiesProducts: string
}

interface Response {
    data: User
}

export async function registerUser (body: UserToCreate): Promise<User> {
    const { data } = await axios.post<Promise<Response>>(`${baseUrl}/api/v1/users/register`, body)

    return data as unknown as User
}