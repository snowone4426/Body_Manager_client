export const Validation = (key, value) => {
  let result = true

  switch (key) {
    case 'email':
      const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
      result = !emailCheck.test(value)
      break
    case 'password':
      const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
      result = !pwdCheck.test(value)
      break
    case 'name':
      if (value.length < 15) result = false
      break
    case 'phone':
      const phoneCheck = /^([0-9]{2,3}-[0-9]{3,4}-[0-9]{4})$/
      result = !phoneCheck.test(value)
      break
    case 'birth':
      const birthCheck = /^([0-9]{4}-[0-9]{2}-[0-9]{2})$/
      result = !birthCheck.test(value)
      break
    case 'height':
      result = isNaN(Number(value))
      break
    default:
      result = false
  }

  return result
}
