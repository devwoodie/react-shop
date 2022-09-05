/* eslint-disable */
import '../App.css';
import Data from '../data';
import Detail from './Detail';
import Cart from './Cart';
import Recent from "./Recent";
import {useState, Suspense, useEffect, lazy, createContext} from "react";
import {Button, Row, Col, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet} from "react-router-dom";
import axios from "axios";
import {useQuery} from "react-query";

// const Detail = lazy(() => import('./Detail'));
// const Cart = lazy(() => import('./Cart'));
// const Recent = lazy(() => import('./Recent'));


function App() {

    useEffect(() => {
        localStorage.setItem('watched', JSON.stringify( [ ] ))
    },[])


    let [shoes, setShoes] = useState(Data);
    let [click, setClick] = useState(0);
    let [dataComp, setDataComp] = useState(true);
    let navigate = useNavigate();
    let [fade, setFade] = useState('');

    useEffect(() => {
        setFade('end');
        return () => {
            setFade('');
        };
    }, []);

    const noItem = () => {
        alert('상품이 존재하지 않습니다.');
        setDataComp(true);
    };

    let result = useQuery('fff', () => {
        return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
            return a.data
        }),
            {staleTime : 2000}
    })

    return (
        <div className={'App start ' + fade}>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand onClick={() => {navigate('/react-shop/')}} className="logo">ReactShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => {navigate('/react-shop/')}}>Home</Nav.Link>
                            <NavDropdown title="Products" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => {navigate('/react-shop/detail/0')}}>Product1</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => {navigate('/react-shop/detail/1')}}>Product2</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => {navigate('/react-shop/detail/2')}}>Product3</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => {navigate('/react-shop/')}}>All Products</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link onClick={() => {navigate('/react-shop/cart')}}>Cart</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">반가워요 {
                            result.isLoading ? 'loading...' : result.data.name
                        }</Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Recent shoes={shoes} navigate={navigate} />
            <Suspense fallback={<div>로딩중입니다...</div>}>
            <Routes>
                <Route path="/react-shop/" element={
                    <>
                        <div className="main-img"></div>
                        <Container>
                            <Button variant="success" className="more-btn" onClick={() => {
                                setClick(click + 1);
                                setDataComp(false);
                                {
                                    click === 0 ?
                                        axios.get('https://codingapple1.github.io/shop/data2.json')
                                            .then((result) => {
                                                setDataComp(true);
                                                let copy = [... shoes, ...result.data];
                                                setShoes(copy);
                                            }).catch(() => {
                                            setDataComp(true);
                                            console.log('false');
                                        }) : null,
                                        click === 1 ?
                                            axios.get('https://codingapple1.github.io/shop/data3.json')
                                                .then((result) => {
                                                    setDataComp(true);
                                                    let copy = [... shoes, ...result.data];
                                                    setShoes(copy);
                                                }).catch(() => {
                                                setDataComp(true);
                                                console.log('false');
                                            }) : null,
                                        click >= 2 ?
                                            noItem() : null
                                }
                            }}>상품 더보기</Button>
                            {
                                dataComp === true ? null :
                                    <div className="loading-txt">로딩중입니다....</div>
                            }
                            <Row className="justify-content-md-center">
                                {
                                    shoes.map((k, i) => {
                                        return(
                                            <Product navigate={navigate} shoes={shoes[i]} i={i} key={i}></Product>
                                        )
                                    })
                                }
                            </Row>
                        </Container>
                    </>
                }/>

                <Route path="/react-shop/detail/:id" element={
                    <Detail navigate={navigate} shoes={shoes}/>
                }/>

                <Route path="/react-shop/cart" element={ <Cart /> } />

                <Route path="/about" element={<About/>}>
                    <Route path="member" element={<div>멤버 정보</div>}/>
                    <Route path="location" element={<About/>}/>
                </Route>
                <Route path="/event" element={<Event/>}>
                    <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
                    <Route path="two" element={<div>생일기념 쿠폰 받기</div>}/>
                </Route>
                <Route path="*" element={<div>404 페이지 오류</div>}/>
            </Routes>
        </Suspense>

        </div>
    );
}

function Event(){
    return(
        <>
            <div>이벤트 페이지 입니다</div>
            <Outlet></Outlet>
        </>
    )
}
function About(){
    return(
        <>
            <div>about page</div>
            <Outlet></Outlet>
        </>
    )
}

function Product(props) {
    return(
        <Col onClick={() => {props.navigate('/react-shop/detail/'+props.shoes.id)}} sm={3} className="item-list">
            <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1)+'.jpg'} style={{"width": "80%"}}/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.content}</p>
            <span>{props.shoes.price}</span>
        </Col>
    )
}

export default App;
