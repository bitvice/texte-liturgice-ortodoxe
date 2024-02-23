import { useEffect, useState } from 'react';
import { CommonView } from '../common/CommonView';
import { 
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
  const [ theme, setTheme ] = useState('dark');

  useEffect(() => {
    const prepare = async () => {
      const contentKey = `page_${props.route.params.pageId}_content`;
      const content = await asyncStorage.getItem( contentKey );
      setHtml( content );
    }
    prepare();
  }, [])

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      {/* <StatusBar style="auto" /> */}

      {/* <RenderHtml
        contentWidth={width}
        source={{
          html
        }}
        customHTMLElementModels={customHTMLElementModels}
        tagsStyles={styles}
      /> */}
      <CommonHeader title='' navigation={props.navigation} backLink="home" />

      <WebView
        source={{ html: `<html>
        <head><style>
        body {
          font-size: 42px;
          background-color: #eaeaea;
          color: #333;
          margin: 1rem 1rem 1rem;
        }
        h1 {
          font-size: 1.5em;
          color: #e20000;
          text-align: center;
        }
        .drop-caps {
          line-height: 1em;
          font-size: 300%;
          font-weight: bold;
          min-width: 100px;
          text-align: center;
          padding-top: 1px;
          text-transform: uppercase;
          float: left;
          position: relative;
          top: .4rem;
          color: #e20000;
        }
        </style></head>
        <body>
        ${html}</body>
        </html>` }}
        style={{
          width,
          height: height - 22
        }}
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