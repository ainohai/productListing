import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const imagePlaceholder = (even) => {
  return even ?  "http://haikalanpuutarha.com/sivu/wp-content/themes/haikalanpuoti/assets/img/menninkainen_lomailee.jpg" : "http://haikalanpuutarha.com/sivu/wp-content/themes/haikalanpuoti/assets/img/menninkainen_seisoo.jpg";
};

const OrigPrice = ({price}) => {
    return (
        <del><span className="woocommerce-Price-amount amount">{price}&nbsp;<span
        className="woocommerce-Price-currencySymbol">€</span></span></del>
        )
};

const ProductPrice = ({price}) => {
    return (
        <span className="woocommerce-Price-amount amount">{price}&nbsp;<span className="woocommerce-Price-currencySymbol">€</span></span>
    )
};

const ProductListItem = ({product, even}) => {

    if (!product || Object.keys(product).length === 0) {
        return null;
    }

    const inSale = !!product.price && product.price === product.sale_price;
    const columnOrderClass = '';//columnFirst ? "first " : columnLast ? "last " : "";
    const featuredClass = product.featured ? "featured " : " ";
    const saleClass =  inSale ? "sale " : " ";
    const instockClass = product.in_stock ? "instock " : " ";
    const liClassname = "post-"+ product.id
                   + " product type-product "
                   + columnOrderClass + featuredClass + saleClass + instockClass;

    const productTitle = product.title + (product.lajikenimi ? " '" + product.lajikenimi + "'" : "");
    const readMore = !product.tuotelista ? "Lue lisää" : "Katso tuotelista";

   return (
       <li className={liClassname}>
           <a href={product.product_url} className="woocommerce-LoopProduct-link woocommerce-loop-product__link">
               <LazyLoadImage
                   alt=""
                   height="324"
                   src={!!product.img_url ? product.img_url : imagePlaceholder()}
                   width="324"
                   className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                   threshold="300"
                   placeholderSrc={imagePlaceholder(even)}
               />

               <h2 className="woocommerce-loop-product__title">{productTitle}</h2>
               {inSale && <span className="onsale">Ale!</span>}

               <span className="price">
                   {inSale && <OrigPrice price={product.regular_price}/>}

                   {product.price && <ProductPrice price={product.price}/>}
                   </span>

           </a>
           <a href={product.product_url} className="button product_type_simple">{readMore}</a>

       </li>
   )

};

export default ProductListItem;

