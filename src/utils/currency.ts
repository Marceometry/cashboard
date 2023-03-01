export const currency = {
  valueToMoney(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(
      value / 100 // value is in cents
    )
  },

  maskMonetaryValue(value: string | number, maxNumberCharacter = 12) {
    let cleanValue = String(value)?.toString().replace(/\D/g, '')

    if (cleanValue.startsWith('0')) cleanValue = cleanValue.replace('0', '')

    const max: string = '999999999999999'.substring(0, maxNumberCharacter)
    if (Number(cleanValue) > Number(max)) {
      cleanValue = cleanValue?.slice(0, maxNumberCharacter)
    }

    const tempValue =
      cleanValue?.length < 4 ? cleanValue?.padStart(3, '0') : +cleanValue

    const response = `R$ ${String(tempValue)
      ?.replace(/(\d)(\d{2})$/, '$1,$2')
      ?.replace(/(?=(\d{3})+(\D))\B/g, '.')}`

    return response
  },

  unMaskMonetaryValue(value: string | number) {
    const response = String(value)
      ?.replace('R$ ', '')
      .replace('.', '')
      .replace(',', '')

    return Number(response)
  },
}
