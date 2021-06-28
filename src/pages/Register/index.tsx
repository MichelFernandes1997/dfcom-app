// import React from "react"

// const Register: React.FC = () => {
//     return (
//         <h1>
//             REGISTER
//         </h1>
//     )
// }

// export default Register

// eslint-disable-next-line @typescript-eslint/no-redeclare
import React, { useState, useEffect, useContext, useRef } from "react"

import { useHistory } from "react-router-dom"

import AuthContext from "../../contexts/authContext"

import {
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Button,
  Typography,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Box,
  Divider,
} from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      height: "98vh",
      display: "flex",
      justifyContent: "center",
    },
    fullHeight: {
      height: "100%",
      minHeight: "250px",
      border: "1px solid white",
    },
    fullWidth: {
      width: "100%",
    },
    fullSize: {
      width: "99%",
      height: "100%",
      border: "1px solid red",
    },
    formSizes: {
      width: "99%",
    },
    fieldsSpacing: {
      marginLeft: theme.spacing(2),
    },
    flexGridContainer: {
      display: "flex",
      alignItems: "center",
    },
    formStyles: {
      width: "95%",
      height: "65%",
      marginLeft: "1.7rem",
      border: "2px solid red",
    },
  })
)

interface UserInput {
  name: string
  email: string
  password: string
}

interface infoPassword {
  error: string | null
  errorSpecialsChars: string
  errorUpperCase: string
  errorLowerCase: string
  errorNumbers: string
  errorMinimumCaracteres: string
}

const Ong: React.FC = () => {
  const classes = useStyles()

  const history = useHistory()

  const { createUser } = useContext(AuthContext)

  const [name, setname] = useState<string | null>("")

  const [email, setEmail] = useState<string | null>("")

  const [password, setPassword] = useState<string | null>("")

  const [confirmPassword, setConfirmPassword] = useState<string | null>("")

  const [infoPassword, setInfoPassword] = useState<infoPassword | null>(null)

  const [infoconfirmPassword, setInfoconfirmPassword] = useState<string | null>(
    null
  )

  const [infoEmail, setInfoEmail] = useState<string | null>(null)

  const [infoName, setInfoName] = useState<string | null>(null)

  const [windowWidth, setWindowWidth] = useState<number | null>(null)

  const formInvalido = useRef<object>({}) as any

  const handleValidityname = () => {
    if (name !== null) {
      setInfoName("")
    }
  }

  const handleChangename = (input: string) => {
    if (input === "") {
      setname(null)
    } else {
      setname(input)
    }
  }

  const handleValidityEmail = () => {
    if (email !== null) {
      const regexValidityEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

      if (!regexValidityEmail.test(email)) {
        setInfoEmail("O email digitado não possui um formato válido")
      } else {
        setInfoEmail("")
      }
    } else {
      setInfoEmail(null)
    }
  }

  const handleChangeEmail = (input: string) => {
    if (input !== "") {
      setEmail(input)
    } else {
      setEmail(null)
    }
  }

  const handleValiditypassword = () => {
    if (password !== null) {
      let validitySpecialChars = /^(?=.*[@!#$%^&*()/\\])/

      let validityNumbers = /^(?=.*[0-9])/

      let validityUpperCase = /^(?=.*[A-Z])/

      let validityLowerCase = /^(?=.*[a-z])/

      let validityMinimumCaracteres = /^[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/

      if (infoPassword !== null) {
        if (!validitySpecialChars.test(password)) {
          setInfoPassword(
            (prevState) =>
              ({
                ...prevState,
                error: null,
                errorSpecialsChars:
                  "* É necessário pelo menos um caractere especial",
              } as infoPassword | null)
          )
        } else {
          setInfoPassword(
            (prevState) =>
              ({
                ...prevState,
                errorSpecialsChars: "",
              } as infoPassword | null)
          )
        }

        if (!validityNumbers.test(password)) {
          setInfoPassword(
            (prevState) =>
              ({
                ...prevState,
                errorNumbers: "* É necessário pelo menos um número",
              } as infoPassword | null)
          )
        } else {
          setInfoPassword(
            (prevState) =>
              ({
                ...prevState,
                errorNumbers: "",
              } as infoPassword | null)
          )
        }

        if (!validityUpperCase.test(password)) {
          setInfoPassword(
            (prevState) =>
              ({
                ...prevState,
                errorUpperCase: "* É necessário pelo menos uma letra maiúscula",
              } as infoPassword | null)
          )
        } else {
          setInfoPassword(
            (prevState) =>
              ({
                ...prevState,
                errorUpperCase: "",
              } as infoPassword | null)
          )
        }

        if (!validityLowerCase.test(password)) {
          setInfoPassword(
            (prevState) =>
              ({
                ...prevState,
                errorLowerCase: "* É necessário pelo menos uma letra minúscula",
              } as infoPassword | null)
          )
        } else {
          setInfoPassword(
            (prevState) =>
              ({
                ...prevState,
                errorLowerCase: "",
              } as infoPassword | null)
          )
        }
      }

      if (!validityMinimumCaracteres.test(password)) {
        setInfoPassword(
          (prevState) =>
            ({
              ...prevState,
              errorMinimumCaracteres: "* É necessário no mínimo 8 caracteres",
            } as infoPassword | null)
        )
      } else {
        setInfoPassword(
          (prevState) =>
            ({
              ...prevState,
              errorMinimumCaracteres: "",
            } as infoPassword | null)
        )
      }

      if (infoPassword?.error !== "") {
        setInfoPassword(
          (prevState) =>
            ({
              ...prevState,
              error: "",
            } as infoPassword | null)
        )
      }
    } else {
      setInfoPassword(null)
    }
  }

  const handleChangepassword = (input: string) => {
    if (input !== "") {
      setPassword(input)
    } else {
      setPassword(null)
    }
  }

  const handleValidityconfirmPassword = () => {
    if (confirmPassword !== null) {
      if (confirmPassword !== password) {
        setInfoconfirmPassword("As passwords digitadas não são iguais")
      } else {
        setInfoconfirmPassword("")
      }
    } else {
      setInfoconfirmPassword(null)
    }
  }

  const handleChangeconfirmPassword = (input: string) => {
    if (input !== "") {
      setConfirmPassword(input)
    } else {
      setConfirmPassword(null)
    }
  }

  const handleSendTo = (uri: string) => {
    history.push(uri)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (infoEmail === null) {
      formInvalido.current.infoEmail = true

      setInfoEmail("Campo obrigatório")
    } else if (infoEmail !== "") {
      formInvalido.current.infoEmail = true
    } else {
      formInvalido.current.infoEmail = false
    }

    if (infoPassword === null) {
      formInvalido.current.infoPassword = true

      setInfoPassword({
        error: "Campo obrigatório",
        errorSpecialsChars: "",
        errorUpperCase: "",
        errorLowerCase: "",
        errorNumbers: "",
        errorMinimumCaracteres: "",
      })
    } else if(infoPassword.error !== "" || infoPassword.errorSpecialsChars !== "" || infoPassword.errorUpperCase !== "" || infoPassword.errorLowerCase !== "" || infoPassword.errorNumbers !== "" || infoPassword.errorMinimumCaracteres !== "") {
      formInvalido.current.infoPassword = true
    } else {
      formInvalido.current.infoPassword = false
    }

    if (infoconfirmPassword === null) {
      formInvalido.current.infoconfirmPassword = true

      setInfoconfirmPassword("Campo obrigatório")
    } else if (infoconfirmPassword === "Campo obrigatório" || infoconfirmPassword === "As passwords digitadas não são iguais") {
      formInvalido.current.infoconfirmPassword = true
    } else {
      formInvalido.current.infoconfirmPassword = false
    }

    if (infoName !== "") {
      formInvalido.current.infoName = true

      setInfoName("Campo obrigatório")
    } else {
      formInvalido.current.infoName = false
    }

    if (!formInvalido.current.infoEmail && !formInvalido.current.infoCnpj && !formInvalido.current.infoName && !formInvalido.current.infoconfirmPassword && !formInvalido.current.infoPassword && !formInvalido.current.dataCriacao && !formInvalido.current.infoDescricao) {
      const user = {
        name,
        email,
        password,
      } as UserInput

      createUser(user)
    }
  }

  useEffect(() => {
    if (name !== "") {
      handleValidityname()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  useEffect(() => {
    if (email !== "") {
      handleValidityEmail()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  useEffect(() => {
    if (password !== "") {
      handleValiditypassword();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password])

  useEffect(() => {
    if (confirmPassword !== "") {
      handleValidityconfirmPassword();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword])

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      m={1}
      className={classes.formContainer}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Card style={{ height: "100%" }}>
          <CardHeader
            title={
              <Typography variant="h4" color="primary" align="center">
                Cadastro de usuário
              </Typography>
            }
          />
          <Divider variant="middle" />
          <CardContent
            style={{
              height: "100%",
            }}
          >
            <Box display="flex" alignItems="center" style={{ height: "80%" }}>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={windowWidth !== null ? (windowWidth < 720 ? 12 : 6) : 6}
                >
                  <TextField
                    id="name"
                    label="name"
                    value={name}
                    placeholder="name"
                    helperText={
                      <Typography variant="subtitle2" color="error">
                        {infoName}
                      </Typography>
                    }
                    variant="outlined"
                    className={classes.fullWidth}
                    onChange={(e) => handleChangename(e.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  xs={windowWidth !== null ? (windowWidth < 720 ? 12 : 6) : 6}
                >
                  <TextField
                    id="email"
                    label="E-mail"
                    value={email}
                    placeholder="E-mail"
                    helperText={
                      <Typography variant="subtitle2" color="error">
                        {infoEmail}
                      </Typography>
                    }
                    variant="outlined"
                    className={classes.fullWidth}
                    onChange={(e) => handleChangeEmail(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={windowWidth !== null ? (windowWidth < 720 ? 12 : 6) : 6}
                >
                  <TextField
                    id="password"
                    label="password"
                    type="password"
                    value={password}
                    placeholder="password"
                    helperText={
                      infoPassword !== null ? (
                        infoPassword.error === "Campo obrigatório" ? (
                          <Typography variant="subtitle2" color="error">
                            {infoPassword.error}
                          </Typography>
                        ) : (
                          <Typography variant="subtitle2" color="error">
                            {infoPassword.errorSpecialsChars !== "" &&
                            (infoPassword.errorNumbers !== "" ||
                              infoPassword.errorUpperCase !== "" ||
                              infoPassword.errorLowerCase !== "" ||
                              infoPassword.errorMinimumCaracteres !== "") ? (
                              <p>{infoPassword.errorSpecialsChars}</p>
                            ) : (
                              infoPassword.errorSpecialsChars
                            )}
                            {infoPassword.errorNumbers !== "" &&
                            (infoPassword.errorSpecialsChars !== "" ||
                              infoPassword.errorUpperCase !== "" ||
                              infoPassword.errorLowerCase !== "" ||
                              infoPassword.errorMinimumCaracteres !== "") ? (
                              <p>{infoPassword.errorNumbers}</p>
                            ) : (
                              infoPassword.errorNumbers
                            )}
                            {infoPassword.errorUpperCase !== "" &&
                            (infoPassword.errorSpecialsChars !== "" ||
                              infoPassword.errorNumbers !== "" ||
                              infoPassword.errorLowerCase !== "" ||
                              infoPassword.errorMinimumCaracteres !== "") ? (
                              <p>{infoPassword.errorUpperCase}</p>
                            ) : (
                              infoPassword.errorUpperCase
                            )}
                            {infoPassword.errorLowerCase !== "" &&
                            (infoPassword.errorUpperCase !== "" ||
                              infoPassword.errorNumbers !== "" ||
                              infoPassword.errorSpecialsChars !== "" ||
                              infoPassword.errorMinimumCaracteres !== "") ? (
                              <p>{infoPassword.errorLowerCase}</p>
                            ) : (
                              infoPassword.errorLowerCase
                            )}
                            {infoPassword.errorMinimumCaracteres !== "" &&
                            (infoPassword.errorUpperCase !== "" ||
                              infoPassword.errorNumbers !== "" ||
                              infoPassword.errorSpecialsChars !== "" ||
                              infoPassword.errorLowerCase !== "") ? (
                              <p>{infoPassword.errorMinimumCaracteres}</p>
                            ) : (
                              infoPassword.errorMinimumCaracteres
                            )}
                          </Typography>
                        )
                      ) : (
                        ""
                      )
                    }
                    variant="outlined"
                    className={classes.fullWidth}
                    onChange={(e) => handleChangepassword(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={windowWidth !== null ? (windowWidth < 720 ? 12 : 6) : 6}
                >
                  <TextField
                    id="confirmPassword"
                    label="Confirme a password"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirmação de password"
                    helperText={
                      <Typography variant="subtitle2" color="error">
                        {infoconfirmPassword}
                      </Typography>
                    }
                    variant="outlined"
                    className={classes.fullWidth}
                    onChange={(e) => handleChangeconfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={4}>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={(e) => handleSendTo("/")}
                    style={{
                      width: "100%",
                    }}
                  >
                    Voltar ao login
                  </Button>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    style={{
                      width: "100%",
                    }}
                  >
                    Cadastrar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  )
}

export default Ong