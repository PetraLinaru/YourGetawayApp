import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import DestinationDialog from "../components/DestinationDialog";
import OfferDialog from "../components/OfferDialog";
import AvailableDateDialog from "../components/AvailableDateDialog"; // Import the new dialog
import ShowMoreText from "react-show-more-text";
import ReservationsDialog from "../components/ReservationsDialog";
import BarChart from "../components/charts/BarChart"

const StyledIconButton = styled(IconButton)`
  color: #7ebdbd;
`;

const StyledAddButton = styled(Button)`
  background-color: #7ebdbd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

const StyledEditButton = styled(Button)`
  background-color: #7ebdbd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

const StyledDeleteButton = styled(Button)`
  background-color: #7ebdbd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

const AdminPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDestinationDialog, setOpenDestinationDialog] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [editingOffer, setEditingOffer] = useState(null);
  const [editingFlag, setEditingFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pk, setPK] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [openAvailableDateDialog, setOpenAvailableDateDialog] = useState(false);
  const [editingAvailableDate, setEditingAvailableDate] = useState(null);
  const [hotelId, setHotelId] = useState("");
  const [ops, setOps] = useState(false);

  const [openReservationsDialog, setOpenReservationsDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if (sessionStorage.getItem('role')!='admin'){
      navigate('/destinations')
    }
  },[])
  const handleOpenReservationsDialog = (id) => {
    setHotelId(id)
    setOpenReservationsDialog(true);
  };

  const handleCloseReservationsDialog = () => {
    setOpenReservationsDialog(false);
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/travel/offers/"
        );
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, [ops]);

  useEffect(() => {
    console.log(editingFlag); // This will log the updated state when it changes
  }, [editingFlag]);

  const handleDeleteDestination = async (destinationId) => {
    try {
      await axios.delete(
        `http://localhost:8000/travel/destination/${destinationId}/delete/`
      );
      setDestinations((prevDestinations) =>
        prevDestinations.filter(
          (destination) => destination.id !== destinationId
        )
      );
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
    setOps(!ops);
  };
  const handleDeleteOffer = async (offerId) => {
    try {
      await axios.delete(
        `http://localhost:8000/travel/offer/${offerId}/delete/`
      );
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
    setOps(!ops);
  };

  const handleDeleteAvailableDate = async (hotelId, dateId) => {
    try {
      await axios.delete(
        `http://localhost:8000/travel/hotel/${hotelId}/${dateId}/delete_date/`
      );
    } catch (error) {
      console.error("Error saving available date:", error);
    }
    setOps(!ops);
  };

  /**DIALOGS functionalities */
  const handleAddDestination = () => {
    setEditingDestination(null);
    setOpenDestinationDialog(true);
  };

  const handleEditDestination = (destination) => {
    setEditingDestination(destination);
    setOpenDestinationDialog(true);
  };

  const handleSubmitDestination = async () => {
    setOpenDestinationDialog(false);
    setLoading(false);
    setOpenDialog(false);
    setOps(!ops);
  };

  const handleAddOffer = (pk) => {
    setPK(pk);
    setEditingFlag(false);
    setEditingOffer(null);
    setOpenDialog(true);
  };

  const handleEditOffer = (offer, pk) => {
    setEditingFlag(true);
    setEditingOffer(offer);
    console.log(editingOffer);
    setPK(pk);
    setOpenDialog(true);
    console.log(editingFlag);
  };

  const handleSubmitOffer = async () => {
    setLoading(false);
    setOpenDialog(false);
    setOps(!ops);
  };

  const handleDialogClose = () => {
    setOpenDestinationDialog(false);
    setOpenDialog(false);
    setEditingFlag(false);
  };

  // Add function to open available date dialog
  const handleOpenAvailableDateDialog = (date, id) => {
    console.log(date);
    if (date != null) {
      setEditingFlag(true);
      setEditingAvailableDate(date);
    }
    setHotelId(id);
    console.log(id);
    setOpenAvailableDateDialog(true);
    console.log(editingFlag);
  };

  // Add function to close available date dialog
  const handleCloseAvailableDateDialog = () => {
    setEditingAvailableDate(null);
    setEditingFlag(false);
    setOpenAvailableDateDialog(false);
  };

  const handleSubmitAvailableDate = async () => {
    setEditingAvailableDate(null);
    setEditingFlag(false);
    setLoading(false);
    setOpenDialog(false);
    setOps(!ops);
  };

  return (
    <>
      <Header />
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginTop: "80px" }}
      >
        Admin Panel
      </Typography>
      <Typography
        variant="body1"
        style={{ textAlign: "center", marginBottom: "80px" }}
      >
        Manage destinations, offers, hotels, and available dates.
      </Typography>

      {destinations.map((destination) => (
        <Box
          key={destination.id}
          mb={4}
          sx={{
            padding: "20px",
            margin: "auto",
            marginBottom: "20px",
            width: "80%",
            borderRadius: "12px",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <Typography variant="h5">{destination.name}</Typography>
          <StyledEditButton
            onClick={() => handleEditDestination(destination)}
            sx={{ mr: 2 }}
          >
            Edit Destination
          </StyledEditButton>
          <StyledDeleteButton
            onClick={() => handleDeleteDestination(destination.id)}
          >
            Delete Destination
          </StyledDeleteButton>
          {destination.hotels.length === 0 && (
            <TableContainer
              component={Paper}
              sx={{
                margin: "auto",
                marginBottom: "20px",
                width: "80%",
                borderRadius: "12px",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#7ebdbd", color: "#fff" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Hotel</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      PricePerNight
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <StyledAddButton
                        onClick={() => handleAddOffer(destination.id)}
                      >
                        Add Offer
                      </StyledAddButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {destination.hotels.map((hotel) => (
            <TableContainer
              component={Paper}
              key={hotel.id}
              sx={{
                margin: "auto",
                marginBottom: "20px",
                width: "80%",
                borderRadius: "12px",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#7ebdbd", color: "#fff" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Hotel</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      PricePerNight
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={hotel.id}>
                    <TableCell>{hotel.location}</TableCell>
                    <TableCell>{hotel.name}</TableCell>
                    <TableCell>
                      <ShowMoreText
                        lines={1} // Display only 1 line by default
                        more="Show more" // Text to show when collapsed
                        less="Show less" // Text to show when expanded
                        anchorClass=""
                        expanded={expanded}
                        onClick={handleToggleExpand}
                      >
                        <Typography variant="body2">
                          {hotel.description}
                        </Typography>
                      </ShowMoreText>
                    </TableCell>
                    <TableCell>{hotel.price_per_night}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEditOffer(hotel, destination.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteOffer(hotel.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {hotel.available_dates &&
                    hotel.available_dates.map((date) => (
                      <TableRow key={date.date}>
                        <TableCell
                          colSpan={5}
                          sx={{
                            width: '100%',
                            backgroundColor: "rgba(126, 189, 189, 0.5)",
                            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                          }}
                        >
                          {`Starting Date: ${date.date}, End Date : ${date.to_date}, Adult Slots: ${date.adult_slots}, Kid Slots: ${date.kids_slots}`}
                          <IconButton
                            onClick={() =>
                              handleOpenAvailableDateDialog(date, hotel.id)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              handleDeleteAvailableDate(hotel.id, date.id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow>
                    <TableCell colSpan={4}>
                      <StyledAddButton
                        onClick={() =>
                          handleOpenAvailableDateDialog(null, hotel.id)
                        }
                      >
                        Add Available Date
                      </StyledAddButton>
                    </TableCell>
                  </TableRow>
                  <TableRow style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                     <BarChart hotel_id={hotel.id}/>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ))}
          {destination.hotels.length != 0 && (
            <TableCell colSpan={3}>
              <StyledAddButton onClick={() => handleAddOffer(destination.id)}>
                Add Offer
              </StyledAddButton>
            </TableCell>
          )}

        </Box>
      ))}

      <IconButton
        style={{ allign: "center", textAlign: "center" }}
        onClick={handleAddDestination}
      >
        <AddIcon />
        Add Destination
      </IconButton>

      <DestinationDialog
        open={openDestinationDialog}
        handleClose={handleDialogClose}
        handleSubmit={handleSubmitDestination}
        title={editingDestination ? "Edit Destination" : "Add Destination"}
        destination={editingDestination}
        loading={loading}
      />
      <OfferDialog
        open={openDialog}
        handleClose={handleDialogClose}
        handleSubmit={handleSubmitOffer}
        title={editingFlag ? "Edit Offer" : "Add Offer"}
        offer={editingOffer}
        destination_id={pk}
        loading={loading}
      />
      <AvailableDateDialog
        open={openAvailableDateDialog}
        handleClose={handleCloseAvailableDateDialog}
        handleSubmit={handleSubmitAvailableDate} // Implement this function
        title={editingFlag ? "Edit Available Date" : "Add Available Date"}
        initialDate={editingAvailableDate}
        hotelId={hotelId}
        loading={loading}
      />

    </>
  );
};

export default AdminPage;
