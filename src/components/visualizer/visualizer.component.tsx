import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { styles } from './visualizer.styles';

interface VisualizerProps {
  data: number[];
  highlightIndices?: number[];
}

const Visualizer: React.FC<VisualizerProps> = ({ data, highlightIndices = [] }) => {
  // Calculate dimensions
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const valueRange = maxValue - minValue;
  
  // Chart dimensions
  const chartWidth = 300;
  const chartHeight = 200;
  const barWidth = chartWidth / data.length - 4; // 4px spacing between bars
  const padding = 20;
  
  // Normalize values to fit within chart height
  const normalizeValue = (value: number) => {
    if (valueRange === 0) return chartHeight / 2; // Handle case where all values are the same
    return ((value - minValue) / valueRange) * (chartHeight - 40) + 20; // 20px padding from bottom
  };

  const getBarColor = (index: number) => {
    return highlightIndices.includes(index) ? '#FF6B6B' : '#4ECDC4';
  };

  const getBarHeight = (value: number) => {
    return normalizeValue(value);
  };

  const getBarY = (value: number) => {
    return chartHeight - normalizeValue(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Array Visualizer</Text>
      
      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight} style={styles.chart}>
          {/* Render bars */}
          {data.map((value, index) => (
            <Rect
              key={index}
              x={index * (barWidth + 4) + 2}
              y={getBarY(value)}
              width={barWidth}
              height={getBarHeight(value)}
              fill={getBarColor(index)}
              stroke="#FFFFFF"
              strokeWidth="1"
              rx="2"
            />
          ))}
          
          {/* Render value labels */}
          {data.map((value, index) => (
            <SvgText
              key={`label-${index}`}
              x={index * (barWidth + 4) + 2 + barWidth / 2}
              y={chartHeight - 5}
              fontSize="10"
              fill="#666"
              textAnchor="middle"
            >
              {value}
            </SvgText>
          ))}
          
          {/* Render index labels */}
          {data.map((_, index) => (
            <SvgText
              key={`index-${index}`}
              x={index * (barWidth + 4) + 2 + barWidth / 2}
              y={chartHeight + 15}
              fontSize="10"
              fill="#666"
              textAnchor="middle"
            >
              {index}
            </SvgText>
          ))}
        </Svg>
      </View>
      
      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#4ECDC4' }]} />
          <Text style={styles.legendText}>Normal</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#FF6B6B' }]} />
          <Text style={styles.legendText}>Highlighted</Text>
        </View>
      </View>
      
      {/* Data summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Array: [{data.join(', ')}]
        </Text>
        <Text style={styles.summaryText}>
          Length: {data.length} | Max: {maxValue} | Min: {minValue}
        </Text>
        {highlightIndices.length > 0 && (
          <Text style={styles.summaryText}>
            Highlighted indices: [{highlightIndices.join(', ')}]
          </Text>
        )}
      </View>
    </View>
  );
};

export default Visualizer;
