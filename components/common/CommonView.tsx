import { FC, PropsWithChildren, useMemo } from "react";
import { ScrollView } from "@gluestack-ui/themed";
import useAsyncSetting from "../../domain/hooks/setting.hook";

export const CommonView: FC<PropsWithChildren> = ({children}) => {
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
    <ScrollView
      id="CommonView"
      w="$full"
      h="$full"
      backgroundColor={bgColor}
      // style={{
      //   height: '100%'
      // }}
    >
      {children}
    </ScrollView>
  );
}