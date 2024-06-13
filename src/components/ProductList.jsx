import { Container, Row, Col } from 'react-bootstrap';
import ProductItem from "./ProductItem";
import '../styles/productList.css'; // Import custom CSS for additional styling

function ProductList({ products }) {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                {products.map(product => (
                    <Col key={product.id} xs={12} md={6} lg={4} className="mb-4">
                        <ProductItem food={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ProductList;
