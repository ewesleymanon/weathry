import React from 'react';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Stack, Box } from '@mui/material';

interface TemperatureChartProps {
  data: { label: string; temp: number }[];
}
const TemperatureChart: React.FC<TemperatureChartProps> = ({data}) => {
  const chartData = data.map(item => item.temp);

  return (
    <Stack direction="row" sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart colors={['#ffffff']} data={chartData} showTooltip height={100} />
      </Box>

    </Stack>
  );
};

export default TemperatureChart;
