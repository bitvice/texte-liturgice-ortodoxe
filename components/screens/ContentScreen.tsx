import { useEffect, useMemo, useState } from 'react';
import { CommonView } from '../common/CommonView';
import { 
  Platform,
  StyleSheet,
  useWindowDimensions 
} from 'react-native';
import RenderHtml, { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';
import asyncStorage from '@react-native-async-storage/async-storage';

import { WebView } from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import { StatusBar } from 'expo-status-bar';
import { Box, ScrollView } from '@gluestack-ui/themed';
import { CommonHeader } from '../common/CommonHeader';
import useAsyncSetting from '../../domain/hooks/setting.hook';
import { View } from '@gluestack-ui/themed';

// const source = {
//   html: `
//     <div class="parentDiv">
//       <p>para-1</p>
//       <b>para-2</b>
//       <p>para-3</p>
//     </div>
//   `
// };

// const customHTMLElementModels = {
//   'tlo-directive': HTMLElementModel.fromCustomModel({
//     tagName: 'tlo-directive',
//     mixedUAStyles: {
//       // backgroundColor: '#000000',
//       color: '#ffffff',
//       paddingLeft: 8,
//       paddingTop: 8,
//       paddingBottom: 8,
//       borderLeftColor: '#e20000',
//       borderLeftWidth: 4,
//       borderStyle: 'solid'
//     },
//     contentModel: HTMLContentModel.block
//   }),
//   'tlo-dropcaps': HTMLElementModel.fromCustomModel({
//     tagName: 'tlo-dropcaps',

//     mixedUAStyles: {
//       // backgroundColor: '#000000',
//       color: '#e20000',
//       padding: 4,
//       fontSize: 40,
//       lineHeight: 40, 
//       marginTop: 3,
//       marginRight: 3,
//       marginBottom: 3      
//     },
//     contentModel: HTMLContentModel.textual
//   })
// };

export const ContentScreen = (props) => {
  const { width, height } = useWindowDimensions();
  const [ html, setHtml ] = useState(`<div>Se incarca ...<br/><pre>${JSON.stringify(props.route.params, null, 2)}</pre></div>`);
  const [ theme, setTheme ] = useAsyncSetting( 'theme' );  
  const [ fontSize, setFontSize ] = useAsyncSetting( 'fontSize' );  

  const styles: any = useMemo(() => ({
    container: {
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      flexDirection: 'column',    
      height: '100%',
      backgroundColor: theme === 'dark' ? '#171717' : '$backgroundLight100'
    },
    html: {
      fontSize: 10 * fontSize
    },
    body: {
      whiteSpace: 'break-spaces',
      color: theme === 'dark' ? '#FCFCFC' : '$textLight950',
      paddingLeft: 8,
      paddingRight: 8,
      fontFamily: 'Besley_400Regular',
      fontSize: 10 * fontSize
    },
    s: {
      position: 'absolute',
      color: '#e20000',
      // fontSize: '1.25em',
      // lineHeight: '2em',
      textDecorationLine: 'none',
      fontFamily: 'Besley_900Black',
      fontSize: `${fontSize}`,
      lineHeight: 15 * fontSize,
    },
    i: {
      color: '#e20000',
      fontSize: 10 * fontSize
    },
    b: {
      color: (theme === 'dark' ? '#fff' : '#000'),
      fontFamily: 'Besley_700Bold'
    },
    q: {
      color: '#e20000'
    },
    h1: {
      textAlign: 'center',
      color: '#e20000',
      fontFamily: 'Besley_700Bold',
      fontSize: `${fontSize}.5em`
    },
    h3: {
      textAlign: 'center',
      color: '#e20000',
      fontFamily: 'Besley_700Bold',
      fontSize: `${fontSize}.2em`,
    },
    p: {
      fontSize: 10 * fontSize,
      lineHeight: 12 * fontSize,
      paddingBottom: 8,
      minHeight: 20,
      textAlign: 'justify'
    }
  }), [ theme, fontSize ]);

  useEffect(() => {
    const prepare = async () => {
      const contentKey = `page_${props.route.params.pageId}_data`;
      const rawData = await asyncStorage.getItem( contentKey );
      const pageData = JSON.parse( rawData );

      setHtml( pageData?.content || '<h1>Loading ... </h1>' );
    }
    prepare();
  }, [])

  return (
    <View id="WrapperContainer" style={styles.container}>
      <Box height={50} width={width}>

      <StatusBar style="auto" />
      <CommonHeader title="" navigation={props.navigation} backLink="home" />
      </Box>

    <ScrollView 
      width="$full"
      height={height - 50}
      contentInsetAdjustmentBehavior="automatic"
    >

      <RenderHtml
        systemFonts={[
          'Besley_400Regular',
          'Besley_500Medium',
          'Besley_700Bold',
          'Besley_900Black'
        ]}
        contentWidth={width}
        source={{
          html: `<html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, minimum-scale=1.0">
            </head>
            <body>${html}</body></html>`
        }}
        // customHTMLElementModels={customHTMLElementModels}
        tagsStyles={styles}
      />

      {/* <WebView
        source={{ 
          html: `<!doctype html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, minimum-scale=1.0">            
            ${style}
            </head>
            <body>
            ${html}</body>
          </html>`,
          baseUrl: '' 
        }}
        style={{
          width,
          height
        }}
        originWhitelist={["*"]}
      /> */}

      {/* <HTMLView
        value={`<body>
        ${html}
        </bod>`}
        // stylesheet={styles}
      /> */}
    </ScrollView>
    </View>
  )
}



// const styles = StyleSheet.create({ 
//   body: {
//     backgroundColor: '#888',
//     paddingLeft: 8,
//     paddingRight: 8,
//     paddingTop: 25,
//     fontSize: 16
//   },
//   h1: {
//     color: 'red',
//     marginTop: 30,
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center'
//   },
//   container: {
//     backgroundColor: '#888',
//     color: '#fff'
//   }
//  });