import { addDays, format, subDays } from "date-fns";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setQueryDate } from "../../redux/reducerSlice";
import { useLocation, useNavigate } from "react-router-dom";

const UserSearch = () => {
  UserSearch.propTypes = {
    setQueryDate: PropTypes.func.isRequired,
  };
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const today = new Date();
    const formattedDates = [];
    const locationDate = location.search.split("=")[1];

    const yesterday = subDays(today, 1);
    const formattedYesterday = format(yesterday, "yyyy-MM-dd");
    const displayYesterday = "Yesterday";
    formattedDates.push({
      value: formattedYesterday,
      label: displayYesterday,
    });

    const formattedToday = format(today, "yyyy-MM-dd");
    const displayToday = "Today";
    formattedDates.push({ value: formattedToday, label: displayToday });

    const tomorrow = addDays(today, 1);
    const formattedTomorrow = format(tomorrow, "yyyy-MM-dd");
    const displayTomorrow = "Tomorrow";
    formattedDates.push({ value: formattedTomorrow, label: displayTomorrow });

    for (let i = 2; i <= 21; i++) {
      const date = addDays(today, i);
      const formattedDate = format(date, "yyyy-MM-dd");
      const displayDate = format(date, "d MMMM");
      formattedDates.push({ value: formattedDate, label: displayDate });
    }
    const foundDate = formattedDates.find(
      (date) => date.value === locationDate
    );
    setDates(formattedDates);
    setSelectedDate(foundDate ? foundDate.value : formattedToday);
    dispatch(setQueryDate(foundDate ? foundDate.value : formattedToday));
  }, [setQueryDate]);

  const setQueryDateFunc = (e) => {
    const date = new Date();
    const formatTimeComponent = (component) => {
      return component < 10 ? "0" + component : component;
    };
    const year = formatTimeComponent(date.getFullYear());
    const month = formatTimeComponent(date.getMonth() + 1);
    const datee = formatTimeComponent(date.getDate());
    const formatedDate = `${year}-${month}-${datee}`;

    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    dispatch(setQueryDate(selectedDate));
    if (formatedDate === selectedDate) {
      navigate(``);
    } else {
      navigate(`?datetime=${selectedDate}`);
    }
  };

  return (
    <div>
      <select name="datetime" value={selectedDate} onChange={setQueryDateFunc}>
        {dates.map((date, index) => (
          <option key={index} value={date.value}>
            {date.label}
          </option>
        ))}
      </select>
      <input type="text" placeholder="" />
    </div>
  );
};

export default UserSearch;
