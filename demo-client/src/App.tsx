/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable react/jsx-key  */
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import React, { ReactElement, useMemo, useState } from 'react';
import { Admin, DataProvider, Resource, TranslationMessages } from 'react-admin';
import { buildDataProvider } from './dataProvider';
import { CatEdit, CatList, CatShow } from './models/cats';
import { CAT_NAME } from './resources';

const messagesPerLocal: Record<string, TranslationMessages> = {
  en: englishMessages,
};
const i18nProvider = polyglotI18nProvider(
  (locale) => {
    const messages = messagesPerLocal[locale];
    if (!messages) {
      throw Error(`Local "${locale}" not suppported`);
    }
    return messages;
  },
  'en',
  {
    allowMissing: true,
    onMissingKey: (key: string) => key,
  },
);

const App = (): ReactElement | null => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);

  useMemo(() => {
    (async () => {
      const dataProvider: DataProvider = await buildDataProvider();
      setDataProvider(() => dataProvider);
    })();
  }, []);

  if (!dataProvider) {
    return null;
  }

  return (
    <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <Resource
        name={CAT_NAME}
        list={CatList}
        show={CatShow}
        edit={CatEdit}
        options={{ label: 'All cats' }}
      />
    </Admin>
  );
};

export default App;
