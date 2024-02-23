import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeCard } from '../cards/HomeCard';
import { HStack, useColorMode } from '@gluestack-ui/themed';
import { Text, Box, VStack } from "@gluestack-ui/themed"
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import useAsyncSetting from '../../domain/hooks/setting.hook';
import { useEffect, useMemo } from 'react';
import { CommonHeader } from '../common/CommonHeader';

const imgParticulare = require('../../assets/particulare.jpg');
const imgBisericesti = require('../../assets/bisericesti.webp');

export const HomeScreen = ({ navigation, route }: { navigation: StackNavigationProp<any>, route: any }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = useMemo(() => {
    return width > height;
  }, [width, height])

  const [ tloTheme ] = useAsyncSetting( 'theme' );

  const bgColor = useMemo(() => (
    tloTheme === 'dark' 
      ? '$primary900'
      : tloTheme === 'light'
        ? '$primary200'
        : '$primary50'
  ), [tloTheme, route]);
  const color = useMemo(() => (
    tloTheme === 'dark' 
      ? '$primary200'
      : '$primary800'
  ), [tloTheme, route]);

  useEffect(() => {
console.log('$$$$$$');
  }, [route]);

  return (
    <View id="WrapperContainer" style={styles.container}>
      {!isLandscape && (
      <VStack 
        space="md" 
        reversed={false} 
        style={styles.wrapper} 
        backgroundColor={bgColor}
      >
        <CommonHeader title='' navigation={navigation} hideBack />
        <Box style={styles.homeContainer}>
          <Text color={color} lineHeight={30} fontSize={28} fontFamily="serif" fontWeight="bold">Texte Liturgice Ortodoxe</Text>
          <Text color={color} lineHeight={30} fontSize={16} fontFamily="serif" fontWeight="bold">de la teologie.net</Text>            
        </Box>
        <HomeCard 
          bg={imgParticulare}
          navigation={navigation}
          data = {{
            screen: 'particulare',
            title: 'Pentru mireni'
          }}
        />
        <HomeCard 
          bg={imgBisericesti}
          navigation={navigation}
          data = {{
            screen: 'bisericesti',
            title: 'Pentru preoți'
          }}
        />
      </VStack>
      )}
      {isLandscape && (
        <VStack 
          space="md" 
          style={styles.wrapper} 
          backgroundColor={bgColor}
        >
        <CommonHeader title='' navigation={navigation} hideBack />
        <Box style={styles.homeContainer} mb={20}>
          <Text color={color} lineHeight={30} fontSize={28} fontFamily="serif" fontWeight="bold">Texte Liturgice Ortodoxe</Text>
          <Text color={color} lineHeight={30} fontSize={16} fontFamily="serif" fontWeight="bold">de la teologie.net</Text>            
        </Box>

        <HStack
          space="md" 
          reversed={false} 
          style={styles.wrapper}
        >
          <HomeCard 
            bg={imgParticulare}
            navigation={navigation}
            data = {{
              screen: 'particulare',
              title: 'Pentru mireni'
            }}
            />
          <HomeCard 
            bg={imgBisericesti}
            navigation={navigation}
            data = {{
              screen: 'bisericesti',
              title: 'Pentru preoți'
            }}
            />
          </HStack>
      </VStack>
      )}

      <StatusBar style="auto" />
    </View>      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',    
    height: '100%'
  },
  wrapper: {
    height: '100%',
    width: '100%',
    padding: 16
  },
  image: {
    width: '100%',
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    borderRadius: 16,
  },  
  homeContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    width: '100%',
    borderRadius: 16
  },  
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    gap: 9,
  },  
});