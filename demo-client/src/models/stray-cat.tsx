import React, { ReactElement } from 'react';
import {
  Create,
  Datagrid,
  Edit,
  List,
  NumberField,
  NumberInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';

export const StrayCatList = (props: unknown): ReactElement => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <NumberField source="age" />
        <TextField source="color" />
        <TextField source="stripeColor" />
        <NumberField source="territorySize" />
      </Datagrid>
    </List>
  );
};

export const StrayCatShow = (props: unknown): ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <NumberField source="age" />
        <TextField source="color" />
        <TextField source="stripeColor" />
        <NumberField source="territorySize" />
      </SimpleShowLayout>
    </Show>
  );
};

export const StrayCatEdit = (props: unknown): ReactElement => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="id" />
      <TextInput source="name" />
      <NumberInput source="age" />
      <TextInput source="color" />
      <TextInput source="stripeColor" />
      <NumberInput source="territorySize" />
    </SimpleForm>
  </Edit>
);

export const StrayCatCreate = (props: unknown): ReactElement => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <NumberInput source="age" />
      <TextInput source="color" />
      <TextInput source="stripeColor" />
      <NumberInput source="territorySize" />
    </SimpleForm>
  </Create>
);
