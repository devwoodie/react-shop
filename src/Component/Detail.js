import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { addItem } from "../Store/cartSlice";
import {useDispatch} from "react-redux";

const Detail = (props) => {



    let dispatch = useDispatch();
    let [count, setCount] = useState(1);
    let [alerts, setAlerts] = useState(true);
    let [num, setNum] = useState('');
    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('')

    let {id} = useParams();
    let findId = props.shoes.find((found) => {
        return found.id == id;
    })
    //localstorage
    useEffect(() => {
        let watchStorage = localStorage.getItem('watched');
        watchStorage = JSON.parse(watchStorage);
        watchStorage.push(findId.id);
        watchStorage = new Set(watchStorage);
        watchStorage = Array.from(watchStorage);
        localStorage.setItem('watched', JSON.stringify(watchStorage));

    }, []);


    useEffect(() => {
        let timer = setTimeout(() => { setAlerts(false); },2000);
        setFade2('end');
        return () => {
            clearTimeout(timer);
            setFade2('')
        }
    },[]);

    return(
        <>
            <div className={'container start ' + fade2}>
                {
                    alerts === true ?
                        <div className="alert alert-warning">
                            2초 이내 구매시 할인
                        </div> : null
                }

                <div className="row">
                    <div className="col-md-6">
                        <img src={'https://codingapple1.github.io/shop/shoes'+(findId.id + 1)+'.jpg'} width="100%" />
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{findId.title}</h4>
                        <p>{findId.content}</p>
                        <p>{findId.price}원</p>
                        수량 : {count}
                        <button className="count-btn" onClick={() => {setCount(count + 1)}}>+1</button>
                        <button className="btn btn-danger" onClick={() => {
                            dispatch(addItem({id : findId.id, name : findId.title, count : count}));
                            alert('장바구니에 추가되었습니다.');
                            props.navigate('/react-shop/cart');
                        }}>장바구니 담기</button>
                    </div>
                </div>
                <Nav variant="tabs"  defaultActiveKey="link0">
                    <Nav.Item>
                        <Nav.Link eventKey="link0" onClick={() => {setTab(0)}}>버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link1" onClick={() => {setTab(1)}}>버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link2" onClick={() => {setTab(2)}}>버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent tab={tab}/>

            </div>
        </>
    )
}

const TabContent = ({tab}) => {

    let [fade, setFade] = useState('');

    useEffect(() => {
        let timers = setTimeout(() => { setFade('end') },10);

        return () => {
            clearTimeout(timers);
            setFade('');
        };
    },[tab]);

    return(
        <div className={'start ' + fade}>
            { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }
        </div>
    )
};


export default Detail;

