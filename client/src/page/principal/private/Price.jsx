import React, { useEffect, useState } from 'react'

const Price = ({ selectedItemInfo }) => {
    const [price, setPrice] = useState(0);
    const [price2, setPrice2] = useState(null);
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        let sum1 = 0;
        let sum2 = 0;
        let quantity = 0
        selectedItemInfo.map(ele => {
            sum1 += (ele.reducedPrice * ele.quantity);
            sum2 += (ele.regularPrice * ele.quantity);
            quantity += ele.quantity;
        })
        setPrice(sum1);
        setPrice2(sum2);
        setQuantity(quantity);
        // if (sum1 < sum2) {
        // }
    }, [selectedItemInfo.length])
    return (
        <>
            <div className='text-gray-700'>
                <p>Total product quantity: {quantity}</p>
                <p>Total selected product: {selectedItemInfo.length}</p>
                <p>Total Price(Tk): {price} <del className='text-gray-400'> {price2} </del> </p>
            </div>
        </>
    )
}

export default Price