//Object used to keep track of information in different tab objects within the UI.
function Tab(title,ytId){

    this.title = title;
    this.ytId = ytId;
    this.active = false;

    this.markup = `<li onclick='window.contentHandler.renderTabs(`+this.ytId+`)'`+this.active+`>`+this.title+`<i class="material-icons" onclick='this.contentHandler.removeTab(`+this.ytId+`)'>clear</i></li>`
}

Tab.prototype.returnMarkup = function(isFirst) {
    
}