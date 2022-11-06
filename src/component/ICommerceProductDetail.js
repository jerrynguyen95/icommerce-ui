import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import axiosInstance from "../common/api-client";
import ICommerceProductDetailContent from "./ICommerceProduct/ICommerceProductDetailContent";

const ICommerceProductDetail = () => {
  const currentToast = useSelector((state) => state.toastObject);
  const {id} = useParams();
  const [product, setProduct] = useState();

  const [toastObject, setToastObject] = useState({
    show: false, content: '', type: ''
  });

  useEffect(() => {
    axiosInstance.get(`/product/${id}`).then((res) => {
      setProduct(res?.data);
    });
  }, [id])

  useEffect(() => {
    if (!currentToast) return;

    setToastObject(currentToast);
  }, [currentToast])

  return (<Row>
      {product && <ICommerceProductDetailContent id={product?.id} name={product?.name}
                                                 description={product?.description}
                                                 SKU={product?.sku} category={product.category?.name}
                                                 cost={product?.cost} quantity={product.quantity}
                                                 productUrl={product?.imageUrl} cartStyle={false} productCartId={-1}
                                                 index={-1} cartQuantity={1}/>}
    </Row>);
};

export default ICommerceProductDetail;