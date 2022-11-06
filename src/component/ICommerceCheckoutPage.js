import '../App.css';
import {Row} from "react-bootstrap";
import * as React from "react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ICommerceProduct from "./ICommerceProduct/ICommerceProduct";

function ICommerceCheckoutPage() {
  const currentToast = useSelector((state) => state.toastObject);
  const currentCarts = useSelector((state) => state.carts);
  const total = useSelector((state) => state.totalCart);
  const [carts, setCarts] = useState([]);

  const [toastObject, setToastObject] = useState({
    show: false,
    content: '',
    type: ''
  });

  useEffect(() => {
    setCarts(currentCarts);
  }, [currentCarts]);

  useEffect(() => {
    if (!currentToast) return;

    setToastObject(currentToast);
  }, [currentToast])

  return (
    <Row style={{width: '80%', margin: '20px auto'}}>
      <h3>Please check the cart and checkout for them by BankNumber or QR code below:</h3>
      <hr/>
      <h4>Total: {total?.toLocaleString()}$</h4>
      <hr/>
      <div style={{display: 'flex', gap: '30px'}}>
        <div>
          <p><b>Bank number:</b> 123456789</p>
          <p><b>Name:</b> Random Bank Corporation</p>
          <p><b>Bank name:</b> Random Bank</p>
        </div>
        <div style={{width: '100px', height: '100px', backgroundColor: 'orange', textAlign: 'center'}}>
          <h6 style={{lineHeight: '100px'}}>QR Code</h6>
        </div>
      </div>
      <hr></hr>
      {carts && carts.length ? currentCarts.map((ele, index) => {
        const item = ele.product;

        return <ICommerceProduct
          index={index}
          cartStyle={true}
          name={item?.name}
          SKU={item?.sku}
          productUrl={item?.imageUrl}
          description={item?.description}
          cost={item?.cost}
          quantity={item?.quantity}
          category={item?.category?.name}
          id={item?.id}
          productCartId={ele.id}
          cartQuantity={ele.quantity}
        />
      }) : 'No product carts found !'}

    </Row>
  );
}

export default ICommerceCheckoutPage;
