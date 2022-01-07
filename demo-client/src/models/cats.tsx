import React, { ReactElement } from 'react';
import {
  Datagrid,
  Edit,
  Filter,
  List,
  NumberField,
  NumberInput,
  SearchInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';

const Filters = (props: unknown) => (
  <Filter {...props}>
    <SearchInput source="nameRegexp" alwaysOn placeholder="Name" />
  </Filter>
);

export const CatList = (props: unknown): ReactElement => {
  return (
    <List {...props} filters={<Filters />}>
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <TextField source="kind" />
        <NumberField source="age" />
        <TextField source="color" />
        <TextField source="stripeColor" />
      </Datagrid>
    </List>
  );
};

export const CatShow = (props: unknown): ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="kind" />
        <NumberField source="age" />
        <TextField source="color" />
        <TextField source="stripeColor" />
      </SimpleShowLayout>
    </Show>
  );
};

export const CatEdit = (props: unknown): ReactElement => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="id" />
      <TextInput source="name" />
      <NumberInput source="age" />
      <TextInput source="color" />
      <TextInput source="stripeColor" />
    </SimpleForm>
  </Edit>
);
