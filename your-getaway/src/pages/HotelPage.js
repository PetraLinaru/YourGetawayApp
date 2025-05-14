import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { ReactComponent as UpperIllustration } from './pictures/UpperBar.svg';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header'
import axios from 'axios'
import dayjs from 'dayjs'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';


const HotelPage = () => {
  
  const navigate = useNavigate();
  const { location, hotel } = useParams();
  const [hotelData, setHotelData] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [numAdults, setNumAdults] = useState(0);
  const [numKids, setNumKids] = useState(0);
  const [pricePerNight,setPricePerNight]=useState(0)
  const [discount,setDiscount]=useState(0)
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableDates,setAvailableDates]=useState([])
  const [showAvailableDates, setShowAvailableDates] = useState(false);
  
  const user_name=sessionStorage.getItem('username');
  const localizer = momentLocalizer(moment);
  const[events,setEvents]=useState([])



  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/travel/hotels/${location}/${hotel}`);
        setHotelData(response.data); // Update state with fetched hotel data
        setPricePerNight(response.data.price_per_night)
        setDiscount(response.data.discount)
        setAvailableDates(response.data.available_dates)
      
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelData(); // Call the fetchHotelData function
  }, []);

  useEffect(() => {
    if (fromDate && toDate && hotelData) {
      // Calculate total price
      const totalNights = dayjs(toDate).diff(fromDate, 'day');
      const calculatedPrice = totalNights * (pricePerNight - (pricePerNight * discount / 100));
      setTotalPrice(calculatedPrice);
    }
  }, [fromDate, toDate, hotelData]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/bookings/get/`+hotel+'/');
        const eventData = response.data;
        setEvents(eventData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleBookNow = async () => {
    console.log(user_name)
    try {
      const response = await axios.post('http://localhost:8000/bookings/create/', {
        username: user_name,
        hotel_name: hotelData.name,
        start_date: fromDate.format('YYYY-MM-DD'),
        end_date: toDate.format('YYYY-MM-DD'),
        num_adults: numAdults,
        num_kids: numKids,
        total_price:totalPrice
      });
      console.log('Booking successful:', response.data);
      alert("Booking successful!")

    } catch (error) {
      console.error('Error making booking:', error);
      alert("Booking unsuccessful!")
    }
  };

  const handleCheckAvailability = () => {
    setShowAvailableDates(prevState => !prevState); 
    let ev=(availableDates.map(date => ({
      start: new Date(date.date),
      end: new Date(date.to_date),
      title: `Available (${date.adult_slots} adults, ${date.kids_slots} kids)`,
    })));
    setEvents(ev)
   
  };



  // Rest 
  return (
    <Container>
      <Header />
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <UpperIllustration style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', top: '50%', left: '70%', transform: 'translate(-50%, -50%)', zIndex: '1' }}>
          <DestinationTitle>{location}</DestinationTitle>
        </div>
        <div style={{ position: 'absolute', top: '80%', right: '50%', transform: 'translate(-50%, -50%)', zIndex: '1' }}>
          <HotelName>{hotelData?.name}, {hotelData?.stars_rating}*</HotelName>
        </div>
      </div>


      <MainContent>
        <LeftColumn>
          <StyledCarousel autoPlay infiniteLoop showThumbs={false}>
            <div>
              <img src={require("./pictures/lemeridien1.jpg")} alt="Hotel 1" />
            </div>
            <div>
              <img src={require("./pictures/lemeridien2.jpg")} alt="Hotel 2" />
            </div>
          </StyledCarousel>
          <RatingStyled>
            <Rating name="no-value" value={null} />
          </RatingStyled>
        </LeftColumn>
        {/* Right Column */}
        <RightColumn>
          {/* Price per Night */}
          <PricePerNight>Price/night: ${hotelData?.price_per_night}</PricePerNight>
          {/* Checkboxes for Adults and Kids */}
          <FormContainer>
            <FormControl>
              <Label>Adults:</Label>
              <StyledSelect label="Adults" defaultValue={0} onChange={(e) => setNumAdults(e.target.value)}>
                {Array.from({ length: 11 }, (_, i) => i).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
            <FormControl>
              <Label>Kids:</Label>
              <StyledSelect label="Kids" defaultValue={0} onChange={(e) => setNumKids(e.target.value)}>
                {Array.from({ length: 11 }, (_, i) => i).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </FormContainer>
          {/* Date Pickers */}
          <DatePickers>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From"
                value={fromDate}
                onChange={(date) => setFromDate(date)}

              />
              <Spacer size={70} />
              <DatePicker
                label="To"
                value={toDate}
                onChange={(date) => setToDate(date)}

              />
            </LocalizationProvider>
          </DatePickers>
        {showAvailableDates ?(
          <Calendar
          style={{ width: '560px', height: '400px' , marginBottom:'40px' }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
         ) : (
          <Calendar
          style={{ width: '560px', height: '400px' , marginBottom:'40px' }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        />)}
          <TotalPrice>Total price: ${totalPrice}</TotalPrice>
          <ButtonContainer>
            <CheckAvailabilityButton onClick={handleCheckAvailability}>Check Availability</CheckAvailabilityButton>
            <BookButton onClick={handleBookNow}>Book Now</BookButton>
          </ButtonContainer>
        </RightColumn>
        <Spacer size={70} />

      </MainContent>
      <br></br>
      <Wrapper>
        <Spacer size={70} />
        <h1> {hotelData?.name} </h1>
        <h3 style={{ padding: '50px' }}> {hotelData?.description} </h3>
      </Wrapper>
    </Container>
  );
};
const Spacer = styled.span`
  margin-left: ${(props) => props.size}px;
`;
const Container = styled.div`
  font-family: Arial, sans-serif;
`;


const TextOverIllustration = styled.div`
position: relative;
text-align: center;
color: white;
font-size: 24px;
padding: 10px;
/* Positioning and sizing the pseudo-element */
&::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Background gradient for semi-transparency */
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
}
`;


const MainContent = styled.div`
  display: flex;
  padding: 20px;
  padding-left: 100px;
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top:100px;
  padding-left: 10px;
`;

const StyledCarousel = styled(Carousel)`
  width: 100%;
  max-height: 400px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  margin-bottom: 200px;
`;

const RatingStyled = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Stars = styled.div`
  /* Styles for stars */
`;

const RightColumn = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const PricePerNight = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
  color: #427160;
  weight: italic;
  flex: 1;
  display: flex;
`;

const DestinationTitle = styled.div`
  font-size: 130px;
  margin-bottom: 20px;
  color: white;
  weight: bold;
  flex: 1;
  display: flex;
`;

const HotelName = styled.div`
  font-size: 50px;
  margin-bottom: 20px;
  color: white;
  weight: bold;
  flex: 1;
  display: flex;
`;

const FormContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FormItem = styled(FormControl)``;

const Label = styled.div`
  margin-bottom: 5px;
`;

const StyledSelect = styled(Select)`
  width: 120px;
`;

const DatePickers = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

const TotalPrice = styled.div`

  margin-bottom: 20px;
  font-size: 30px;
  display: flex;
  color: #BB3838;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CheckAvailabilityButton = styled.button`
  background-color: #80A3A3;
  color: white;
  border: none;
  padding: 20px 40px;
  border-radius: 17px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 20px; /* Increase font size */
`;
const BookButton = styled.button`
  background-color: #78D3D3;
  color: white;
  border: none;
  padding: 20px 50px;
  border-radius: 17px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 20px; /* Increase font size */
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

`;



export default HotelPage;
