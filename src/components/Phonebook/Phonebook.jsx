import React from 'react';
import PropTypes from 'prop-types';
import { PhonebookContent } from './PhonebookContent/PhonebookContent';
import { PhonebookProvider } from './ContextProvider/ContextProvider';

export const Phonebook = ({
  contacts = [],
  name = 'Amanda',
  number = '23466872',
  filter = '',
}) => {
  return (
    <PhonebookProvider
      name={name}
      number={number}
      contacts={contacts}
      filter={filter}
    >
      <PhonebookContent />
    </PhonebookProvider>
  );
};
Phonebook.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  name: PropTypes.string,
  number: PropTypes.string,
  filter: PropTypes.string,
};
