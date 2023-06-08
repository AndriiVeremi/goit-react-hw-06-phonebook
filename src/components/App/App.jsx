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

  const addToList = submitContact => {
    const nameId = nanoid();
    const newContact = {
      id: nameId,
      name: submitContact.name,
      number: submitContact.number,
    };
    setContacts(contacts => [newContact, ...contacts]);
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm onSubmits={addToList} contacts={contacts} />
        <Header title="Contacts" />
        <Filter />
        <List>
          <ContactList />
        </List>
      </Section>
    </Container>
  );
}

export default App;
