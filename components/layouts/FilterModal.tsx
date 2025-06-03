import React from 'react';
import { View, Modal, Pressable } from 'react-native';
import Text from '../ui/Text';
import Btn from '../ui/Btn';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function FilterModal({ isVisible, onClose }: FilterModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View 
        className={`
          flex-1
          justify-end
          bg-black/50
        `}
      >
        <View 
          className={`
            bg-white
            rounded-t-3xl
            p-8
            h-3/4
          `}
        >
          <View 
            className={`
              flex-row
              justify-between
              items-center
              mb-8
            `}
          >
            <Text
              className={`
                text-2xl
                font-bold
                text-purpleDark
              `}
            >
              Filtros
            </Text>
            <Btn
              iconSource={require('../../assets/icons/close.png')}
              onPress={onClose}
              className={`
                !h-10
                !w-10
                !bg-transparent
                !p-0
              `}
              classNameIcon={`
                w-6
                h-6
              `}
            />
          </View>

          {/* Filter content goes here */}
          <View>
            {/* Add your filter options here */}
          </View>

          <View 
            className={`
              mt-auto
              flex-row
              justify-between
              gap-4
            `}
          >
            <Btn
              onPress={onClose}
              className={`
                flex-1
                !bg-transparent
                border-2
                border-purple
              `}
            >
              <Text
                className={`
                  text-purple
                  text-lg
                `}
              >
                Cancelar
              </Text>
            </Btn>
            <Btn
              onPress={() => {
                // Apply filters
                onClose();
              }}
              className={`
                flex-1
              `}
            >
              <Text
                className={`
                  text-white
                  text-lg
                `}
              >
                Aplicar
              </Text>
            </Btn>
          </View>
        </View>
      </View>
    </Modal>
  );
} 