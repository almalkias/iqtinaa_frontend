import "./Order.css";


function Order({ paints }) {
  return (
    <div className='order'>
      <div className="order-container">
        <div className="order-number-date">
          <div>رقم الطلب : #{paints.id}</div>
          <div>
            تاريخ الطلب :
            {new Date(paints.created_at).toLocaleDateString()}
          </div>
        </div>

        <div className="orders">
          <div className="section-title">تفاصيل الطلب :</div>
          <div className="order-info">
            {paints.items.map((item) => (
              <div className="order-item-row" key={item.id}>
                <div className="item-name">{item.product_name}</div>
                <div className="item-quantity">الكمية: {item.quantity}</div>
                <div className="item-price">{item.price} ر.س</div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-total">
          المبلغ الاجمالي : {paints.total_price} ر.س
        </div>

        <div className="order-status">
          حالة الطلب :
          <span className="status">{paints.status}</span>
        </div>

      </div>
    </div>
  );
}

export default Order;
