import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../assest/slide1.png';
import slide2 from '../assest/Slide2.jpg';

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img width={800} height={600}
             className="d-block w-100"
             src={slide1}
             alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          width={800} height={600}
          className="d-block w-100"
          src={slide2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;