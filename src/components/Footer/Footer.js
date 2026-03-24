import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import title from '../../assets/images/title.png';
import instagram from '../../assets/images/instagram.svg';
import twitter from '../../assets/images/twitter.svg';
import tiktok from '../../assets/images/tiktok.svg';
import whatsapp from '../../assets/images/whatsapp.svg';
import linkedin from '../../assets/images/linkedin.svg';
import mail from '../../assets/images/mail-01.svg';
import location from '../../assets/images/marker-pin-01.svg';
import phone from '../../assets/images/phone.svg';
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="box">
                    <p className='title'>قانونيًّا</p>
                    <p>الشروط والأحكام</p>
                    <p>سياسة الخصوصية</p>
                    <p>سياسة الإرجاع</p>
                </div>
                <div className="box">
                    <p className='title'>بيانات الاتصال</p>
                    <div className='contact-info'>
                        <img src={phone} alt='' />
                        <p style={{ 'direction': 'ltr' }}>+966 123 123 423</p>
                    </div>
                    <div className='contact-info'>
                        <img src={mail} alt='' />
                        <p>iqtinaa@iqtinaaart.com</p>
                    </div>
                    <div className='contact-info'>
                        <img src={location} alt='' />
                        <p>23456 النزهة، جدة، المملكة العربية السعودية</p>
                    </div>
                </div>
                <div className="box">
                    <p className='title'>حول</p>
                    <p>شركة</p>
                    <p>أسئلة شائعة</p>
                    <p>خدمات</p>
                    <p>مدونة</p>
                    <p>وظائف</p>
                    <p>الدعم</p>
                </div>
                <div className="box social-box">
                    <div className='logo'>
                        <Link to="/">
                            <img src={title} alt="" />
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <p>حيث يلتقي الفن والجمال</p>
                    <div className='social' id='social'>
                        <a href="https://twitter.com/iqtinaa_sa?s=21&t=8eR13y7tQkx2qfLwVuExIQ" className="circle-bg" target="_blank" rel="noreferrer noopener">
                            <img src={twitter} alt='' />
                        </a>
                        <a href="https://www.instagram.com/iqtinaa_sa/?igshid=MzRlODBiNWFlZA%3D%3D" className="circle-bg" target="_blank" rel="noreferrer noopener">
                            <img src={instagram} alt='' />
                        </a>
                        <a href="https://www.tiktok.com/@iqtinaa.sa" className="circle-bg" target="_blank" rel="noreferrer noopener">
                            <img src={tiktok} alt='' />
                        </a>
                        <a href="https://www.linkedin.com/in/iqtinaa-%D8%A7%D9%82%D8%AA%D9%86%D8%A7%D8%A1-065503287" className="circle-bg" target="_blank" rel="noreferrer noopener">
                            <img src={linkedin} alt='' />
                        </a>
                        <a href="!#" className="circle-bg">
                            <img src={whatsapp} alt='' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;