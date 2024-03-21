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
      pt={22}
      pb={0}
      pl={0}
      pr={0}
      mb={0}
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
        width={48}
        height={48}
        >
          <ChevronLeftIcon color={color} size="xl" mt={12} ml={12} />
        </Pressable>
      )}

      <Text 
        color={color}
        fontFamily="Besley_700Bold"
        fontSize={16}
      >
        {isEmpty(title) ? ' ' : title}
      </Text>

      <Text 
        aria-label="spațiu gol"
        color={color}
        width={48}
        height={48}
      >
        {' '}
      </Text>

      {/* <Pressable
      onPress={() => navigation.navigate( 'settings', {
        backLink: currentScreen ? currentScreen : 'home'
      })}
      >
        <SettingsIcon color={color} size="xl" />
      </Pressable>     */}
    </HStack>
  );
}