import React, { useState,useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress, Grid, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { AddPhotoAlternate as AddPhotoAlternateIcon } from '@mui/icons-material';
import axios from 'axios';

const OfferDialog = ({ open, handleClose, handleSubmit, title, offer, destination_id, loading }) => {
    const [location, setLocation] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [starsRating, setStarsRating] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [discount, setDiscount] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');

  useEffect(() => {
    if (title === 'Edit Offer' && offer) {
        console.log(offer)
      setLocation(offer.location);
      setHotelName(offer.name);
      setStarsRating(offer.stars_rating);
      setDescription(offer.description);
      setPricePerNight(offer.price_per_night);
      setDiscount(offer.discount);
    } else {
      // Clear fields when the dialog is opened for adding new offer
      setLocation('');
      setHotelName('');
      setStarsRating('');
      setDescription('');
      setPricePerNight('');
      setDiscount('');
    }
  }, [open, offer, title]);
  useEffect(() => {
    console.log(title)
  }, []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewURL('');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewURL('');
  };

  const handleSave = async () => {
    console.log(title);
    const formData = new FormData();
    formData.append('location', location);
    formData.append('destination', destination_id);
    formData.append('hotel.name', hotelName);
    formData.append('hotel.stars_rating', starsRating);
    formData.append('hotel.description', description);
    formData.append('hotel.price_per_night', pricePerNight);
    formData.append('hotel.pictures', selectedFile);
    formData.append('discount', discount);

    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

    try {
      if (title === 'Edit Offer') {
        await axios.put(`http://localhost:8000/travel/offer/${destination_id}/${offer.id}/update`, formData);
      } else {
        await axios.post(`http://localhost:8000/travel/destination/${destination_id}/add_offer/`, formData);
      }
      handleClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Location"
          type="text"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Hotel Name"
          type="text"
          fullWidth
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Stars Rating"
          type="number"
          fullWidth
          value={starsRating}
          onChange={(e) => setStarsRating(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Price Per Night"
          type="text"
          fullWidth
          value={pricePerNight}
          onChange={(e) => setPricePerNight(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Discount"
          type="text"
          fullWidth
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <input
  style={{ display: 'none' }}
  accept="image/*"
  id="offer-contained-button-file" 
  type="file"
  onChange={handleFileChange}
/>
<label htmlFor="offer-contained-button-file"> 
  <Button variant="contained" component="span" startIcon={<AddPhotoAlternateIcon />}>
    Upload Photo
  </Button>
</label>

  {previewURL && (
    <Grid container justifyContent="center" alignItems="center" spacing={2} mt={2}>
      <Grid item>
        <Typography variant="body2">Preview:</Typography>
        <img src={previewURL} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
      </Grid>
      <Grid item>
        <IconButton onClick={handleRemoveFile}><CloseIcon /></IconButton>
      </Grid>
    </Grid>
  )}
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

export default OfferDialog;
