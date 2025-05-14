import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;


const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    navigate('/register');
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
      <GradientBackground />
      <Header/>
      <Content>
        <GlassCard>
          <CardContent>
            <CardText>  Let's start our  </CardText>
            <CardText>  journey here!</CardText>
            <br></br>
            <br></br><br></br>
            <br></br>
            <ButtonContainer>
              <SignInButton onClick={handleRegister}>Register</SignInButton>
              <br></br>
              <br></br>
              <LoginButton onClick={handleLogin}> Login</LoginButton>
            </ButtonContainer>
          </CardContent>
        </GlassCard>
      </Content>

    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  z-index: 1; /* Ensure content is above the background */
`;

const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  filter: blur(120px);
  background-image: linear-gradient(hsl(158, 82%, 57%, 0.5), hsl(252, 82%, 57%, 0.5));
  opacity: 0.8; /* Adjust opacity to make it more faded */
  animation: ${rotate} 50s linear infinite;
  border-radius: 10% 10% 10% 10% / 10% 10% 10% 10%; /* Circular shape */
  z-index: 0; /* Ensure it's behind all other components */
`;


const GlassCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  padding: 60px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.3);
  z-index: 1; /* Ensure content is above the background */
`;

const CardContent = styled.div`
  text-align: center;
`;

const CardText = styled.p`
  font-size: 45px; /* Increase font size */
  font-weight: bold; /* Make it bold */
  color: white;
`;


const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const SignInButton = styled.button`
  background-color: #7ebdbd;
  color: white;
  border: none;
  padding: 20px 50px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 20px; /* Increase font size */
`;

const LoginButton = styled.button`
  background-color: #b5e4e4;
  color: white;
  border: none;
  padding: 20px 50px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px; /* Increase font size */
`;

export default LandingPage;
