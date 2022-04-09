import React from 'react';
import styled from 'styled-components';
import { Image } from '../elements'
import { useHistory } from 'react-router-dom';

const Post = () => {

    const history = useHistory();
    return (
        <PostListWrap>
            <div onClick={()=>{history.push("/detail")}}>
            <Image width="100%" height="100%" src="https://www.bhc.co.kr/images/common/logo300.jpg" />
            </div>
            <div onClick={()=>{history.push("/detail")}}>
            <Image width="100%" height="100%" src="https://t1.daumcdn.net/cfile/tistory/2209B13A5868870C3A" />
            </div>
            <div onClick={()=>{history.push("/detail")}}>
            <Image width="100%" height="100%" src="https://modo-phinf.pstatic.net/20171020_226/1508482596307Jcbgi_JPEG/mosafez2Sr.jpeg?type=round256_256" />
            </div>
            <div onClick={()=>{history.push("/detail")}}>
            <Image width="100%" height="100%" src="https://pbs.twimg.com/profile_images/1108644065380163585/c6uDziTT_400x400.png" />
            </div>
            <div onClick={()=>{history.push("/detail")}}>
            <Image width="100%" height="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVd650bph3WN88U-VCU7nabR9cifpLIbtLPwlAgqS1H1CUeirOBsbT93Py_6dP0VQNhQ0&usqp=CAU" />
            </div>
            <div onClick={()=>{history.push("/detail")}}>
            <Image width="100%" height="100%" src="https://thumb.mt.co.kr/06/2012/01/2012013016268261567_1.jpg" />
            </div>
            <div onClick={()=>{history.push("/detail")}}>
            <Image width="100%" height="100%" src="https://www.4pns.com/__FileSave/Board/Work/106/1028232162_9T4HCE2U_ED91B8EB9DBCEB8BADEBB984ECA688.gif" />
            </div>
            <div onClick={()=>{history.push("/detail")}}>
            <Image width="100%" height="100%" src="https://imagecdn.dpon.gift/thumbnails/brands/%E1%84%8C%E1%85%A1%E1%84%83%E1%85%A1%E1%86%B7%E1%84%8E%E1%85%B5%E1%84%8F%E1%85%B5%E1%86%AB_500.jpg" />
            </div>
            <div onClick={()=>{history.push("/detail")}}>
            <Image width="100%" height="100%" src="https://yt3.ggpht.com/ytc/AKedOLTzdkkn8c_XXtp_jIVYZDQx-Jsz0iFhCkl9DRa13Q=s900-c-k-c0x00ffffff-no-rj" />
            </div>
        </PostListWrap>
    );
};

const PostListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  gap: 20px;
  margin-top : 50px;
  padding : 5px;
`



export default Post;