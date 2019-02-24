export default value => {
  const date = new Date(value)
  console.log(value)
  return date.toLocaleString(['en-US'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })
}
