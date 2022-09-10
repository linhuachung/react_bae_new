const regex = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  number: /^[0-9][0-9]*([.][0-9]{2}|)$/,
  numberThan0: /^[0-9][0-9]*([.][0-9]{2}|)$/
}

export default regex
