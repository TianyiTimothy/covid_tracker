import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Charts = ({ data: {confirmed, deaths, recovered}, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const lineChart = (
    dailyData
      ? (
        <Line
          data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [{
              data: dailyData.map(({ confirmed }) => confirmed),
              label: 'Infected',
              borderColor: '#66a',
              fill: true,
            }, {
              data: dailyData.map(({ recovered }) => recovered),
              label: 'Recovered',
              borderColor: '#3f3',
              backgroundColor: 'rgba(0,255,0,0.5)',
              fill: true,
            }, {
              data: dailyData.map(({ deaths }) => deaths),
              label: 'Deaths',
              borderColor: '#f33',
              backgroundColor: 'rgba(255,0,0,0.5)',
              fill: true,
            }],
          }}
        />
      ) : null
  );

  const barChart = (
    confirmed
      ? (
        <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
              label: 'People',
              backgroundColor: [
                'rgba(0,0,200,0.5)',
                'rgba(0,200,0,0.5)',
                'rgba(200,0,0,0.5)',
              ],
              data: [confirmed.value, recovered.value, deaths.value]
            }]
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },

          }}
        />
      ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
}

export default Charts;