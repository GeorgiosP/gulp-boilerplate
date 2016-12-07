const alertWithCallback = (message, cb) => {
  alert(message)
  cb()
}

alertWithCallback('Hello World!', () => {
  console.log('This is my callback function running!')
})
