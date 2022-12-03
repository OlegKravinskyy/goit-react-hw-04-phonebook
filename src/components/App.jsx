import { useState } from 'react';
import { useLocalStorage } from 'Hooks/useLocalStorage';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    const searchContact = contacts.find(contact => contact.name === data.name);
    searchContact
      ? alert(`${data.name} is already in contacts.`)
      : setContacts([...contacts, data]);

    reset();
  };

  const filterList = event => {
    setFilter(event.currentTarget.value);
  };

  const contactFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = data => {
    return setContacts(contacts.filter(contact => contact.id !== data.id));
  };

  const reset = () => {
    setFilter('');
  };

  let filterSearch = contacts;

  if (filter !== '') {
    filterSearch = contactFilter();
  }
  return (
    <div className={css.App}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <Filter filter={filter} filterList={filterList} />

      <h2 className={css.contacs}>Contacts</h2>
      <ContactList phoneList={filterSearch} deleteContact={deleteContact} />
    </div>
  );
};
