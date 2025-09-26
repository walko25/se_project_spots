export const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (
  validationConfig,
  formElement,
  inputElement,
  errorMessage
) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = formElement.querySelector("#" + errorMessageID);
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorMessageElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (validationConfig, formElement, inputElement) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = formElement.querySelector("#" + errorMessageID);
  errorMessageElement.textContent = "";
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorMessageElement.classList.remove(validationConfig.errorClass);
};

const checkInputValidity = (validationConfig, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      validationConfig,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(validationConfig, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

export const resetValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(validationConfig, formElement, inputElement);
  });

  toggleButtonState(validationConfig, inputList, buttonElement);
};

const toggleButtonState = (validationConfig, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationConfig);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

export const disableButton = (buttonElement, validationConfig) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(validationConfig, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(validationConfig, formElement, inputElement);
      toggleButtonState(validationConfig, inputList, buttonElement);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(validationConfig);
