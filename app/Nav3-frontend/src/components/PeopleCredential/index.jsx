import styles from './styles.module.css';
import { useState } from 'react';

function PeopleCredential({
  userInfos,
  setShowUserCredentials,
}) {
  const [imageSRC, setImageSRC] = useState('');

  const setImage = (e) => {
    const file = new FileReader();
    file.readAsDataURL(e.target.files[0]);

    file.onloadend = (e) => {
      setImageSRC(e.target.result);
    }
  };

  return (
    <main className={styles.mainContainer}>
      <button className={styles.backButton} onClick={() => setShowUserCredentials(true)}>
        Voltar
      </button>

      <h1 className={styles.instructions}>Para efetuar a impressão da carteirinha do usuário, pressione as teclas Ctrl + P</h1>

      <div className={styles.container}>
        <h2 className={styles.AssociationName}>Associação Bela Esperança Livre</h2>
        <div className={styles.card}>
            {imageSRC && (
              <img
                className={styles.userPicture}
                src={imageSRC}
                alt="Foto do Usuario"
              />
            )}

            <div className={styles.cardInfos}>
                <span className={styles.infos}>{userInfos.fullName}</span>
                <span className={styles.infos}>Associado</span>
            </div>
        </div>
      </div>

      <input className={styles.chooseFile} type="file" name="imageSRC" onChange={(e) => setImage(e)} />
    </main>
  );
}

export default PeopleCredential;
