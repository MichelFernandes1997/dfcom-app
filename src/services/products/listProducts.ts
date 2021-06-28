import axios from "axios"

const baseUrl = 'http://localhost:3333'

interface Products {
    _id: string,
    name: string,
    title: string,
    description: string,
    price: number,
    stock: number,
    sku: string,
    image: string,
    usersWithFavorities: [string]
}

interface Response {
    data: Array<Products>
}

export async function listProducts (): Promise<Array<Products>> {
    const { data } = await axios.get<Promise<Response>>(`${baseUrl}/api/v1/products`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("@DFCom:token")}`
        }
    })

    return data as unknown as Array<Products>
}