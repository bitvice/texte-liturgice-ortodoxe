import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { isNil } from "lodash";
import { useCallback, useEffect, useState } from "react";

const SETTINGS_KEY = "@tloSettings";
  const DEFAULT_SETTINGS = {
    theme: {
      id: 'theme',
      type: 'select',
      title: 'Theme',
      description: 'Theme used in content rendering',
      value: 'dark',
      options: {
        dark: "Inchis",
        light: "Deschis",
        old: 'Vechi'
      },
      onToggle: (x) => {
        // setColorMode(x);
      }
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

      if (isNil(rawSetting)) {
        return DEFAULT_SETTINGS[key].value;
      }

      const setting: any = JSON.parse( rawSetting );
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
