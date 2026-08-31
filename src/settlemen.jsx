import {useState} from 'react';
import './settlemen.css';

function Settlement(){

    const names = ["강하윤","이여설","이태율","홍길동"]//location.state?.people || [];

    const peopleCount = names.length;

    //const [user, setUser] = useState(0);
    const [money, allmoney] = useState(0);
    // function pay(){
    //     let Person = money / user;
    //     return NPerson;
    // };   
   return(
         <div>
            <a href="" style={{ color: 'black', marginBottom: '20px', display: 'flex', alignItems: 'start', fontSize: '23px' }}>← 정산 추가</a>
            <div className="container"> 
                <label>지출내용</label>
                <input type="text" placeholder="지출내용을 입력하세요" style={{ marginBottom: '30px' }} />
                <label>총 금액</label>
                <input  type="text" value={money} onChange={(event) => {
            allmoney(event.target.value)}} placeholder="총 금액을 입력하세요" style={{ marginBottom: '20px' }} />
                <label>결제자</label>
                <input type="text" placeholder="결제자를 입력하세요" style={{ marginBottom: '20px' }} />
                
                {Array.from({ length: peopleCount }, (_, index) => (
                    <div key={index}>
                    {names[index]}
                    <input type="checkbox" />
                </div>
)               )}
            </div>
        </div>
   );
        
}

export default Settlement;