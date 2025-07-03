import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Pressable, ActivityIndicator, Text as RNText } from 'react-native';
import Text from './Text';

interface DropdownOption {
  id: number;
  name: string;
  icon: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selected: DropdownOption | null;
  onSelect: (option: DropdownOption) => void;
  placeholder?: string;
  loading?: boolean;
  error?: string | null;
}

export default function Dropdown({
  options = [],
  selected = null,
  onSelect,
  placeholder = 'Selecciona...',
  loading = false,
  error = null,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ marginBottom: 16 }}>
      <TouchableOpacity
        onPress={() => setOpen((o) => !o)}
        style={{
          borderRadius: 999,
          backgroundColor: '#f5e673',
          paddingHorizontal: 12,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#f5e673',
          minWidth: 180,
          maxWidth: 280,
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#3a2546" />
        ) : selected ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Image source={{ uri: selected.icon }} style={{ width: 22, height: 22, marginRight: 8, borderRadius: 11 }} />
            <RNText style={{ fontSize: 16, color: '#101010', flex: 1, fontFamily: 'Quicksand-Regular' }} numberOfLines={1} ellipsizeMode="tail">{selected.name}</RNText>
          </View>
        ) : (
          <RNText style={{ fontSize: 16, color: '#3a2546', flex: 1, fontFamily: 'Quicksand-Regular' }} numberOfLines={1} ellipsizeMode="tail">{placeholder}</RNText>
        )}
        <Text style={{ marginLeft: 8, fontSize: 18 }}>▼</Text>
      </TouchableOpacity>
      {open && !loading && (
        <View style={{ position: 'absolute', zIndex: 10, backgroundColor: '#ffffff', borderRadius: 16, shadowColor: '#101010', shadowOpacity: 0.1, shadowRadius: 8, marginTop: 8, width: 288, borderWidth: 1, borderColor: '#f5e673' }}>
          {options.map((option) => (
            <Pressable
              key={option.id}
              onPress={() => {
                onSelect(option);
                setOpen(false);
              }}
              style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}
            >
              <Image source={{ uri: option.icon }} style={{ width: 22, height: 22, marginRight: 8, borderRadius: 11 }} />
              <RNText style={{ fontSize: 16, color: '#101010', flex: 1, fontFamily: 'Quicksand-Regular' }}>{option.name}</RNText>
            </Pressable>
          ))}
          {error && (
            <Text style={{ color: '#3a2546', padding: 12 }}>{error}</Text>
          )}
        </View>
      )}
    </View>
  );
} 