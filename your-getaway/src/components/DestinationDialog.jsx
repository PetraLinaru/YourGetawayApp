import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent,DialogActions, TextField, Button, CircularProgress, Grid, Typography, IconButton } from '@mui/material';
import { AddPhotoAlternate as AddPhotoAlternateIcon, Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';

const DestinationDialog = ({ open, handleClose, handleSubmit, title, destination, loading }) => {
  const [destinationName, setDestinationName] = useState(destination ? destination.name : '');
  const [selectedFile, setSelectedFile] = useState();
  const [previewURL, setPreviewURL] = useState(destination ? destination.photo : '');

  const handleFileChange = (event) => {
    var file=event.target.files[0];
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

  async function handleSave() {

    const formData = new FormData();
    if(title==='Edit Destination'){
        formData.append('id',destination.id)
    }
    formData.append('name', destinationName);
    if (selectedFile) {
      formData.append('photo', selectedFile);
    }
    formData.append('offers',[])
  
    
    try {

      if (title==='Edit Destination') {
        try {
            await axios.put(`http://localhost:8000/travel/destination/${destination.id}/update/`,formData);
          } catch (error) {
            console.error('Error deleting destination:', error);
          }

      } else {
        try {

            const response = await axios.post("http://localhost:8000/travel/destination_create/",formData );
            console.log(response.data)

          } catch (error) {
            console.log(error.data)
            console.error('Error saving destination:', error);
          }

      }
 
    } catch (error) {
      console.error('Error saving destination:', error);
    }
  }
  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Destination Name"
          type="text"
          fullWidth
          value={destinationName}
          onChange={(e) => setDestinationName(e.target.value)}
        />
        <input
          style={{ display: 'none' }}
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
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

export default DestinationDialog;
