import '../App.css';
import ICommerceNav from "./ICommerceNav";
import UncontrolledExample from "./ICommerceCarousel";
import {Row, ThemeProvider, Toast, ToastContainer} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showToast} from "../redux/store.action";
import {Outlet} from "react-router-dom";

const ICommerceLayout = () => {
  const currentToast = useSelector((state) => state?.toastObject);
  const dispatch = useDispatch();

  const [toastObject, setToastObject] = useState({
    show: false, content: '', type: ''
  });

  useEffect(() => {
    if (!currentToast) return;

    setToastObject(currentToast);
  }, [currentToast])

  // @ts-ignore
  return (<div className="App">
    <ToastContainer position="top-end" className="p-3" containerPosition={'fixed'}>
      <Toast onClose={() => {
        dispatch(showToast(false, '', ''));
        setToastObject({
          show: false, content: '', type: ''
        });
      }} show={toastObject?.show || false} delay={3000} autohide bg={toastObject?.type}
             containerPosition={'fixed'}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">{toastObject?.type?.toUpperCase()}</strong>
          <small>{new Date().getHours()}</small>
        </Toast.Header>
        <Toast.Body>{toastObject?.content}</Toast.Body>
      </Toast>
    </ToastContainer>
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lglg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Container fluid>
        <ICommerceNav></ICommerceNav>
        <Row>
          <UncontrolledExample></UncontrolledExample>
        </Row>
        <Row>
          <Outlet/>
        </Row>
        <Row>
          <div style={{textAlign: 'center', height: '200px', backgroundColor: 'orange'}}><h1
            style={{lineHeight: '200px'}}>Footer goes here</h1></div>
        </Row>
      </Container>
    </ThemeProvider>
  </div>);
}

export default ICommerceLayout;
