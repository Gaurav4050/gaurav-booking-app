import "./header.css";
import { useState,useEffect, useRef, useContext } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
const Header = ({type}) => {

  const [destination,setDestination]= useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [flagdate, setFlagdate] = useState(false);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  // here we gonna use context api

  const {dispatch}= useContext(SearchContext)


  const decNumber = (name) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: options[name] - 1,
      };
    });
  };
  const incNumber = (name) => {
    setOptions({...options, [name]:options[name]+1});
  };


  
  let menuref=useRef();
  let menuref1=useRef();
  useEffect(() => {
    const handler =(event)=>{
      if(!menuref.current.contains(event.target)){
            setOpenOptions(false);
      }
      if(!menuref1.current.contains(event.target)){
        setFlagdate(false);
      }
    }
    document.addEventListener("mousedown",handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  
  },[menuref,menuref1])


  const naviagate = useNavigate();


  const handleChange = ()=>{
    dispatch({type:"NEW_SEARCH", payload:{destination,state,options}})

    naviagate('/hotels',{state:{destination, state,options}})    
  }

  
  return (
    <div className="header">
      <div className="listicon">
        <div className="listItem active">
          <i class="fa-solid fa-bed"></i>
          <span>Stays</span>
        </div>
        <div className="listItem">
          <i class="fa-solid fa-plane"></i>
          <span>Flights</span>
        </div>
        <div className="listItem">
          <i class="fa-solid fa-earth-europe"></i>
          <span>Flight + Hotel</span>
        </div>
        <div className="listItem">
          <i class="fa-solid fa-car"></i>
          <span>Car rental</span>
        </div>
        <div className="listItem">
          <i class="fa-regular fa-snowflake"></i>
          <span>Attractions</span>
        </div>
        <div className="listItem">
          <i class="fa-solid fa-taxi"></i>
          <span>Airpot taxis</span>
        </div>
      </div>

      {type !== "list" &&
        <>
        <div className="downpart">
        <div className="down">
          <p className="headerTitle">Available until 3 Jan 2023</p>
          <h1 className="headerDesc">
            Save 15% with Late Escape <br></br> Deals
          </h1>

          <p>
            There’s still time to tick one more destination off your wishlist
          </p>
          <button className="headerBtn">Explore Details</button>
        </div>

        <div className="searchBox" >
          <div className="searchItems">
            <div className="searchItem">
              <i class="fa-solid fa-bed it"></i>
              <input
                id="search"
                type="search"
                placeholder="Where are you going?"
                className="headerSearchInput"
                onChange={(e)=>{
                  setDestination(e.target.value)
                }}
              />
            </div>
            <div className="searchItem" ref={menuref1}> 
              <i className="fa-solid fa-calendar-days it"></i>
              <button
                className="bt"
                onClick={() => {
                  setFlagdate(!flagdate);
                  setOpenOptions(false)
                }}
              >
                {`${format(state[0].startDate, "MM/dd/yyyy")} to ${format(
                  state[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </button>

              {flagdate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  className="daterange"
                  
                />
              )}
            </div>
            <div className="searchItem" ref={menuref}>
              <i class="fa-solid fa-user it"></i>
              <span
                onClick={() => {
                  setOpenOptions(!openOptions);
                  setFlagdate(false);
                }}
              >
                {`${options.adult} adult · ${options.children} children · ${options.room} room`}
              </span>

              {openOptions && (
                <div className="options">
                  <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.adult <= 1}
                        className="optionCounterButton"
                        onClick={() => decNumber("adult")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.adult}
                      </span>
                      <button className="optionCounterButton"
                        onClick={() => incNumber("adult")}
                        >+</button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.children <= 0}
                        className="optionCounterButton"
                        onClick={() => decNumber("children")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.children}
                      </span>
                      <button className="optionCounterButton"
                        onClick={() => incNumber("children")}
                        >+</button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.room <= 1}
                        className="optionCounterButton"
                        onClick={() => decNumber("room")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.room}
                      </span>
                      <button className="optionCounterButton"
                        onClick={() => incNumber("room")}
                        >+</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="searchItem gaurav">
              <button onClick={()=>{
                handleChange()
              }}>Search</button>
            </div>
          </div>
        </div>
      </div></>
      }
    </div>
  );
};

export default Header;
