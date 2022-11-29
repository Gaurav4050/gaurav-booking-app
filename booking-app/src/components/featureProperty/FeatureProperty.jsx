import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const { data, loading, error }= useFetch("https://gaurav-booking-app.herokuapp.com/api/hotels?featured=false&limit=4")
 
  
  
  return (
    <div className="fp">
      {
        loading ? ("laoding"):
        <>
      {
        data.map((item)=>(
          <div className="fpItem">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"
            alt=""
            className="fpImg"
          />
          <span className="fpName">item.title</span>
          <span className="fpCity">item.city</span>
          <span className="fpPrice">item.cheapestPrice</span>
          {
            item.rating && 
            <div className="fpRating">
            <button>rating</button>
            <span>Excellent</span>
          </div>
          }
        </div>
        ))
      }
      </>
      }
    </div>
  );
};

export default FeaturedProperties;
