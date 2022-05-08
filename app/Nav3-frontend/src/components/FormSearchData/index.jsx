import { useState, useEffect } from 'react';

import styles from './styles.module.css';

export default function FormSearchData({
  className,
  setPeopleData,
}) {
  const [inputData, setInputData] = useState('');
  const [selectData, setSelectData] = useState('nome');
  const [enableButton, setEnableButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showResults, setShowResults] = useState(true);

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

  const getData = async () => {
    if (selectData === 'cpf' && inputData.length < 11) {
      setErrorMessage('CPF inválido');
      setInterval(() => {
        setErrorMessage('');
      }, 4000);
      return setInputData('');
    }

    // a requisição deve ser feita aqui
    // passando o selectData e o inputData para o body da request
    // setPeopleData vai receber os dados do usuario.
  };

  return (
    <div className={styles.wrapper}>
      <form className={className ? className : styles.form}>
        <div className={styles.container}>
          <label className={styles.labelSelect}>
            <span>Filtrar por:</span>
            <select className={styles.select} onChange={(e) => setSelectData(e.target.value)}>
              <option className={styles.options} value="nome">NOME</option>
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
          <button className={styles.containerUser} onClick={() => setShowResults(false)}>
            <span className={styles.userName}>Nome: Claudio Cassimiro</span>
            <span className={styles.cpf}>CPF: 704.543.044-20</span>
            <span className={styles.userAndress}>Endereço: Ipojuca - Nossa Senhora do Ó, Rua 30, loteamento canoas</span>
          </button>
          <button className={styles.containerUser} onClick={() => setShowResults(false)}>
            <span className={styles.userName}>Nome: Claudio Cassimiro</span>
            <span className={styles.cpf}>CPF: 704.543.044-20</span>
            <span className={styles.userAndress}>Endereço: Ipojuca - Nossa Senhora do Ó, Rua 30, loteamento canoas</span>
          </button>
          <button className={styles.containerUser} onClick={() => setShowResults(false)}>
            <span className={styles.userName}>Nome: Claudio Cassimiro</span>
            <span className={styles.cpf}>CPF: 704.543.044-20</span>
            <span className={styles.userAndress}>Endereço: Ipojuca - Nossa Senhora do Ó, Rua 30, loteamento canoas</span>
          </button>
          <button className={styles.containerUser} onClick={() => setShowResults(false)}>
            <span className={styles.userName}>Nome: Claudio Cassimiro</span>
            <span className={styles.cpf}>CPF: 704.543.044-20</span>
            <span className={styles.userAndress}>Endereço: Ipojuca - Nossa Senhora do Ó, Rua 30, loteamento canoas</span>
          </button>
          <button className={styles.containerUser} onClick={() => setShowResults(false)}>
            <span className={styles.userName}>Nome: Claudio Cassimiro</span>
            <span className={styles.cpf}>CPF: 704.543.044-20</span>
            <span className={styles.userAndress}>Endereço: Ipojuca - Nossa Senhora do Ó, Rua 30, loteamento canoas</span>
          </button>
          <button className={styles.containerUser} onClick={() => setShowResults(false)}>
            <span className={styles.userName}>Nome: Claudio Cassimiro</span>
            <span className={styles.cpf}>CPF: 704.543.044-20</span>
            <span className={styles.userAndress}>Endereço: Ipojuca - Nossa Senhora do Ó, Rua 30, loteamento canoas</span>
          </button>
          <button className={styles.containerUser} onClick={() => setShowResults(false)}>
            <span className={styles.userName}>Nome: Claudio Cassimiro</span>
            <span className={styles.cpf}>CPF: 704.543.044-20</span>
            <span className={styles.userAndress}>Endereço: Ipojuca - Nossa Senhora do Ó, Rua 30, loteamento canoas</span>
          </button>
          <button className={styles.containerUser} onClick={() => setShowResults(false)}>
            <span className={styles.userName}>Nome: Claudio Cassimiro</span>
            <span className={styles.cpf}>CPF: 704.543.044-20</span>
            <span className={styles.userAndress}>Endereço: Ipojuca - Nossa Senhora do Ó, Rua 30, loteamento canoas</span>
          </button>
        </div>
      ) : (
        <div className={styles.containerUserInfos}>
          <button className={styles.backToResults} onClick={() => setShowResults(true)}>
            Voltar
          </button>
          <h1>Informações do usuario aqui</h1>
        </div>
      ) }

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
