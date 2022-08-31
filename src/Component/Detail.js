import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";

const Detail = (props) => {

    let [count, setCount] = useState(0);
    let [alerts, setAlerts] = useState(true);
    let [num, setNum] = useState('');

    let {id} = useParams();
    let findId = props.shoes.find((found) => {
        return found.id == id;
    })

    useEffect(() => {
        let timer = setTimeout(() => { setAlerts(false); },2000);
        return () => {
            clearTimeout(timer);
        }
    },[]);

    useEffect(() => {
        if(isNaN(num) == true){
            alert('숫자를 입력해주세요.');
        }
    }, [num])


    return(
        <>
            <div className="container">
                {
                    alerts === true ?
                        <div className="alert alert-warning">
                            2초 이내 구매시 할인
                        </div> : null
                }

                {count}
                <button onClick={() => {setCount(count + 1)}}>버튼</button>
                <div className="row">
                    <div className="col-md-6">
                        <img src={'https://codingapple1.github.io/shop/shoes'+(findId.id + 1)+'.jpg'} width="100%" />
                    </div>
                    <input
                        onChange={(e) => {setNum(e.target.value)}}
                    />
                    <div className="col-md-6">
                        <h4 className="pt-5">{findId.title}</h4>
                        <p>{findId.content}</p>
                        <p>{findId.price}원</p>
                        <button className="btn btn-danger">주문하기</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail;