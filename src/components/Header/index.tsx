import React, { useContext } from "react"

import Switch from 'react-switch'

import { ThemeContext } from "styled-components"

//import { shade } from 'polished'

import { Container } from "./styles"

interface Props {
    toggleTheme(): void
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
    const { colors, title } = useContext(ThemeContext)
    
    return (
        <Container>
            Hello World

            <Switch
                onChange={toggleTheme}
                checked={title === 'dark'}
                checkedIcon={false}
                uncheckedIcon={false}
                height={20}
                width={40}
                handleDiameter={20}
                offColor={title === 'light' ? colors.secondary : colors.primary}
                onColor={colors.secondary}
            />
        </Container>
    )
}

export default Header