import '../App.css';
import ICommerceProductContainer from "./ICommerceProduct/ICommerceProductContainer";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

function Homepage() {
  const currentToast = useSelector((state) => state.toastObject);
  const dispatch = useDispatch();

  const [toastObject, setToastObject] = useState({
    show: false, content: '', type: ''
  });

  useEffect(() => {
    if (!currentToast) return;

    setToastObject(currentToast);
  }, [currentToast])

  return (<ICommerceProductContainer></ICommerceProductContainer>);
}

export default Homepage;
