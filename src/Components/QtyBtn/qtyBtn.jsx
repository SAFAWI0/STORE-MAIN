import { useAppStore } from "../../store";
import "./qtyBtn.css";

const QtyBtn = ({ item }) => {
  const { cart, setCart } = useAppStore();

  let qt = cart.find((el) => el.product.id === item.id)?.qt || 0;

  const handleChange = (newQt) => {
    if (newQt === 0) {
      setCart(cart.filter((el) => el.product.id !== item.id));
    } else {
      let newItem = {
        product: item,
        qt: newQt,
      };

      let index = cart.findIndex((el) => el?.product?.id === item?.id);
      if (index === -1) {
        setCart([...cart, newItem]);
      } else {
        let arr = [...cart];
        arr[index] = newItem;
        setCart(arr);
      }
    }
  };
  return (
    <div className="qty-btn">
      {qt === 0 ? (
        <button className="add-btn" onClick={() => handleChange(qt + 1)}>
          Add
        </button>
      ) : (
        <div className="qty-group">
          <button className="dec-btn" onClick={() => handleChange(qt - 1)}>
            -
          </button>
          <span className="value">{qt}</span>
          <button className="inc-btn" onClick={() => handleChange(qt + 1)}>
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default QtyBtn;
