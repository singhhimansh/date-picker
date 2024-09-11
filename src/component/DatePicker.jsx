import React, { useState } from "react";

const months = ["S", "M", "T", "W", "TH", "F", "S"];

export const DateModal = ({ handleDateChange }) => {
  const dateArray = Array(31)
    .fill(null)
    .map((v, i) => i + 1);

  function createArray(n) {
    return Array(n)
      .fill(null)
      .map((v, i) => i + 1);
  }
  const date = new Date();

  const month = date.getMonth();
  const year = date.getFullYear();

  const day = date.getDay(); // index of weeks days 0-6

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  console.log(daysInMonth(month, year));
  console.log(day);

  
  
  function getdateGrid(month, year) {
    const prevmonthDays = daysInMonth(month - 1, year);
    const nextmonthDays = daysInMonth(month + 1, year);
    const currentmonthDays = daysInMonth(month, year);
    const date = new Date(1, month, year).getDay();
    // const date = new Date(1,month,year).getDay();
    // const date = new Date(1,month,year).getDay();
    // 42

    // [prevmonthDays]

    const prevManth = createArray(prevmonthDays % 7).map((v, i) => prevmonthDays-v).reverse();
    const grid = [
      ...prevManth,
      ...createArray(currentmonthDays),
      ...createArray(42 - (prevmonthDays % 7) - currentmonthDays),
    ];
    return grid;
  }

  const dateGrid = getdateGrid(month, year);
  console.log(dateGrid);

  return (
    <div className="datemodal">
      <div className="monthHeader">
        {months?.map((i) => (
          <p>{i}</p>
        ))}
      </div>
      <div className="dateContent">
        {dateGrid?.map((i) => {
          return (
            <button
              className="dateButton"
              onClick={() => handleDateChange(`${i}/${month}/${year}`)}
            >
              {i}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const DatePicker = () => {
  // handleClick  to open the modal
  // date dislay window with current month
  // on selection of the date => set the date/ month/ year => fill in input and close the window

  const [dateValue, setDateValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleDateChange = (date) => {
    setDateValue(date);
    setOpen(false);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={dateValue}
        onClick={() => setOpen(true)}
      ></input>
      <div className="modal"></div>
      {open && <DateModal handleDateChange={handleDateChange} />}
    </div>
  );
};
