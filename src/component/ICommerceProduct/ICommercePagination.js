import Pagination from 'react-bootstrap/Pagination';
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useState} from "react";
import {changePageProduct} from "../../redux/store.action";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function ProductPagination() {
  const productObject = useSelector((state) => state?.productObject);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);

  const handleChangePage = (page) => {
    if (pageNumber !== page) {
      dispatch(changePageProduct(page - 1));
    }
  };

  useMemo(() => {
    if (!productObject) return;

    let list = []
    for (let number = 1; number <= (productObject?.totalElements / productObject?.pageSize); number++) {
      list.push(
        <Pagination.Item key={number} active={number === pageNumber} onClick={() => {
          setPageNumber(number);
          handleChangePage(number);
        }}>
          {number}
        </Pagination.Item>
      );
    }
    setItems(list);
  }, [productObject?.totalElements, productObject?.pageSize, productObject?.pageNumber]);

  return (<Container className={'container'}><Pagination>
    {items}
  </Pagination></Container>);
}

export default ProductPagination;