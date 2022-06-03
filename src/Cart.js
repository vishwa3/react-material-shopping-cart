import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { CartState } from "./context/Context";
import Rating from "@material-ui/lab/Rating";
import Select from "@material-ui/core/Select";
import { Button, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  cartItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  cartItemContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
  total: {
    backgroundColor: "rgb(179, 203, 255)",
    height: "100vh",
  },
  totalAmount: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    rowGap: "25px",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const { cart, cartDispatch } = CartState();

  const handleQuantityChange = (e, item) => {
    e.preventDefault();
    cartDispatch({
      type: "CHANGE_QUANTITY",
      payload: { qty: e.target.value, item },
    });
  };

  const deleteCartItem = (item) => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const getTotal = () => {
    const totalAmount = cart.reduce((sum, cartItem) => {
      const updatedSum = sum + cartItem.qty * cartItem.price;
      return updatedSum;
    }, 0);
    return totalAmount;
  };
  return (
    <>
      {cart.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            fontFamily: "Montserrat",
            fontSize: "large",
          }}
        >
          Cart is empty
        </div>
      ) : (
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={9} md={9} sm={9} lg={9}>
              <div className={classes.cartItemContainer}>
                {cart.map((item) => {
                  return (
                    <div key={item.id} className={classes.cartItem}>
                      <img
                        height="70"
                        src={item.image}
                        style={{ borderRadius: "5px" }}
                        alt="product"
                      />
                      <Typography>{item.name}</Typography>
                      <Typography>₹ {item.price}</Typography>
                      <Rating name="read-only" value={item.ratings} readOnly />
                      <Select
                        value={item.qty}
                        onChange={(e) => handleQuantityChange(e, item)}
                      >
                        {[...Array(item.inStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                      <IconButton
                        aria-label="delete cart item"
                        color="inherit"
                        onClick={() => deleteCartItem(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  );
                })}
              </div>
            </Grid>
            <Grid item xs={3} md={3} sm={3} lg={3}>
              <div className={classes.total}>
                <div className={classes.totalAmount}>
                  <Typography
                    variant="h4"
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    Subtotal ({cart.length}) items
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{ fontFamily: "Montserrat", fontWeight: "600" }}
                  >
                    Total: ₹ {getTotal()}
                  </Typography>
                  <Button variant="contained" color="primary">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Cart;
