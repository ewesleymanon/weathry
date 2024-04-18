import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { WbSunnyOutlined, CloudOutlined, FlashOnOutlined, OpacityOutlined } from '@mui/icons-material';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import { yellow, blue, orange, grey } from '@mui/material/colors';
import { getFormattedTime, getShortWeekday, getShortMonthAndDay } from '../utils';

interface Weather {
  main: string;
}

export interface Forecast {
  dt: number;
  main: {
    temp: number;
  };
  weather: Weather[];
}

interface WeatherForecastProps {
  forecastData: Forecast[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({forecastData}) => {

  const getWeatherIcon = (weather: string): JSX.Element | null => {
    switch (weather) {
      case 'Clear':
        return <WbSunnyOutlined sx={{ color: yellow[500] }} />;
      case 'Clouds':
        return <CloudOutlined sx={{ color: grey[500] }} />;
      case 'Rain':
        return <ThunderstormOutlinedIcon sx={{ color: blue[500] }} />;
      case 'Thunderstorm':
        return <FlashOnOutlined sx={{ color: orange[500] }} />;
      case 'Drizzle':
        return <OpacityOutlined sx={{ color: blue[500] }} />;
      default:
        return null;
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Daily Weather Forecast
      </Typography>
      <Grid container spacing={2}>
        {forecastData?.map((forecast, index) => (
          <Grid item xs={12} key={index}>
            <Paper elevation={2} sx={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {getFormattedTime(forecast.dt)}
                </Typography>
                <Typography variant="body2">
                  {getShortWeekday(forecast.dt)}
                </Typography>
                <Typography variant="body2">
                  {getShortMonthAndDay(forecast.dt)}
                </Typography>
              </Box>
              <Box>
                {getWeatherIcon(forecast.weather[0]?.main || '')}
              </Box>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {forecast.weather[0]?.main}
                </Typography>
                <Typography variant="body2">
                  {`${(forecast.main.temp).toFixed(1)}°C`}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeatherForecast;
