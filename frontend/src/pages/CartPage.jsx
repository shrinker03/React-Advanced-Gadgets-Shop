import React, {useEffect} from 'react'
import { addToCart } from '../actions/cartActions'
import { useDispatch} from 'react-redux'

const CartPage = ({match, location, history}) => {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    console.log(qty)
    const dispatch = useDispatch()

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <div>
            Cart
        </div>
    )
}

export default CartPage
