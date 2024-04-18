import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import SvgIcon from '@mui/material/SvgIcon';

interface Props {
  title: string;
  icon: React.ReactElement;
  value: string;
}

const WeatherCard = styled(Card)(({ theme }) => ({
  minWidth: '200px',
  maxWidth: '250px',
  background: '#ecf3f8',
}));

const WeatherCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const WeatherIcon = styled(SvgIcon)(({ theme }) => ({
  fontSize: '48px',
  marginBottom: theme.spacing(1),
}));

const WeatherValue = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const WeatherDashboardCard: React.FC<Props> = ({ title, icon, value }) => {
  return (
    <WeatherCard>
      <WeatherCardContent>
        <WeatherIcon>
          {icon}
        </WeatherIcon>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <WeatherValue variant="body1">{value}</WeatherValue>
      </WeatherCardContent>
    </WeatherCard>
  );
};

export default WeatherDashboardCard;
