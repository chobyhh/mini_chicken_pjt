
#항해 99 미니 프로젵그 2조 -FE (조병윤, 권효빈)

---

와이어 프레임
![image](https://user-images.githubusercontent.com/98735742/163386008-a66203cb-35cb-4079-b5e0-363849aaa228.png)


##view
---
조병윤 : Main / Store / Detail / Element / Component

권효빈 : Login / Signup / Css

##fucntion
---
조병윤 : Detail CRUD / Redux / Axios / Maintain is_login

권효빈 : Login / Signup / Axios / Maintain login

##component
---
Main page
- Carousel
- Post (Read)
- Header (is_login)

Detail
- 브랜드 로고(Read)
- 메뉴판 (Read)
- Comment (CRUD) / 댓글 Input 및 Select 활용하여 Create 구현 / 수정 및 삭제 기능 포함

Login
- 토큰 이용하여 로그인
- ID, PW 유효성 검사

Signup
- 유효성 검사

## 트러블 슈팅
FE
문제 1. [get]
axios.get(url, {header}, {params});
axios.get(url, { header: { auth: 'token' } }, { params : { userId: 'test1'} });

문제2. [post] or [put]
axios.post(url, data, header); 

const formData = new FormData();
formData.append('key', value);
formData.append('key', value);
const config = { header: { auth: 'token' } }
axios.post(url, formData, config);

문제3 .[delete]
axios.get(url, { header: { auth: 'token' } }, { data : { userId: 'test1'} });

문제4. api.interceptor ↔ config 중복 사용에 따른 header 두번 요청(해결)
문제 5. api request 시  body에 데이터를 담아내지 못함(해결)
문제 6.  header.js 로그인 유지(해결)
