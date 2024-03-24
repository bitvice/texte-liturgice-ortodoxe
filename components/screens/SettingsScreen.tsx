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
  const [ fontStyle, setFontStyle ] = useAsyncSetting( 'fontStyle' );

  const cardBg = useMemo(() => (
    tloTheme === 'dark' 
    ? '$backgroundDark900'
    : '$backgroundLight0'
  ), [ tloTheme ])  
  const color = useMemo(() => (
    tloTheme === 'dark' 
      ? '$backgroundDark100'
      : '$backgroundLight800'
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
            allowFontScaling={false}
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
              allowFontScaling={false}
            >
              deschis
            </Text>

            <Switch
              size="lg"
              value={tloTheme === 'dark'}
              onToggle={() => {
                setTloTheme(tloTheme === 'light' ? 'dark' : 'light');
              }}
            />

            <Text 
              color={color}
              fontFamily="Besley_400Normal"
              allowFontScaling={false}
            >
              închis
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
            allowFontScaling={false}
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
              allowFontScaling={false}
            >
              mic
            </Text>

            <Switch 
              size="lg"
              value={fontSize === '2'}
              onToggle={() => {
                setFontSize(fontSize === '1' ? '2' : '1');
              }}
            />

            <Text 
              color={color}
              fontFamily="Besley_400Normal"
              allowFontScaling={false}
            >
              mare
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
            allowFontScaling={false}
          >
            Font rugaciuni
          </Text>

          <HStack 
            alignItems="center" 
            justifyContent="flex-end"
            space="md"
          >
            <Text 
              color={color}
              fontFamily="Besley_400Normal"
              allowFontScaling={false}
            >
              serif
            </Text>

            <Switch
              size="lg"
              value={fontStyle === '2'}
              onToggle={() => {
                setFontSize(fontStyle === 'serif' ? 'sans-serif' : 'serif');
              }}
            />

            <Text 
              color={color}
              fontFamily="Besley_400Normal"
              allowFontScaling={false}
            >
              sans-serif
            </Text>            
          </HStack>

        </HStack>

      </Box>
      </Card>
      <StatusBar style="auto" />
    </CommonView>      
  );
}