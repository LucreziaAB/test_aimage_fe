import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        telefono: '',
        email: '',
        corso: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; target: any; }) => {
        e.preventDefault();
        const form = e.target;
        const request = new FormData(form);
        try {
            let response = await axios.post('http://localhost:3001/save-data', request,
                {headers: {
                        'Content-Type': 'application/json',
                    },
                });

            if (response.status === 200) {
                if(response.data === "updated"){
                    toast.success('Aggiornamento riuscito!');
                }
                else if(response.data === "not_needed"){
                    toast.info('Nessun dato modificato!')
                }
                else if(response.data === "added"){
                    toast.success('Registrazione avvenuta!');
                }
            }
            return response;
        }
        catch (err: any) {
            if (err.status === 406) {
                toast.error('Registrazione fallita! ' + err.response.data.message);
            }
            else{
                toast.error('Registrazione fallita!');
                console.error('È stato riscontrato un errore: ', err);
            }
        } //fine catch
    };

    return (
        <div className="registration-form">
                <h2>Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="cognome">Cognome:</label>
                        <input
                            type="text"
                            id="cognome"
                            name="cognome"
                            value={formData.cognome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="telefono">Telefono:</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="corso">Corso di interesse:</label>
                        <select
                            id="corso"
                            name="corso"
                            value={formData.corso}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleziona un corso...</option>
                            <option value="React">React</option>
                            <option value="Vue.js">Vue.js</option>
                            <option value="Node.js">Node.js</option>
                            <option value="MongoDB">MongoDB</option>
                        </select>
                    </div>

                    <button type="submit">Registrati</button>
                </form>
            <ToastContainer/>
        </div>

    );
};

export default RegistrationForm;