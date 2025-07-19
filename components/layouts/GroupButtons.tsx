// Hooks
import { useState, useEffect } from 'react';

// Components
import { View } from 'react-native';
import Btn from '../ui/Btn';
import Text from '../ui/Text';
import { ActivityIndicator } from 'react-native';

// Libs
import { fetchData } from '../../lib/api';
import { getGroups, setGroups } from '../../store/groups';
import { useNavigation } from '@react-navigation/native';


// Add interface for group data
interface group {
  id: number;
  name: string;
  icon: string;
}

export default function groupButtons() {

  // States
  const [groupsData, setGroupsData] = useState<group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Navigation
  const navigation = useNavigation<any>();

  useEffect(() => {

    /**
     * Load groups from AsyncStorage or API
     */
    const loadGroups = async () => {
      try {
        // Try to get groups from AsyncStorage
        const storedgroups = await getGroups();
        if (storedgroups && storedgroups.length > 0 && storedgroups != undefined) {

          // Type data
          const typedData = storedgroups as group[];

          // Save data
          console.log('groups loaded from AsyncStorage:', storedgroups);
          setGroupsData(typedData);
          setIsLoading(false);
        } else {
          // Fetch groups from API if not in AsyncStorage
          const data = await fetchData('groups');
          const typedData = data as group[];
          setGroupsData(typedData);
          await setGroups(typedData); // Save groups to AsyncStorage
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading groups:', error);
        setIsLoading(false);
      }
    };

    // Load groups when the component mounts
    loadGroups();
  }, []);

  useEffect(() => {
    console.log('groups data:', groupsData);
  }, [groupsData]);

  return (
    <View
      className={`
        flex
        min-h-72
        w-full
        flex-col
        items-center
        justify-center
        gap-4
        py-8
      `}>
      {(isLoading || !groupsData || groupsData == undefined || groupsData.length === 0) ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        groupsData.map((group) => (
          <Btn 
            key={group.id}
            iconSource={{ uri: group.icon }} 
            onPress={() => {
              navigation.navigate("Results", {
                groupId: group.id,
                title: group.name,
              });
            }}
          >
            <Text
              className={`
                w-11/12
              `}>
              {group.name}
            </Text>
          </Btn>
        ))
      )}
    </View>
  );
}
