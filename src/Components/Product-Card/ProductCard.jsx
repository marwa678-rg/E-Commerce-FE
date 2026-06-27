import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { imageUrl } from "../../utils/imageUrl";

export const ProductCard = ({ product }) => {
  return (
    <Card className="h-100 shadow-sm ">
      <Card.Img
        variant="top"
        src={imageUrl(product.imageCover)}
        alt={product.name}
        style={{ height: "220px", objectFit: "cover" }}
      />

      <Card.Body>
        <Card.Title>
          <Link
            to={`/products/${product._id}`}
            className="text-decoration-none text-dark fw-bold"
          >
            {product.name}
          </Link>
        </Card.Title>

        <Card.Text>{product.description}</Card.Text>

        <h5 className="fw-bold mt-3 text-success">{product.price} EGP</h5>
      </Card.Body>
    </Card>
  );
};
