import React from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReactComponent as UpperIllustration } from './pictures/AboutUs.svg';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'


const AboutUs = () => {

  const navigate = useNavigate();

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
     <div style={{ position: 'relative', width: '100%', height: '1300px' }}>
        <UpperIllustration style={{ width: '100%', height: '100%' }} width="1750" height="300" />
        <OverlayContainer>
          <StyledPaper elevation={3}>
            <Typography variant="h4" color='#5E7B7B'>Get in Touch</Typography>
            <Spacer size={20} />
            <ContactInfo>
              <Typography variant="body1">Please feel free to contact us if you have any further problems or questions.</Typography>
              <Spacer size={30} />
              <Divider />
              <Spacer size={70} />
            </ContactInfo>
            <TextField id="name" label="Your Name" fullWidth margin="normal" />
            <Spacer size={20} />
            <TextField id="email" label="Your Email" fullWidth margin="normal" />
            <Spacer size={20} />
            <TextField id="problem" label="Tell us more about your problem" multiline rows={4} fullWidth margin="normal" />
            <Spacer size={20} />
            <SendButton>Send</SendButton>
          </StyledPaper>
          </OverlayContainer>  
          <OverlayContainerMiddle>
          <FeedbackPaper>
          <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 'lighter', marginBottom: '10px' }}>We would like to hear your feedback</Typography>
          <Rating defaultValue={0} precision={0.5} />
          <TextField id="feedback" label="Your Message" multiline rows={4} fullWidth margin="normal" />
          <SendButton>Send Feedback</SendButton>
        </FeedbackPaper>
        </OverlayContainerMiddle>
      </div>
    </Container>
  );
};


const Spacer = styled.span`
  margin-left: ${(props) => props.size}px;
`;
const Container = styled.div`
  font-family: Arial, sans-serif;
`;

// const Header = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   width: 100%;
//   height: 70px;
//   background-color: #638c8c;
//   color: white;
//   margin-bottom: 30px;
// `;

// const NavGroup = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const NavItem = styled.div`
//   cursor: pointer;
//   margin-right: 10px;
//   &:last-child {
//     margin-right: 0;
//   }
// `;

const OverlayContainer = styled.div`
  position: absolute;
  top: 60%;
  left: 70%;
  transform: translate(-50%, -50%);
`;

const OverlayContainerMiddle = styled.div`
  position: absolute;
  width:800px;
  top: 99,999999%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
`;

const ContactInfo = styled.div`
  margin-bottom: 20px;
`;

const Divider = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

const SendButton = styled.button`
  background-color: #78D3D3;
  color: white;
  border: none;
  padding: 20px 50px;
  border-radius: 17px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 20px; /* Increase font size */
`;

const FeedbackPaper = styled(Paper)`
  margin-top: 50px;
  padding: 20px;
  text-align: center;
`;


export default AboutUs;
