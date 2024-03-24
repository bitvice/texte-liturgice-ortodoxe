import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonView } from '../common/CommonView';
import { VStack } from '@gluestack-ui/themed';
import { CommonHeader } from '../common/CommonHeader';
import { useEffect, useMemo, useState } from 'react';
import { getPageChildren } from '../../domain/helpers/pages.helper';
import { CommonListSection } from '../common/CommonListSection';
import useAsyncSetting from 'domain/hooks/setting.hook';
import { ScrollView } from '@gluestack-ui/themed';
import { useWindowDimensions } from 'react-native';

export const ParticulareScreen = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
  const { height } = useWindowDimensions();
  const [data, setData] = useState([]);
  const [ theme ] = useAsyncSetting( 'theme' );

  useEffect(() => {
    const prepare  = async() => {
      const struct  = await getPageChildren( 'rugaciuni', 0 );
      setData(struct);
    }

    prepare();
  }, []);

  if (!data) {
    return (
      <CommonView>
        <CommonHeader title='Rugăciuni particulare' navigation={navigation} backLink="home" />
      </CommonView> 
    )
  }

  return (
    <CommonView>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <CommonHeader title='Rugăciuni particulare' navigation={navigation} backLink="home" />

      <ScrollView
        width="$full"
        height={height - 75}
      >

        <VStack
          mt="$5"
          space="4xl"
          >
          {data.map(item => (
            <CommonListSection item={item} navigation={navigation} key={item.id} />
            ))}
        </VStack>
      </ScrollView>
    </CommonView>
  );
}