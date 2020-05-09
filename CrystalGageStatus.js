class CrystalGageStatus {
  constructor(numServers, areaNames, colors) {
    this.numServers = numServers;
    this.areaNames = areaNames;
    this.colors = colors;
    this.servers = [];
  }
  initialize() {
    for (let i = 0; i < this.numServers; i++) {
      const server = [];
      for (let j = 0; j < this.areaNames.length; j++) {
        server.push({
          name: this.areaNames[j],
          times: []
        });
      }
      this.servers.push(server);
    }
  }
  loadServers(newServers) {
    this.servers = newServers;
  }
  get servers() {
    return this.servers;
  }
  push(serverNumber, areaName, color) {
    this.servers[serverNumber - 1][
        this.areaNames.indexOf(areaName)
      ].times.push(
        { time: new Date(), color: color }
      );
  }
  pop(serverNumber, areaName) {
    return this.servers[serverNumber - 1][
        this.areaNames.indexOf(areaName)
      ].times.pop();
  }
  clear() {
      this.servers.length = 0;
      this.initialize();
  }
  clean() {
    const numArea = this.areaNames.length;
    for (let server = 0; server < this.numServers; server++) {
      for (let area = 0; area < numArea; area++) {
        this.cleanRecord(this.servers[server][area]);
      }
    }
  }
  cleanRecord(area) {
    let numRecord = area.times.length;
    if (numRecord < 2) {
      return;
    }
    const records = area.times;
    let lastStatus = records[0].color;
    let startIndex = 0;
    let statusCount = 0;
    for(let i = 1; i < numRecord; i++) {
      console.log(records[i].color);
      if (records[i].color === lastStatus) {
        statusCount++;
        continue;
      }
      if (statusCount > 2) {
        records.splice(startIndex + 1, statusCount - 1)
        numRecord = numRecord - statusCount + 1;
        i = i - statusCount + 1;
      }
      lastStatus = records[i].color
      statusCount = 0;
      startIndex = i;
    }
    records.splice(startIndex + 1, statusCount - 1)
    numRecord = numRecord - statusCount + 1;
  }
};