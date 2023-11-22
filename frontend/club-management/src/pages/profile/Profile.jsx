import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Avatar,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MdPerson, MdCameraAlt } from 'react-icons/md';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: '0 auto',
    border: '5px solid #fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  },
  uploadIcon: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: '50%',
    padding: theme.spacing(1),
    cursor: 'pointer',
    boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
  },
  form: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  labelIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  submitButton: {
    alignSelf: 'flex-end',
  },
}));

function Profile() {
  const { userData } = useContext(UserContext);
  const classes = useStyles();
  const [profileData, setProfileData] = useState(userData?.member_data || {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileData((prevData) => ({
        ...prevData,
        profile_picture: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    // TODO: Implement the logic to update the profile data
    console.log('Updating profile data:', profileData);
  };

  if (!userData) {
    return <Typography variant="subtitle1">You haven't logged in.</Typography>;
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Box textAlign="center">
        <Avatar src={profileData.profile_picture} alt="Profile Picture" className={classes.avatar} />
        <label htmlFor="upload-profile-picture" className={classes.uploadIcon}>
          <IconButton component="span">
            <MdCameraAlt />
          </IconButton>
          <input
            type="file"
            id="upload-profile-picture"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
      </Box>
      <form className={classes.form}>
        <div className={classes.labelIcon}>
          <MdPerson />
          <Typography variant="subtitle1">Full Name</Typography>
        </div>
        <TextField
          type="text"
          name="full_name"
          placeholder="Enter Full Name"
          value={profileData.full_name}
          onChange={handleInputChange}
          variant="outlined"
        />

        {/* ... (Repeat the pattern for other fields) ... */}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateProfile}
          className={classes.submitButton}
        >
          Update Profile
        </Button>
      </form>
    </Container>
  );
}

export default Profile;
