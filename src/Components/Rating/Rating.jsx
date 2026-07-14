import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export const Rating = ({ rating, quantity }) => {
  const decimal = rating % 1;

  return (
    <>
      <div className="d-flex align-items-center gap-1 text-warning">
        {Array.from({ length: 5 }, (_, index) => {
         //Full star => 2 conditions 
         if(index < Math.floor(rating) || (index === Math.Floor && decimal > 0.5)){
          return <FaStar key={index}/>
         }
         //Half Star
         if(index === Math.floor(rating) && decimal <= 0.5  && decimal >0){
          return <FaStarHalfAlt key={index} />
         }  
         //Empty Star
         return <FaRegStar key={index}/>
         })}
        <span className="text-muted small">({quantity})</span>
      </div>
    </>
  );
};
