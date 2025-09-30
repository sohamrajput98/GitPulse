import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatLanguageDataForPieChart } from '@/utils/dataFormatter';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart as PieChartIcon } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 text-sm bg-background/80 border rounded-md backdrop-blur-sm shadow-lg">
        <p className="font-bold">{`${payload[0].name}`}</p>
        <p className="text-muted-foreground">{`Usage: ${payload[0].payload.percentage}%`}</p>
      </div>
    );
  }
  return null;
};

/**
 * Displays language usage statistics in an interactive pie chart.
 * @param {object} props
 * @param {object} props.languages - The raw languages object from the GitHub data.
 */
const LanguagePieChart = ({ languages }) => {
  const chartData = formatLanguageDataForPieChart(languages);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <PieChartIcon className="h-6 w-6 mr-2" />
          Language Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--secondary))' }}/>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="hsl(var(--background))"
                >
                  {chartData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">Not enough language data to display chart.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LanguagePieChart;