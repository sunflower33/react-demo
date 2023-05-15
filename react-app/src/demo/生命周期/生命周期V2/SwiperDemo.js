import React, { Component } from "react";
import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import swiper1 from "../../../asset/images/swiperImages/swiper_1.jpg";
import swiper2 from "../../../asset/images/swiperImages/swiper_2.jpg";
import swiper3 from "../../../asset/images/swiperImages/swiper_3.jpg";
Swiper.use([Navigation,Pagination]);
const swiperStyles = {
  height: "200px",
  backgroundColor: "yellowgreen",
};

const swiperList = [
  {
    id: "swiper_1",
    imgSrc: swiper1,
  },
  {
    id: "swiper_2",
    imgSrc: swiper2,
  },
  {
    id: "swiper_3",
    imgSrc: swiper3,
  },
];



class SwiperSync extends Component {
  componentDidMount() {
    new Swiper(".swiper", {
      loop: true,
      slidesPerView: "auto",
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      //   scrollbar: {
      //     el: ".swiper-scrollbar",
      //   },
    });
  }
  render() {
    return (
      <div className="swiper" style={swiperStyles}>
        <div className="swiper-wrapper">
          <div className="swiper-slide">Slide 1</div>
          <div className="swiper-slide">Slide 2</div>
          <div className="swiper-slide">Slide 3</div>
        </div>
        <div className="swiper-pagination"></div>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>

        {/* <div className="swiper-scrollbar"></div> */}
      </div>
    );
  }
}

class SwiperAsync extends Component {
  state = {
    swiperList: [],
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ swiperList });
    });
  }
  componentDidUpdate() {
    new Swiper(".swiperAsync", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
  render() {
    return (
      <div className="swiperAsync" style={swiperStyles}>
        <div className="swiper-wrapper">
          {this.state.swiperList.map((swiperItem) => (
            <div className="swiper-slide" key={swiperItem.id}>
              <img src={swiperItem.imgSrc} width="100%" alt="" />
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>

        {/* <div className="swiper-scrollbar"></div> */}
      </div>
    );
  }
}

export default class SwiperDemo extends Component {
  render() {
    return (
      <>
        <h2>同步Swiper</h2>
        <SwiperSync />
        <h2>异步Swiper</h2>
        <SwiperAsync />
      </>
    );
  }
}
