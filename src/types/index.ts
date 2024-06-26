export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  // [key: string]: string | number | boolean; //индексная подпись
} & Record<string, unknown>;

export type TabHeader = {
  expandedIcon: string;
  collapsedIcon: string;
};
