import asyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty, isNil, sortBy } from 'lodash';
import * as Network from "expo-network";

type TStructItem = {
  id: number;
  title: string;
  order: number;
  children?: TStructItem[];
}

export const preparePages = async (category: string, categoryId: number) => {
  try {
    const networkState = await Network.getNetworkStateAsync();

    if (!networkState.isConnected || !networkState.isInternetReachable) {
      const allKeys = await asyncStorage.getAllKeys();
      console.log('NO NET | ALL KEYS', allKeys);
      return;
    }

    const response = await fetch(`https://texteliturgice.bitvice.ro/wp-json/wp/v2/pages?categories=${categoryId}&per_page=100`);
    const pages = await response.json();

    const rawModifiedDates = await asyncStorage.getItem(`${category}_modified_dates`);
    const rawStructure = await asyncStorage.getItem(`${category}_pages_struct`);
    const pagesModifiedDates: Record<string, number> = isEmpty(rawModifiedDates) ? {} : JSON.parse(rawModifiedDates);
    const pagesStruct: Record<string, TStructItem[]> = isEmpty(rawStructure) ? {} : JSON.parse(rawStructure);

    let hasChanges = false;

    console.log(`Received ${pages.length} pages for ${category.toUpperCase()}`);
    console.log(pages[0]);

    for (const page of pages) {

      const parsedModified = Date.parse(page.modified)
      const localPageModified: number = pagesModifiedDates[ page.id ];

      if (isNil(localPageModified) || localPageModified < parsedModified ) {

        hasChanges = true;
        pagesModifiedDates[ page.id ] = parsedModified;

        console.log('analizyng data for ', page.slug, page.id, ' as localPageModified:', localPageModified, ' | parsedModified:', parsedModified);

        // const pageResponse = await fetch(`https://texteliturgice.bitvice.ro/wp-json/wp/v2/pages/${page.id}`);
        // const pageData = await pageResponse.json();

        // console.log( 'received data: ', pageData );

        // await asyncStorage.setItem(`page_${page.id}_modified`, pageData.modified);
        // await asyncStorage.setItem(`page_${page.id}_content`, pageData.content.rendered);
        // await asyncStorage.setItem(`page_${page.id}_title`, pageData.title.rendered);
        // await asyncStorage.setItem(`page_${page.id}_parent`, pageData.parent.toString());

        await asyncStorage.setItem(`page_${page.id}_data`, JSON.stringify({
          id: page.id,
          title: page.title.rendered,
          modified: page.modified,
          parent: page.parent,
          content: page.content.rendered
        }));


        // const strParentChildren = await asyncStorage.getItem(`${category}_${page.parent}_children`);
        // const parentChildren = isEmpty(strParentChildren) 
        //   ? []
        //   : JSON.parse(strParentChildren) ;

        if (isNil(pagesStruct[ page.parent ])) {
          pagesStruct[ page.parent ] = [];
        }

        if (!pagesStruct[ page.parent ].find(( i: TStructItem ) => i.id === page.id)) {
          pagesStruct[ page.parent ].push({
            id: page.id,
            order: page.menu_order,
            title: page.title.rendered
          });
        }

        // await asyncStorage.setItem(`${category}_${page.parent}_children`, JSON.stringify(parentChildren));
      }
    }

    if (hasChanges) {
      await asyncStorage.setItem(`${category}_modified_dates`, JSON.stringify(pagesModifiedDates));
      await asyncStorage.setItem(`${category}_pages_struct`, JSON.stringify(pagesStruct));      
    }

    const all = await asyncStorage.getAllKeys();
    console.log('ALL KEYS', all);
  } catch (e) {
    console.warn(e);
  } 
}

export const getPageChildren = async ( category: string, parentId: number ) => {
  const rawStructure = await asyncStorage.getItem(`${category}_pages_struct`);
  const pagesStruct: Record<string, TStructItem[]> = isEmpty(rawStructure) ? {} : JSON.parse(rawStructure);

  console.log(category, 'pageStruct', pagesStruct);

  if (isEmpty(pagesStruct[ parentId ])) {
    return;
  }

  const children = sortBy(pagesStruct[ parentId ], ['order']);

  for (const child of children) {
    child.children = await getPageChildren(category, child.id);
  }

  return children;
}

export const getPagesStructureFor = async ( category: string, categoryId: number ) => {
  const rawStructure = await asyncStorage.getItem(`${category}_pages_struct`);
  const pagesStruct: Record<string, TStructItem[]> = isEmpty(rawStructure) ? {} : JSON.parse(rawStructure);
  const roots = sortBy(pagesStruct[0], ['order']);

  for (const root of roots) {
    root.children = await getPageChildren( category, root.id );
  }

  return roots;
}