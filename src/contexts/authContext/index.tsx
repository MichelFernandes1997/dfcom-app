import React, { createContext, ReactNode, useState, useEffect } from "react"

import signIn from '../../services/signIn'

import { updateProduct } from '../../services/products/updateProduct'

import { registerUser } from '../../services/register'

interface Children {
    children: ReactNode
}

interface UserInput {
    name: string
    email: string
    password: string
}

interface AuthContextData {
    signed: boolean,
    user: {
        name: string,
        email: string,
        _id: string
    } | null,
    createUser(user: UserInput): Promise<void>,
    login(email: string | null, senha: string | null): Promise<void>,
    addFavorities(id: string, usersIds: Array<string>): Promise<{}>,
    removeFavorities(id: string, usersIds: Array<string>): Promise<{}>,
    logout(): Promise<void>
}

const AuthContext = createContext<AuthContextData>({ signed: true } as AuthContextData)

export const AuthProvider: React.FC<Children> = ({ children }: Children): JSX.Element => {
    const [user, setUser] = useState<{
        name: string,
        email: string,
        _id: string
    } | null>(null)

    useEffect(() => {
        const userAuth = localStorage.getItem("@DFCom:auth")
    
        if (!!userAuth) {
          setUser(JSON.parse(userAuth));
        }
    }, [])

    async function createUser (user: UserInput): Promise<void> {
        const response = await registerUser(user)

        if(response) {
            window.location.href = "/"
        }
    }

    async function login (email: string | null, senha: string | null) {
        try {
            if (email && senha) {
                const { user: responseUser, token } = await signIn(email, senha)

                if (responseUser !== null) {
                    setUser(responseUser)
                }

                localStorage.setItem("@DFCom:token", token)

                localStorage.setItem("@DFCom:auth", JSON.stringify(responseUser))
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function logout () {
        localStorage.removeItem("@DFCom:auth")

        localStorage.removeItem("@DFCom:token")

        setUser(null)

        window.location.href = "/"
    }

    async function addFavorities(id: string, usersIds: Array<string>) {
        const response = await updateProduct(id, usersIds)

        return response
    }

    async function removeFavorities(id: string, usersIds: Array<string>) {
        const response = await updateProduct(id, usersIds)

        return response
    }

    return (
        <AuthContext.Provider
            value={
                {
                    signed: !!user,
                    user,
                    createUser,
                    login,
                    logout,
                    addFavorities,
                    removeFavorities
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext