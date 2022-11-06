import './App.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./component/ICommerceHomepage";
import ICommerceProduct from "./component/ICommerceProduct/ICommerceProduct";
import ICommerceProductDetail from "./component/ICommerceProductDetail";
import ICommerceNoPage from "./component/ICommerceNoPage";
import ICommerceCheckoutPage from "./component/ICommerceCheckoutPage";
import ICommerceLayout from "./component/ICommerceLayout";

function App() {
  const currentToast = useSelector((state) => state.toastObject);

  const [toastObject, setToastObject] = useState({
    show: false,
    content: '',
    type: ''
  });

  useEffect(() => {
    if (!currentToast) return;

    setToastObject(currentToast);
  }, [currentToast])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ICommerceLayout />}>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/icommerce" exact element={<Homepage />} />
          <Route path="/icommerce/product/:id" element={<ICommerceProductDetail/>}/>
          <Route path="/icommerce/checkout" element={<ICommerceCheckoutPage/>}/>
          <Route path="*" element={<ICommerceNoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
