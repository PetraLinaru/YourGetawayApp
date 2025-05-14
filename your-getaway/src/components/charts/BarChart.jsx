import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const BarChart = ({ hotel_id }) => {
    const [reservationsCountByMonth, setReservationsCountByMonth] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/bookings/get/${hotel_id}`);
                const reservationsToMap = response.data;

                const reservationsByMonth = {};
                reservationsToMap.forEach((reservation) => {
                    console.log(reservation.created_at)
                    const month = new Date(reservation.start).getMonth();
                    reservationsByMonth[month] = (reservationsByMonth[month] || 0) + 1;
                });

                const reservationsCountByMonth = Array.from({ length: 12 }, (_, i) => reservationsByMonth[i] || 0);
                setReservationsCountByMonth(reservationsCountByMonth);

                // Create bar chart only if there are reservations
                if (reservationsToMap.length > 0) {
                    const ctx = document.getElementById('barChart');
                    chartRef.current = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            datasets: [{
                                label: 'Reservations Count',
                                data: reservationsCountByMonth,
                                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        if (hotel_id) {
            fetchData();
        }
    }, [hotel_id]);

    return (
        <div>
        {reservationsCountByMonth.some(count => count > 0) && (
        <div style={{ width: '600px',height:'500px', textAlign: 'center' }}>
            
                <>
                    <h2>Reservations Count by Month</h2>
                    <div style={{ margin: '0 auto' }}>
                        <canvas id="barChart"></canvas>
                    </div>
                </>
            
        </div>)
        }
        </div>
    );
};

export default BarChart;
