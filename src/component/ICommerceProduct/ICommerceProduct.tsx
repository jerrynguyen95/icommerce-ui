import {Badge, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import * as React from "react";
import {useMemo, useState} from "react";
import axiosInstance from "../../common/api-client";
import {useDispatch, useSelector} from "react-redux";
// @ts-ignore
import styled from "styled-components";
import {addCart, deleteCart, showToast, updateCart, updateTotalCart} from "../../redux/store.action";
import {Link} from "react-router-dom";

interface CheckBoxRecurringsProps {
    id: number;
    name: string;
    description: string;
    SKU: string;
    category: string;
    cost: number;
    quantity: number;
    productUrl: string;
    cartStyle: boolean;
    productCartId: number;
    index: number;
    cartQuantity: number;
}

const Close = styled.div`
    cursor: pointer;
    font-weight: lighter;
    float: right;
`;

const Image = styled.div`
    .card-img, .card-img-bottom, .card-img-top{
        width: 100px !important; 
    }
    
    display: flex;
    gap: 15px;
`;

const ICommerceProduct: React.FC<CheckBoxRecurringsProps> = (
    {
        name, description, id,
        SKU, category, cost,
        quantity, productUrl, cartStyle = false,
        productCartId, index, cartQuantity
    }) => {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const [count, setCount] = useState(1);

    const carts = useSelector((state: any) => state?.carts);

    const dispatch = useDispatch();

    const currentUserInfo = useSelector((state: any) => state?.userInfo)

    const handleAddToCart = () => {
        if (count > quantity || count === 0) {
            dispatch(showToast(true, 'Not enough inventory !', 'danger'));
            return;
        }

        axiosInstance.put("/cart", {
            userId: currentUserInfo.id,
            total: count * cost,
            productId: id,
            quantity: count
        }).then(r => {

            dispatch(showToast(true, 'Add to cart successfully !', 'success'));
            dispatch(addCart(r?.data));

        }).catch(e => {
            dispatch(showToast(true, 'Error when add to cart !', 'danger'));
        }).finally(() => {
            handleClose();
        });
    }

    const handleDeleteCart = (productCartId: number) => {
        axiosInstance.delete(`/cart/${productCartId}`).then(r => {
            dispatch(showToast(true, 'Remove from cart successfully !', 'success'));
            let currentIndex = carts.findIndex((item: any) => item.id === productCartId);
            dispatch(deleteCart(currentIndex));

        }).catch(e => {
            dispatch(showToast(true, 'Error when remove from cart !', 'danger'));
        }).finally(() => {
            handleClose();
        });
    }

    const handleChangeQuantity = (index: number, quantity: number) => {
        dispatch(updateCart(index, quantity));
    }

    useMemo(() => {
        let result = carts.reduce((total: number, currentCart: any) => {
            return total + (Number(currentCart?.product?.cost) * Number(currentCart?.quantity));
        }, 0);
        dispatch(updateTotalCart(result));
    }, [carts])

    return (
        <>
            <Card hidden={!cartStyle}>
                <Card.Header as="h5">{name} <Close onClick={handleShow}>x</Close></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Image>
                            <Card.Img variant="top" src={productUrl}/>
                            <div><p><b>Description</b>: {description.substring(0, 100)}...</p>
                                <Image>
                                    <Image><Form.Label><b>Quantity</b>:</Form.Label>
                                        <Form.Control min={1} max={quantity} type="number" defaultValue={cartQuantity}
                                                      onClick={(e: any) => {
                                                          // to fix issue onblur when click increase/decrease number
                                                          e?.target.focus();
                                                      }}

                                                      onChange={(e: any) => {
                                                          if (e?.target?.value <= quantity) {
                                                              setCount(e?.target?.value);
                                                          }
                                                      }}

                                                      onBlur={(e: any) => {
                                                          let value = e?.target?.value;
                                                          if (Number(value) > quantity) {
                                                              e.target.value = quantity;
                                                          } else if (Number(e?.target?.value) < 1) {
                                                              e.target.value = 1;
                                                          }

                                                          setCount(e?.target?.value);
                                                          handleChangeQuantity(index, e?.target?.value);
                                                      }}/>
                                    </Image>
                                    <div><b>Price</b>: {cost * count}$</div>
                                </Image>
                            </div>

                        </Image>
                    </Card.Text>


                </Card.Body>
            </Card>
            <Card style={{width: '15rem'}} hidden={cartStyle}>
                <Card.Img width={10} variant="top" src={productUrl}/>
                <Card.Body>
                    <Card.Title><Link to={`/icommerce/product/${id}`}>{name}</Link></Card.Title>
                    <Card.Text>
                        <OverlayTrigger
                            key={"top"}
                            placement={"top"}
                            overlay={
                                <Tooltip id={`tooltip-${"top"}`}>
                                    {description}
                                </Tooltip>
                            }
                        >
                            <p>{description?.substring(0, 100)} ...</p>
                        </OverlayTrigger>

                        <Button variant="light">
                            <Link to={`/icommerce/product/${id}`}>See More</Link></Button>
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>SKU: {SKU}</ListGroup.Item>
                    <ListGroup.Item>Cost: {cost}$</ListGroup.Item>
                    <ListGroup.Item>Category: <Badge pill bg="primary">
                        {category}
                    </Badge></ListGroup.Item>

                </ListGroup>
                <Card.Body>
                    <Button hidden={cartStyle} variant="primary" onClick={handleShow}>Add To Cart</Button>

                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{cartStyle ? 'Delete from cart' : 'Add To Cart'}</Modal.Title>
                </Modal.Header>
                <Modal.Body hidden={cartStyle}>Woohoo, you wanna add the <b>{name}</b> to the <b>Cart</b></Modal.Body>
                <Modal.Body hidden={!cartStyle}>You wanna delete the <b>{name}</b> from the <b>Cart</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        cartStyle ? handleDeleteCart(productCartId) : handleAddToCart()
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ICommerceProduct;