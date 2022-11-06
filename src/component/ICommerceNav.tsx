import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// @ts-ignore
import cart from '../assest/icons8-cart-64.png';
import * as React from "react";
import {useEffect, useState} from "react";
import axiosInstance from "../common/api-client";
import {useDispatch, useSelector} from "react-redux";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ICommerceProduct from "./ICommerceProduct/ICommerceProduct";
// @ts-ignore
import styled from 'styled-components';
import {Link, useNavigate} from "react-router-dom";
import {changePageProduct, updateSearchValue} from "../redux/store.action";

const CartContaner = styled.div`
    max-height: 600px;
    overflow: auto;
`;

const Inner = styled.div`
`;

const TotalPrice = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-top: 20px;
`;

const ICommerceNav = ({}) => {
    const [name, setName] = useState('');
    const [carts, setCarts] = useState([]);
    const [cartLength, setCartLength] = useState([]);
    const dispatch = useDispatch();

    const currentCarts = useSelector((state: any) => state?.carts);
    const totalCart = useSelector((state: any) => state?.totalCart);
    const currentUserInfo = useSelector((state: any) => state?.userInfo);
    const navigate = useNavigate();

    const getCart = (res: any) => ({
        type: 'getCart',
        carts: res
    });

    const setUserInfo = (res: any) => ({
        type: 'setUserInfo',
        userInfo: res
    });

    useEffect(() => {
        if (!name) {
            axiosInstance.get(`user/${1}`).then((res: any) => {
                dispatch(setUserInfo(res?.data));
                setName(`${res?.data?.firstName} ${res?.data?.lastName}`);
            });
        }

        if (!carts || !carts.length) {
            axiosInstance.get(`cart/${1}`).then(res => {
                setCarts(res?.data);
                setCartLength(res?.data?.length);
                dispatch(getCart(res?.data));
            })
        }
    }, []);

    useEffect(() => {
        if (!currentCarts) {
            return;
        }

        setCarts(currentCarts);
        setCartLength(currentCarts.length);
    }, [currentCarts]);

    const [searchValue, setSearchValue] = useState('');

    const sendDataSession = async (show: any) => {
        if (!show && currentCarts && currentCarts.length) {
            console.log('run');
            let data = currentCarts.map((item: any) => ({
                id: item.id,
                quantity: item.quantity,
                userId: currentUserInfo.id,
                productId: item?.product?.id,
                sessionId: item?.shoppingSession?.id
            }));
            await axiosInstance.post("/cart", data).then((r: any) => {
                // @ts-ignore
                // dispatch(showToast(true, 'Add to cart successfully !', 'success'));
            }).catch((e: any) => {
                // @ts-ignore
                // dispatch(showToast(true, 'Error when add to cart !' + e, 'danger'));
            });
        }
    }

    const onSearchHandler = async () => {
        await navigate('/icommerce');
        await dispatch(changePageProduct(0));
        await dispatch(updateSearchValue(searchValue));
    }

    // @ts-ignore
    return <Inner>
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href=""><Link to="/icommerce">Icommerce</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll" role={null}>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Fashion</Nav.Link>
                        <Nav.Link href="#action2">Smart Home</Nav.Link>
                        <NavDropdown title="Mobile" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">VSmart</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Apple
                            </NavDropdown.Item>

                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action5">
                                Samsung
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search everything"
                                className="me-3"
                                aria-label="Search"
                                onBlur={(e: any) => setSearchValue(e?.target?.value)}
                            />
                            <Button variant="outline-success" onClick={onSearchHandler}>Search</Button>
                        </Form>
                    </Nav>
                    <Nav>

                        <OverlayTrigger
                            trigger={'click'}
                            rootClose={true}
                            placement="left"
                            delay={{show: 250, hide: 400}}
                            onToggle={(e) => sendDataSession(e)}
                            overlay={
                                <Popover id="popover-basic">
                                    <Popover.Header as="h3">
                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <p>Carts</p>
                                            <Button variant={'light'}><Link
                                                to={`/icommerce/checkout`}>Checkout</Link></Button>
                                        </div>
                                    </Popover.Header>
                                    <Popover.Body>
                                        <CartContaner>
                                            {carts && carts.length ? carts.map((ele: any, index: number) => {
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
                                        </CartContaner>
                                        <TotalPrice>
                                            <p><b>Total:</b> {totalCart?.toLocaleString()}$</p>
                                        </TotalPrice>
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <Button variant="outline-warning"><img width={20} src={cart} alt={'cart'}/> Cart
                                ({cartLength})</Button>
                        </OverlayTrigger>
                    </Nav>
                    <Navbar.Text>
                        Signed in as: <a href="#login">{name}</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar></Inner>
        ;
}

export default ICommerceNav;