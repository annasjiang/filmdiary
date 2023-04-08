import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  const themeColor = createTheme({
    palette: {
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 2, mt: 10 }}>
        <LogoutIcon />
      </Avatar>
      <Typography> Are you sure you want to log out, </Typography>
      <Typography component="h1"> {name}? </Typography>
      <Box 
        fullWidth
        component="form"
        spacing={2}
        justify='space-between'
        noValidate 
        sx={{ mt: 1 }}
        >
          <ThemeProvider theme={themeColor}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white'}}>
          <Button
            // fullWidth
            sx={{ mt: 3 }}
            variant="outlined"
            color="neutral"
            >
            CANCEL
          </Button></Link>
          </ThemeProvider>
          <Button
            // fullWidth
            sx={{ mt: 3, marginLeft: 2 }}
            variant="contained"
            color="error"
            onClick={logout}>
            LOG OUT
          </Button>
      </Box>
    </Box>
  </Container>
  );
}
export default Dashboard;