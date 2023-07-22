import React from 'react';
import PropTypes from 'prop-types';
import css from './../Phonebook.module.css';

export const ContactList = ({
  contacts,
  filter,
  setFilter,
  deleteContactHandle,
}) => {
  const filterContacts = (filter, contacts) => {
    return contacts.filter(
      el =>
        el.name.toLowerCase().includes(filter.toLowerCase()) ||
        el.number
          .toLowerCase()
          .trim()
          .replace(/ |-/g, '')
          .includes(filter.toLowerCase().trim().replace(/ |-/g, ''))
    );
  };
  const Entry = ({ name, number, id }) => {
    return (
      <li className={css.entry} id={id}>
        {name + ': ' + number}
        <button
          key={`${name}${number}btn${id}`}
          className={`${css.button} ${css.delete}`}
          type="button"
          onClick={e => deleteContactHandle(e, { name, number, id })}
        >
          Delete
        </button>
      </li>
    );
  };

  return (
    <div className={css.contacts}>
      <label className={css.label} htmlFor="filter">
        Find contacts
      </label>
      <input
        className={css.input}
        type="text"
        id="filter"
        name="filter"
        onChange={e => setFilter(e.target.value)}
        value={filter}
        title="Will show only contacts that match search quota written here."
      />
      {filter ? (
        <button
          className={`${css.button} ${css.delete}`}
          type="button"
          onClick={e => setFilter('')}
        >
          Clear
        </button>
      ) : (
        ''
      )}
      <ul className={css.list}>
        {filterContacts(filter, contacts).map(el => {
          return (
            <Entry
              name={el.name}
              number={el.number}
              id={`${el.id}`}
              key={`entry${el.id}`}
            />
          );
        })}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  deleteContactHandle: PropTypes.func.isRequired,
};
