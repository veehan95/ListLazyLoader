# ListLazyLoader
 To manage how items in a list is loaded.

# Remarks
Currently focus in typescript's support, will try to finish support's in pure js.

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
Default values
| property | value | description |
| --- | --- | --- |
| maxInView_init | 10 | max length of list when first loaded |
| increaseSize | 10 | length of list to increase for each loadMore |
| loadMoreFromExternal | true | load more from `listLoadFunction` |
| listUpdateAlgorithm | "directAppend" | refer to [listUpdateAlgorithm](#listUpdateAlgorithm) |
| loadMoreRetryInterval | 1000 | retry to load more after this time interval if unable to load more |
| events | EventObject | refer to [EventObject](#EventObject) |



{
    loading | "loading" |
    endOfList | "endOfList" |
    listUpdated | "listUpdated" |
    fullListUpdated | "fullListUpdated"
  } |
}


##### listLoadFunction

##### eventEmitter
