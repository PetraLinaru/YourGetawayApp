import React from 'react';
import dayjs from 'dayjs';


const CustomCalendar = ({ fromDate, toDate, availableDates, onDateSelect }) => {
  // Check if fromDate is null, if so, use the current date
  const currentDate = fromDate || new Date();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const renderCalendar = () => {
    const calendarDays = [];

    // Fill in empty days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Fill in days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = fromDate && (fromDate.toDateString() === date.toDateString() || toDate.toDateString() === date.toDateString());
      const isAvailable = availableDates.includes(dayjs(date).format('YYYY-MM-DD'));
      const classNames = `calendar-day ${isSelected ? 'selected' : ''} ${isAvailable ? 'available' : ''}`;

      calendarDays.push(
        <div key={day} className={classNames} onClick={() => onDateSelect(date)}>
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => console.log('Previous month')}>{'<'}</button>
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={() => console.log('Next month')}>{'>'}</button>
      </div>
      <div className="calendar">
        <div className="calendar-days">
          <div className="day-header">Sun</div>
          <div className="day-header">Mon</div>
          <div className="day-header">Tue</div>
          <div className="day-header">Wed</div>
          <div className="day-header">Thu</div>
          <div className="day-header">Fri</div>
          <div className="day-header">Sat</div>
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
