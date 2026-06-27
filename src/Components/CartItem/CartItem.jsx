import { Col, Container, Row } from "react-bootstrap";
import { imageUrl } from "../../utils/imageUrl";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { IoTrash } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { api } from "../../API/api";
import { setCart } from "../../store/Slices/cartSlice";
import { handleError } from "../../utils/errorHandler";
import toast from "react-hot-toast";

export const CartItem = ({ item }) => {
  //dispatch
  const dispatch = useDispatch();

  //_______________________Handlers__________________________//

  async function updateQuantity(newQuantity) {
    try {
      //Call API => /cart/update/:itemId
      const response = await api.put(`/cart/update/${item._id}`, {
        quantity: newQuantity,
      });
      //update Redux
      dispatch(setCart(response.data.cart));
    } catch (error) {
      handleError(error);
    }
  }

  async function removeItem() {
    try {
      //call API => /cart/remove/:itemId
      const response = await api.delete(`/cart/remove/${item._id}`);

      //update Redux
      dispatch(setCart(response.data?.cart));
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <>
      <Container className="border rounded p-3 mb-3 shadow-sm">
        <Row className="align-items-center">
          <Col>
            <img
              src={imageUrl(item.product.imageCover)}
              alt={item.product.name}
              className="img-fluid rounded"
              style={{ width: "180px", height: "180px", objectFit: "cover" }}
            />
          </Col>

          <Col>
            <p>{item.product?.name}</p>
            <p>Brand: {item.product?.brand}</p>
            <h4 className="text-success">Price: EGP {item.priceAtPurchase}</h4>

            <div className="d-flex justify-content-center align-items-center gap-3">
              <div>
                <CiSquareMinus
                  size={35}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (item.quantity === 1) {
                      //Remove From Cart
                      removeItem();
                    } else {
                      updateQuantity(item.quantity - 1);
                    }
                  }}
                />
              </div>
              <h5 className="mb-0">{item.quantity}</h5>
              <div>
                <CiSquarePlus
                  size={35}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    updateQuantity(item.quantity + 1);
                  }}
                />
              </div>

              <div>
                <IoTrash
                  size={35}
                  onClick={removeItem}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
