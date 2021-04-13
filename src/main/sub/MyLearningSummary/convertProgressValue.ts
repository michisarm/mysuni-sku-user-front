export function convertProgressValue(value: number) {
  if (value === undefined || value === NaN || value === null) {
    return
  }
  let percent = ''
  if (String(value).length === 1) {
    if (value > 5 && value < 16) {
      percent = '15'
    } else {
      percent = '5'
    }
  } else if (String(value).length === 2) {
    percent = String(value).substr(0, 1) + 5
  } else if (String(value).length === 3) {
    percent = '100'
  }

  return Number(percent)
}