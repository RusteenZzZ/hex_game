const mapLoader = (mapName: string) => {
  return require(`../maps/${mapName}.json`).worldMap
  
}

export default mapLoader