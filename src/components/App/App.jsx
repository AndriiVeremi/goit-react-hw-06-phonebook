import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Filter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import { Container, List } from './App.styled';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? '';
  });

  const [filter, setFilter] = useState('');

  const addToList = submitContact => {
    const nameId = nanoid();
    const newContact = {
      id: nameId,
      name: submitContact.name,
      number: submitContact.number,
    };
    setContacts(contacts => [newContact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value.toLowerCase());
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return Object.values(contacts).filter(contact => 
      contact.name.toLowerCase().includes(normalizeFilter));
  };

  const deleteContacts = userId => {
    setContacts(prevState => prevState.filter(user => user.id !== userId));
  };

  
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
 
  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm onSubmits={addToList} contacts={contacts} />
        <Header title="Contacts" />
        <Filter value={filter} onChange={changeFilter} />
        <List>
          <ContactList 
          contacts={getVisibleContacts()} 
          onDeleteContacts={deleteContacts} />
        </List>
      </Section>
    </Container>
  );
}

export default App;
