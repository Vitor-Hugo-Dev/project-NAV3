import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import regex from '../../regex/';

export default function FormPeople() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return(
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          name="fullName"
          placeholder="Nome completo da pessoa"
          {...register('fullName', { required: "Required", pattern: regex.fullName })}
        />

        {errors.fullName && errors.fullName.type === 'required' && <span className={styles.error}>Esse campo é obrigatório</span>}
        {errors.fullName && errors.fullName.type === 'pattern' && <span className={styles.error}>Nome inválido, digite o nome completo</span>}

        <input
          className={styles.input}
          type="text"
          name="cpf"
          placeholder="CPF da pessoa"
          {...register('cpf', { required: "Required", pattern: regex.cpf })}
        />

        {errors.cpf && errors.cpf.type === 'required' && <span className={styles.error}>Esse campo é obrigatório</span>}
        {errors.cpf && errors.cpf.type === 'pattern' && 
          <span className={styles.error}
          >
            Digite o CPF no formato (xxx.xxx.xxx-xx) ou (xxxxxxxxxxx)
          </span>}

        <input
          className={styles.input}
          type="text"
          name="birthDate"
          placeholder="Data de nascimento da pessoa DD/MM/AAAA"
          {...register('birthDate', { required: "Required", pattern: regex.birthDate })}
        />

        {errors.birthDate && errors.birthDate.type === 'required' && <span className={styles.error}>Esse campo é obrigatório</span>}
        {errors.birthDate && errors.birthDate.type === 'pattern' && <span className={styles.error}>Data inválida, digite a data no formato DD/MM/AAAA</span>}

        <input
          className={styles.input}
          type="text"
          name="phoneNumber"
          placeholder="Telefone da pessoa (xx) xxxxx-xxxx"
          {...register('phoneNumber', { required: "Required", pattern: regex.phoneNumber })}
        />

        {errors.phoneNumber && errors.phoneNumber.type === 'required' && <span className={styles.error}>Esse campo é obrigatório</span>}
        {errors.phoneNumber && errors.phoneNumber.type === 'pattern' && <span className={styles.error}>Telefone inválido, digite o telefone no formato (xx) xxxxx-xxxx</span>}

        <input
          className={styles.input}
          type="text"
          name="email"
          placeholder="E-mail da pessoa"
          {...register('email', { required: "Required", pattern: regex.email })}
        />

        {errors.email && errors.email.type === 'required' && <span className={styles.error}>Esse campo é obrigatório</span>}
        {errors.email && errors.email.type === 'pattern' && <span className={styles.error}>E-mail inválido</span>}

        <input
          className={styles.input}
          type="text"
          name="district"
          placeholder="Cidade da pessoa"
          {...register('district', { required: "Required", minLength: 3 })}
        />

        {errors.district && errors.district.type === 'required' && <span className={styles.error}>Esse campo é obrigatório</span>}
        {errors.district && errors.district.type === 'minLength' && <span className={styles.error}>Cidade inválida, digite a cidade completa</span>}

        <input
          className={styles.input}
          type="text"
          name="neighborhood"
          placeholder="Bairro da pessoa"
          {...register('neighborhood', { required: "Required", minLength: 5 })}
        />

        {errors.neighborhood && errors.neighborhood.type === 'required' && <span className={styles.error}>Esse campo é obrigatório</span>}
        {errors.neighborhood && errors.neighborhood.type === 'minLength' && <span className={styles.error}>Bairro inválido, digite o bairro completo</span>}

        <input
          className={styles.input}
          type="text"
          name="street"
          placeholder="Rua da pessoa"
          {...register('street', { required: "Required", minLength: 5 })}
        />

        {errors.street && errors.street.type === 'required' && <span className={styles.error}>Esse campo é obrigatório</span>}
        {errors.street && errors.street.type === 'minLength' && <span className={styles.error}>Rua inválida, digite a rua completa</span>}

        <input
          className={styles.input}
          type="text"
          name="number"
          placeholder="Número da casa da pessoa"
          {...register('number', { required: "Required", minLength: 1 })}
        />

        {errors.number && errors.number.type === 'required' && <span className={styles.error}>Esse campo é obrigatório</span>}
        {errors.number && errors.number.type === 'minLength' && <span className={styles.error}>Número inválido, digite o número completo</span>}
        
        <input
          className={styles.input}
          type="text"
          name="complement"
          placeholder="Complemento"
        />
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
