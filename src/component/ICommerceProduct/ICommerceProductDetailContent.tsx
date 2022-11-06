import {Badge, Breadcrumb, Modal} from 'react-bootstrap';
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
        width: 400px !important; 
    }
    
    display: flex;
    gap: 15px;
`;

const ICommerceProductDetailContent: React.FC<CheckBoxRecurringsProps> = (
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
            <Breadcrumb>
                <Breadcrumb.Item href="#"><Link to="/icommerce">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                    <Link to={`/product/${id}`}>Product</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card style={{width: '100%'}} hidden={cartStyle}>
                <Image>
                    <Card.Img style={{width: '400px !important'}} variant="top" src={productUrl}/>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            <p>{description}</p>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>SKU: {SKU}</ListGroup.Item>
                                <ListGroup.Item>Cost: {cost}$</ListGroup.Item>
                                <ListGroup.Item>Category: <Badge pill bg="primary">
                                    {category}
                                </Badge></ListGroup.Item>
                                <Button hidden={cartStyle} style={{width: '200px'}} variant="primary"
                                        onClick={handleShow}>Add To Cart</Button>
                            </ListGroup>
                        </Card.Text>
                    </Card.Body></Image>

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

export default ICommerceProductDetailContent;