import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { isNil } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Appearance } from "react-native";

const SETTINGS_KEY = "@tloSettings";
  const DEFAULT_SETTINGS = {
    theme: {
      id: 'theme',
      type: 'select',
      title: 'Theme',
      description: 'Theme used in content rendering',
      value: Appearance.getColorScheme(),
      options: {
        dark: "Inchis",
        light: "Deschis",
        old: 'Vechi'
      },
      onToggle: (x) => {
        // setColorMode(x);
      }
    },
    fontSize: {
      id: 'fontSize',
      type: 'select',
      title: 'Theme',
      description: 'Theme used in content rendering',
      value: '2'
    },
    fontStyle: {
      id: 'fontStyle',
      type: 'select',
      title: 'Style',
      description: 'Text style used in content rendering',
      value: 'serif'
    }
  };

const useAsyncSetting = ( key: string ) => {
  const [data, setData] = useState( DEFAULT_SETTINGS[ key ]?.value );
  const asyncSetting = useAsyncStorage(`${SETTINGS_KEY}.${key}`);

  const setSetting = useCallback(async( newValue ) => {
    await asyncSetting.setItem( JSON.stringify({
      value: newValue
    }));

    setData( newValue );
  }, [ data ]);
  
  useEffect(() => {
    const prepare = async() => {
      const rawSetting = await asyncSetting.getItem();

      // console.log('00-----', `${SETTINGS_KEY}.${key}`, rawSetting);

      if (isNil(rawSetting)) {
        return DEFAULT_SETTINGS[key].value;
      }

      const setting: any = JSON.parse( rawSetting );

      if (!setting) {
        return DEFAULT_SETTINGS[key].value;
      }

      setData( setting.value );
    }
    prepare();
  }, [asyncSetting]);

  // const setAsyncData = async () => {
  //   try {
  //     await useAsyncStorage.setItem(key, JSON.stringify(value))
  //     setData(value)
  //   } catch (error) {
  //     console.error('useAsyncStorage setItem error:', error)
  //   }
  // }

  return [ data, setSetting ];
}

export default useAsyncSetting;
