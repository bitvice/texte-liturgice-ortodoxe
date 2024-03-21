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
import { ScrollView } from '@gluestack-ui/themed';
import { CommonHeader } from '../common/CommonHeader';
import useAsyncSetting from '../../domain/hooks/setting.hook';

// const source = {
//   html: `
//     <div class="parentDiv">
//       <p>para-1</p>
//       <b>para-2</b>
//       <p>para-3</p>
//     </div>
//   `
// };

const customHTMLElementModels = {
  'tlo-directive': HTMLElementModel.fromCustomModel({
    tagName: 'tlo-directive',
    mixedUAStyles: {
      // backgroundColor: '#000000',
      color: '#ffffff',
      paddingLeft: 8,
      paddingTop: 8,
      paddingBottom: 8,
      borderLeftColor: '#e20000',
      borderLeftWidth: 4,
      borderStyle: 'solid'
    },
    contentModel: HTMLContentModel.block
  }),
  'tlo-dropcaps': HTMLElementModel.fromCustomModel({
    tagName: 'tlo-dropcaps',

    mixedUAStyles: {
      // backgroundColor: '#000000',
      color: '#e20000',
      padding: 4,
      fontSize: 40,
      lineHeight: 40, 
      marginTop: 3,
      marginRight: 3,
      marginBottom: 3      
    },
    contentModel: HTMLContentModel.textual
  })
};

export const ContentScreen = (props) => {
  const { width, height } = useWindowDimensions();
  const [ html, setHtml ] = useState(`<div>Se incarca ...<br/><pre>${JSON.stringify(props.route.params, null, 2)}</pre></div>`);
  const [ theme, setTheme ] = useAsyncSetting( 'theme' );  

  const style = useMemo(() => {
    const fontUrl = Platform.select({
      ios: "PlayfairDisplay.ttf",
      android: "file:///android_asset/fonts/PlayfairDisplay.ttf",
    });    
    // console.log('fontUrl', fontUrl, 'theme', theme, 'Platform', Platform.OS);
    return `<style>

    @font-face {
      font-family: 'Playfair'; 
      src: url('${fontUrl}') format('truetype')
    }
    
    body {
      font-size: 16px;
      font-family: 'PlayfairDisplay';
      background-color: ${theme === 'dark' ? '#000' : '#eaeaea'};
      color: ${theme === 'dark' ? '#eaeaea' : '#333'};
      margin: .5em;
      --tlo-black: ${theme === 'dark' ? '#fff' : '#000'};
      --tlo-red: #e20000;
    }
    h1 {
      font-family: 'PlayfairDisplay';
      padding: .5em 0;
      font-size: 1.5em;
      color: #e20000;
      text-align: center;
    }
    .drop-caps {
      line-height: 1em;
      font-size: 250%;
      font-weight: bold;
      min-width: 1em;
      text-align: center;
      padding: 0;
      text-transform: uppercase;
      float: left;
      position: relative;
      top: .1em;
      color: #e20000;
    }


    .oContent
    {
      /*background-color: #000;*/
      background-size: 110%;
      background-image: none;
      margin: 0;
      padding: 5% 2% 4em;
    
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
    }
    
    .t-default { color: #000; }
    .t-dark    { color: #fff; }
    .t-light   { color: #666; }
    
    
    .oContent.text-small  { font-size: .6rem; }
    .oContent.text-normal { font-size: .8rem; }
    .oContent.text-large  { font-size:  1rem; }
    
    h1
    {
      font-size: 1.6em;
    }
    h3
    {
      font-size: 1.4em;
    }
    h4
    {
      font-size: 1.2em;
    }
    
    h1.red
    {
      text-transform: uppercase;
    }
    
    h1,
    h2,
    h3,
    h4 {
      color: #e20000;
      text-align: center;
    }
            
    .directive {
      font-size: .9em;
      color: #e20000;
    }
    
    span.directive { font-size: .75em; }
    
    p,
    li
    {
      text-indent: 0;
      font-size: 1.2em;
      text-align: justify;
      line-height: 1.5em;
      clear: both;
      margin-bottom: 2em;
    }
    
    p.centered
    {
      text-indent: 0;
      text-align: center;
      padding: 0.5em 0 0;
    }
    .red
    {
      color: #e20000;
    }
    .t-default .black { color: #000; }
    .t-dark .black { color: #fff; }
    .t-light .black { color: #666; }
    
    ol
    {
      padding-left: 2.4em;
    }
    ol li
    {
      margin: 0;
      text-indent: 0;
    }
    
    footer
    {
      position: fixed;
      bottom: 0;
      height: 32px;
      width: 96%;
    }
    
    .mSize
    {
      float: right;
      padding: 5px 10px;
      width: 40px;
      height: 18px;
      border-radius: 5px;
      background-color: rgba(125,125,125,.6);
      color: #e20000;
      text-align:center;
      text-decoration: none;
    }
    .mSize-active { color: #333; }
    .mSize-small 	{ font-size: .6rem; }
    .mSize-normal	{ font-size: .8rem; }
    .mSize-large 	{ font-size:  1rem; }
    
    
    #BookTitle { margin: 0; }        

    </style>`
  }, [theme])

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
    <ScrollView 
      width="$full"
      height="$full"
      contentInsetAdjustmentBehavior="automatic">
      {/* <StatusBar style="auto" /> */}

      {/* <RenderHtml
        contentWidth={width}
        source={{
          html
        }}
        customHTMLElementModels={customHTMLElementModels}
        tagsStyles={styles}
      /> */}
      {/* <CommonHeader title='' navigation={props.navigation} backLink="home" /> */}

      <WebView
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
      />

      {/* <HTMLView
        value={`<body>
        ${html}
        </bod>`}
        // stylesheet={styles}
      /> */}
    </ScrollView>
  )
}

const styles: any = {
  
  body: {
    whiteSpace: 'normal',
    backgroundColor: '#333',
    color: '#aaa',
    paddingLeft: 8,
    paddingRight: 8,
    '--tlo-red': '#e20000',
    '--tlo-black': '#000000'
  },
  h1: {
    textAlign: 'center',
    color: 'red'
  },
  'p > b': {
    float: 'left'
  },
  p: {
    fontSize: 16,
    color: '#fff',
    paddingBottom: 8,
    lineHeight: 20
  }
};

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