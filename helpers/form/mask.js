const DIGIT = "9", ALPHA = "A", ALPHANUM = "S", PLUS = "+"
const RegExp = /[^+\d]/g

export const getRawValue = function(value) {
  return value.replace(RegExp, "").substring(0, 12)
}

export const toPattern = function(value, pattern) {
  const
    values = value.toString().replace(RegExp, ""),
    valuesChars = values.replace(RegExp, ""),
    patternChars = pattern.replace(RegExp, ""),
    output = pattern.split("")

  let index = 0, i

  for (i = 0; i < output.length; i++) {
    // Reached the end of input
    if (index >= values.length) {
      if (patternChars.length === valuesChars.length) {
        return output.join("")
      } else {
        break
      }
    }
    // Remaining chars in input
    else {
      if (
        (output[i] === DIGIT && values[index].match(/[0-9]/))
        || (output[i] === ALPHA && values[index].match(/[a-zA-Z]/))
        || (output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/))
        || (output[i] === PLUS && values[index].match(/[+]/))
      ) {
        // Когда символ из входящего значения нужно поместить в результат
        output[i] = values[index++]
      }
    }
  }

  return output.join("").substr(0, i)
}

export const toPhonePattern = function(value) {
  return toPattern(value, "+9 (999) 999 99 99")
}

export const phonePlaceholder = "+_ (___) ___ __ __"