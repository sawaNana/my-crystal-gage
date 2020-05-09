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
    this.status = new CrystalGageStatus(this.numServers, this.areaNames, this.colors);
    const lastServers = localStorage.getItem(this.localStorageKey);
    if (lastServers) {
      this.status.loadServers(JSON.parse(lastServers));
      this.servers = this.status.servers
      return;
    }
    this.status.initialize();
    this.servers = this.status.servers;
  },
  mounted: function() {
    feather.replace();
  },
  methods: {
  	push: function() {
    	if (!this.validate()) {
      	return;
      }
      this.status.push(this.currentServer, this.currentArea, this.currentColor);
      this.save();
    },
    pop: function() {
    	if (!this.validate()) {
      	return;
      }
    	const removedServer = this.status.pop(
        this.currentServer, this.currentArea
      );
      this.save();
      return removedServer;
    },
    clear: function() {
      this.status.clear();
      this.save();
    },
    clean: function() {
      this.status.clean();
      this.save();
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
