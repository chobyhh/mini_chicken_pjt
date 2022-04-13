import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionCreators as commentActions } from '../redux/modules/comment';

const Menu = (props) => {

    const dispatch = useDispatch();
    const params = useParams();
    const list_id = params.id
        // console.log("인덱스",list_id)
        
    const comment_list = useSelector(state => state.comment.list);
    const brand_list = useSelector(state => state.post.list.restaurants);

    useEffect(() => {
        dispatch(commentActions.getCommentDB(brand_list ? brand_list[list_id].restaurantTitle : ""));
      }, [brand_list, dispatch, list_id]);

    return (
        <table style={{
            paddingTop:"15.7%",
            height:"100px",
            width :"40%",
            justifyContent:"center" ,
            textAlign:"center", 
            alignItems:"center", 
            paddingRight:"16px"
            }}>

            {
            comment_list.menus?.map((e,i)=>{
              console.log(e)   
              return(
                  <tr style={{border:"1px solid #c9c9c9", height:"0px"}}>
                      <td style={{border:"1px solid #c9c9c9", height:"35px", borderRadius:"20px"}}>{e.menuTitle} </td>
                      <td style={{border:"1px solid #c9c9c9", borderRadius:"20px"}}>{e.menuPrice} </td>
                      {/* <td style={{border:"1px solid black"}}>{e.price}</td> */}
                  </tr>
              )
             })
            }
          </table>
    );
};

export default Menu;