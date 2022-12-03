import PropTypes from 'prop-types';
import css from '../ContactList/ContactList.module.css';

export const ContactList = ({ phoneList, deleteContact }) => {
  return (
    <ul className={css.contactList}>
      {phoneList.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button
            type="button"
            onClick={() => deleteContact(contact)}
            className={css.btn}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  phoneList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
