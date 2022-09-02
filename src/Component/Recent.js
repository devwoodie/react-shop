import {useState} from "react";

const Recent = (props) => {
    let getLocal = localStorage.getItem('watched');
    getLocal = JSON.parse(getLocal);

    return(
        <div className="recent-wrap">
            <h4>최근 본 상품</h4>
            <div className="recent-list">
            {
                getLocal.map((item, i) => {
                    console.log(item.length)
                    return(
                        <figure key={i} className="recent-item" onClick={() => { props.navigate( '/detail/'+ item ) }}>
                            {
                                getLocal != 0 ?
                                    <img src={'https://codingapple1.github.io/shop/shoes' + (item+1) + '.jpg'} />
                                    : <figcaption>최근 상품이 없습니다.</figcaption>
                            }


                        </figure>
                    )
                })

            }
            </div>
        </div>
    )
}

export default Recent;