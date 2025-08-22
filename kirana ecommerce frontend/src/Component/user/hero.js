import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";

// ⚠ Replace with correct paths to your image assets
import slider_img_1 from "../user/images/slider-1.png";
import slider_img_2 from "../user/images/slider-2.png";
import slider_img_3 from "../user/images/slider-3.png";

// Use a Unicode icon or external SVG here
import { FaArrowRight } from "react-icons/fa"; // Optional: You can use this as a RightArrow replacement

// import styles (important for swiper)
import "swiper/css";
import "swiper/css/effect-fade";
import '../user/css/hero.css'

const slider_data = [
  {
    id: 1,
    pre_title: (
      <>
       Authentic Indian Groceries Delivered Fresh  <br /> Traditional Flavors &Premium Qualityat Your Fingertips
      </>
    ),
    title: (
      <>
        Your Trusted Kirana StoreNow Online! <br />
      </>
    ),
    img: "https://static.vecteezy.com/system/resources/previews/045/913/392/non_2x/full-shopping-cart-with-groceries-cut-out-stock-png.png",
  },
  {
    id: 2,
    pre_title: (
      <>
        Best Ear <br /> Headphones
      </>
    ),
    title: (
      <>
        Find your <br /> Beats Studio.
      </>
    ),
    img: "https://static.vecteezy.com/system/resources/previews/051/960/680/non_2x/an-assortment-of-various-grocery-items-including-fruits-bread-cereals-and-jars-arranged-neatly-for-display-perfect-for-food-related-projects-png.png",
  },
  {
    id: 3,
    pre_title: (
      <>
        Best Ear <br /> Headphones
      </>
    ),
    title: (
      <>
        Music To <br /> Fill Your Heart
      </>
    ),
    img: slider_img_3,
  },
];

const HeroBanner = () => {
  const [loop, setLoop] = useState(false);
  useEffect(() => {
    setLoop(true);
  }, []);

  return (
    <section className="slider__area">
      <Swiper
        className="slider__active slider__active-13"
        slidesPerView={1}
        spaceBetween={0}
        effect="fade"
        loop={loop}
        // modules={[EffectFade]}
      >
        {slider_data.map((item) => (
          <SwiperSlide
            key={item.id}
            className="slider__item-13 slider__height-13 grey-bg-17 d-flex align-items-end"
          >
            <div className="container" >
              <div className="row align-self-end">
                <div className="col-xl-6 col-lg-6">
                  <div className="slider__content-13">
                    <span className="slider__title-pre-13">{item.pre_title}</span>
                    <h3 className="slider__title-13">{item.title}</h3>
                    <div className="slider__btn-13">
                      <Link to="/shop" className="tp-btn-border">
                        Shop Now
                        <span style={{ marginLeft: "8px" }}>
                          <FaArrowRight />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="slider__thumb-13 text-end mr-40" >
                    <span className="slider__thumb-13-circle-1"></span>
                    <span className="slider__thumb-13-circle-2"></span>
                    <img src={item.img} alt={`Banner ${item.id}`} className="img-fluid" />
                      {/* <img src="https://static.vecteezy.com/system/resources/previews/045/913/392/non_2x/full-shopping-cart-with-groceries-cut-out-stock-png.png" alt={`Banner ${item.id}`} className="img-fluid" /> */}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroBanner;
