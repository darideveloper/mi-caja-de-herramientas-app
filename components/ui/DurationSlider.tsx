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
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 20, color: '#101010', fontWeight: 'bold', marginBottom: 4 }}>
          Duración
        </Text>
        <Text style={{ fontSize: 16, color: '#9b82aa', fontWeight: '600' }}>
          {value ? `${value} minutos` : 'Selecciona una duración'}
        </Text>
      </View>
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginHorizontal: 16,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#101010',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      }}>
        {durations.map((d) => (
          <TouchableOpacity
            key={d}
            onPress={() => onChange(value === d ? null : d)}
            style={{ 
              alignItems: 'center', 
              flex: 1,
              paddingVertical: 8,
            }}
            activeOpacity={0.7}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: value === d ? '#f5e673' : '#ffffff',
                borderWidth: 2,
                borderColor: value === d ? '#9b82aa' : '#3a2546',
                marginBottom: 8,
                alignSelf: 'center',
                shadowColor: value === d ? '#9b82aa' : 'transparent',
                shadowOpacity: value === d ? 0.3 : 0,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
                elevation: value === d ? 2 : 0,
              }}
            />
            <Text style={{ 
              color: value === d ? '#9b82aa' : '#3a2546', 
              fontWeight: value === d ? 'bold' : '600', 
              fontSize: 13,
              textAlign: 'center'
            }}>
              {d} min
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
} 