import { ListLoader, ListLoaderInterface, Type_Setting } from '../src/index';

describe('When fullList updated, it will update list', () => {
  let listLoader: ListLoaderInterface<number>;

  beforeEach(() => { listLoader = new ListLoader<number>(); });

  test('Nothing should be in the list.', () => {
    expect(listLoader.list).toStrictEqual([]);
  });

  test('Value(s) should had been insert into the list.', () => {
    listLoader.fullList = [1,2,3,4];
    expect(listLoader.list.length).toBeGreaterThan(0);
  });
})

describe('Display list loading.', () => {
  let listLoader: ListLoaderInterface<number>;
  const fullList: number[] = [1,100,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
  const defaultIncrease: number = 10;
  const maxInView_init: number = 10;

  beforeEach(() => {
    listLoader = new ListLoader<number>();
    listLoader.fullList = fullList.slice(0, maxInView_init + defaultIncrease);
    listLoader._loadMoreFromExternal = () => fullList;
  });

  test('Length of displayed list should be the default length according to arrangement of list following the input.', () => {
    expect(listLoader.list).toStrictEqual(fullList.slice(0, maxInView_init));
  });

  describe('More values should be loaded into the list.', () => {
    test('Default load.', () => {
      listLoader.loadMore();
      expect(listLoader.list)
        .toStrictEqual(fullList.slice(0, maxInView_init + defaultIncrease));
    });

    test('Load 5 more.', () => {
      listLoader.loadMore(5);
      expect(listLoader.list).toStrictEqual(fullList.slice(0, maxInView_init + 5));
    });
  });

  describe('More values should be loaded into the list.', () => {
    beforeEach(() => { listLoader.loadMore(); });

    test('More values should be loaded into the list from external source.', () => {
      listLoader.loadMore();
      expect(listLoader.list)
        .toStrictEqual(fullList.slice(0, maxInView_init + defaultIncrease * 2));
    });

    test('Load 5 more.', () => {
      listLoader.loadMore(5);
      expect(listLoader.list)
        .toStrictEqual(fullList.slice(0, maxInView_init + defaultIncrease + 5));
    });
  });

  describe('When list updates and is lesser than default increase.', () => {
    beforeEach(() => {
      listLoader.fullList = fullList.slice(0, maxInView_init + 3);
    });

    test('More values should be loaded into the list from external source.', () => {
      listLoader.loadMore();
      expect(listLoader.list)
        .toStrictEqual(fullList.slice(0, maxInView_init + defaultIncrease));
    });

    test('Load 5 more.', () => {
      listLoader.loadMore(5);
      expect(listLoader.list)
        .toStrictEqual(fullList.slice(0, maxInView_init + 5));
    });
  });
})

describe('Loading.', () => {
  let listLoader: ListLoaderInterface<number>;
  const fullList: number[] = [1,100,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
  const defaultIncrease: number = 10;
  const maxInView_init: number = 10;

  beforeEach(() => {
    listLoader = new ListLoader<number>();
    listLoader.fullList = fullList.slice(0, maxInView_init + defaultIncrease);
    listLoader._loadMoreFromExternal = () => fullList;
  });

  test('Length of displayed list should be the default length according to arrangement of list following the input.', () => {
    expect(listLoader.list).toStrictEqual(fullList.slice(0, maxInView_init));
  });

  describe('More values should be loaded into the list.', () => {
    test('Default load.', () => {
      listLoader.loadMore();
      expect(listLoader.list)
        .toStrictEqual(fullList.slice(0, maxInView_init + defaultIncrease));
    });

    test('Load 5 more.', () => {
      listLoader.loadMore(5);
      expect(listLoader.list).toStrictEqual(fullList.slice(0, maxInView_init + 5));
    });
  });

  describe('More values should be loaded into the list.', () => {
    beforeEach(() => { listLoader.loadMore(); });

    test('More values should be loaded into the list from external source.', () => {
      listLoader.loadMore();
      expect(listLoader.list)
        .toStrictEqual(fullList.slice(0, maxInView_init + defaultIncrease * 2));
    });

    test('Load 5 more.', () => {
      listLoader.loadMore(5);
      expect(listLoader.list)
        .toStrictEqual(fullList.slice(0, maxInView_init + defaultIncrease + 5));
    });
  });
})
