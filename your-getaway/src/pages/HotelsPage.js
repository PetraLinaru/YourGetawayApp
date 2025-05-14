import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Slider from "@mui/material/Slider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactComponent as Icon } from "./pictures/Title.svg";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import dayjs from 'dayjs';

const HotelsPage = () => {
  const { name } = useParams();
  const [offers, setOffers] = useState([]);
  const [price, setPrice] = useState(20); // Initial value for the slider
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate("/hotel/" + name + "/" + id);
  };
  const handleContactUs = () => {
    navigate("/about-us");
  };
  const handleDestinations = () => {
    navigate("/destinations");
  };
  const handleHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/travel/offers/location/" + name
        );
        console.log(response.data);
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  const handleFilter = async () => {
    console.log(startDate, endDate)

    const formattedStartDate = startDate.format('YYYY-MM-DD');
    const formattedEndDate = endDate.format('YYYY-MM-DD');
    try {
      const response = await axios.get(
        `http://localhost:8000/travel/hotels/filter/${name}/${formattedStartDate}/${formattedEndDate}`
      );
      console.log(response.data);
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching filtered offers:", error);
    }
  };

  return (
    <Container>
      <Header />
      <Icon width="1750" height="300" />
      <TitleSection>
        <StyledShapes />
        <TitleWrapper>
          <Title>Discover Your Next Adventure</Title>
          <SubTitle>Explore amazing destinations around the world</SubTitle>
        </TitleWrapper>
      </TitleSection>
      <br />
      <br />
      <SearchBar>
        <SearchInput type="text" placeholder="Search hotels" />
        <Spacer size={20} />
        <FilterAltIcon />
        <Spacer size={20} />
        Date:
        <Spacer size={20} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            value={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <Spacer size={20} />
          -
          <Spacer size={20} />
          <DatePicker
            label="To"
            value={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </LocalizationProvider>
        <Spacer size={20} />
        <button onClick={handleFilter}>Apply Filters</button>
        <Spacer size={20} />
        Price:
        <Spacer size={20} />
        <Slider
          value={price}
          onChange={handlePriceChange}
          min={10}
          max={5000}
          step={100}
        />
        <PriceValue>{price}</PriceValue>
        <Spacer size={20} />
        <FormControlLabel control={<Checkbox />} label="Discounted" />
      </SearchBar>
      <br />
      <br />
      <br />
      <br />
      <Grid>
        {offers.map((offer) => (
          <DestinationCard key={offer.id} onClick={() => handleClick(offer.id)}>
            <DestinationImage
              src={`data:image/jpeg;base64,${offer.pictures}`}
              alt={offer.name}
            />
            <DestinationContent>
              <DestinationName>{offer.name}</DestinationName>
              <StartingFrom>
                Starting from: {offer.price_per_night}/night
              </StartingFrom>
              <Discount> Discount: {offer.discount}</Discount>
            </DestinationContent>
          </DestinationCard>
        ))}
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
`;

const SubTitle = styled.p`
  font-size: 18px;
  color: #666;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 88%;
  margin-left: auto;
  margin-right: auto;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 5px 5px 5px;
  width: 1500px;

  outline: none;
`;

const FilterIcon = styled.img`
  width: 40px;
  height: 40px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 0 5px 5px 0;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PriceValue = styled.span`
  font-size: 16px;
  color: #333;
`;

const Spacer = styled.span`
  margin-left: ${(props) => props.size}px;
`;

const Grid = styled.div`
  display: grid;
  padding: 50px;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const DestinationCard = styled.div`
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const DestinationImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const DestinationContent = styled.div`
  padding: 20px;
`;

const DestinationName = styled.h2`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

const StartingFrom = styled.p`
  font-size: 16px;
  color: #666;
`;

const Discount = styled.p`
  font-size: 12px;
  color: red;
`;

const StyledShapes = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const TitleSection = styled.div`
  position: relative;
  text-align: center;
`;

const TitleWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

export default HotelsPage;
