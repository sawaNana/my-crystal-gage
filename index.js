const beastApp = new Vue({
	el: '#beast-app',
	data: {
  	numServer: 40,
    areaNames: ['ゲル', 'バル', '砂漠'],
    colors:    ['青', '黄', '赤', '虹'],
  	servers:   [],
    currentServer: 1,
    currentArea: 'ゲル',
    currentColor: '青',
    localStorageKey: 'servers',
    moment: moment,
    error: ''
  },
  created: function() {
    const lastServers = localStorage.getItem(this.localStorageKey);
    if (lastServers) {
      this.loadServers(JSON.parse(lastServers));
      return;
    }
  	this.initialize();
  },
  methods: {
  	initialize: function() {
      for (let i = 0; i < this.numServer; i++) {
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
    validate: function() {
    	this.error = '';
    	if (this.currentServer <= 0 || this.currentServer > this.numServer) {
      	this.error = `サーバー番号は1から${this.numServer}で指定してください。`;
        return false;
      }
      return true;
    },
    save: function() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.servers));
    }
  }
});
