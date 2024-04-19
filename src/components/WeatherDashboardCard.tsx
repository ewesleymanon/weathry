import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import styled from '@emotion/styled';

interface Props {
  title: string;
  icon: React.ReactElement;
  value: string;
}

const WeatherCard = styled(Card)`
  min-width: 200px;
  max-width: 250px;
  background: #ecf3f8;
`;

const WeatherCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeatherIcon = styled('div')`
  font-size: 48px;
`;

const WeatherDashboardCard: React.FC<Props> = ({ title, icon, value }) => {
  return (
    <WeatherCard>
      <WeatherCardContent>
        <WeatherIcon>
          {icon}
        </WeatherIcon>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <Typography variant="body1">{value}</Typography>
      </WeatherCardContent>
    </WeatherCard>
  );
};

export default WeatherDashboardCard;
