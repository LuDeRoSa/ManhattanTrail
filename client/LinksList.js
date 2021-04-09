import React from 'react';

import PublicIcon from '@material-ui/icons/Public';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';

const linksList = [
  {
    text: 'Game',
    icon: <SportsEsportsIcon />,
    path: '/landing',
  },
  {
    text: 'Profile',
    icon: <AccountCircleIcon />,
    path: '/profile',
  },
  {
    text: 'Leadership',
    icon: <PublicIcon />,
    path: '/leadership',
  },
  {
    text: "About Us",
    icon: <GroupIcon />,
    path: '/aboutus'
  }
];

export default linksList;
