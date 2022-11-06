import ICommerceProduct from "./ICommerceProduct";
import styled from "styled-components";
import {useEffect, useMemo, useState} from "react";
import axiosInstance from "../../common/api-client";
import ProductPagination from "./ICommercePagination";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../redux/store.action";

const Products = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    .card-img-top {
      height: 200px !important;
    }
`;

const Product = styled.div`
`;

function ICommerceProductContainer() {
  const [products, setProducts] = useState();
  const dispatch = useDispatch();
  const productObject = useSelector(state => state?.productObject);
  const pageNumber = useSelector(state => state?.pageNumber);
  const searchValue = useSelector(state => state?.searchValue);

  const fetchData = async (pageNumber = 0, pageSize = 20, searchValue = '') => {
    return await axiosInstance.get(`products?page=${pageNumber || 0}&size=${pageSize || 20}&s=${encodeURIComponent(searchValue || '')}`)
  };

  useEffect(() => {
    fetchData().then(res => {
      setProducts(res?.data?.rows);
      dispatch(getProducts(res?.data));
    });
  }, [])

  useMemo(() => {
    console.log('get product ' + JSON.stringify(productObject));

    if (!productObject) return;

    fetchData(pageNumber, 20, searchValue).then(res => {
      setProducts(res?.data?.rows);
      dispatch(getProducts(res?.data));
    });
  }, [pageNumber, searchValue]);

  return (<Products>
    {products && products.map((item, index) => {
      return (<Product>
        <ICommerceProduct
          index={index}
          cartStyle={false}
          name={item?.name}
          SKU={item?.sku}
          productUrl={item?.imageUrl}
          description={item?.description}
          cost={item?.cost}
          quantity={item?.quantity}
          category={item?.category.name}
          id={item?.id}
          productCartId={-1}
        /></Product>);
    })}
    <ProductPagination/>
  </Products>);
}

export default ICommerceProductContainer;