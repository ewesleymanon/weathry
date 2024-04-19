import { Grid, Typography, Card } from "@mui/material";
import styled from '@emotion/styled';
import TemperatureChart from "./TemperatureChart";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import WbTwilightOutlinedIcon from '@mui/icons-material/WbTwilightOutlined';
import { getFormattedTime, capitalizeFirstLetter } from "../utils";

const GradientCard = styled(Card)`
  border-radius: 10px;
  color: #ffffff;
  background: linear-gradient(to top right, #000000 0%, #808080 100%);
  padding: 30px;
`;

const IconContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

const StyledLightModeOutlinedIcon = styled(LightModeOutlinedIcon)`
  font-size: 100px;
  margin-bottom: 10px;
`;

const StyledWbTwilightOutlinedIcon = styled(WbTwilightOutlinedIcon)`
  font-size: 100px;
  margin-bottom: 10px;
`;

interface DashboardFeatureProps {
  data: { label: string; temp: number }[];
  sunrise: number;
  sunset: number;
  weatherDescription: string;
}

const DashboardFeature: React.FC<DashboardFeatureProps> = ({ data, sunrise, sunset, weatherDescription }) => {
  return (
    <GradientCard sx={{marginTop: '35px'}}>
      <Grid sx={{ display: 'flex', alignItems: 'center' }} spacing={2}>
        <IconContainer item xs={6}>
          <Typography variant="h4" gutterBottom>Today:</Typography>
          <Typography variant="h2" gutterBottom>{capitalizeFirstLetter(weatherDescription)}</Typography>
        </IconContainer>
        <IconContainer item xs={6}>
          <StyledLightModeOutlinedIcon />
          {getFormattedTime(sunrise)}
          <Typography variant="h6" gutterBottom>Sunrise</Typography>
        </IconContainer>
        <IconContainer item xs={6}>
          <StyledWbTwilightOutlinedIcon />
          {getFormattedTime(sunset)}
          <Typography variant="h6" gutterBottom>Sunset</Typography>
        </IconContainer>
      </Grid>
      <TemperatureChart data={data} />
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={3} key={index}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.temp.toFixed(1)}°C</Typography>
            <Typography variant="h6" gutterBottom>
              {item.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </GradientCard>
  );
};

export default DashboardFeature;
