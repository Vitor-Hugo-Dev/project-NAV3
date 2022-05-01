import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/logo.png";
import { useDialogState } from "reakit/Dialog";
import DefaultModal from "../components/DefaultModal";

import styles from "../styles/Home.module.css";
import FormSearchData from "../components/FormSearchData";

export default function Home() {
  const modal = useDialogState();
  const [peopleData, setPeopleData] = useState({});

  const handleModal = () => {
    modal.show();
  };

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
          <span className={styles.cardRole}>Listar Pessoas</span>
        </div>
      </main>
      {modal.visible && (
        <DefaultModal modal={modal} windowTitle="Faça sua busca">
          <>
            <FormSearchData setPeopleData={setPeopleData} />
            {peopleData.name && (
              <div className={styles.peopleInfoCard}>
                {/* Aqui vou imprimir os dados do usuario encontrado */}
              </div>
            )}
          </>
        </DefaultModal>
      )}
    </div>
  );
}
