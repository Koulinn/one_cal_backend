const errorMsgOnValidation = (missingPropertiesText) => {
    const lastComa = missingPropertiesText.lastIndexOf(',')
    const msg = missingPropertiesText.slice(0, lastComa) + '.'
    return msg
}

const aux = { errorMsgOnValidation }

export default aux
