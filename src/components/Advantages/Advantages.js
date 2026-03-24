import star from '../../assets/images/Star.png';
import diamond from '../../assets/images/Diamond.png';
import badge from '../../assets/images/Verified Badge.png';
import './Advantages.css';

function Advantages() {
    return (
        <div className='advantages'>
            <div className='container'>
                <hr />
                <div className='question'>
                    <h1>لماذا اقتناء ؟</h1>
                </div>
                <div className='cards'>
                    <div className='card'>
                        <img src={diamond} alt="" />
                        <div className="info">
                            <h2>فريدة</h2>
                            <p>
                                استكشف عالم الفن بروح فريدة، حيث تتجلى الإبداعات بجمالها الخاص وتنبض بالحياة
                            </p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={star} alt="" />
                        <div className="info">
                            <h2>مميزة</h2>
                            <p>
                                استمتع بتجربة استثنائية في عالم الفن حيث يلتقي التميز بالتألق لتجعل رحلتك الفنية لا تُنسى
                            </p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={badge} alt="" />
                        <div className="info">
                            <h2>أصلية</h2>
                            <p>
                                نحن نقدم قطعًا أصلية تم التحقق منها من قبل فريقنا المتخصص
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Advantages;
