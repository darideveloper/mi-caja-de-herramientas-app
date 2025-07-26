import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  PanResponder,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import Text from '../ui/Text';
import Btn from '../ui/Btn';
import { fetchData } from '../../lib/api';
import Dropdown from '../ui/Dropdown';
import DurationSlider from '../ui/DurationSlider';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters?: (filters: {
    groupId?: number;
    categoryIds: number[];
    duration?: number;
  }) => void;
}

interface Group {
  id: number;
  name: string;
  icon: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
}

const durations = [3, 5, 10, 15, 20];

export default function FilterModal({ isVisible, onClose, onApplyFilters }: FilterModalProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const sliderWidth = Dimensions.get('window').width - 96; // padding and modal margins
  const [thumbX] = useState(new Animated.Value(0));
  const thumbValueRef = useRef(0);

  // Calculate position for each duration
  const getPositionForValue = (value: number) => {
    const idx = durations.indexOf(value);
    if (idx === -1) return 0;
    return (sliderWidth / (durations.length - 1)) * idx;
  };

  // Move thumb when selectedDuration changes
  useEffect(() => {
    if (selectedDuration !== null) {
      const toValue = getPositionForValue(selectedDuration);
      thumbValueRef.current = toValue;
      Animated.timing(thumbX, {
        toValue,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedDuration]);

  // PanResponder for dragging
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      thumbX.setOffset(thumbValueRef.current);
    },
    onPanResponderMove: (evt, gestureState) => {
      let newX = gestureState.dx + thumbValueRef.current;
      newX = Math.max(0, Math.min(newX, sliderWidth));
      thumbX.setValue(newX);
    },
    onPanResponderRelease: (evt, gestureState) => {
      thumbX.flattenOffset();
      thumbX.stopAnimation((newX) => {
        thumbValueRef.current = newX;
        // Snap to nearest duration
        let closestIdx = 0;
        let minDist = Infinity;
        durations.forEach((d, idx) => {
          const pos = getPositionForValue(d);
          const dist = Math.abs(pos - newX);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = idx;
          }
        });
        setSelectedDuration(durations[closestIdx]);
        Animated.timing(thumbX, {
          toValue: getPositionForValue(durations[closestIdx]),
          duration: 150,
          useNativeDriver: false,
        }).start();
      });
    },
  });

  // Fetch groups (moods)
  useEffect(() => {
    setGroupsLoading(true);
    fetchData('groups')
      .then((data: any) => {
        setGroups(data);
        setSelectedGroup(data[0] || null);
        setGroupsLoading(false);
      })
      .catch((err) => {
        setGroupsError('Error can not load groups');
        setGroupsLoading(false);
      });
  }, []);

  // Fetch categories
  useEffect(() => {
    setCategoriesLoading(true);
    fetchData('categories')
      .then((data: any) => {
        setCategories(data);
        setCategoriesLoading(false);
      })
      .catch((err) => {
        setCategoriesError('Error can not load categories');
        setCategoriesLoading(false);
      });
  }, []);

  const toggleCategory = (catId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };

  const handleApplyFilters = () => {
    const filters = {
      groupId: selectedGroup?.id,
      categoryIds: selectedCategories,
      duration: selectedDuration || undefined,
    };

    if (onApplyFilters) {
      onApplyFilters(filters);
    }

    onClose();
  };

  return (
    <View
      className={`absolute bottom-0 left-0 right-0 flex justify-end bg-black/50 h-full pb-16 z-50 ${isVisible ? 'block' : 'hidden'}`}>
      <View className={`h-full w-full rounded-t-3xl bg-white p-8`} style={{ maxHeight: '70%' }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 24, width: '100%', alignSelf: 'center' }}
          showsVerticalScrollIndicator={false}>
          <View className={`mb-8 flex-row items-center justify-between`}>
            <Text className={`text-2xl font-bold text-purpleDark`}>Filtros</Text>
            <Btn
              iconSource={require('../../assets/icons/close.png')}
              onPress={onClose}
              className={`!h-10 !w-10 !bg-transparent !p-0`}
              classNameIcon={`w-6 h-6`}
            />
          </View>

          {/* Dropdown for mood (from API) */}
          <View className="mb-6 w-full">
            <Text className="mb-2 text-base font-semibold text-black">Estados de ánimo</Text>
            <Dropdown
              options={groups}
              selected={selectedGroup}
              onSelect={(option) => setSelectedGroup(option)}
              placeholder="Selecciona un estado"
              loading={groupsLoading}
              error={groupsError}
            />
          </View>

          {/* Categories from API */}
          <View className="mb-6 flex w-full">
            <Text className="mb-2 text-base font-semibold text-black">Categorías</Text>
            {categoriesLoading ? (
              <ActivityIndicator size="small" color="#888" />
            ) : categoriesError ? (
              <Text className="text-red-500">{categoriesError}</Text>
            ) : (
              <View className="w-full flex-row flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => toggleCategory(cat.id)}
                    className={`flex-row items-center rounded-full border px-4 py-2 ${selectedCategories.includes(cat.id) ? 'border-purple bg-purple/10' : 'border-purple/30 bg-white'}`}
                    style={{ marginBottom: 8 }}>
                    <Image
                      source={{ uri: cat.icon }}
                      style={{ width: 22, height: 22, marginRight: 8, borderRadius: 11 }}
                    />
                    <Text
                      className={`text-base ${selectedCategories.includes(cat.id) ? 'text-purple' : 'text-black'}`}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Duration Slider */}
          <DurationSlider
            durations={durations}
            value={selectedDuration}
            onChange={setSelectedDuration}
          />
        </ScrollView>
        <View className={`flex-row justify-between gap-4`} style={{ marginTop: 16 }}>
          <Btn onPress={onClose} className={`flex-1 border-2 border-purple !bg-transparent`}>
            <Text className={`text-lg text-purple`}>Cancelar</Text>
          </Btn>

          <Btn
            onPress={handleApplyFilters}
            className={`flex-1 border-2 border-blue !bg-transparent`}>
            <Text className={`text-lg font-bold text-blue`}>Aplicar</Text>
          </Btn>
        </View>
      </View>
    </View>
  );
}
