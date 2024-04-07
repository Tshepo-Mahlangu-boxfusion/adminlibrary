import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Category 1', value: 400 },
  { name: 'Category 2', value: 300 },
  { name: 'Category 3', value: 200 },
  { name: 'Category 4', value: 500 },
  { name: 'Category 5', value: 600 },
];

const PieChartComponent = () => {
  return (
    <PieChart width={200} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data}
        cx={80}
        cy={80}
        outerRadius={50}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  );
};

export default PieChartComponent;
``
