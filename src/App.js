import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);

  const [repositories, setRepositories] = useState([]);

  function getRepositories(){
    api.get('/repositories').then(response => {
      setRepositories(response.data); 
    });
  }

  async function handleAddRepository(e) {
    e.preventDefault();

    const arrayTechs = techs.split(',');

    const data = {
      title,url, techs:arrayTechs
    }

    try{
      const response = await api.post('/repositories', data);

      const repositorie =  response.data;

      alert('Cadastro realizado com sucesso!');

      setRepositories([
        ...repositories, repositorie
      ]);

      setTitle('');
      setUrl('');
      setTechs([]);
    }catch(e){
      alert('Erro ao tentar realizar o cadastro!');
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete('/repositories/'+id+'');
    getRepositories();
  }

  useEffect(getRepositories, []);

  return (
    <div>
      <input 
        placeholder="Title" 
        value={title}
        onChange={e=>setTitle(e.target.value)}/>
      
      <input 
        placeholder="Url"
        value={url}
        onChange={e=>setUrl(e.target.value)}/>

      <input 
        placeholder="Techs separados por ','"
        value={techs}
        onChange={e=>setTechs(e.target.value)}/>

      <button onClick={handleAddRepository}>Adicionar</button>
      
      <ul data-testid="repository-list">
        {repositories.map(repo => 
          <li key={repo.id}>
            <span>
              {repo.title}
            </span>
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
