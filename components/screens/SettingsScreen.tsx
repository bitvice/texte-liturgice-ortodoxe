import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonHeader } from '../common/CommonHeader';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { isEmpty, isNil } from "lodash";
import { HStack, Select, Spinner, Switch, View, useColorMode } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { Card } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import useAsyncSetting from '../../domain/hooks/setting.hook';
import { CommonView } from '../common/CommonView';
import { CommonAttributeSlider } from '../common/CommonAttributeSider';

const themeOptions: Record<string, string> = {
  dark: "Inchis",
  light: "Deschis",
  old: 'Vechi'
};

export const SettingsScreen = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
  const [ tloTheme, setTloTheme ] = useAsyncSetting( 'theme' );
  const [ fontSize, setFontSize ] = useAsyncSetting( 'fontSize' );

  const cardBg = useMemo(() => (
    tloTheme === 'dark' 
    ? '$backgroundDark900'
    : '$backgroundLight0'
  ), [ tloTheme ])  
  const color = useMemo(() => (
    tloTheme === 'dark' 
      ? '$primary200'
      : '$primary800'
  ), [tloTheme]);

  return (
    <CommonView>
      <CommonHeader title='Setări' navigation={navigation} />

      <Card
        backgroundColor={cardBg}
        borderRadius={20}
        m={10}
        p={20}
      >
      <Box mb={40}>
        <HStack 
          alignItems="center" 
          justifyContent="space-between"
        >
          <Text 
            color={color}
            fontFamily="Besley_400Normal"
          >
            Tema de culoare
          </Text>

          <HStack 
            alignItems="center" 
            justifyContent="flex-end"
            space="md"
          >
            <Text 
              color={color}
              fontFamily="Besley_400Normal"
            >
              Deschis
            </Text>

            <Switch 
              size="md"
              value={tloTheme === 'dark'}
              onToggle={() => {
                setTloTheme(tloTheme === 'light' ? 'dark' : 'light');
              }}
            />

            <Text 
              color={color}
              fontFamily="Besley_400Normal"
            >
              Închis
            </Text>            
          </HStack>

        </HStack>
      </Box>
      <Box>
        <HStack 
          alignItems="center" 
          justifyContent="space-between"
        >
          <Text 
            color={color}
            fontFamily="Besley_400Normal"
          >
            Mărimea fontului
          </Text>

          <HStack 
            alignItems="center" 
            justifyContent="flex-end"
            space="md"
          >
            <Text 
              color={color}
              fontFamily="Besley_400Normal"
            >
              mic
            </Text>

            <Switch 
              size="md"
              value={fontSize === '2'}
              onToggle={() => {
                setFontSize(fontSize === '1' ? '2' : '1');
              }}
            />

            <Text 
              color={color}
              fontFamily="Besley_400Normal"
            >
              mare
            </Text>            
          </HStack>

        </HStack>

        {/* <CommonAttributeSlider 
          value={parseInt(fontSize)}
          min={10}
          max={20}
          step={2}
          label="Mărimea fontului"
          unit="pixeli"
          onChange={(newFontSize) => {
            console.log('update font size',newFontSize);
            setFontSize(newFontSize.toString());
          }}
        />
        {fontSize} */}
      </Box>
      </Card>
      <StatusBar style="auto" />
    </CommonView>      
  );
}