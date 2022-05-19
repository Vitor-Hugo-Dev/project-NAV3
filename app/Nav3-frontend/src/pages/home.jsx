import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/logo.png';
import { useDialogState } from 'reakit/Dialog';
import DefaultModal from '../components/DefaultModal';

import styles from '../styles/Home.module.css';
import FormSearchData from '../components/FormSearchData';
import FormPeople from '../components/FormPeople';
import FormServices from '../components/FormServices';

export default function Home() {
  const formModal = useDialogState();
  const modalPeople = useDialogState();
  const modalServices = useDialogState();

  const handleModal = () => {
    modalPeople.show();
  };
  // push to next page
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.containerLogo}>
            <Image src={logo} alt="Logo" width={50} height={50} />
          </div>
          <button onClick={handleModal} className={styles.openModalButton}>
            <span className={styles.text}>Faça sua busca</span>
          </button>
          <button type="button" className={styles.OptionsButton}>
            Preferências
          </button>
        </div>
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.optionsCard}>
          <button
            type="button"
            className={styles.button}
            onClick={() => formModal.show()}
          >
            Cadastrar uma Pessoa
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => modalServices.show()}
          >
            Cadastrar um Serviço
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => modalServices.show()}
          >
            Pesquisar um Serviço
          </button>
        </div>
      </main>
      {formModal.visible && (
        <DefaultModal modal={formModal} windowTitle="Cadastre uma Pessoa">
          <FormPeople />
        </DefaultModal>
      )}
      {modalPeople.visible && (
        <DefaultModal modal={modalPeople} windowTitle="Faça sua busca">
          <FormSearchData />
        </DefaultModal>
      )}
      {modalServices.visible && (
        <DefaultModal modal={modalServices} windowTitle="Cadastre um Serviço">
          <FormServices />
        </DefaultModal>
      )}
    </div>
  );
}
