const CreateAccount = () => {

  return (
    <section className="form-createAccount__conatiner">
      <h1 className="form-createAccount__title">Crear cuenta</h1>
      <form className="form-createAccount__form">
        <fieldset className="form-createAccount__field">
            <label htmlFor="name" className="form-createAccount__field-label">Nombre</label>
            <input id="name" type="text" />
        </fieldset>
      </form>
    </section>
  );
}

export default CreateAccount;