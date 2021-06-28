import axios from 'axios'

interface Response {
    token: string,
    user: {
        name: string,
        email: string,
        _id: string
    }
}

const baseUrl = 'http://localhost:3333'

export default function signIn (email: string, senha: string): Promise<Response> {
    const headers = { "content-type": "application/json" } as object;

    const url = `${baseUrl}/api/v1/users/login`

    const response = axios({
            method:'get',
            url,
            auth: {
                username: email,
                password: senha
            }
        })
        .then((result) => result.data)
        .catch((error) => {
            if (error.response) {
                console.log(error.response);

                return null;
            } else if (error.request) {
                console.log(error.request);

                return null;
            } else {
                console.log(error);

                return null;
            }
        });

    return response
}