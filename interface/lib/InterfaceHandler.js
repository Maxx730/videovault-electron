function InterfaceHandler() {
    var context = this;

    this.content = document.getElementById("scrollable-video-content")
    this.topNavigation = document.getElementById("topNavigationMenu")
    this.settingsIcon = document.getElementById('settingsToggle')

    this.settingsIcon.addEventListener('click',function(){
        document.getElementsByClassName('modal-shade')[0].classList.remove('hide')
        document.getElementById('SettingsModalLong').style.display = 'block'
        
        var closers = document.querySelectorAll('[data-dismiss]');
        
        for(var i = 0;i < closers.length;i++) {
            closers[i].addEventListener('click', function() {
                document.getElementsByClassName('modal-shade')[0].classList.add('hide')
                document.getElementById('SettingsModalLong').style.display = 'none'
            })
        }
    })

    this.content.addEventListener("scroll",function(event){
        if(event.target.scrollTop > 80){
            context.topNavigation.classList.add("fixedTopNavigation")
        }else{
            context.topNavigation.classList.remove("fixedTopNavigation")
        }
    })
}