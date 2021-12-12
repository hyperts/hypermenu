const {ipcRenderer} = require('electron')
const {homedir} = require('os')

const menuBody = document.querySelector('.hypermenu.popup')
let sizeCount = 0
const menuItems = [
  {label: 'Home', onClick: () => {
    ipcRenderer.send('openDirectory', `${homedir()}`)
  }},
  {label: 'Downloads', onClick: () => {
    ipcRenderer.send('openDirectory', `${homedir()}\\Downloads`)
  }},
  {type:'divider'},
  {label: 'Hyper folder', onClick: () => {
    ipcRenderer.send('openDirectory', `${homedir()}\\.hyperbar`)
  }},
  {label: 'Settings', onClick: () => {
    ipcRenderer.send('openSettings')
  }},
  {type:'divider'},
  {label: 'Exit', onClick: () => {
    ipcRenderer.send('closeApp')
  }},
]

menuItems.forEach( item => {
  switch (item.type) {
    case 'divider': {
      const divider = document.createElement('hr')
      divider.classList.add('divider')
      menuBody.appendChild(divider)
      break;
    }
    default: {
      const button = document.createElement('div')
      button.classList.add('button')
      button.textContent = item.label ?? 'No label'
      menuBody.appendChild(button)
      if (item.onClick) {
        button.onclick = () => { 
          item.onClick()
          ipcRenderer.send('openHyperMenu')
        }
      }
      break;
    }
  }
})

const {width,height} = menuBody.getBoundingClientRect()
const bodyStyle = window.getComputedStyle(menuBody)

ipcRenderer.send('resizeHypermenu', {w: width, h: height + parseInt(bodyStyle.marginTop) + parseInt(bodyStyle.marginBottom)})