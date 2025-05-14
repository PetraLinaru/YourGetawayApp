import React from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ReactComponent as UpperIllustration } from './pictures/Home.svg';
import { ReactComponent as Background } from './pictures/Background.svg';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'


const HomePage = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/landing');
  };
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
      <Header/>
      <IllustrationContainer>
        <UpperIllustration style={{ width: '100%', height: '100%' }} width="1750" height="300" />
      </IllustrationContainer>
      <TextContainer>
        <WelcomeText style={{'font-size':'38px', 'font-weight':'500'}} >
          Welcome to yourGetaway, your ultimate destination for memorable travel experiences! Whether you're planning a relaxing beach vacation, an adventurous mountain trek, or a cultural exploration in vibrant cities, yourGetaway has you covered. With our user-friendly platform and extensive selection of destinations, accommodations, and activities, planning your dream getaway has never been easier.
        </WelcomeText>
      </TextContainer>
      <TitleText variant="h4" style={{'font-size':'38px', 'font-weight':'700' ,'margin-bottom':'50px' }}>About Us</TitleText>
      <Divider style={{'width':'1200px' }} />
      <AboutUsText variant="body1" style={{'font-size':'30px', 'font-weight':'400'}}>

        At yourGetaway, we're passionate about making travel accessible, enjoyable, and hassle-free for everyone. With years of experience in the travel industry, our dedicated team is committed to providing you with personalized recommendations, expert advice, and top-notch customer service. From luxurious resorts to cozy bed and breakfasts, we handpick the best accommodations to suit your preferences and budget. Trust yourGetaway to turn your travel dreams into reality!
      
      </AboutUsText>
      <ButtonContainer>
        <CustomButton onClick={handleClick}>Go to yourGetaway</CustomButton>
        &nbsp; &nbsp; &nbsp;
        <CustomButton onClick={handleContactUs}>Contact Us</CustomButton>
      </ButtonContainer>
    </Container>
  );
};

const Spacer = styled.span`
  margin-left: ${(props) => props.size}px;
`;

const Container = styled.div`
  font-family: Arial, sans-serif;
`;

const IllustrationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 1300px;
`;

const TextContainer = styled.div`
  text-align: center;
  font-size: 240px; /* Updated font size */
  width: 1226px; /* Ensure full width */
  padding:250px;
`;

const WelcomeText = styled(Typography)`
  color: #5E7B7B;
  font-weight: 1600;
  width: 1226px;
  font-size: 240px;

  margin: 20 auto; /* Center horizontally */
`;

const TitleText = styled(Typography)`
  color: #5E7B7B;
  text-align: center;
`;

const Divider = styled.div`
  width: 100px;
  height: 2px;
  background-color: #5E7B7B;
  margin: 0 auto;
`;

const AboutUsText = styled(Typography)`
  color: #5E7B7B;
  font-style: italic;
  width: 1226px;
  margin: 20 auto; /* Center horizontally */
  text-align: center;
  padding:250px;
`;

const CustomButton = styled.button`
  background-color: #78d3d3;
  color: white;
  border: none;
  padding: 20px 50px;
  border-radius: 17px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;


export default HomePage;
