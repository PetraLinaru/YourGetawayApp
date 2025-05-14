import React, { useState } from 'react';
import styled , { keyframes }from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Header from '../components/Header'

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log(username)
      const response = await axios.post('http://localhost:8000/users/login/', {
        username: username,
        password: password
      });
      
      const { access, role } = response.data;
      console.log(response.data)
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('username',response.data.user[0])
      sessionStorage.setItem('role', role);

      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/destinations');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleContactUs = () => {
    navigate('/about-us');
  };

  const handleDestinations = () => {
    navigate('/destinations');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <GradientBackground />
      <Header/>

      <Content>
        <GlassCard>
          <CardContent>
            <CardText>Login</CardText>
            <Input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <ButtonContainer>
              <LoginButton onClick={handleLogin}>Login</LoginButton>
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
`;

const GlassCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  padding: 60px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.3);
`;

const CardContent = styled.div`
  text-align: center;
`;

const CardText = styled.p`
  font-size: 45px;
  font-weight: bold;
  color: white;
  margin-bottom: 40px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const LoginButton = styled.button`
  background-color: #7ebdbd;
  color: white;
  border: none;
  padding: 20px 50px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: #5ca3a3;
  }
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


export default LoginPage;
