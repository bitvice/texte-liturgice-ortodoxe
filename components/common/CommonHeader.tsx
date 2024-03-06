import { FC, useMemo } from "react";
import { 
  HStack, 
  Heading,
  Pressable,
  SettingsIcon,
  ChevronLeftIcon
} from '@gluestack-ui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import useAsyncSetting from "../../domain/hooks/setting.hook";
import { Text } from "@gluestack-ui/themed";
import { isEmpty } from "lodash";

interface ICommonTitleProps {
  title: string;
  navigation: StackNavigationProp<any>
  backLink?: string;
  hideBack?: boolean;
  currentScreen?: string;
}
export const CommonHeader: FC<ICommonTitleProps> = ({
  title, 
  navigation,
  backLink,
  hideBack,
  currentScreen
}) => {
  const [ tloTheme ] = useAsyncSetting( 'theme' );
  const bgColor = useMemo(() => (
    tloTheme === 'dark' 
      ? '$backgroundDark950'
      : '$backgroundLight100'
  ), [tloTheme]);
  const color = useMemo(() => (
    tloTheme === 'dark' 
    ? '$textLight0'
    : '$textDark950'
  ), [tloTheme]);

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      pt={30}
      pb={5}
      pl={10}
      pr={10}
      mb={5}
      backgroundColor={bgColor}
    >
      {!hideBack && (

        <Pressable
        onPress={() => {
          console.log(navigation.getState());
          const currentRoutes = navigation.getState().routes;
          const backRoute = currentRoutes[currentRoutes.length - 2];
          console.log(backRoute);
          navigation.navigate(backRoute.name, {n: Math.random()})
        }}
        >
          <ChevronLeftIcon color={color} />
        </Pressable>
      )}

      <Text 
        color={color}
        fontFamily="Besley_700Bold"
        fontSize={16}
      >
        {isEmpty(title) ? ' ' : title}
      </Text>

      <Pressable
      onPress={() => navigation.navigate( 'settings', {
        backLink: currentScreen ? currentScreen : 'home'
      })}
      >
        <SettingsIcon color={color} />
      </Pressable>    
    </HStack>
  );
}