import {config} from './config/gluestack-ui.config';
import { Card, GluestackUIProvider, Heading, Spinner, Text, VStack } from '@gluestack-ui/themed';
import { ScreensRouter } from './components/screens/ScreensRouter';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { preparePages } from './domain/helpers/pages.helper';
import asyncStorage from '@react-native-async-storage/async-storage';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // await asyncStorage.clear();

        console.log('[App] prepare rugaciuni ... ');
        await preparePages( 'rugaciuni', 2 );
        console.log('[App] prepare slujbe ... ');
        await preparePages( 'slujbe', 3 );

        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        console.log('prepare resolved');
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);  

  useEffect(() => {
    setAppIsReady(true);
    // if (!appIsReady) {
    //   return;
    // }

    SplashScreen.hideAsync();
  }, [appIsReady])

  if (!appIsReady) {
    return (
      <GluestackUIProvider config={config}>
        <VStack
          height="$full"
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          space="3xl"
          backgroundColor='$primary900'
          >
          <Text
            fontWeight='bold'
            color="$primary200"
          >Texte Liturgice Ortodoxe</Text>
          <Spinner size="large" color="$primary200" />
          <Text color="$primary200">Se actualizează rugăciunile ...</Text>
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