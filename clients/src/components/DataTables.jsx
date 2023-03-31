import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";

const DataTables = ({ columns, data, title, actions }) => {
  const defaultMaterialTheme = createTheme();
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);
  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          columns={columns}
          data={data}
          title={title}
          actions={actions}
        />
      </ThemeProvider>
    </div>
  );
};

export default DataTables;
