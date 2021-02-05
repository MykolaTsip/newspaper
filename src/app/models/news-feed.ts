export interface NewsFeed {
  feed?: IRssObject;
}

export interface IRssObject {
  $: any;
  category: Array<object>;
  entry: Array<NewItem>;
  id: Array<string>;
  link: Array<object>;
  title: Array<string>;
  updated: Date;
}

export interface NewItem {
  author: Array<object>;
  category: Array<object>;
  content: Array<object>;
  id: Array<string>;
  link: Array<NewLink>;
  mediathumbnail: Array<object>;
  title: Array<string>;
  updated: Array<string>;
}

export interface NewLink {
  $: object;
}


