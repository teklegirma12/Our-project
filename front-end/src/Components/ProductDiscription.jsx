import React from 'react'

const ProductDiscription = () => {
  return (
    <div className="mt-20">
        <div className="fleex gap-3 mb-4">
            <button className="btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36">Description</button>
            <button className="btn_dark_outline !rounded-none !text-xs !py-[6px] w-36">Care Guide</button>
            <button className="btn_dark_outline !rounded-none !text-xs !py-[6px] w-36">Size Guide</button>
        </div>
        <div className="flex flex-col pb-16">
            <p className="text-sm">introducing our Products, designed for both comfort and versatility.
                 Made from soft, breathable fabric, this shirt ensures all-day comfort, 
                 whether you're at work or out with friends. Its modern fit flatters all body types, 
                 while the classic design features a button-down collar and stylish patterns that make it perfect for any occasion.
                  Available in a range of colors, this shirt pairs effortlessly with jeans or chinos for a polished yet relaxed look.
                   Elevate your wardrobe with our Stylish Casual Shirt, where quality meets timeless style.
                  Feel free to adjust any details to better fit your specific clothing item!</p>
                  <p className="text-sm">Discover our Luxurious Knit Sweater, the perfect blend of warmth and style for any season.
                     Crafted from a soft, high-quality blend of cotton and wool, this sweater offers exceptional comfort and breathability.
                      Its relaxed fit and ribbed cuffs ensure a cozy feel, making it ideal for layering over your favorite shirts or wearing on its own.
                       Available in classic shades like navy, gray, and olive, this versatile piece effortlessly transitions from casual outings to cozy evenings at home. 
                       Elevate your wardrobe with the Luxurious Knit Sweater, where timeless elegance meets everyday comfort.
                     Feel free to customize any part to match your specific product!</p>
                     <p className="text-sm">Layer up in style with our Classic Denim Jacket, a timeless wardrobe staple that never goes out of fashion. Crafted from durable,
                         high-quality denim, this jacket features a relaxed fit and classic button-up design, complete with chest pockets for a functional touch. Its light wash gives it a vintage vibe, 
                         making it perfect for both casual and dressed-up looks. Wear it over a t-shirt for a laid-back vibe or pair it with a dress for an unexpected twist. 
                        Upgrade your outerwear collection with our Classic Denim Jacket, a versatile piece for all seasons.</p>
        </div>
    </div>
  )
}

export default ProductDiscription
