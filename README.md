# ListLazyLoader
- To manage how items in a list is loaded.
- run `ts-node example/index.ts` to try in nodejs (PowerShell).

# Remarks
- Currently focus in typescript's support, will try to finish support's in pure js.
- examples are a bit messy. but will try my best to update them ASAP.

# Usage
```
import { ListLoader, ListLoaderInterface } from 'ListLazyLoader';
const theList: ListLoaderInterface<ListItem> = new ListLoader<ListItem>(
  setting,
  listLoadFunction,
  eventEmitter
);
```
### Parameters in constructor
##### setting

| property | default value | description |
| --- | --- | --- |
| maxInView_init | 10 | max length of list when first loaded |
| increaseSize | 10 | length of list to increase for each loadMore |
| loadMoreFromExternal | true | load more from `listLoadFunction` |
| listUpdateAlgorithm | "directAppend" | refer to [listUpdateAlgorithm](#listUpdateAlgorithm) |
| loadMoreRetryInterval | 1000 | retry to load more after this time interval if unable to load more |
| events | EventObject | refer to [EventObject](#EventObject) |

<h7 id="listUpdateAlgorithm"> listUpdateAlgorithm

- autoMerge: will filter the list to ensure no duplicated data in the list.
- directAppend: will directly append the list at the end
- override: will override the list

<h7 id="EventObject"> EventObject

| property | value | description |
| --- | --- | --- |
| loading | "loading" | when the liast is loading |
| endOfList | "endOfList" | when no more item is loaded from `listLoadFunction` |
| listUpdated | "listUpdated" | whenever the list to preview is updated |
| fullListUpdated | "fullListUpdated" | whenever the full list is updated |

##### listLoadFunction
- function to load more item to append into the list
- `() => Promise<ListItem[]|void>`
- ListItem is the type of a single item

##### eventEmitter
- function to fire event when properties in [EventObject](#EventObject) changes
- leave it as undefined to disable this functionality
- `(eventName: string, details?: any) => void`

### Methods
- `theList.loadMore();` loads more items into the list;
- `theList.resetList();` resets the list to initial state.
