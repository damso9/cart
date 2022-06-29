export const reducer = (state, action) => {
    if(action.type === "CLEAR_CART") {
        let newCartTotal = state.cart.length
        return {
            ...state,
            cart: [],
            cartItemsTotal: 0
        }
    }
    if(action.type === "REMOVE_CART_ITEM") {
        console.log('item removed')
        console.log(action.payload)
    
        return {
            ...state,
            cart: action.payload
        }
    }
    if (action.type === "INCREASE") {
        return {
            ...state,
            cart: action.payload
        }
    }
    if (action.type === "DECREASE") {
        return {
            ...state,
            cart: action.payload
        }
    }
    if (action.type === "GET_TOTAL") {
        let newTotal = state.cart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.amount
        }, 0)

        let newAmount = state.cart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.amount * currentValue.price
        }, 0)

        return {
            ...state,
            cartItemsTotal: newTotal,
            cartPriceTotal: newAmount.toFixed(2)
        }
    }
    if (action.type === 'LOADING') {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === 'LOAD_DATA') {
        return {
            ...state,
            isLoading: false,
            cart: action.payload
        }
    }
    return new Error("no maching action type")
}