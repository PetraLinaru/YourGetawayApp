import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Icon } from "./pictures/Title.svg";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header'
import axios from "axios";


const DestinationsPage = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);

  /*Initial calls*/
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/travel/destinations/"
        );
        console.log(response.data);
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  /*Navbar functions*/
  const handleClick = (param) => {
    navigate("/hotelspage/"+param);
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

  /*Functionalities */
  const filterDestination = async (name) => {
    try {
      const url = `http://localhost:8000/travel/search_destinations/?name=${encodeURIComponent(
        name
      )}`;
      const response = await axios.get(url);
      console.log(response.data);
      setDestinations(response.data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  return (
    <Container>
      <Header/>
      <Icon width="1750" height="300" />
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search destinations"
          onChange={(e) => filterDestination(e.target.value)}
        />
        <FilterAltIcon />
      </SearchBar>
      <br></br>
      <br></br>

      <Grid style={{ padding: "80px" }}>
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} onClick={()=>handleClick(destination.name)}>
            <DestinationImage
              src={`data:image/jpeg;base64,${destination.photo}`}
              alt={destination.name}
            />
            <DestinationContent>
              <DestinationName>{destination.name}</DestinationName>
              <StartingFrom>
                Starting from: {destination.price}/night
              </StartingFrom>
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
  margin-top: 10px; /* Adjust margin top */
  width: 50%; /* Adjust width */
  margin-left: auto; /* Align to the center */
  margin-right: auto; /* Align to the center */
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  outline: none;
`;

const FilterIcon = styled.img`
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
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

const StyledShapes = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 0;

  /* Add your styling for cool shapes here */
`;

const TitleSection = styled.div`
  position: relative;
  text-align: center;
`;

const TitleWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

export default DestinationsPage;
