function ResultHandler() {

    this.resultList = document.getElementById("searchResultList");
}

ResultHandler.prototype.renderSearchResults = function(results) {
    console.log(results)
    var res = "<ul class='list-group'>"

    for(var i = 0;i < results.length;i++) {
        res += "<li class='list-group-item'>"+results[i].snippet.title+"</li>"
    }

    res += "</ul>"

    this.resultList.innerHTML = res;
}