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
    usersWithFavorities: [object]
}

interface Response {
    data: Products
}

export async function updateProduct (id: string, userId: Array<string>): Promise<Products> {
    const body = {
        id,
        usersWithFavorities: userId
    }
    
    const { data } = await axios.put<Promise<Response>>(`${baseUrl}/api/v1/products`, 
    body,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("@DFCom:token")}`
        }
    })

    return data as unknown as Products
}