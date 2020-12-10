import React from 'react'

const Rating = ({value , text}) => {
    
    const star=(value , starNo)=>{
        if(value >= starNo)
            return "fas fa-star";
        else if(value >= (starNo - 0.5))
            return "fas fa-star-half-alt"
        return "far fa-star"
    }
    return (
        <div className='rating'>
            <span>
                <i style={{ color : '#f8e825'}} className={star(value , 1)} ></i>
                <i style={{ color : '#f8e825'}} className={star(value , 2)} ></i>
                <i style={{ color : '#f8e825'}} className={star(value , 3)} ></i>
                <i style={{ color : '#f8e825'}} className={star(value , 4)} ></i>
                <i style={{ color : '#f8e825'}} className={star(value , 5)} ></i>
            </span>
            <span>{text && text}</span>
        </div>
    )
}

export default Rating
