function ResultHandler() {

    this.resultList = document.getElementById("searchResultList");
}

ResultHandler.prototype.renderSearchResults = function(results) {
    console.log(results)
    var res = "<ul class='list-group'><div class = 'resultTopGradient'></div>"

    for(var i = 0;i < results.length;i++) {
        res += "<li class='list-group-item'><span>"+results[i].snippet.title+"<span></li>"
    }

    res += "</ul>"

    this.resultList.innerHTML = res;
}