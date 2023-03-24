import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getAllProducts } from "../api";
import { HiCurrencyRupee } from "../assets/icons";
import { DataTables } from "../components";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { setAllProducts } from "../context/actions/productActions";

const DBItems = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [dispatch, products]);
  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTables
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className="w-32 h-16 object-contain rounded-md"
                alt=""
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="text-2xl font-semibold text-textColor flex items-center justify-center  gap-2  ">
                <HiCurrencyRupee className="text-red-400" />
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
        ]}
        data={products}
        title="List of Products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit data",
            onClick: (event, rowData) => {
              alert("You Want to edit" + rowData.productId);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete data",
            onClick: (event, rowData) => {
              if (
                window.confirm("Are you sure, you want to delete this Item?")
              ) {
                deleteAProduct(rowData.productId).then((res) => {
                  dispatch(alertSuccess("Product Deleted Successfully"));
                  setInterval(() => {
                    dispatch(alertNULL());
                  }, 3000);
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default DBItems;
