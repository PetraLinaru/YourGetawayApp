import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const AddAvailableDateDialog = ({ open, handleClose,handleSubmit,  initialDate ,hotelId,title, loading }) => {
  const [date, setDate] = useState('');
  const [to_date,setToDate]=useState('');
  const [adultSlots, setAdultSlots] = useState('');
  const [kidsSlots, setKidsSlots] = useState('');
  const [id,setId]=useState('')

  useEffect(() => {
    console.log(initialDate)
    if (title == 'Edit Available Date') {
      setId(initialDate.id)
      setToDate(initialDate.to_Date)
      setDate(initialDate.date);
      setAdultSlots(initialDate.adult_slots);
      setKidsSlots(initialDate.kids_slots);
    } else {
      // Clear fields when the dialog is opened for adding new date
      setDate('');
      setToDate('')
      setAdultSlots('');
      setKidsSlots('');
    }
  }, [initialDate]);

  const handleSave = async () => {

    try {
      if (initialDate) {
        // Editing an existing date
        await axios.put(`http://localhost:8000/travel/hotel/${hotelId}/${id}/update_date/`, {
          date: date,
          to_date:to_date,
          adult_slots: adultSlots,
          kids_slots: kidsSlots
        });
      } else {
        // Adding a new date
        await axios.post(`http://localhost:8000/travel/hotel/${hotelId}/add_available_date/`, {
          date: date,
          to_date:to_date,
          adult_slots: adultSlots,
          kids_slots: kidsSlots
        });
        console.log(to_date)
      }

    } catch (error) {
      console.error('Error saving available date:', error);

    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title }</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Starting Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="End Date"
          type="date"
          fullWidth
          value={to_date}
          onChange={(e) => setToDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Adult Slots"
          type="number"
          fullWidth
          value={adultSlots}
          onChange={(e) => setAdultSlots(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Kids Slots"
          type="number"
          fullWidth
          value={kidsSlots}
          onChange={(e) => setKidsSlots(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAvailableDateDialog;
