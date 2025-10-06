// CustomSlider.js
import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';

const CustomSlider = ({
  label,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
}) => {
  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {value} {unit}
      </Text>
      <Slider
        style={{ width: '90%', height: 40 }}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#cccccc"
        thumbTintColor="#ffffff"
        onValueChange={onValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CustomSlider;
