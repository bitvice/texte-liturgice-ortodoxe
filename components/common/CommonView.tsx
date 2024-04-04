import { FC, PropsWithChildren, useMemo } from "react";
import { ScrollView } from "@gluestack-ui/themed";
import useAsyncSetting from "../../domain/hooks/setting.hook";

export const CommonView: FC<PropsWithChildren> = ({children}) => {
  const [ tloTheme ] = useAsyncSetting( 'theme' );
  const bgColor = useMemo(() => (
    tloTheme === 'dark' 
      ? '#0B1215'
      : '#FAF9F6'
  ), [tloTheme]);
  const color = useMemo(() => (
    tloTheme === 'dark' 
    ? '$textLight0'
    : '$textDark950'
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