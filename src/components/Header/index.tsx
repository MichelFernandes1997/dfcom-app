import React, { useContext } from "react"

//import Switch from 'react-switch'

import AuthContext from "../../contexts/authContext"

//import { ThemeContext } from "styled-components"

import { Button } from '@material-ui/core'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { Container, UserArea } from "./styles"

const Header: React.FC = () => {
    //const { colors, title } = useContext(ThemeContext)

    const { user, logout } = useContext(AuthContext)

    return (
        <Container>
            <>DFCom Sistemas</>

            <UserArea>
                Usuário: {!!user ? user.name : 'Usuário não encontrado'}

                <div style={{ margin: '0 20px'}}>
                <Button
                    variant="contained"
                    startIcon={<ExitToAppIcon />}
                    onClick={() => logout()}
                >
                    Logout
                </Button>
                </div>
            </UserArea>
            {/* {<Switch
                onChange={() => {}}
                checked={title === 'dark'}
                checkedIcon={false}
                uncheckedIcon={false}
                height={20}
                width={40}
                handleDiameter={20}
                offColor={title === 'light' ? colors.secondary : colors.primary}
                onColor={colors.secondary}
            />} */}
        </Container>
    )
}

export default Header