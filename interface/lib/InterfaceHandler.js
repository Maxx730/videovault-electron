function InterfaceHandler() {
    var context = this;

    this.content = document.getElementById("scrollable-video-content")
    this.topNavigation = document.getElementById("topNavigationMenu")
    this.settingsIcon = document.getElementById('settingsToggle')
    this.options = document.querySelectorAll(".options-column ul li")
    this.screens = document.querySelectorAll(".screen-content")

    
    for ( var i = 0; i < this.options.length; i++ ) {
        this.options[i].addEventListener('click', function () {
            for ( var k = 0; k < context.options.length; k++) {
                context.options[k].classList.remove('selected');
                context.screens[k].classList.remove('focused')
            }

            document.getElementById(this.children[1].innerText).classList.add('focused')
            this.classList.add('selected')
        })
    }

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