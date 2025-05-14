import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';


const Header = () => {
  const [locationData, setLocationData] = useState({ country: 'Loading...', continent: 'Loading...' });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLocationInfo = async () => {
      try {
        let locationData = localStorage.getItem('location');
        if (!locationData) {
          const response = await axios.get('https://ipapi.co/json/');
          const { country, continent } = response.data;
          locationData = { country, continent };
          localStorage.setItem('location', JSON.stringify(locationData));
        } else {
          locationData = JSON.parse(locationData);
        }
        setLocationData(locationData);
      } catch (error) {
        console.error('Error fetching geolocation info:', error);
        setLocationData({ country: 'Unknown', continent: 'Unknown' });
      }
    };
  
    fetchLocationInfo();
  }, []);
  

  const handleContactUs=()=>{
    navigate('/about-us')
  }
  const handleDestinations=()=>{
    navigate('/destinations')
  }
  const handleHome=()=>{
    navigate('/')
  }
  return (
    <Container>
      <NavGroup>
        <NavItem>Location: {locationData.continent}, {locationData.country}</NavItem>
        <NavItem onClick={handleHome}>Home</NavItem>
        <NavItem onClick={handleDestinations}>Destinations</NavItem>
        <NavItem onClick={handleContactUs}>Contact Us</NavItem>
      </NavGroup>
    </Container>
  );
};




const Container = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: flex-end;
width: 100%;
height: 70px;
background-color: #638c8c;
color: white;
padding:-40px;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  padding:10px;
`;

const NavItem = styled.div`
  cursor: pointer;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

export default Header;
