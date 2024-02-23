import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonHeader } from '../common/CommonHeader';
import { useCallback, useEffect, useMemo, useState } from 'react';
// import type { StorageManager } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { isEmpty, isNil } from "lodash";
import { HStack, Select, Spinner, Switch, View, useColorMode } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { FlatList } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { ChevronDownIcon } from '@gluestack-ui/themed';
import { SelectTrigger } from '@gluestack-ui/themed';
import { SelectInput } from '@gluestack-ui/themed';
import { SelectIcon } from '@gluestack-ui/themed';
import { Icon } from '@gluestack-ui/themed';
import { SelectPortal } from '@gluestack-ui/themed';
import { SelectBackdrop } from '@gluestack-ui/themed';
import { SelectContent } from '@gluestack-ui/themed';
import { SelectDragIndicatorWrapper } from '@gluestack-ui/themed';
import { SelectDragIndicator } from '@gluestack-ui/themed';
import { SelectItem } from '@gluestack-ui/themed';
import useAsyncSetting from '../../domain/hooks/setting.hook';
import { CommonView } from '../common/CommonView';

const themeOptions: Record<string, string> = {
  dark: "Inchis",
  light: "Deschis",
  old: 'Vechi'
};

export const SettingsScreen = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
  const [ tloTheme, setTloTheme ] = useAsyncSetting( 'theme' );

  const color = useMemo(() => (
    tloTheme === 'dark' 
      ? '$primary200'
      : '$primary800'
  ), [tloTheme]);

  return (
    <CommonView>
      <CommonHeader title='Setări' navigation={navigation} />

      <Box mx={10} my={2}>
        <HStack alignItems="center" justifyContent="space-between">
          <Text color={color}>
            Tema de culoare
          </Text>

          <Select
            defaultValue={tloTheme}
            selectedValue={tloTheme} 
            onValueChange={(newValue) => setTloTheme(newValue)}
            borderColor='$primary700'
            width={160}
          >
            <SelectTrigger variant="outline" size="sm">
              <SelectInput 
                value={themeOptions[tloTheme]} 
                placeholder="Tema"
                color={
                  tloTheme === 'dark'
                    ? '$primary200'
                    : '$primary800'
                }
              />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} color={color} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {Object.keys(themeOptions).map(key => (
                  <SelectItem key={key} label={themeOptions[key]} value={key} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </HStack>
      </Box>

      <StatusBar style="auto" />
    </CommonView>      
  );
}