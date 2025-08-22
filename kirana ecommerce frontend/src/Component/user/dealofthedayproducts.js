import React from "react";

 const dealOfTheDay = {
  id: 7,
  name: "Exclusive Noise Cancelling Headphones",
  price: 85.99,
  oldPrice: 120.0,
  image: "https://placehold.co/220x220",
  description: "Superb comfort, 24-hour battery, noise cancelling"
};

const DealOfTheDay = () => (
  <section className="deal-of-the-day-section">
    <h2>Deal of The Day</h2>
    <div className="deal-card">
      <img src={dealOfTheDay.image} alt={dealOfTheDay.name} />
      <div className="deal-info">
        <div className="deal-name">{dealOfTheDay.name}</div>
        <div className="deal-description">{dealOfTheDay.description}</div>
        <div className="deal-prices">
          <span className="deal-new-price">${dealOfTheDay.price}</span>
          <span className="deal-old-price">${dealOfTheDay.oldPrice}</span>
        </div>
             <div className="buy-now-wrapper">
                <button className="buy-now-btn">Add to cart</button>
            </div>
        <button className="view-all-btn">View All Products</button>
      </div>
    </div>
  </section>
);

export default DealOfTheDay;
