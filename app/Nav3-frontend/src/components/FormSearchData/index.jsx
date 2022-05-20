import { useState, useEffect } from 'react';

import styles from './styles.module.css';

import PeopleCredential from '../PeopleCredential';

export default function FormSearchData({
  className,
}) {
  const [inputData, setInputData] = useState('');
  const [selectData, setSelectData] = useState('name');
  const [enableButton, setEnableButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showResults, setShowResults] = useState(true);
  const [results, setResults] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const [userInfos, setUserInfos] = useState({});
  const [showUserCredentials, setShowUserCredentials] = useState(true);

  useEffect(() => {
    const handleCpfOrName = () => {
      if (inputData.length >= 3) {
        setEnableButton(false);
      } else {
        setEnableButton(true);
      }
    }

    const handleId = () => {
      if (inputData.length > 0) {
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
    }-1

    const response = await fetch('http://localhost:3001/people/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (payload.role === 'cpf' || payload.role === 'id') {
      const auxArr = [];
      auxArr.push(data);
      setResults(auxArr);
    } else {
      setResults(data);
    }

    setInputData('');
    setSelectData('name');
    setFirstRender(false);
    setShowResults(true);
  };

  const setUserData = (data) => {
    setUserInfos(data);
    setShowResults(false);
  };

  return showUserCredentials ? (
    <div className={styles.wrapper}>
      <form className={className ? className : styles.form}>
        <div className={styles.container}>
          <label className={styles.labelSelect}>
            <span>Filtrar por:</span>
            <select className={styles.select} onChange={(e) => setSelectData(e.target.value)}>
              <option className={styles.options} value="name">NOME</option>
              <option className={styles.options} value="cpf">CPF</option>
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
          {results.length >= 1 && results.map((item) => {
            return (
              <button key={item.cpf} className={styles.containerUser} onClick={() => setUserData(item)}>
                <span className={styles.userName}>{`Nome: ${item.fullName}`}</span>
                <span className={styles.cpf}>{`CPF: ${item.cpf}`}</span>
                <span className={styles.userAndress}>{`
                  Endereço: ${item.address.district} - ${item.address.neighborhood}, ${item.address.street}, casa: ${item.address.number}.
                `}
                </span>
              </button>
            )
          })}

          {results.length === 0 && !firstRender && (
            <h3 className={styles.noResults}>Nenhum resultado encontrado</h3>
          )}
        </div>
      ) : (
        <div className={styles.containerUserInfos}>
          <button className={styles.backToResults} onClick={() => setShowResults(true)}>
            Voltar
          </button>
          <button className={styles.printUserCredential} onClick={() => setShowUserCredentials(false)}>
            Imprimir Carteirinha
          </button>
          <div className={styles.containerButtons}>
            <button className={styles.findServices}>
              Listar Serviços
            </button>
            <button className={styles.addServices}>
              Adicionar Serviço
            </button>
            <button className={styles.addPayment}>
              Adicionar Pagamento
            </button>
            <button className={styles.deletePeople}>
              Deletar Pessoa
            </button>
          </div>
          <div className={styles.userInfos}>
              <span className={styles.fullName}>{`Nome: ${userInfos.fullName}`}</span>
              <span className={styles.userCpf}>{`CPF: ${userInfos.cpf}`}</span>
              <span className={styles.address}>{`
                  Endereço: ${userInfos.address.district} - ${userInfos.address.neighborhood}, ${userInfos.address.street}, casa: ${userInfos.address.number}
                `}
                </span>
              <span className={styles.userEmail}>{`Email: ${userInfos.contacts.email}`}</span>
              <span className={styles.userPhone}>{`Telefone: ${userInfos.contacts.phoneNumber}`}</span>
          </div>
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
  ) : (
    <PeopleCredential userInfos={userInfos} setShowUserCredentials={setShowUserCredentials}/>
  );
}
