import {config} from './config/gluestack-ui.config';
import { GluestackUIProvider, Spinner, Text, VStack } from '@gluestack-ui/themed';
import { ScreensRouter } from './components/screens/ScreensRouter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo, useState } from 'react';
import { preparePages } from './domain/helpers/pages.helper';
import * as playfairExpoFont from '@expo-google-fonts/playfair-display';
import useAsyncSetting from './domain/hooks/setting.hook';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function App() {

  const {
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_800ExtraBold,
    PlayfairDisplay_900Black
  } = playfairExpoFont;
 
  let [playfairLoaded] = playfairExpoFont.useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_800ExtraBold,
    PlayfairDisplay_900Black
  });   

  const [appIsReady, setAppIsReady] = useState( false );
  const [ tloTheme ] = useAsyncSetting( 'theme' );
  const color = useMemo(() => (
    tloTheme === 'dark' 
      ? '$textLight0'
      : '$textDark950'
  ), [ tloTheme ]);
  const bgColor = useMemo(() => (
    tloTheme === 'dark' 
    ? '$backgroundDark900'
    : '$backgroundLight0'
  ), [ tloTheme ])

  useEffect(() => {
    async function prepare() {
      try {
        // await AsyncStorage.clear();

        await preparePages( 'rugaciuni', 2 );
        await preparePages( 'slujbe', 3 );
        await new Promise(resolve => setTimeout(resolve, 2));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    SplashScreen.hideAsync();
    prepare();
  }, []);  

  if (!appIsReady || !playfairLoaded) {
    return (
      <GluestackUIProvider config={config}>
        <VStack
          height="$full"
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          space="4xl"
          backgroundColor={bgColor}
        >
          <Text
            color={color}          
            fontWeight="bold"
            fontSize="$2xl"
            lineHeight="$3xl"
            allowFontScaling={false}
          >Texte Liturgice Ortodoxe</Text>
          <Spinner 
            size={40}
            color="$primary600" 
          />
          <Text 
            color={color}
            fontSize="$xl"
            lineHeight="$2xl"
            allowFontScaling={false}
          >Se încarcă textele ...</Text>
        </VStack>
      </GluestackUIProvider>
    )
  }

  return (
    <GluestackUIProvider config={config}>
      <ScreensRouter />
    </GluestackUIProvider>
  )
}

export default App;