//Object that will be used to change the content view on the right side of the UI.
function ContentHandler() {
    console.log("INITIALIZED CONTENT HANDLER!");

    this.contentTabs = new Array();
    this.tabList = document.getElementById("content-tab-list");

    this.contentTabs.push(new Tab("Welcome",4))
    this.contentTabs.push(new Tab("Rythem of the Night",5))
    this.contentTabs.push(new Tab("What is Love?",6))

    this.renderTabs();
}

ContentHandler.prototype.renderTabs = function(ytId){
    console.log("RENDERING TABS...")
    this.tabList.innerHTML = "";

    for( var i = 0;i < this.contentTabs.length;i++ ) {
        this.tabList.innerHTML += this.contentTabs[i].markup;
    }
}