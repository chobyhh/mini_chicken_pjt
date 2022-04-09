import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
import Header from '../components/Header';
import Post from '../components/Post';
import Carousel from '../components/Carousel';

const Main = (props) => {
    return (
        <div>
            <Carousel/>
            <Post />
        </div>
    );
};

export default Main;