import { Table } from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {changeName, plusAge} from "../Store/userSlice.js";
import {addCount} from "../Store/cartSlice";

const Cart = () => {

    let cartList = useSelector((state) => state);
    let dispatch = useDispatch()

    return(
        <div>
            <h5>{cartList.user.name} {cartList.user.age}의 장바구니</h5>
            <button onClick={() => { dispatch(plusAge(1))} }>+1</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartList.cart.map((list, i) =>
                            <tr key={i}>
                                <td>{cartList.cart[i].id}</td>
                                <td>{cartList.cart[i].name}</td>
                                <td>{cartList.cart[i].count}</td>
                                <td><button onClick={() => {
                                    dispatch(addCount(cartList.cart[i].id))
                                }}>+</button></td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default Cart;