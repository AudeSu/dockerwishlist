import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/wishlist`)
            .then((res) => setItems(res.data));
    }, []);

    const addItem = () => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/wishlist`, { item: newItem.trim() })
            .then((res) => setItems([...items, res.data]));
        setNewItem('');
    };

    const deleteItem = (id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/wishlist/${id}`).then(() => {
            setItems(items.filter((item) => item._id !== id));
        });
    };

    return (
        <div className='app-container'>
            <h1 className='title'>My Wishlist</h1>
            <input
                type='text'
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder='Voeg een item toe'
                className='input-field'
            />
            <button onClick={addItem} className='add-button'>
                Toevoegen
            </button>
            <ul className='item-list'>
                {items.map((item) => (
                    <li key={item._id} className='item'>
                        <span>{item.item}</span>
                        <button onClick={() => deleteItem(item._id)} className='delete-button'>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
