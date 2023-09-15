import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Problem2 = () => {
  const [contacts, setContacts] = useState([]);
  const [modalState, setModalState] = useState();
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showModalC, setShowModalC] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleShow = (e) => {
    setShowModal(true);
    setModalState(e.target.value);

    if (e.target.value === 'A') {
      fetchContactData();
    } else {
      const filterContact = contacts.filter(
        (contact) =>
          contact.country.name.toLowerCase().trim() === 'united states'.trim(),
      );
      setContacts(filterContact);
    }
  };

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const searchContact = async () => {
      const result = await axios.get(
        `https://contact.mediusware.com/api/contacts/?search=${searchText}`,
      );

      setContacts(result.data.results);
    };
    searchContact();
  }, [searchText]);

  const fetchContactData = async () => {
    const result = await axios.get(
      'https://contact.mediusware.com/api/contacts',
    );

    setContacts(result.data.results);
  };
  // next page paginate
  let id = 1;
  const handleNextPage = async () => {
    function pageNumber(no) {
      return ++no;
    }

    const result = await axios.get(
      `https://contact.mediusware.com/api/contacts/?page=${pageNumber(id)}`,
    );

    setContacts(result.data.results);
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  const handleContactItemClick = (contact) => {
    setSelectedContact(contact);
    setShowModalC(true);
  };

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
        <div className='d-flex justify-content-center gap-3'>
          <button
            value='A'
            onClick={(e) => handleShow(e)}
            className='btn btn-lg btn-outline-primary color[#46139f]'
            type='button'
            style={{ color: '#46139f' }}>
            All Contacts
          </button>
          <button
            value='B'
            onClick={(e) => handleShow(e)}
            className='btn btn-lg btn-outline-warning'
            type='button'
            style={{ color: '#ff7f50' }}>
            US Contacts
          </button>
        </div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Contact Modal {modalState} </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className='search-container'>
              <div className='input-group'>
                <div className='form-outline w-full'>
                  <input
                    type='search'
                    id='form1'
                    placeholder='Search'
                    className='form-control w-full'
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-center gap-3 mt-5'>
              <button
                value='A'
                onClick={(e) => handleShow(e)}
                className='btn btn-lg btn-outline-primary'
                style={{ color: '#46139f' }}
                type='button'>
                All Contacts
              </button>
              <button
                value='B'
                onClick={(e) => handleShow(e)}
                className='btn btn-lg btn-outline-warning'
                style={{ color: '#ff7f50' }}
                type='button'>
                US Contacts
              </button>
              <button
                className='btn btn-lg  text-primary'
                onClick={handleClose}
                style={{
                  backgroundColor: '#ffff',
                  border: '2px solid #46139f',
                }}>
                Close
              </button>
            </div>

            {/* <div>
              <label>
                <input
                  type='checkbox'
                  checked={onlyEven}
                  onChange={() => setOnlyEven(!onlyEven)}
                />
                Only Even
              </label>
            </div> */}

            <div className='w-full flex items-center justify-center'>
              <div>
                {contacts?.map((contact, idx) => (
                  <React.Fragment key={idx}>
                    <h3
                      onClick={() => handleContactItemClick(contact)}
                      className='cursor-pointer text-reset'>
                      {contact.phone}
                    </h3>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              className='btn btn-lg  text-primary'
              onClick={handleNextPage}
              style={{
                backgroundColor: '#ffff',
                border: '2px solid #46139f',
              }}>
              Next Page
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModalC} onHide={() => setShowModalC(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Contact Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedContact && (
              <div>
                <p>Name: {selectedContact.name}</p>
                <p>Phone: {selectedContact.phone}</p>
                {/* Add more contact details here */}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              className='btn btn-lg btn-outline-primary bg-warning text-white'
              onClick={() => setShowModalC(false)}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Problem2;
