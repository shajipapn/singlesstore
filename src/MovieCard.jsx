import React from 'react';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type , buy,}}) => {
  return (

    
    <div className="movie" key={imdbID}>
      <div>
        <p>{Year}</p>
        
      </div>

      <div>
        <img src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} alt={Title} />
      </div>

      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
       
        <h2>
        <a href="http://127.0.0.1:5500/src/checkout.html" > Buy or Rent </a>

        <div class="shipping_validation">

        <script src="https://checkout.stripe.com/checkout.js"></script>

<button id="customButton">Purchase</button>



 </div>
        </h2>
     

        </div>

      

    </div>
  );
}

export default MovieCard;