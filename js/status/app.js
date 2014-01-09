var vcoapp = function(){
    this.init= function(){
        addEventListener('load', function(){ setTimeout(function(){ window.scrollTo(0, 1); }, 100); });
        bouncefix.add('scroll');//fixed 黑屏问题
    }
}

var runApps = new vcoapp();
runApps.init();