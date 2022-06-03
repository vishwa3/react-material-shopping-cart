import React from "react";
import {
  Button,
  makeStyles,
  Typography,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { CartState } from "./context/Context";

const useStyles = makeStyles(() => ({
  filter: {
    backgroundColor: "rgb(179, 203, 255)",
    height: "100vh",
    display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // rowGap: "25px",
  },
  filterContainer: {
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    rowGap: "15px",
  },
  rating: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

const Filter = () => {
  const classes = useStyles();

  const {
    filterDispatch,
    filterState: { outofstock, fastDelivery, sort, rating },
  } = CartState();
  const handleRadioChange = (event) => {
    filterDispatch({ type: "SORT_BY_PRICE", payload: event.target.value });
  };

  const handleCheckChange = (event) => {
    const action =
      event.target.name === "out-of-stock" ? "OUT_OF_STOCK" : "FAST_DELIVERY";
    filterDispatch({ type: action, payload: event.target.checked });
  };
  const clearFilter = () => {
    filterDispatch({ type: "CLEAR_FILTER" });
  };

  return (
    <div className={classes.filter}>
      <div className={classes.filterContainer}>
        <Typography
          variant="h5"
          style={{
            fontFamily: "Montserrat",
          }}
        >
          Filter Products
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup aria-label="sort-by-price" name="sort" value={sort}>
            <FormControlLabel
              value="ascending"
              control={<Radio color="primary" />}
              label="Ascending"
              onClick={handleRadioChange}
            />
            <FormControlLabel
              value="descending"
              control={<Radio color="primary" />}
              label="Descending"
              onClick={handleRadioChange}
            />
          </RadioGroup>
        </FormControl>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={outofstock}
                name="out-of-stock"
                color="primary"
                onChange={handleCheckChange}
              />
            }
            label="Include Out of Stock"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={fastDelivery}
                name="fast-delivery"
                color="primary"
                onChange={handleCheckChange}
              />
            }
            label="Fast Delivery Only"
          />
        </FormGroup>
        <div className={classes.rating}>
          <Typography variant="h6" style={{ fontFamily: "Montserrat" }}>
            Rating:<>&nbsp;</>
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) =>
              filterDispatch({ type: "RATING", payload: newValue })
            }
          />
        </div>

        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={clearFilter}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default Filter;
