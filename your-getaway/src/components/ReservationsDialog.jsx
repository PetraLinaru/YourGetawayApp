import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Line } from 'react-chartjs-2';
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import BarChart from './charts/BarChart.jsx'

const localizer = momentLocalizer(moment);

const ReservationsDialog = ({ open, onClose, hotel_id }) => {


    return (
        <Dialog open={open} onClose={onClose} maxWidth={false}>
            <DialogTitle>See Reservations for Destination</DialogTitle>
            <DialogContent>
                <div style={{ height: 1000, width: 1000 }}>
                    <div>
                        <BarChart hotel_id={hotel_id}/>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReservationsDialog;
