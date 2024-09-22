import React from 'react'
import {useContext} from 'react'
import {ShopContext} from '../Context/ShopContext'
import {useParams} from 'react-router-dom'
import ProductHd from '../Components/ProductHd'
import ProductDisplay from '../Components/ProductDisplay'
import ProductDiscription from '../Components/ProductDiscription'
import RelatedProducts from '../Components/RelatedProducts'
const Product = () => {
  const{all_products}=useContext(ShopContext);
  const{productId}=useParams();
  console.log('All Products:', all_products); 
  console.log('Product ID:', productId); 
  const product=all_products.find((e)=>e.id===Number(productId))
  console.log('Product:', product); 
  if(!product){
    return <div>product not found!</div>
  }
  return (
    <section className="max_padd_container py-28">
      <div>
        <ProductHd product={product}/>
        <ProductDisplay product={product}/>
        <ProductDiscription/>
        <RelatedProducts/>
      </div>
    </section>
  );
}
export default Product
