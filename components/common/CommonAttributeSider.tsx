import { FC } from 'react';
import { Box, HStack, Text } from '@gluestack-ui/themed';
import Slider from '@react-native-community/slider';

interface ICommonAttributeSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  label: string;
  unit: string;
  onChange: (newAge: number) => void
}

export const CommonAttributeSlider: FC<ICommonAttributeSliderProps> = ({
  value,
  min,
  max,
  step,
  label,
  unit,
  onChange
}) => {
  return (
    <Box w="100%" mt={2}>
      <HStack alignItems="center" justifyContent="space-between" mx={3} >
        <Text>
          {label}
        </Text>
        <Text textAlign="center" fontSize={22}>{value} {unit}</Text>
      </HStack>

      <Box w="94%" mx={3}>
        <Slider
          style={{
            width: '100%', 
            height: 40,
          }}
          lowerLimit={min}
          minimumValue={min}
          maximumValue={max}
          upperLimit={max}
          thumbTintColor="#b70c00"
          minimumTrackTintColor="#b70c00"
          maximumTrackTintColor="#555555"
          value={value}
          step={step}
          onValueChange={(v) => {
            if (!v || isNaN(v)) {
              return;
            }
            onChange(v);
          }}
        />
      </Box>  
    </Box>  
  );
}