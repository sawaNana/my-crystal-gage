const beastApp = new Vue({
	el: '#beast-app',
	data: {
  	numServers: 40,
    areaNames: ['ゲル', 'バル', '砂漠'],
    colors:    ['青', '黄', '赤', '虹'],
  	servers:   [],
    currentServer: 1,
    currentArea: 'ゲル',
    currentColor: '青',
    localStorageKey: 'servers',
    moment: moment,
    error: '',
    status: null
  },
  created: function() {
    const lastServers = localStorage.getItem(this.localStorageKey);
    if (lastServers) {
      this.loadServers(JSON.parse(lastServers));
      return;
    }
    this.initialize();
    this.status = new CrystalGageStatus(this.numServers, this.areaNames, this.colors);
  },
  mounted: function() {
    feather.replace();
  },
  methods: {
  	initialize: function() {
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
    },
    loadServers: function(lastServers) {
      this.servers = lastServers;
    },
  	push: function() {
    	if (!this.validate()) {
      	return;
      }
    	this.servers[this.currentServer - 1][
      		this.areaNames.indexOf(this.currentArea)
        ].times.push(
      		{ time: new Date(), color: this.currentColor }
        );
      this.save();
    },
    pop: function() {
    	if (!this.validate()) {
      	return;
      }
    	const removedServer = this.servers[this.currentServer - 1][
      		this.areaNames.indexOf(this.currentArea)
        ].times.pop();
      this.save();
      return removedServer;
    },
    clear: function() {
    	this.servers.length = 0;
      this.initialize();
      this.save();
    },
    clean: function() {
      const numArea = this.areaNames.length;
      for (let server = 0; server < this.numServers; server++) {
        for (let area = 0; area < numArea; area++) {
          this.cleanRecord(this.servers[server][area]);
        }
      }
      this.save();
    },
    cleanRecord: function(area) {
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
    },
    validate: function() {
    	this.error = '';
    	if (this.currentServer <= 0 || this.currentServer > this.numServers) {
      	this.error = `サーバー番号は1から${this.numServers}で指定してください。`;
        return false;
      }
      return true;
    },
    save: function() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.servers));
    },
    gotoOptionControls: function() {
      const element = document.documentElement;
      const bottom = element.scrollHeight - element.clientHeight;
      $('html, body').animate({scrollTop: bottom});
    }
  }
});
