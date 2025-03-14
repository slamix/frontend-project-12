import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, ListGroup, Form, Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as authActions } from '../slices/authSlice.js';
import ChannelsList from "./ChannelsList.jsx";
import ChatWindow from "./ChatWindow.jsx";

const getChannels = async (userToken) => {
  try {
    const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      }
    });
    const channels = response.data;
    return channels;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localToken = localStorage.getItem('token');
  const channels = useSelector((state) => state.channels.channels);

  const [activeChannel, setActiveChannel] = useState(null);

  useEffect(() => {
    if (!localToken) {
      navigate('/login');
    } else {
      const fetchChannels = async () => {
        try {
          const channels = await getChannels(localToken);
          dispatch(channelsActions.addChannels(channels));
          setActiveChannel(channels[0]);
        } catch (error) {
          console.log(error);
        }
      }
      fetchChannels();
    }
  }, [localToken, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(authActions.userLogOut());
    navigate('/login');
  }

  return (
    <Container fluid className="vh-100 d-flex flex-column p-0">
      <Row className="bg-light border-bottom p-2">
        <Col className="d-flex justify-content-end">
          <Button variant="outline-danger" onClick={handleLogout}>
            Выйти
          </Button>
        </Col>
      </Row>

      <Row className="flex-grow-1">
        <Col md={3} className="bg-light p-3 border-end">
          <ChannelsList
            channels={channels}
            activeChannel={activeChannel}
            onChannelClick={setActiveChannel}
          />
        </Col>
        <Col md={9} className="d-flex flex-column p-0">
          <ChatWindow activeChannel={activeChannel} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;