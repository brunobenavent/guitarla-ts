import { useEffect, useState, useMemo } from 'react'
import { db } from '../data/db'


export function useCart() {
    const [data]= useState(db)
    const [cart, setCart] = useState(initialCart)

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])

    function initialCart(){
        const localStorageData = JSON.parse(localStorage.getItem("cart"))
        return localStorageData ? localStorageData : []
    }

    const MAX_QUANTITY = 5
    const MIN_QUANTITY = 1

    const addToCart = (guitar) =>{
        const itemExist = cart.findIndex((item)=>item.id=== guitar.id)
        if(itemExist>=0){
            if(cart[itemExist].quantity>=MAX_QUANTITY) return
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        }else{
            guitar.quantity = 1
            setCart([...cart, guitar])
        }
    }
    const increaseQuantity = (id)=>{
        const updateCart = cart.map(item=>{
            if(item.id===id && item.quantity < MAX_QUANTITY){
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item

        })
        setCart(updateCart)
    }
    const decreaseQuantity = (id)=>{
        const updateCart = cart.map(item=>{
            if(item.id===id && item.quantity > MIN_QUANTITY){
                return{
                    ...item,
                    quantity: item.quantity -1
                }
            }
            return item

        })
        setCart(updateCart)
    }
    const removeFromCart = (id) =>{
        const updateCart = cart.filter ((item) =>item.id !== id)
        setCart(updateCart)
    }
    const cleanCart =()=>{
        setCart([])
    }
    const totalPagar = useMemo(()=> cart.reduce((total, item) => total + item.quantity*item.price, 0), [cart])
    const isEmptyCart = useMemo(()=> cart.length ===0, [cart])

  return {
    data,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cleanCart,
    cart,
    totalPagar,
    isEmptyCart
  }
}
