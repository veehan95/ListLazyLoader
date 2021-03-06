import { ListLoader, ListLoaderInterface } from '../src/index';
import { EventEmitter } from 'events';

type ListItem = {
  id: string,
  name: string,
};

const list: ListItem[] = [
  { id: '001', name: 'the 1st item' },
  { id: '002', name: 'the 2nd item' },
  { id: '003', name: 'the 3rd item' },
  { id: '004', name: 'the 4th item' },
  { id: '005', name: 'the 5th item' },
  { id: '006', name: 'the 6th item' },
  { id: '007', name: 'the 7th item' },
  { id: '008', name: 'the 8th item' },
  { id: '009', name: 'the 9th item' },
  { id: '010', name: 'the 10th item' },
  { id: '011', name: 'the 11th item' },
];

const myEmitter = new EventEmitter();


const theList: ListLoaderInterface<ListItem> = new ListLoader<ListItem>(
  undefined,
  async () => { return list; },
  (eventName: string, details?: any) => { myEmitter.emit(eventName, details); }
);

// myEmitter.on('loading', (x: any) => { console.log('loading -> ', x.currentValue); });
// myEmitter.on('endOfList', (x: any) => { console.log('endOfList -> ', x.currentValue); });
// myEmitter.on('fullListUpdated', (x: any) => { console.log('fullListUpdated -> ', x.currentValue); });
myEmitter.on('listUpdated', (x: any) => { console.log(theList.list); });


theList.loadMore()
  .then(async () => { theList.loadMore(); })
  .then(async () => { console.log('-->>');theList.resetList();console.log('<<--'); })
  .then(async () => { theList.loadMore(); })
  .then(async () => { theList.loadMore(); })
  .then(async () => { theList.loadMore(); })
  .then(async () => { theList.loadMore(); });



// theList.eventFire = (eventName: string, details?: any) => { myEmitter.emit(eventName, details); }




// const l1 = [1,2,3];
// const l2 = [1,3,4];
// const finL = l1.reduce((acc, x) => {
//   return l2.push(x)
// })
// console.log('finL', finL);
//
// async function firstAsync() {
//     let promise = new Promise((res, rej) => {
//         setTimeout(() => {
//           console.log('hi');
//           res();
//         }, 1000)
//     });
//
//     // wait until the promise returns us a value
//     console.log('hiq');
//     await promise;
//     console.log('hiq2');
//
// };
// firstAsync();

// theList.setting = { maxInView_init: 100 };
// theList.setting = { maxInView_init: 110 };
// theList.setting = { maxInView_init: 170 };
