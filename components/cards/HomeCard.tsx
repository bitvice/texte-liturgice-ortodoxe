import { FC, useEffect, useState } from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { IHomeCardData } from "domain/types";
import { isNil } from "lodash";
import { Box, ImageBackground, Pressable, VStack, useColorMode } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { useWindowDimensions } from "react-native";

interface IHomeCardProps {
  data: IHomeCardData;
  navigation: StackNavigationProp<any>;
  bg: any;
}

export const HomeCard: FC<IHomeCardProps> = ({
  data,
  navigation,
  bg
}) => {
  const { width, height } = useWindowDimensions();
  const colorMode = useColorMode();
  const [ netStatus, setNetStatus] = useState<any>( false);
  
  return (
    <Box 
      style={{
        flex: width > height ? 1 : 1/3,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        width: '100%',
        borderRadius: 16
      }} >
            <Pressable 
              style={{
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                borderRadius: 16,
              }}
              onPress={() => {
              navigation.navigate( data.screen , data)  
            }}>
            <ImageBackground 
              id='RP' 
              source={bg} 
              style={{
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                borderRadius: 16,
              }} 
              imageStyle={{ borderRadius: 16}}
            >
              <VStack alignItems="center" justifyContent="flex-end"
                style={{
                  height: '100%',
                }}
              >
                <Text 
                  color="$white" 
                  lineHeight={18}
                  fontSize={16} 
                  // opacity={.7}
                  fontFamily="Besley_900Black" 
                  textAlign="center"
                  textShadowOffset={{
                    width: 1,
                    height: 1
                  }}
                  textShadowRadius={2}
                  textShadowColor="#000000"
                  mb="$2"
                  allowFontScaling={false}
                  >
                    Pentru {data.title}
                </Text>            
              </VStack>
            </ImageBackground>            
        </Pressable> 
          </Box>
  )
}