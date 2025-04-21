'use client'

import { ChangeEvent, useState } from 'react';
import { getDaysInMonth } from '../lib/getDaysInMonth';
import generateYears from '../lib/generateYears'
import { ContainerStyle } from './style'
import monthNames from '../const/index.const'

const date = new Date();

const DatePicker = () => {
  const [year, setYear] = useState(2008);
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [day, setDay] = useState(date.getDate());

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setYear(newYear);
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setMonth(newMonth);
  };

  const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDay(parseInt(e.target.value, 10));
  };

  return (
    <ContainerStyle>
      <select value={day} onChange={handleDayChange}>
        {Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1).map(d => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select value={month} onChange={handleMonthChange}>
        {monthNames.map((name, index) => (
          <option key={index + 1} value={index + 1}>
            {name}
          </option>
        ))}
      </select>

      <select value={year} onChange={handleYearChange}>
        {generateYears().map(y => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </ContainerStyle>
  );
};

export default DatePicker;
