import React, { useState } from 'react';
import Uploadimage from "../Uploadimage.png"; // Replace with correct path

const ProductVariations = () => {
  const [images, setImages] = useState([]);

  const handleAddField = () => {
    setImages([...images, { file: null, preview: null }]);
  };

  const handleImageChange = (e, index) => {
    const file = Array.from(e.target.files);
    if (file) {
      const updated = [...images];
      updated[index] = {
        file: file,
        preview: URL.createObjectURL(file),
      };
      setImages(updated);
    }
  };

  const handleRemoveField = (indexToRemove) => {
    const updated = images.filter((_, index) => index !== indexToRemove);
    setImages(updated);
  };

  return (
    <div style={{background:"white"}}>
      <h6>Product Variations</h6>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {images.map((img, index) => (
          <div key={index}>
            {/* Horizontal Line */}
            <hr style={{ border: '1px solid rgba(0, 0, 0, 0.1)', margin: '20px 0' }} />


            {/* Labels Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '73%', marginBottom: '10px' }}>
              <h6>Upload image here</h6>
              <h6>Image</h6>
            </div>

            {/* Upload Section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              {/* Upload Box */}
              <div
                style={{
                  width: '400px',
                  height: '50px',
                  border: '1px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
                onClick={() =>
                  document.getElementById(`fileInput-${index}`).click()
                }
              >
                {img.preview ? (
                  <img
                    src={img.preview}
                    alt={`preview-${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <span style={{ color: '#777' }}>Choose File</span>
                )}
                <input
                  id={`fileInput-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Upload Icon */}
              <img
                src={Uploadimage}
                alt="Upload Icon"
                style={{ width: '75px', height: '75px' }}
              />

              {/* Red Close Button */}
 <div
  className="remove-button-wrapper"
  onMouseEnter={e => {
    e.currentTarget.style.borderColor = 'red';
  }}
 onMouseLeave={e => {
  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.02)'; // 20% opacity black
}}

  style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.5 px solid black', // outer border
    padding: '10px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    width: 'auto',
    height: 'auto',
  }}
  onClick={() => handleRemoveField(index)}
>
 <div
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px', // spacing between button and outer square
     border: '0.5px solid rgba(0, 0, 0, 0.09)',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
    borderRadius:"10px",
    marginTop:"-100px",
    float: 'right',
    marginLeft:"70px"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = 'red';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.09)';
  }}
>
  <button
    style={{
      backgroundColor: 'transparent',
      color: 'red',
      borderRadius: '50%',
      border: '1px solid red',
      width: '15px',
      height: '15px',
      fontSize: '10px',
      lineHeight: '18px',
      padding: 0,
      margin: 0,
      cursor: 'pointer',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      fontWeight: 'bold',
      outline: 'none',
      
    }}
    type="button"
  >
    &times;
  </button>
</div>


</div>


            </div>

            {/* Divider */}
            <hr style={{ marginTop: '20px', borderColor: '#ddd' }} />
          </div>
        ))}
      </div>

      {/* Add Field Button */}
      <div style={{ marginTop: '20px' }}>
      <button onClick={handleAddField} className="hover-blue-button">
  Add Field
</button>



      </div>
    </div>
  );
};

export default ProductVariations;
