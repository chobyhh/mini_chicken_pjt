import React from 'react';

import styled from 'styled-components';

const Image = (props) => {

  const { src, width, margin } = props;

  const styles = {
    src: src,
    width: width,
    margin: margin,
  }

  return (
    <AspectInner src={props.src} {...styles}></AspectInner>
  );
};

Image.defaultProps = {
  src: "https://media.istockphoto.com/photos/dog-puppy-on-garden-picture-id1142412984?k=20&m=1142412984&s=170667a&w=0&h=VLomTUSZwXDrVauJrpiyMboe0Q7lUYYiMO89sFy2dgY=",
  width: "50%",
  margin: 0,
};

const AspectInner = styled.img`
  width: ${(props) => (props.width)};
  margin: ${(props) => (props.margin)};
  margin-top : 10%;
  min-height: 300px;
  max-height: 300px;
  display: block;
  position: relative;
  overflow: hidden;
  object-fit: cover;
  backgroung-size : cover;
  display: inline-block;
  justify-content: space-between;
  border: 1px solid #c9c9c9;
  border-radius : 20px;

`;

export default Image;