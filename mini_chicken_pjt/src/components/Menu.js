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
        <table style={{paddingTop:"23%",height:"100px",width :"38%",justifyContent:"center" ,textAlign:"center", alignItems:"center"}}>

            {
            comment_list.commentDb?.map((e,i)=>{
              console.log(e)   
              return(
                  <tr>
                      
                      <td style={{border:"1px solid black"}}>{e.chickenMenu} </td>
                      <td style={{border:"1px solid black"}}>17,000원 </td>
                      {/* <td style={{border:"1px solid black"}}>{e.price}</td> */}
                  </tr>
              )
             })
            }
          </table>
    );
};

export default Menu;