import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Waves, CloudOutlined, AcUnit, OpacityOutlined } from '@mui/icons-material';
import WeatherDashboardCard from './WeatherDashboardCard';
import useDashboard from '../hooks/useDashboard';
import DashboardHeader from './DashboardHeader';
import WeatherForecast from './WeatherForecast';
import CircularProgress from '@mui/material/CircularProgress';
import DashboardFeature from './DashboardFeature';


const Dashboard: React.FC = () => {
  const { query, setQuery, loading, weatherData, forecastData, temperatureDataMemo, locationName, error, handleSearch } = useDashboard();
  
  const renderDashboardCards = (data:any) => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '50px' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return <Typography variant="body1" color="error">{error}</Typography>;
    }

    if (!data.weatherData) {
      return null;
    }

    return (
      <Grid sx={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
          <WeatherDashboardCard
            title="Wind"
            icon={<Waves />}
            value={`${data.weatherData.wind.speed} km/h`}
          />
          <WeatherDashboardCard
            title="Rain Chance"
            icon={<CloudOutlined />}
            value={`${data.weatherData.clouds.all}%`}
          />
          <WeatherDashboardCard
            title="Pressure"
            icon={<AcUnit />}
            value={`${data.weatherData.main.pressure} hPa`}
          />
          <WeatherDashboardCard
            title="UV Index"
            icon={<OpacityOutlined />}
            value={`${data.weatherData.main.humidity}%`}
          />
        
      </Grid>
    );
  };

  return (
    <Container maxWidth="xl">
      <DashboardHeader
        locationName={locationName}
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={9}>
          <DashboardFeature data={temperatureDataMemo} sunrise={weatherData?.sys?.sunrise} sunset={weatherData?.sys?.sunset} weatherDescription={weatherData?.weather[0]?.description}/>
          {renderDashboardCards({ weatherData, error, loading })}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <WeatherForecast forecastData={forecastData}/>
        </Grid>
      </Grid>
     
    </Container>
  );
}

export default Dashboard;
