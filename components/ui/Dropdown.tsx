import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Pressable, ActivityIndicator } from 'react-native';
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
          backgroundColor: '#FEF9E7',
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#F7DC6F',
          minWidth: 180,
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#888" />
        ) : selected ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: selected.icon }} style={{ width: 22, height: 22, marginRight: 8, borderRadius: 11 }} />
            <Text style={{ fontSize: 16, color: '#222' }}>{selected.name}</Text>
          </View>
        ) : (
          <Text style={{ fontSize: 16, color: '#888' }}>{placeholder}</Text>
        )}
        <Text style={{ marginLeft: 8, fontSize: 18 }}>▼</Text>
      </TouchableOpacity>
      {open && !loading && (
        <View style={{ position: 'absolute', zIndex: 10, backgroundColor: '#fff', borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, marginTop: 8, width: 288, borderWidth: 1, borderColor: '#eee', maxHeight: 256 }}>
          {options.map((option) => (
            <Pressable
              key={option.id}
              onPress={() => {
                onSelect(option);
                setOpen(false);
              }}
              style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}
            >
              <Image source={{ uri: option.icon }} style={{ width: 22, height: 22, marginRight: 8, borderRadius: 11 }} />
              <Text style={{ fontSize: 16, color: '#222' }}>{option.name}</Text>
            </Pressable>
          ))}
          {error && (
            <Text style={{ color: 'red', padding: 12 }}>{error}</Text>
          )}
        </View>
      )}
    </View>
  );
} 