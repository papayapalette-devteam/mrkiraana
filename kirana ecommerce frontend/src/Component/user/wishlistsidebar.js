import React from "react";
import { useWishlist } from "../user/context/wishlistcontext";

const WishlistSidebar = ({ isWishlistOpen, onClose }) => {
  const { wishlist } = useWishlist();

  return (
    <div className={`sidebar wishlist-sidebar ${isWishlistOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h3>Wishlisted Items</h3>
        <button onClick={onClose}>✖</button>
      </div>
      <div className="sidebar-content">
        {wishlist.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          <ul>
            {wishlist.map((item, i) => (
              <li key={i}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WishlistSidebar;
