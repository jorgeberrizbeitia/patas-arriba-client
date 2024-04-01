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
  if (!clone.hasUserInteracted) {
    // handling touch on first user interaction
    clone.hasUserInteracted = true; 
  }
  return clone
}

export default validateField