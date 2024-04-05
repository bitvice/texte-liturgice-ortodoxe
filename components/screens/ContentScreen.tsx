import { useEffect, useMemo, useState } from 'react';
import { 
  Platform,
  useWindowDimensions 
} from 'react-native';
import asyncStorage from '@react-native-async-storage/async-storage';

import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { Box, ScrollView, VStack } from '@gluestack-ui/themed';
import { CommonHeader } from '../common/CommonHeader';
import useAsyncSetting from '../../domain/hooks/setting.hook';
import { View } from '@gluestack-ui/themed';
import * as besleyExpoFont from '@expo-google-fonts/besley';
import { HStack } from '@gluestack-ui/themed';
import { Pressable } from '@gluestack-ui/themed';
import { ChevronLeftIcon } from '@gluestack-ui/themed';
import { SunIcon } from '@gluestack-ui/themed';
import { MoonIcon } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';


export const ContentScreen = (props) => {
  const { width, height } = useWindowDimensions();
  const [ html, setHtml ] = useState(`<div style="text-align: center; padding: 4rem 0;">Se incarca ...<br/></div>`);
  const [ theme, setTloTheme ] = useAsyncSetting( 'theme' );  
  const [ fontSize, setFontSize ] = useAsyncSetting( 'fontSize' );  
  const [ fontStyle, setFontStyle ] = useAsyncSetting( 'fontStyle' );  
  const fontUrl = Platform.select({
    ios: "Besley-VariableFont_wght.ttf",
    android: "file:///android_asset/fonts/Besley-VariableFont_wght.ttf",
  });
  const isSerif = Platform.select({
    ios: false,
    android: true
  });
  const RED = useMemo(() => theme === 'dark' ? '#ff9124' : '#e20000', [theme]);
  const fontFamily = useMemo(() => {
    return fontStyle === 'serif' 
      ? isSerif 
        ? 'serif'
        : 'PlayfairDisplay_400Regular'
      : '';
  }, [fontStyle, isSerif]);
  
  const style = useMemo(() => {
    return `<style>
      @font-face {
        font-family: 'Besley'; 
        src: url('${fontUrl}') format('truetype')
      }
      html, body {
        font-size: ${fontSize === '1' 
          ? 12
          : fontSize === '2' 
            ? 14
            : 18}px;
        font-family: ${fontFamily};
        background-color: ${theme === 'dark' ? '#000' : '#f5f5f5'};
        color: ${theme === 'dark' ? '#fff' : '#000'};
      }
      body {
        padding: 0 5px 0 10px;
      }
      s {
        font-size: 200%;
        font-weight: 900;
	      line-height: 1em;
	      margin-right: 0.3rem;
	      padding-bottom: 0.1rem;
	      text-transform: uppercase;
	      float: left;
	      position: relative;
	      top: .4rem;
	      color: ${RED} !important;
        text-decoration-line: none;
      }
      p {
        padding-bottom: 8px;
        text-align: justify;
        line-height: 1.5em;
      }
      b {
        color: ${theme === 'dark' ? '#fff' : '#000'} !important;
      }
      i {
        color: ${RED};
      }
      q {
        color: ${RED};
        quotes: none;
        font-weight: bold;
      }
      h1, h3 {
        text-align: center;
        font-weight: bold;
        color: ${RED};
      }
    </style>`;
  }, [ theme, fontSize, fontFamily]);

  const bgColor = useMemo(() => (
    theme === 'dark' 
      ? '$backgroundDark900'
      : '$backgroundLight50'
  ), [theme]);
  const borderColor = useMemo(() => (
    theme === 'dark' 
      ? '$backgroundDark700'
      : '$backgroundLight200'
  ), [theme]);
  const color = useMemo(() => (
    theme === 'dark' 
    ? '$textLight0'
    : '$textDark950'
  ), [theme]);

  const [ pending, setPending ] = useState( false );

  useEffect(() => {
    const prepare = async () => {
      const contentKey = `page_${props.route.params.pageId}_data`;
      const rawData = await asyncStorage.getItem( contentKey );
      const pageData = JSON.parse( rawData );

      setHtml( pageData?.content || '<h1>Loading ... </h1>' );
    }
    prepare();
  }, [])

  return (
    <View 
      id="WrapperContainer" 
      width="$full"
      height="$full"
      backgroundColor={theme === 'dark' ? '#0B1215' : '#FAF9F6'}
    >
      <VStack
        height={ height }
        marginTop={30}
        marginLeft={0}
        marginBottom={0}
        marginRight={10}
        justifyContent="space-between"
        alignItems="center"
      >
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

        {!pending && (
          <WebView
            flex={1}
          aria-label="conținutul paginii"
          textZoom={100}
          source={{ 
            html: `<!doctype html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, minimum-scale=1.0">            
              ${style}
              </head>
              <body>
                ${html}
              </body>
            </html>`,
            baseUrl: 'content' 
          }}
          style={{
            width,
          }}
          originWhitelist={["*"]}
          />
        )}

      <Box 
        height={50} 
        width={width} 
        backgroundColor={bgColor}
        borderTopWidth={1}
        borderColor={borderColor}
        shadowColor={borderColor}
      >

        <HStack
          pl={0}
          pr={0}
          justifyContent="space-between"
        >
          <Pressable
            aria-label="înapoi"
            onPress={() => {
              const currentRoutes = props.navigation.getState().routes;
              const backRoute = currentRoutes[currentRoutes.length - 2];
              props.navigation.navigate(backRoute.name, {n: Math.random()})
            }}
            width={48}
            height={48}
          >
            <ChevronLeftIcon color={color} size="xl" mt={10} ml={12}  />
          </Pressable>

          <Pressable
            aria-label="mărimea fontului"
            onPress={() => {
              const fs = fontSize === '1' 
                ? '2' 
                : fontSize === '2'
                  ? '3' 
                  : '1';
              setFontSize(fs);
            }}
            height={48}
          >
            <HStack pt={6}>
              <Text fontSize={16} lineHeight={32} color={fontSize === '1' ? RED : color} fontWeight="bold" allowFontScaling={false}>A</Text>
              <Text fontSize={22} lineHeight={32} color={fontSize === '2' ? RED : color} fontWeight="bold" allowFontScaling={false}>A</Text>
              <Text fontSize={28} lineHeight={32} color={fontSize === '3' ? RED : color} fontWeight="bold" allowFontScaling={false}>A</Text>
            </HStack>
          </Pressable>
          
          <Pressable
            aria-label="stil de scris"
            onPress={() => {
              // setPending(true);
              setFontStyle(fontStyle === 'serif' ? 'sans-serif' : 'serif');
              // setTimeout(() => {
              //   setPending(false);
              // }, 1000);
            }}
            width={48}
            height={48}
          >
              <Text 
                allowFontScaling={false}
                fontSize={28} 
                fontWeight="bold"
                fontFamily={fontFamily}
                lineHeight={32} 
                color={color} 
                mt={6} 
                ml={12}
              >S</Text>
          </Pressable>

          <Pressable
            aria-label="tema"
            onPress={() => {
              setTloTheme(theme === 'light' ? 'dark' : 'light');            
            }}
            width={48}
            height={48}
          >
            {theme === 'dark' && <SunIcon color={color} size="xl" mt={12} ml={12} />}
            {theme === 'light' && <MoonIcon color={color} size="xl" mt={12} ml={12} />}
          </Pressable>

        </HStack>

      
      </Box>
      </VStack>
    </View>
  )
}
