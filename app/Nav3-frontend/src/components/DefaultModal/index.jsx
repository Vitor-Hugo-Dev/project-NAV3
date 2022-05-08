import { Dialog } from "reakit/Dialog";
import { RiCloseFill } from "react-icons/ri";

import styles from './styles.module.css';

export default function DefaultModal({
  modal,
  windowTitle,
  children,
}) {
  return (
    <>
      <Dialog
        {...modal}
        aria-label={windowTitle}
        className={styles.defaultModal}
      >
        <div
          data-testid="content"
          className={styles.content}
        >
          <div className={styles.headline}>

            <h4
              data-testid="title"
              className={
                styles.windowTitle}
            >
              <span data-testid="windowTitle">
                {windowTitle}
              </span>
            </h4>

            
            <button
              data-testid="buttonWithHandle"
              onClick={() => {
                modal.hide();
              }}
              className={styles.buttonHide}
            >
              <RiCloseFill size={24} className={styles.iconClose} />
            </button>
          </div>

          <div
            data-testid="bodyContainer"
            className={styles.body}
          >
            <div className={styles.form}>{children}</div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
