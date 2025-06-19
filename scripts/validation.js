const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (settings, formElement, inputElement, errorMessage) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = formElement.querySelector("#" + errorMessageID);
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add(settings.inputErrorClass);
  errorMessageElement.classList.add(settings.errorClass);
};

const hideInputError = (settings, formElement, inputElement) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = formElement.querySelector("#" + errorMessageID);
  errorMessageElement.textContent = "";
  inputElement.classList.remove(settings.inputErrorClass);
  errorMessageElement.classList.remove(settings.errorClass);
};

const checkInputValidity = (settings, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      settings,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(settings, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const resetValidation = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(settings, formElement, inputElement);
  });

  toggleButtonState(settings, inputList, buttonElement);
};

const toggleButtonState = (settings, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, settings);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const disableButton = (buttonElement, settings) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.inactiveButtonClass);
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(settings, formElement, inputElement);
      toggleButtonState(settings, inputList, buttonElement);
    });
  });
};

const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

enableValidation(settings);
