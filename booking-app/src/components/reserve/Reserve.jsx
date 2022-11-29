import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import './Reserve.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Reserve = ({ setModel, hotelId }) => {


  const { data, loading, error } = useFetch(
    `https://gaurav-booking-app.herokuapp.com/api/hotels/getroom/${hotelId}`
  );

    const [SelectedRoom , setSelectedRoom] = useState([]);

    const navigate = useNavigate()

    const handleSelect = (e) =>{
      const selected = e.target.checked;
      const value= e.target.value;

     setSelectedRoom( selected ? [...SelectedRoom,value] : SelectedRoom.filter((item)=> item!==value) )
    }


console.log(SelectedRoom);

const { state } = useContext(SearchContext);

const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const date = new Date(start.getTime());

  const dates = [];

  while (date <= end) {
    dates.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }

  return dates;
};
const alldates = getDatesInRange(state[0].startDate, state[0].endDate);
console.log(alldates);


const isAvailable = (roomNumber) => {
  let flag=0;
  const isFound = roomNumber.unavailableDates.some((date) =>{
    // console.log(new Date(date).getTime());
    
    if(alldates.includes(new Date(date).getTime())){
      flag=1;
      return true;
    }

  }
  );
console.log(isFound);
  if(flag==0){
    return false;
  }
  return isFound;
 
 

};


const handleClick = async () => {
  try {
    await Promise.all(
      SelectedRoom.map((roomId) => {
        const res = axios.put(`https://gaurav-booking-app.herokuapp.com/api/rooms/availabiity/${roomId}`, {
          dates: alldates,
        });
        return res.data;
      })
    );
    setModel(false);
    navigate("/");
  } catch (err) {}
};

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setModel(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
