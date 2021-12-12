export default function () {
  const api = this.api
  api.ipcMain.on('openHyperMenu', (e, data) => {
    if (!api.windows?.hypermenu) {
      
      api.windows['hypermenu'] = new api.browserWindow({
        width: 200,
        height: 200,
        x: 0,
        y: 0,
        frame: false,
        thickFrame: false,
        resizable: false,
        skipTaskbar: true,
        focusable: true,
        fullscreenable: false,
        show: true,
        minimizable: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        }
      })
  
      api.windows?.hypermenu.loadURL('widgets://hyper-menu/assets/menu.html')

      api.windows?.hypermenu.on('close', () =>{
        delete api.windows?.hypermenu
      })

      api.windows?.hypermenu.on('blur', () =>{
        setTimeout(()=>{
          api.windows?.hypermenu?.close()
          delete api.windows?.hypermenu
        }, 100)
      })

      api.ipcMain.emit('getScreenSize')

    } else {
      api.windows?.hypermenu.close()
      delete api.windows?.hypermenu
    }
  })

  api.ipcMain.on('sendScreenSize', (size) => {
    if (!api.windows.hypermenu) { return }
    
    const {w, h} = size
    // TODO: Make it open on mouse X?
    console.log("Calculated menu size:", h, api.windows.hypermenu.getContentSize())
    api.windows?.hypermenu.setPosition(
      this.config.getValue('widgets', 'hyper_menu', 'xpos'), 
      this.config.getValue('general', 'position', 'dock-pos') === "top" 
        ? this.config.getValue('appearence', 'sizes', 'height') + this.config.getValue('general', 'position', 'vertical-margin')
        : h - this.config.getValue('general', 'position', 'vertical-margin') - (12 * 2) - (11 * 2) - (this.config.getValue('general', 'position', 'vertical-margin') * 2) - this.config.getValue('appearence', 'sizes', 'height') - api.windows.hypermenu.getContentSize()[1] - 9 
        // 11: electron frame * top, bottom
        // 12: padding not calculated by function * top, bottom
        // 9: hypermenu margin from bar
        // vertical margin * 2
        // bar size
        // screen size
        // menu size
        )
})

  api.ipcMain.on('resizeHypermenu', (e, size) => {
    const {w,h} = size
    console.log("Processed size", w, h)
    if (!api.windows?.hypermenu) { return }
    api.windows.hypermenu.setSize(w,h)
  })

  api.ipcMain.on('openDirectory', (e,directory) => {
    this.api.shell.openPath(directory)
  })

}