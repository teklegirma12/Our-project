import {createContext,useState} from 'react'
import all_products from '../assets/all_products'
import Item from '../Components/Item';
export const ShopContext=createContext(null);
    const  getDefaultCart=()=>{
        let cart={};
        for(let index=0;index< all_products.length +1 ; index++){
            cart[index]=0;
        }
        return cart;
    }
    const ShopContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState(getDefaultCart());
    const addToCart= (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }
    }
    const removeFromCart= (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.Storage.getItem('auth-token'))
            if(localStorage.getItem('auth-token')){
                fetch('http://localhost:4000/removefromcart',{
                    method:'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'content-type':'application/json',
                    },
                    body:JSON.stringify({"itemId":itemId}),
                }).then((response)=>response.json()).then((data)=>console.log(data));
            }
    }
  
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                } else {
                    console.warn(`Item with id ${item} not found in all_products.`);
                }
            }
        }
        return totalAmount;
    }
    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0 ){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }
        const contextValue={getTotalCartItems, getTotalCartAmount,all_products,cartItems,addToCart,removeFromCart};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;

