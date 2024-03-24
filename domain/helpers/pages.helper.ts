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
    const nowTime = Date.now();
    const lastUpdate = parseInt( await asyncStorage.getItem(`${category}_last_update`));
    const daysBetween = Math.floor((nowTime - lastUpdate) / (1000 * 60 * 60 * 24));
    
    if (daysBetween < 7) {
      return;
    }
    
    const networkState = await Network.getNetworkStateAsync();

    if (!networkState.isConnected || !networkState.isInternetReachable) {
      return;
    }

    const response = await fetch(`https://texteliturgice.bitvice.ro/wp-json/wp/v2/pages?categories=${categoryId}&per_page=100`);
    const pages = await response.json();

    const rawModifiedDates = await asyncStorage.getItem(`${category}_modified_dates`);
    const rawStructure = await asyncStorage.getItem(`${category}_pages_struct`);
    const pagesModifiedDates: Record<string, number> = isEmpty(rawModifiedDates) ? {} : JSON.parse(rawModifiedDates);
    const pagesStruct: Record<string, TStructItem[]> = isEmpty(rawStructure) ? {} : JSON.parse(rawStructure);

    let hasChanges = false;

    for (const page of pages) {

      const parsedModified = Date.parse(page.modified)
      const localPageModified: number = pagesModifiedDates[ page.id ];

      if (isNil(localPageModified) || localPageModified < parsedModified ) {

        hasChanges = true;
        pagesModifiedDates[ page.id ] = parsedModified;

        await asyncStorage.setItem(`page_${page.id}_data`, JSON.stringify({
          id: page.id,
          title: page.title.rendered,
          modified: page.modified,
          parent: page.parent,
          content: page.content.rendered
        }));

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
      }
    }

    if (hasChanges) {
      await asyncStorage.setItem(`${category}_modified_dates`, JSON.stringify(pagesModifiedDates));
      await asyncStorage.setItem(`${category}_pages_struct`, JSON.stringify(pagesStruct));      
    }

    asyncStorage.setItem(`${category}_last_update`, nowTime.toString());
  } catch (e) {
    console.warn(e);
  } 
}

export const getPageChildren = async ( category: string, parentId: number ) => {
  const rawStructure = await asyncStorage.getItem(`${category}_pages_struct`);
  const pagesStruct: Record<string, TStructItem[]> = isEmpty(rawStructure) ? {} : JSON.parse(rawStructure);

  // console.log(category, 'pageStruct', pagesStruct);

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