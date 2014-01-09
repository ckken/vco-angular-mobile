/*
 ---

 script: Element.Style.Transform.js

 description:
 Provides a cross browser way of letting you use the CSS3 transform and transition properties.
 Inspired by http://github.com/zachstronaut/jquery-css-transform

 license: MIT-style license

 authors:
 - Stian Didriksen
 - Amadeus Demarzi

 requires:
 - core:1.3/Browser

 provides: [Element.Style.Transform, Element.Style.Transition]

 ...
 */
Element.Properties.transform = {
    set: function(transform){
        var property = 'transform';
        if(Browser.safari || Browser.chrome || Browser.Platform.ios)
            property = 'WebkitTransform';
        if(Browser.firefox4)
            property = 'MozTransform';
        if(Browser.opera)
            property = 'OTransform';

        this.style[property] = transform;
        this.store('transform', transform);
    },

    get: function(){
        return this.retrieve('transform', '');
    }
};

Element.Properties.transition = {
    set: function(transition){
        var property = 'transition';
        if(Browser.safari || Browser.chrome || Browser.Platform.ios)
            property = 'WebkitTransition';
        if(Browser.firefox4)
            property = 'MozTransition';
        if(Browser.opera)
            property = 'OTransition';

        this.style[property] = transition;
        this.store('transition', transition);
    },

    get: function(){
        return this.retrieve('transition', '');
    }
};

Element.implement({
    setTransform: function(value){
        return this.set('transform', value);
    },

    getTransform: function(){
        return this.get('transform');
    },

    setTransition: function(value){
        return this.set('transition', value);
    },

    getTransition: function(){
        return this.get('transition');
    }
});