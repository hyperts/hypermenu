import React from '../../../modules/react'


function MenuComponent({config, ipcRenderer}) {
  const avatarURL = config.getValue('widgets', 'hyper_menu', 'imageurl')
  return <>
    <div 
      className="hypermenu wrapper"
      onClick ={(e) => {
        const target = e.target as HTMLElement
        const bounds = target.getBoundingClientRect()
        console.log("Sending open hyper menu")
        ipcRenderer.send('openHyperMenu', { x: target.offsetLeft, y: bounds.y, w: bounds.width, h: bounds.height})
      }}
      onContextMenu = {()=>{
        console.log("Context menu")
      }}
    >
        <div
          onContextMenu ={()=>{
            console.log("Context menu")
          }}
          className="hypermenu display"
          style={{
            backgroundImage: avatarURL === "" ? `url(assets://logo.svg)` : `url(${avatarURL})`,
            backgroundSize:  avatarURL === "" ? `calc(var(--barsize) - var(--padding) - 1)` : 'cover'
          }}
        />
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width={24}
          height={24}
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="hypermenu icondown">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
  </>
}

export const styles = ['style/index.css']

export default function() {
  return <MenuComponent
    //@ts-expect-error
    key={'hyper-menu'} 
    config={this.config} 
    ipcRenderer={this.api.ipcRenderer} 
  />
}