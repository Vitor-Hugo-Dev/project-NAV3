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

      <div className={styles.containerResults}>

      </div>

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
