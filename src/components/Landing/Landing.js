import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import paint_1 from '../../assets/images/9ec8a828c62aea6de39410a75f52bbd8.png';
// import paint_2 from '../../assets/images/94b5bc6869d44550ec300cceffac43a0.jpeg';
import paint_3 from '../../assets/images/photo_2024-06-29_16-10-35 1.png';
import paint_4 from '../../assets/images/Rectangle 4.png';
import paint_5 from '../../assets/images/Rectangle 5.png';
import './Landing.css';


function Landing() {
    const { authToken } = useContext(AuthContext);

    return (
        <div className='landing'>
            {/* <div class="overlay-top overlay"></div> */}
            {/* <div class="banner-wrapper">
                <div class="wrapper">
                    <div class="images">
                        <div class="image">
                            <img src={paint_1} alt="" />
                        </div>
                        <div class="image">
                            <img src={paint_3} alt="" />
                        </div>
                        <div class="image">
                            <img src={paint_4} alt="" />
                        </div>
                        <div class="image">
                            <img src={paint_5} alt="" />
                        </div>
                    </div>
                    <div class="images">
                        <div class="image">
                            <img src={paint_1} alt="" />
                        </div>
                        <div class="image">
                            <img src={paint_3} alt="" />
                        </div>
                        <div class="image">
                            <img src={paint_4} alt="" />
                        </div>
                        <div class="image">
                            <img src={paint_5} alt="" />
                        </div>
                    </div>
                    <div class="images">
                        <div class="image">
                            <img src={paint_1} alt="" />
                        </div>
                        <div class="image">
                            <img src={paint_3} alt="" />
                        </div>
                        <div class="image">
                            <img src={paint_4} alt="" />
                        </div>
                        <div class="image">
                            <img src={paint_5} alt="" />
                        </div>
                    </div>
                    <div class="images">
                        <div class="image">
                            <img src={paint_1} alt="" />
                        </div>
                        <div class="image">
                            <img src={paint_3} alt="" />
                        </div>
                        <div class="image">
                            <img src={paint_4} alt="" />
                        </div>
                        <div class="image">
                            <img src={paint_5} alt="" />
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div class="overlay-bottom overlay"></div> */}
            <div className='content'>
                <h1>أهلًا بك في إقتناء</h1>
                <p>
                    مرحبًا بك في موقع إقتناء، الوجهة الرائدة لبيع وشراء الأعمال
                    الفنية. نحن نربط بين عشاق الفن والفنانين الموهوبين، حيث يمكنك
                    الاستمتاع بتجربة فريدة من نوعها في جمع واقتناء الفنون. تصفح
                    مجموعتنا المتنوعة من الأعمال الفنية الأصلية، واحصل على فرصة
                    لعرض وبيع إبداعاتك. انضم إلى مجتمعنا المتنوع وتواصل مع محبي
                    الفن والمجمعين العالميين في مكان واحد، حيث يلتقي الفن والشغف
                    بتجربة فريدة ومثيرة.
                </p>
                <div className="btns">
                    {!authToken && (
                        <Link to="/register">إنضم كفنان / مقتني</Link>
                    )}
                    <Link to="/shopping">!تسوق الآن</Link>
                </div>
            </div>
        </div>
    )
}

export default Landing;
