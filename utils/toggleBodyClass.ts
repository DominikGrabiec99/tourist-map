const toggleBodyClass = (className: string, add: boolean) => {
  if(add){
    document.documentElement.classList.add(className)
    return
  }
  document.documentElement.classList.remove(className)
}

export default toggleBodyClass;