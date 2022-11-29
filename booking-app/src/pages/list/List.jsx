import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
import format from "date-fns/format/index";
import SearchItem from '../../components/Searchitem/SearchItem.jsx'
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();

  console.log(location);

  const [date, setDate] = useState(location.state.state);
  const [option, setOption] = useState(location.state.options);
  const [destination, setDestination] = useState(location.state.destination);
  const [dateFlag, setDataFlag] = useState(false);
  const [max, setMax] = useState(undefined);
  const [min, setMin] = useState(undefined);


  const { data, loading, error ,reFetch}= useFetch(`https://gaurav-booking-app.herokuapp.com/api/hotels?city=${destination}&min=${min || 1}&max=${max || 99999}`)
  
  console.log('data is',data);
  
  const handleClick = ()=>{
    reFetch()
  }

  return (
    <>
      <Navbar />
      <Header type="list" />

      <div className="list">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="searchHeading">Search</h1>

            <div className="searchItem">
              <span>Destination/property name</span>

              <div className="inputBox">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input placeholder={destination} type="text" onChange={(event)=>{
                    setDestination(event.target.value)
                }}/>
              </div>
            </div>
            <div className="searchItem">
              <span>check-in date</span>

              <div className="inputBox">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span
                  className="setDate"
                  onClick={() => setDataFlag(!dateFlag)}
                >
                  {" "}
                  {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>
              </div>

              {dateFlag && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  ranges={date}
                  className="dateRange"
                />
              )}
            </div>
                

            <div className="searchItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" onChange={(e)=>{
                    setMin(e.target.value)
                  }} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={(e)=>{
                    setMax(e.target.value)}} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={option.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={option.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={option.room}
                  />
                </div>
              </div>
            </div> 

            <button onClick={handleClick}>Search</button>



          </div>
          <div className="listRight">
            
            {
              loading ? ("data is laoding"):
              <>
              {
                data.map((item)=>(
                 
                  <SearchItem item={item} key={item._id}/>
                ))
              }
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
