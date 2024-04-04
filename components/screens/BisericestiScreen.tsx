import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonView } from '../common/CommonView';
import { VStack, Text, ScrollView } from '@gluestack-ui/themed';
import { CommonHeader } from '../common/CommonHeader';
import { useEffect, useMemo, useState } from 'react';
import { getPageChildren } from '../../domain/helpers/pages.helper';
import { CommonListSection } from '../common/CommonListSection';
import useAsyncSetting from '../../domain/hooks/setting.hook';
import { useWindowDimensions } from 'react-native';

export const BisericestiScreen = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
  const { height } = useWindowDimensions();
  const [data, setData] = useState([]);
  const [ theme, setTheme ] = useAsyncSetting( 'theme' );
  const creditsColor = useMemo(() => (
    theme === 'dark'
      ? '#ff9124'
      : '#e20000'
  ), [ theme ])

  useEffect(() => {
    const prepare  = async() => {
      const struct  = await getPageChildren( 'slujbe', 0 );
      setData(struct);
    }

    prepare();
  }, []);

  if (!data) {
    return (
      <CommonView>
        <CommonHeader title='Rugăciuni bisericești' navigation={navigation} backLink="home" />
      </CommonView> 
    )
  }

  return (
    <CommonView>
      <StatusBar style="auto" />
      
      <CommonHeader title='Rugăciuni bisericești' navigation={navigation} backLink="home" />

      <ScrollView
        width="$full"
        height={height - 75}
      >

        <VStack
          mt={0}
          space="4xl"
          >
          <Text 
            allowFontScaling={false} 
            lineHeight={18} 
            fontSize={12} 
            fontFamily="PlayfairDisplay_400Regular" 
            textAlign="center" 
            color={creditsColor}
          >
            editate de către episcopul Petru Pruteanu
          </Text>
          {data.map(item => (
            <CommonListSection item={item} navigation={navigation} key={item.id} />
            ))}
        </VStack>

      </ScrollView>
    </CommonView>
  );}