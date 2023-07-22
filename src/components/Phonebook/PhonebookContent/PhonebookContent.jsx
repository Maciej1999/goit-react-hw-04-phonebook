import React, { useEffect } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Title } from '../Title/Title';
import { usePhonebook } from '../ContextProvider/ContextProvider';
import css from './../Phonebook.module.css';
export const PhonebookContent = () => {
  const {
    contacts,
    setContacts,
    name,
    setName,
    number,
    setNumber,
    filter,
    setFilter,
  } = usePhonebook();

  useEffect(() => {
    const loadedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(loadedContacts);
  }, [setContacts]);
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContactHandle = (e, newContact) => {
    e.preventDefault();
    const filtered =
      contacts.find(
        c => c.name.toLowerCase() === newContact.name.toLowerCase()
      ) || 0;
    if (filtered !== 0) {
      setFilter(filtered.name);
      alert(`You aready have ${filtered.name} in your phonebook.

      ${filtered.name} ${filtered.number}`);
      return;
    }
    const filteredNum =
      contacts.find(
        c => c.number.toLowerCase() === newContact.number.toLowerCase()
      ) || 0;
    if (filteredNum !== 0) {
      alert(`You aready have this number in your phonebook.
      
      ${filteredNum.name} ${filteredNum.number}`);
      setNumber(filteredNum.number);
      return;
    }
    setContacts(prev => [...prev, { ...newContact }]);
    setName('');
    setNumber('');
    setFilter('');
  };
  const deleteContactHandle = (e, contact) => {
    e.preventDefault();
    setContacts(prev => {
      return [...prev.filter(c => c.id !== contact.id)];
    });
  };
  return (
    <div className={css.phonebook}>
      <Title title="Phonebook" />

      <ContactForm
        name={name}
        number={number}
        addContactHandle={addContactHandle}
        setName={setName}
        setNumber={setNumber}
      />

      <Title title="Contacts" />
      <ContactList
        contacts={contacts}
        filter={filter}
        setContacts={setContacts}
        setFilter={setFilter}
        deleteContactHandle={deleteContactHandle}
      />
    </div>
  );
};
