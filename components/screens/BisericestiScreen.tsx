import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonView } from '../common/CommonView';
import { VStack, Text } from '@gluestack-ui/themed';
import { CommonHeader } from '../common/CommonHeader';
import { useEffect, useMemo, useState } from 'react';
import { getPageChildren } from '../../domain/helpers/pages.helper';
import { CommonListSection } from '../common/CommonListSection';
import useAsyncSetting from '../../domain/hooks/setting.hook';

export const BisericestiScreen = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
  const [data, setData] = useState([]);
  const [ theme, setTheme ] = useAsyncSetting( 'theme' );
  const creditsColor = useMemo(() => (
    theme === 'dark'
      ? '$primary0'
      : '$primary700'
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
      <CommonHeader title='Rugăciuni bisericești' navigation={navigation} backLink="home" />

      <VStack
          mt={0}
          space="4xl"
        >
          <Text lineHeight={30} fontSize={16} fontFamily="Besley_400Regular" textAlign="center" color={creditsColor}>
            editate de către episcopul Petru Pruteanu
          </Text>
          {data.map(item => (
            <CommonListSection item={item} navigation={navigation} key={item.id} />
          ))}
      </VStack>

      <StatusBar style="auto" />
    </CommonView>
  );}