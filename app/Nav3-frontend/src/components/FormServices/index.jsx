import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import regex from '../../regex/';

export default function FormServices() {
  const formDefaultValues = {
    sku: '',
		servico: ''
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm(formDefaultValues);

  const onSubmit = async (data) => {
    const payload = {
      sku: Number(data.sku),
			serviceName: data.servico
    }

    try {
      await fetch(`http://localhost:3001/service`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(payload),
      });

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="number"
          name="sku"
          placeholder="Digite o código do serviço"
          {...register('sku', { required: "Required", })}
        />

        {errors.sku && errors.sku.type === 'required' && <span className={styles.error}>Esse campo é obrigatório</span>}

        <input
          className={styles.input}
          type="text"
          name="servico"
          placeholder="Descrição do Serviço"
          {...register('servico', { required: "Required", minLength: 8 })}
        />

        {errors.servico && errors.servico.type === 'required' && <span className={styles.error}>Esse campo é obrigatório</span>}
        {errors.servico && errors.servico.type === 'minLength' && <span className={styles.error}>servico inválido, descreva o serviço com pelo menos 8 caracteres </span>}
      </div>

      <button
        className={styles.button}
        type="submit"
        {...isSubmitting}
      >
        Enviar
      </button>
    </form>
  );
}