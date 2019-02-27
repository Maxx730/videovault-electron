//Object that will be used to change the content view on the right side of the UI.
function ContentHandler() {
    this.contentTabs = new Array()
    this.tabList = document.getElementById("content-tab-list")
    this.tabContainer = document.getElementById("tab-container")
}

ContentHandler.prototype.renderTabs = function(){
    this.tabList.innerHTML = ''
    var tabs = document.createElement('UL')

    for( var i = 0;i < this.contentTabs.length;i++ ) {
        var item = document.createElement('LI')
        item.appendChild(document.createTextNode(this.contentTabs[i].title))
        tabs.appendChild(item)
    }

    this.tabList.appendChild(tabs)
}

ContentHandler.prototype.addTab = function(payload){
    var load = JSON.parse(payload)
    this.contentTabs.push(new Tab(load.snippet.title,load.id.videoId))
    this.renderTabs()
}

ContentHandler.prototype.removeTab = function(payload) {
    console.log(payload)
}