import React, { useState } from 'react';
import styled from 'styled-components';
import { Image } from '../elements'
import { useHistory } from 'react-router-dom';
import Data from './data';


const Post = () => {

    const[brand, setBrand] = useState(Data);
    const history = useHistory();
    return (
        
        <PostListWrap>
            {
            brand.map((e,i)=>{
                return(
                    <div onClick={()=>{history.push("/detail/"+i)}}>
                        <Brand brand={brand[i]} i={i} key={i} />
                    </div>
                )
            })
        }
        </PostListWrap>
    );
};


function Brand(props){
    const history = useHistory();
    return(
        <div>
            <Image width="100%" height="100%" src={props.brand.bimg} />
        </div>
    )
}

const PostListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  gap: 20px;
  margin-top : 50px;
  padding : 5px;
`



export default Post;