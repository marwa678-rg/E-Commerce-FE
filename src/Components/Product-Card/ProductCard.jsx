import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { imageUrl } from "../../utils/imageUrl";
import { Rating } from "../Rating/Rating";

export const ProductCard = ({ product }) => {
  return (
    <Card className="h-100 shadow-sm ">
      <Rating rating={product.ratingsAverage} quantity={product.ratingsQuantity}/>
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
        {product.stock === 0 ? (
          <p className="text-danger  fw-bold ">❌ Out of Stock </p>
        ) : product.stock <= 5 ? (
          <p className="text-warning fw-bold">⚠️ Only {product.stock} Left</p>
        ) : (
          <p className="text-success fw-bold">✅ In Stock ({product.stock})</p>
        )}
        <h5 className="fw-bold mt-3 text-success">{product.price} EGP</h5>
      </Card.Body>
    </Card>
  );
};
