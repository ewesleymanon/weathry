import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

const StyledCard = styled(Card)`
  max-width: 300px;
  margin: auto;
  /* marginTop: 20; */
`;

interface WeatherCardProps {
  icon: OverridableComponent<SvgIconTypeMap>;
  label: string;
  value: string | number;
  percentage: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ icon: Icon, label, value, percentage }) => {
  return (
    <StyledCard>
      <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
        <Icon style={{ fontSize: 50, color: '#2f69fe' }} />
        <Box>
          <Typography variant="h5" component="h2">
            {label}
          </Typography>
          <Typography variant="h3" component="h2">
            {value}
          </Typography>
        </Box>
        <Typography color="textSecondary">
          {percentage}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default WeatherCard;
