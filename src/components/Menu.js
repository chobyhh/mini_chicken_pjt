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
        <>
           
                
        <table style={{
            // paddingTop:"9.2%",
            height:"100px",
            width :"45%",
            justifyContent:"space-between" ,
            // textAlign:"center", 
            alignItems:"center", 
            padding:"6px",
            border: "5px double #EC524B",
            borderRadius:"20px",
            marginTop : "100px",
            marginRight:"30px",
            marginLeft:"auto",
            // backgroundColor: "#f5f5dc"
            }}>
                <tr>
                <td style={{}}>
                {/* <h1 style={{paddingLeft:"115px", color:"orange",textShadow:"1px 1px 1px #000"}}> */}
                <h1 style={{color:"orange",textShadow:"1px 1px 1px #000", borderBottom:"1px solid orange"}}>
                {/* <span>
                {brand_list[list_id].restaurantTitle} 
                </span>  */}
                <span></span> MENU</h1>                 
                </td>
                <td/>
                </tr>
            

                
            
                
            {
            // comment_list.menus?.map((e,i)=>{
            comment_list.menus?.filter(e=>e.menuPrice !== "00").map((e,i)=>{
              console.log(e)   
              return(
                  <tr border="1">
                      <td colSpan={2} style={{border:"none", height:"34px", borderRadius:"20px", padding:"2px", fontWeight:"700"}}>{e.menuTitle} </td>
                      <td style={{fontWeight:"600"}}>{e.menuPrice} </td>
                  </tr>
              )
             })
            }
          </table>
        </>
        
    );
};

export default Menu;