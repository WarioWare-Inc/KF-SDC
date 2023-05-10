import React, { useState } from 'react';
import AddToCart from './AddToCart';
import QuantitySelector from './QuantitySelector';
import SizeSelector from './SizeSelector';
import StyleSelector from './StyleSelector';

function ProductDetails({
  productData, productStyles, selectedStyle, setSelectedStyle, setSelectedPhoto,
}) {
  const [selectedSize, setSelectedSize] = useState('');
  const [skusNull, setSkusNull] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  return (
    <div className="productDetails">

      <StyleSelector
        productStyles={productStyles}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        setSelectedPhoto={setSelectedPhoto}
      />
      <div className="sizeAndQuantitySelector">
        <SizeSelector
          selectedStyle={selectedStyle}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          skusNull={skusNull}
          setSkusNull={setSkusNull}
        />
        <QuantitySelector
          selectedStyle={selectedStyle}
          selectedSize={selectedSize}
          skusNull={skusNull}
          selectedQuantity={selectedQuantity}
          setSelectedQuantity={setSelectedQuantity}
        />
      </div>
      <AddToCart
        productData={productData}
        selectedStyle={selectedStyle}
        selectedSize={selectedSize}
        selectedQuantity={selectedQuantity}
        skusNull={skusNull}
      />

    </div>
  );
}

export default ProductDetails;
