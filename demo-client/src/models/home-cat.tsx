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

export const HomeCatList = (props: unknown): ReactElement => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <NumberField source="age" />
        <TextField source="color" />
        <TextField source="stripeColor" />
        <TextField source="humanSlave" />
      </Datagrid>
    </List>
  );
};

export const HomeCatShow = (props: unknown): ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <NumberField source="age" />
        <TextField source="color" />
        <TextField source="stripeColor" />
        <TextField source="humanSlave" />
      </SimpleShowLayout>
    </Show>
  );
};

export const HomeCatEdit = (props: unknown): ReactElement => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="id" />
      <TextInput source="name" />
      <NumberInput source="age" />
      <TextInput source="color" />
      <TextInput source="stripeColor" />
      <TextInput source="humanSlave" />
    </SimpleForm>
  </Edit>
);

export const HomeCatCreate = (props: unknown): ReactElement => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <NumberInput source="age" />
      <TextInput source="color" />
      <TextInput source="stripeColor" />
      <TextInput source="humanSlave" />
    </SimpleForm>
  </Create>
);
