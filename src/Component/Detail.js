import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";

const Detail = (props) => {

    let [count, setCount] = useState(0);
    let [alerts, setAlerts] = useState(true);
    let [num, setNum] = useState('');
    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('')

    let {id} = useParams();
    let findId = props.shoes.find((found) => {
        return found.id == id;
    })

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

                {count}
                <button onClick={() => {setCount(count + 1)}}>버튼</button>
                <div className="row">
                    <div className="col-md-6">
                        <img src={'https://codingapple1.github.io/shop/shoes'+(findId.id + 1)+'.jpg'} width="100%" />
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{findId.title}</h4>
                        <p>{findId.content}</p>
                        <p>{findId.price}원</p>
                        <button className="btn btn-danger">주문하기</button>
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
            { [<div></div>, <div>내용1</div>, <div>내용2</div>][tab] }
        </div>
    )
};


export default Detail;

