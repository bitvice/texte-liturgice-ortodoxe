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

interface ICommonTitleProps {
  title: string;
  navigation: StackNavigationProp<any>
  backLink?: string;
  hideBack?: boolean;
}
export const CommonHeader: FC<ICommonTitleProps> = ({
  title, 
  navigation,
  backLink,
  hideBack
}) => {
  const [ tloTheme ] = useAsyncSetting( 'theme' );
  const bgColor = useMemo(() => (
    tloTheme === 'dark' 
      ? '$primary900'
      : tloTheme === 'light'
        ? '$primary200'
        : '$primary50'
  ), [tloTheme]);
  const color = useMemo(() => (
    tloTheme === 'dark' 
      ? '$primary200'
      : '$primary800'
  ), [tloTheme]);

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      pt={10}
      pb={5}
      pl={10}
      pr={10}
      mb={5}
      backgroundColor={bgColor}
    >
      {!hideBack && (

        <Pressable
        onPress={() => navigation.navigate( backLink ? backLink : 'home', { n: Math.random()})}
        >
          <ChevronLeftIcon color={color} />
        </Pressable>
      )}

      <Heading 
          color={color}
          >
        {title}
      </Heading>

      <Pressable
      onPress={() => navigation.navigate( 'settings')}
      >
        <SettingsIcon color={color} />
      </Pressable>    
    </HStack>
  );
}