import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface DurationSliderProps {
  durations: number[];
  value: number | null;
  onChange: (val: number | null) => void;
}

export default function DurationSlider({ durations, value, onChange }: DurationSliderProps) {
  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 18, color: '#7C3AED', fontWeight: 'bold' }}>
          {value ? `${value} min` : 'Selecciona duración'}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 8 }}>
        {durations.map((d) => (
          <TouchableOpacity
            key={d}
            onPress={() => onChange(value === d ? null : d)}
            style={{ alignItems: 'center', flex: 1 }}
            activeOpacity={0.7}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: value === d ? '#7C3AED' : '#E0E0E0',
                borderWidth: value === d ? 3 : 1,
                borderColor: value === d ? '#7C3AED' : '#BDBDBD',
                marginBottom: 4,
                alignSelf: 'center',
              }}
            />
            <Text style={{ color: value === d ? '#7C3AED' : '#888', fontWeight: value === d ? 'bold' : 'normal', fontSize: 12 }}>{d} min</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
} 