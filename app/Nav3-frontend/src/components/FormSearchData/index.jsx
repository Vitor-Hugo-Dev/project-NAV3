import { useState, useEffect } from 'react';

import styles from './styles.module.css';

export default function FormSearchData({
  className,
}) {
  const [inputData, setInputData] = useState('');
  const [selectData, setSelectData] = useState('name');
  const [enableButton, setEnableButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showResults, setShowResults] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const handleCpfOrName = () => {
      if (inputData.length >= 3) {
        setEnableButton(false);
      } else {
        setEnableButton(true);
      }
    }

    const handleId = () => {
      if (inputData.length >= 1) {
        setEnableButton(false);
      } else {
        setEnableButton(true);
      }
    }

    if (selectData !== 'id') {
      handleCpfOrName();
    } else {
      handleId();
    }
  }, [inputData]);

  const formatCpf = (value) => {
    if (value.includes('.') || value.includes('-')) {
      return value;
    }

    const cpf = value.replace(/[^\d]/g, "");
  
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  const getData = async () => {
    if (selectData === 'cpf' && inputData.length < 11) {
      setErrorMessage('CPF inválido');
      setInterval(() => {
        setErrorMessage('');
      }, 4000);
      return setInputData('');
    }

    const payload = {
      role: '',
      termo: '',
    }

    if (selectData === 'name' || selectData === 'id') {
      payload.role = selectData;
      payload.termo = inputData;
    }

    if (selectData === 'cpf') {
      payload.role = selectData;
      payload.termo = formatCpf(inputData);
    }

    const response = await fetch('http://localhost:3001/people/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);

    if (data.length >= 1) {
      setResults(data);
      setInputData('');
      setSelectData('name');
      return setShowResults(true);
    }

    setResults([data]);
    setInputData('');
    setSelectData('name');
  };

  return (
    <div className={styles.wrapper}>
      <form className={className ? className : styles.form}>
        <div className={styles.container}>
          <label className={styles.labelSelect}>
            <span>Filtrar por:</span>
            <select className={styles.select} onChange={(e) => setSelectData(e.target.value)}>
              <option className={styles.options} value="name">NOME</option>
              <option className={styles.options} value="cpf">CPF</option>
              <option className={styles.options} value="id">ID</option>
            </select>
          </label>

          <input
            className={styles.input}
            type="text"
            placeholder={`Digite o ${selectData} da pessoa`}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
      </form>

      {showResults ? (
        <div className={styles.containerResults}>
          {results.length > 1 && results.map((item) => {
            return (
              <button className={styles.containerUser} onClick={() => setShowResults(false)}>
                <span className={styles.userName}>{`Nome: ${item.fullName}`}</span>
                <span className={styles.cpf}>{`CPF: ${item.cpf}`}</span>
                <span className={styles.userAndress}>{`
                  Endereço: ${item.address.district} - ${item.address.neighborhood}, ${item.address.street}, casa: ${item.address.Number}.
                `}</span>
              </button>
            )
          })}
        </div>
      ) : (
        <div className={styles.containerUserInfos}>
          <button className={styles.backToResults} onClick={() => setShowResults(true)}>
            Voltar
          </button>
          <h1>Informações do usuario aqui</h1>
        </div>
      )}

      <button
        type="button"
        disabled={enableButton}
        className={styles.button}
        onClick={getData}
      >
        Buscar
      </button>
    </div>
  );
}
