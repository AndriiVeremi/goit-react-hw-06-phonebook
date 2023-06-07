import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { Item, Name, Text, Button } from './ContactList.styled';

const ContactList = ({ contacts, onDeleteContacts }) => (
  (contacts.map(({ id, name, number }) => (
      <Item key={id}>
        <Name>{name} :</Name>
        <Text>{number}</Text>
        <Button
          type="button"
          onClick={() => onDeleteContacts(id)}
        >
          <AiOutlineUserDelete />
          Delete
        </Button>
      </Item>
    )))
);

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  onDeleteContacts: PropTypes.func.isRequired,
};