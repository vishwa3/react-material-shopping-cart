import React from "react";
import {
  alpha,
  AppBar,
  Badge,
  Container,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import { CartState } from "./context/Context";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
  },
  search: {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "45%",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "55%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "65%",
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clearIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
}));

const Header = () => {
  const classes = useStyles();

  const {
    cart,
    filterState: { search },
    filterDispatch,
  } = CartState();

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    e.preventDefault();

    filterDispatch({ type: "SEARCH", payload: e.target.value });
  };
  const handleClear = () => {
    filterDispatch({ type: "SEARCH", payload: "" });
  };

  return (
    <div>
      <AppBar position="static">
        <Container>
          <Toolbar className={classes.header}>
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              <Link to="/">Shopping Cart</Link>
            </Typography>

            <div className={classes.search}>
              <InputBase
                value={search}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                placeholder="Search a product..."
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchChange}
              />

              {search && <ClearIcon onClick={handleClear} />}
            </div>
            <IconButton
              aria-label="number of items"
              color="inherit"
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={cart.length} color="secondary">
                {" "}
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
