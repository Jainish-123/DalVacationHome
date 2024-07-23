import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Room from "../../interfaces/Room";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  TableCell,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Chip,
  Grid,
} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import AddIcon from "@mui/icons-material/Add";
import image from "../../images/room.jpg";
import { getFeedbackByRoomId, getRoomById } from "../../api/roomManagementApis";
import Feedback from "../../interfaces/Feedback";
import { useAuth } from "../../context/Auth";
import { getUser } from "../../api/authApis";
import { postReview } from "../../api/reviewApis";

const RoomDetails: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const {getSession} = useAuth();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [newFeedback, setNewFeedback] = useState("");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!roomId) {
        navigate("/");
        return;
      }
      const roomData = await getRoomById(roomId);
      setRoom(roomData);
    };

    const fetchFeedbacks = async () => {
      if (!roomId) {
        return;
      }
      const feedbackData = await getFeedbackByRoomId(roomId);
      if (Array.isArray(feedbackData.data)) {
        setFeedbacks(feedbackData.data);
      } else {
        setFeedbacks([]);
      }
    };

    fetchRoomDetails();
    fetchFeedbacks();
  }, [roomId, navigate]);

  const handleBookNow = async () => {
    const requestBody = {
      email: "krishnavaibhav.y@gmail.com",
      room_id: "103",
    };

    try {
      const response = await fetch(
        "https://p2r4cn9vyj.execute-api.us-east-1.amazonaws.com/dev/room",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        // Handle success
        // For example, show a success message or navigate to a success page
      } else {
        // Handle error
        // For example, show an error message or log the error
      }
    } catch (error) {
      // Handle error
      // For example, show an error message or log the error
    }
  };

  const handleAddReview = async () => {
    if (!newFeedback.trim()) return;
    const data = await getSession();
    const email = data.getIdToken().payload.email;
    const response=await getUser(email);
    console.log(response);
    const requestBody = {
      review: newFeedback,
      userId: response.data.userId,
      roomId: roomId ?? "",
    };
      console.log(requestBody);
    try {
      await postReview(requestBody);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "Very Negative":
        return <SentimentVeryDissatisfiedIcon color="error" />;
      case "Negative":
        return <SentimentDissatisfiedIcon color="error" />;
      case "Neutral":
        return <SentimentSatisfiedIcon color="action" />;
      case "Positive":
        return <SentimentSatisfiedAltIcon color="primary" />;
      case "Very Positive":
        return <SentimentVerySatisfiedIcon color="primary" />;
      default:
        return null;
    }
  };

  if (!room) return <div>Loading...</div>;

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", p: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{ boxShadow: "none", mb: 3 }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  height="300"
                  image={image}
                  alt={room.room}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h4" component="div" gutterBottom>
                    {room.room}
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="text.secondary">
                        Price: ${room.Price}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" color="text.secondary">
                        Agent ID: {room.Agent}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" color="text.secondary">
                        Address: {room.Address}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" color="text.secondary">
                        Availability: {room.Availability}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" color="text.secondary">
                        Beds: {room.Beds}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Amenities:
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          gap: 1,
                        }}
                      >
                        {room.Amenities.map((amenity, index) => (
                          <Chip
                            key={index}
                            label={amenity}
                            variant="outlined"
                            sx={{ m: 1 }}
                          />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          </Card>

          <Box
            sx={{
              bgcolor: "#e0e0e0",
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Feedback
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Add a Review
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                placeholder="Write your review here..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleAddReview}>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Feedback</TableCell>
                    <TableCell>Sentiment Score</TableCell>
                    <TableCell>Polarity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feedbacks.map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell>{feedback.feedback}</TableCell>
                      <TableCell>{feedback.score}</TableCell>
                      <TableCell>{getSentimentIcon(feedback.sentiment)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomDetails;
