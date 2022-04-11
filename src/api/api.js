import axios from "axios";

const apis =  axios.create({
    
    baseURL: "http://pooreum.shop/"
   
})

export default apis;



//axios 간단하게 표기하기 위해서 백엔드 배포주소 여기에 넣고 정리하기