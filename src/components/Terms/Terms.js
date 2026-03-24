import "./Terms.css";

function Terms({ show, onClose }) {
    if (!show) {
        return null;
    }

    return (
        <div className="terms-overlay">
            <div className="terms-content">
                <button className="terms-close" onClick={onClose}>
                    &times;
                </button>
                <p>رسوم العمولة:
                    من خلال إدراج أعمالك الفنية على موقع اقتناء، فإنك توافق على دفع رسوم عمولة قدرها 10% على سعر البيع النهائي لكل عمل فني.
                    التسعير:
                    يتمتع الفنانون بالمرونة في تحديد الأسعار الخاصة بهم لأعمالهم الفنية. ومع ذلك، يرجى ملاحظة الحد الأدنى 100 ريال و أن سعر البيع النهائي سيكون السعر المذكور مطروحًا منه رسوم العمولة البالغة 10%.
                </p>
            </div>
        </div>
    )
}

export default Terms;