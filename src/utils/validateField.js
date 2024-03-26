const validateField = (inputValue, formDataState, isRequired, regexTest, errorMessage) => {
  const clone = {...formDataState} 
  if (isRequired && !inputValue) {
    clone.error = "Campo obligatorio"
  } else if(regexTest && !regexTest.test(inputValue)) {
    clone.error = errorMessage
  } else {
    clone.error = null
  }
  clone.value = inputValue
  clone.hasUserInteracted = true; // when it is first changed it will always display error
  return clone
}

export default validateField