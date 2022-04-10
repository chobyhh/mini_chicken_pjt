import React, { Component } from "react"; 
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Carousel = () => {

    const settings = { 
        dots: true, 
        infinite: true, 
        speed: 500, 
        slidesToShow: 1, 
        slidesToScroll: 1 
    }; 

    return (
        <div> 
            <Slider className="carousel" {...settings}> 
                <img src="https://t1.daumcdn.net/cfile/tistory/996EB54A5EB4A58E2A" alt="img"/>
                <img src="https://t1.daumcdn.net/cfile/tistory/996EE14A5EB4A58F2A" alt="img"/>
                <img src="https://t1.daumcdn.net/cfile/tistory/996EB54A5EB4A58E2A" alt="img"/>
                <img src="https://t1.daumcdn.net/cfile/tistory/996EB54A5EB4A58E2A" alt="img"/>
                <img src="https://t1.daumcdn.net/cfile/tistory/996EB54A5EB4A58E2A" alt="img"/>
            </Slider> 
        </div> 
    );
};

export default Carousel;

