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
    moment: moment,
    error: ''
  },
  created: function() {
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
  	push: function() {
    	if (!this.validate()) {
      	return;
      }
    	this.servers[this.currentServer - 1][
      		this.areaNames.indexOf(this.currentArea)
        ].times.push(
      		{ time: new Date(), color: this.currentColor }
      	);
    },
    pop: function() {
    	if (!this.validate()) {
      	return;
      }
    	return this.servers[this.currentServer - 1][
      		this.areaNames.indexOf(this.currentArea)
        ].times.pop();
    },
    clear: function() {
    	this.servers.length = 0;
      this.initialize();
    },
    validate: function() {
    	this.error = '';
    	if (this.currentServer <= 0 || this.currentServer >= this.numServer) {
      	this.error = `サーバー番号は1から${this.numServer}で指定してください。`;
        return false;
      }
      return true;
    }
  }
});
