import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import globalUrl from '../../utils/urlApi';

export default function FormSearchService({ className }) {
  const [selectData, setSelectData] = useState('codigo');
  const [inputData, setInputData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [enableButton, setEnableButton] = useState(true);
  const [services, setServices] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const getServices = async () => {
    const response = await fetch(`${globalUrl}:3001/service`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    });
    const data = await response.json();

    setServices(data);
  };

  useEffect(() => {
    const handleSKU = () => {
      if (inputData.length >= 3) {
        setEnableButton(false);
      } else {
        setEnableButton(true);
      }
    };

    const handleDescription = () => {
      if (inputData.length > 0) {
        setEnableButton(false);
      } else {
        setEnableButton(true);
      }
    };

    if (selectData === 'codigo') {
      handleSKU();
    } else {
      handleDescription();
    }
  }, [inputData]);

  useEffect(() => {
    if (firstLoad) {
      getServices();
      setFirstLoad(false);
    }
  });

  return (
    <div className={styles.wrapper}>
      <form className={className ? className : styles.form}>
        <div className={styles.container}>
          <label className={styles.labelSelect}>
            <span>Filtrar por:</span>
            <select
              className={styles.select}
              onChange={(e) => setSelectData(e.target.value)}
            >
              <option className={styles.options} value="codigo">
                CÓDIGO
              </option>
              <option className={styles.options} value="descricao">
                DESCRIÇÃO
              </option>
            </select>
          </label>

          <input
            className={styles.input}
            type="text"
            placeholder={`Digite ${
              selectData === 'codigo' ? 'o' : 'a'
            } ${selectData} do serviço`}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      </form>
      <section className={styles.servicesList}>
        {services.length >= 1 &&
          services.map((item) => {
            return (
              <div className={styles.containerService} key={item.sku}>
                <span className={styles.sku}>{`Código: ${item.sku}`}</span>
                <span
                  className={styles.serviceName}
                >{`Descricao: ${item.serviceName}`}</span>
              </div>
            );
          })}
      </section>
      <button
        type="button"
        disabled={false}
        className={styles.button}
        onClick={getServices}
      >
        Buscar
      </button>
    </div>
  );
}
