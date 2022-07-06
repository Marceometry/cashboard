export const masks = {
  valueToMoney(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  },

  monetaryValue(value: string, maxNumberCharacter = 12) {
    let cleanValue = value?.toString().replace(/\D/g, '')

    if (cleanValue.startsWith('00')) cleanValue = cleanValue.replace('0', '')

    const max: string = '999999999999999'.substring(0, maxNumberCharacter)
    if (Number(cleanValue) > Number(max)) {
      cleanValue = cleanValue?.slice(0, maxNumberCharacter)
    }

    const tempValue =
      cleanValue?.length < 4 ? cleanValue?.padStart(3, '0') : +cleanValue

    return `R$ ${String(tempValue)
      ?.replace(/(\d)(\d{2})$/, '$1,$2')
      ?.replace(/(?=(\d{3})+(\D))\B/g, '.')}`
  },

  unMaskMonetaryValue(value: string) {
    return value?.replace('R$ ', '').replace('.', '').replace(',', '.')
  },
}
