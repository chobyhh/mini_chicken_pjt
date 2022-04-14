import React, { Component } from "react"; 
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { CarouselImage } from '../elements'



const Carousel = () => {

    const settings = { 
        dots: true, 
        infinite: true, 
        speed: 500, 
        slidesToShow: 1, 
        slidesToScroll: 1 
    };
 
    return (
        <CarouselWrap> 
             <SliderWrap>
                <Slider className="carousel" {...settings}> 
                    <CarouselImage src="https://t1.daumcdn.net/cfile/tistory/99885E475C3340E109" alt="img"/>
                    <CarouselImage src="https://i.ytimg.com/vi/l12t_oWoVfg/maxresdefault.jpg" alt="img"/>
                    <CarouselImage src="https://blog.kakaocdn.net/dn/HOqXK/btqFvIAf1so/SBix14hpkftD4a1EzHP5I1/img.jpg" alt="img"/>
                    <CarouselImage src="https://post-phinf.pstatic.net/MjAxOTA0MTlfMjc1/MDAxNTU1NjM1NTk5MzA0.2mWyhFI9JkRlc65k5GSl7x0cId0nlD8JJACHBzlqYv8g.a_P4KSFxkDS2y8QjyiHlEd1aVF8UKhh5Z_zqbgFin74g.JPEG/img_main_banner_190418.jpg?type=w1200" alt="img"/>
                    <CarouselImage src="http://www.e2news.com/news/photo/202106/233493_88240_3927.png" alt="img"/>
                </Slider> 
             </SliderWrap>
            
        </CarouselWrap> 
    );
};

const CarouselWrap = styled.div`
    // display : flex;
    justify-content : center;
    align-items : center;
    // height: calc(100vh - 70px);
`
const SliderWrap = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  .slick-prev,
  
  }
  
  

  @media only screen and (max-width: 767px) {
    max-width: calc(100% - 70px);
  }`;
export default Carousel;

