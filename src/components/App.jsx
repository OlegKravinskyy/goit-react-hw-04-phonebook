import React from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    const searchContact = this.state.contacts.find(
      contact => contact.name === data.name
    );
    searchContact
      ? alert(`${data.name} is already in contacts.`)
      : this.state.contacts.push(data);

    this.reset();
  };

  filterList = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  contactFilter = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = data => {
    return this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== data.id),
    }));
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  componentDidMount() {
    const startContacts = JSON.parse(localStorage.getItem('contacts'));

    if (startContacts) {
      this.setState({ contacts: startContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacs) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts } = this.state;
    let filterSearch = contacts;

    if (this.state.filter !== '') {
      filterSearch = this.contactFilter();
    }
    return (
      <div className={css.App}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <Filter filter={this.state.filter} filterList={this.filterList} />

        <h2 className={css.contacs}>Contacts</h2>
        <ContactList
          phoneList={filterSearch}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

//
