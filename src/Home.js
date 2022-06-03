import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CartState } from "./context/Context";
import Rating from "@material-ui/lab/Rating";
import Filter from "./Filter";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 180,
  },
  filter: {
    backgroundColor: "rgb(179, 203, 255)",
    height: "100vh",
  },
}));

const Home = () => {
  const {
    cart,
    cartDispatch,
    products,
    filterState: { fastDelivery, outofstock, sort, rating, search },
  } = CartState();
  const classes = useStyles();

  const handleAddToCart = (e, item) => {
    cartDispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (e, itemToBeRemoved) => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: itemToBeRemoved });
  };

  const tranformedProduct = () => {
    let transformedProducts = products;
    if (sort === "ascending") {
      transformedProducts = transformedProducts.sort(
        (a, b) => a.price - b.price
      );
    }
    if (sort === "descending") {
      transformedProducts = transformedProducts.sort(
        (a, b) => b.price - a.price
      );
    }
    if (!outofstock) {
      transformedProducts = transformedProducts.filter((prod) => prod.inStock);
    }

    if (fastDelivery) {
      transformedProducts = transformedProducts.filter(
        (prod) => prod.fastDelivery
      );
    }
    if (rating) {
      transformedProducts = transformedProducts.filter(
        (prod) => prod.ratings >= rating
      );
    }

    if (search) {
      transformedProducts = transformedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // console.log("transformed", transformedProducts);
    return transformedProducts;
  };

  const showButton = (item) => {
    let button;
    if (!item.inStock) {
      button = (
        <Button size="small" variant="contained" disabled>
          OUT OF STOCK
        </Button>
      );
    } else {
      button = cart.map((prod) => prod.id).includes(item.id) ? (
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={(e) => removeFromCart(e, item)}
        >
          Remove from Cart
        </Button>
      ) : (
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={(e) => handleAddToCart(e, item)}
        >
          Add to Cart
        </Button>
      );
    }

    return button;
  };

  return (
    <div
      style={{
        margin: "10px",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={6} sm={4} md={3} lg={3}>
          <Filter />
        </Grid>
        <Grid item xs={6} sm={8} md={9} lg={9}>
          <Grid container spacing={2}>
            {tranformedProduct().map((item) => {
              return (
                <Grid item key={item.id} lg={3} md={4} sm={6} xs={12}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={item.image}
                        title="image"
                      />
                      <CardContent>
                        <Typography
                          style={{ textAlign: "left" }}
                          gutterBottom
                          variant="h5"
                          component="h2"
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          style={{ textAlign: "left" }}
                          component="h2"
                        >
                          ₹{item.price}
                        </Typography>
                        <Typography
                          variant="h6"
                          style={{ textAlign: "left" }}
                          component="h2"
                        >
                          {item.fastDelivery
                            ? "Fast Delivery"
                            : "4 days delivery"}
                        </Typography>

                        <Rating
                          style={{ display: "flex" }}
                          name="read-only"
                          value={item.ratings}
                          readOnly
                        />
                      </CardContent>
                    </CardActionArea>
                    <CardActions>{showButton(item)}</CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
