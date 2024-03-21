import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeCard } from '../cards/HomeCard';
import { Avatar, HStack, useColorMode } from '@gluestack-ui/themed';
import { Text, Box, VStack } from "@gluestack-ui/themed"
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import useAsyncSetting from '../../domain/hooks/setting.hook';
import { useEffect, useMemo } from 'react';
import { CommonHeader } from '../common/CommonHeader';
import { AvatarImage } from '@gluestack-ui/themed';
import { Pressable } from '@gluestack-ui/themed';

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
      ? '$backgroundDark950'
      : '$backgroundLight100'
  ), [tloTheme, route]);
  const cardBgColor = useMemo(() => (
    tloTheme === 'dark' 
      ? '$backgroundDark900'
      : '$backgroundLight0'
  ), [tloTheme, route]);
  const color = useMemo(() => (
    tloTheme === 'dark' 
    ? '$textLight0'
    : '$textDark950'
  ), [tloTheme, route]);

  const renderTitleBox = () => (
    <Box style={styles.homeContainer} mb={20}>
      <Text 
        color={color} 
        lineHeight={30} 
        fontSize={18}
        fontFamily="Besley_900Black"
      >Texte Liturgice Ortodoxe</Text>
      <Text color={color} lineHeight={30} fontSize={18} fontFamily="Besley_400Regular" mb="$6">de la Teologie.net</Text>            
      <Text color={color} lineHeight={22} fontSize={18} fontFamily="Besley_400Regular">Cu grija şi binecuvântarea </Text>            
      <Text color={color} lineHeight={22} fontSize={18}  fontFamily="Besley_700Bold">episcopului Petru Pruteanu</Text>            
    </Box>
  )

  return (
    <View id="WrapperContainer" style={styles.container}>
      {!isLandscape && (
        <VStack 
          space="4xl" 
          reversed={false} 
          style={styles.wrapper} 
          backgroundColor={bgColor}
        >
          {/* <CommonHeader title='' navigation={navigation} hideBack /> */}
          {renderTitleBox()}

          {/* <Box
            backgroundColor={cardBgColor}
            borderRadius={16}
            p={20}
          >
            <Pressable 
              style={{
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                borderRadius: 16,
              }}
              onPress={() => {
                navigation.navigate( 'particulare' , { screen: 'particulare' })  
              }}
            >
            <HStack
              justifyContent="space-between"
              alignItems="center"
            >
              <VStack space="sm">
                <Text 
                  color="$white" 
                  lineHeight={20} 
                  fontSize={20} 
                  opacity={.7}
                  fontFamily="Besley_900Black" 
                  textAlign="left"
                  textShadowOffset={{
                    width: 1,
                    height: 1
                  }}
                  textShadowRadius={2}
                  textShadowColor="#000000"
                  >
                  Pentru mireni
                </Text>
                <Text 
                  color="$white" 
                  lineHeight={20} 
                  fontSize={16} 
                  opacity={.7}
                  fontFamily="Besley_400Regular" 
                  textAlign="left"
                  textShadowOffset={{
                    width: 1,
                    height: 1
                  }}
                  textShadowRadius={2}
                  textShadowColor="#000000"
                  >
                  Rugăciuni particulare
                </Text>              
              </VStack>
              <Avatar bgColor="$primary600" size="2xl" borderRadius="$full">
                <AvatarImage source={{ uri: imgParticulare }} alt="particulare" />
              </Avatar>
            </HStack>
            </Pressable>            
          </Box>

          <Box
            backgroundColor={cardBgColor}
            borderRadius={16}
            p={20}
            onMagicTap={() => {
              navigation.navigate( 'bisericesti' , { screen: 'bisericesti' })
            }}
          >
            <Pressable 
              style={{
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                borderRadius: 16,
              }}
              onPress={() => {
              navigation.navigate( 'bisericesti' , { screen: 'bisericesti' })  
            }}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
            >
              <Avatar bgColor="$primary600" size="2xl" borderRadius="$full">
                <AvatarImage source={{ uri: imgBisericesti }} alt="bisericesti" />
              </Avatar>
              <VStack space="sm">
                <Text 
                color="$white" 
                lineHeight={30} 
                fontSize={20} 
                opacity={.7}
                fontFamily="Besley_900Black" 
                textAlign="right"
                textShadowOffset={{
                  width: 1,
                  height: 1
                }}
                textShadowRadius={2}
                textShadowColor="#000000"
                >
                Pentru preoți
              </Text>
              <Text 
                  color="$white" 
                  lineHeight={20} 
                  fontSize={16} 
                  opacity={.7}
                  fontFamily="Besley_400Regular" 
                  textAlign="right"
                  textShadowOffset={{
                    width: 1,
                    height: 1
                  }}
                  textShadowRadius={2}
                  textShadowColor="#000000"
                  >
                  Rugăciuni bisericești
                </Text>              
              </VStack>
              </HStack>
            </Pressable>
          </Box> */}

          <HomeCard 
            bg={imgParticulare}
            navigation={navigation}
            data = {{
              screen: 'particulare',
              title: 'credincioșii laici'
            }}
          />
          <HomeCard 
            bg={imgBisericesti}
            navigation={navigation}
            data = {{
              screen: 'bisericesti',
              title: 'clerici și strană'
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
        {renderTitleBox()}
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
              title: 'credincioșii laici'
            }}
            />
          <HomeCard 
            bg={imgBisericesti}
            navigation={navigation}
            data = {{
              screen: 'bisericesti',
              title: 'clerici și strană'
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