import React, { useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // État pour le message d'erreur

  // Création d'une référence pour le formulaire
  const formRef = useRef(null);

  const validateForm = useCallback(() => {
    if (!formRef.current) return false;

    // Récupérer tous les champs du formulaire
    const inputs = Array.from(formRef.current.querySelectorAll("input, textarea, select"));

    // Vérifier si tous les champs requis sont remplis
    return inputs.every((input) => input.value.trim() !== "");
  }, []);

  // Fonction de validation de l'email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();

      // Validation des champs
      if (!validateForm()) {
        setErrorMessage("Veuillez remplir tous les champs.");
        return;
      }

      // Vérification du format de l'email
      const emailField = formRef.current.querySelector('input[type="email"]');
      if (emailField && !validateEmail(emailField.value)) {
        setErrorMessage("Veuillez entrer un email valide.");
        return;
      }

      setErrorMessage(""); // Réinitialiser le message d'erreur
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        if (onSuccess) onSuccess(); // Appelle de la fonction de succès

        // Réinitialisation du formulaire
        if (formRef.current) {
          formRef.current.reset();
        }

      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [validateForm, onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact} ref={formRef}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" type={FIELD_TYPES.EMAIL} /> {/* Utilisation du type EMAIL ici */}
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
          {errorMessage && <p style={{color: 'white'}}>{errorMessage}</p>}
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
