import React, { useContext, useEffect, useState } from "react"

//import { Container, ProductContent, Panel, Column, Gallery } from "./styles"

import AuthContext from "../../contexts/authContext"

import { listProducts } from "../../services/products/listProducts"

import defaultPhoto from '../../assets/defaultPhoto.jpg'

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  makeStyles,
  createStyles,
  Theme,
  IconButton
} from "@material-ui/core";

import FavoriteIcon from '@material-ui/icons/Favorite';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
)

const SignIn: React.FC = () => {
    const classes = useStyles()

    const [reloadProducts, setReloadProducts] = useState<boolean>(false)

    const [products, setProducts] = useState<Array<Products> | null>(null)

    const { addFavorities, removeFavorities, user } = useContext(AuthContext)

    const handleAddFavorities = async (productId: string, usersFavorities: Array<string>) => {
      if (user) {
        usersFavorities.push(user._id)
        
        const added = await addFavorities(productId, usersFavorities)

        setReloadProducts(!reloadProducts)
      }
    }

    const handleRemoveFavorities = async (productId: string, usersFavorities: Array<string>) => {
      if (user) {
        const favoritieRemoved = usersFavorities.filter(item => item !== user._id)
        
        const removed = await removeFavorities(productId, favoritieRemoved)

        setReloadProducts(!reloadProducts)
      }
    }

    useEffect(() => {
        const getProducts = async () => {
          const response = await listProducts()
          
          setProducts(response)
        }

        getProducts()
    }, [])

    useEffect(() => {
      const getProducts = async () => {
        const response = await listProducts()
        
        setProducts(response)
      }

      getProducts()
  }, [reloadProducts])

    return (
        <Grid container alignItems="center" justify="center" spacing={1} style={{ marginTop: "4%" }}>
          {products?.map((item) =>
            (
              <Grid item xs={3}>
                <Card style={{ width: '100%', maxWidth: '400px' }}>
                  <CardMedia
                    component="img"
                    alt="Capa do projeto"
                    height="140"
                    image={defaultPhoto}
                    title="Capa do projeto"
                  />
                  <CardContent>
                    <Typography variant="h6" color="textPrimary" component="p">
                      Nome: {item.name}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                      R$: {item.price}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                      Descrição: {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Box
                      display="flex"
                      justifyContent="center"
                      style={{ width: "100%" }}
                    >
                      {item.usersWithFavorities.includes(user?._id || '')
                        ? <IconButton 
                            color="secondary" 
                            aria-label="delete"
                            onClick={() => handleRemoveFavorities(item._id, item.usersWithFavorities)}
                          >
                            <FavoriteIcon />
                          </IconButton>
                        : <Button
                          color="primary"
                          variant="contained"
                          onClick={() => handleAddFavorities(item._id, item.usersWithFavorities)}
                        >
                          Favoritar
                        </Button>
                      }
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            )
          )}
        </Grid>
    )
}

// eslint-disable-next-line no-lone-blocks
{/* <Panel>
    <Column>
        <Gallery>
            <img alt='T-Shirt' src="../public" />
        </Gallery>
    </Column>

    <Column>
    </Column>
</Panel> */}

// return (
//     <Container>
//         <ProductContent>
//             <Panel>
//                 <Column>
//                     <h1>Products</h1>
//                     {
//                         products !== null ?
//                             products.map(item => (
//                                 <>
//                                     <ul>
//                                         <li>
//                                             <Gallery>
//                                                 <img alt='T-Shirt' src={defaultPhoto} />
//                                             </Gallery>
//                                         </li>
//                                         <li>{item.name}</li>
//                                         <li>{item.title}</li>
//                                         <li>{item.description}</li>
//                                         <li>{item.image}</li>
//                                         <li>{item.name}</li>
//                                         <li>{item.price}</li>
//                                         <li>{item.sku}</li>
//                                         <li>{item.stock}</li>
//                                         <li>{item?.usersWithFavorities}</li>
//                                     </ul>
//                                     <hr />
//                                 </>
//                             ))
//                         : console.log('Vazio')
//                     }
//                 </Column>
//             </Panel>
//         </ProductContent>
//     </Container>
// )

export default SignIn