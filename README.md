# CSS Circle Fly-Out Navigation

My circular fly-out CSS navigation menu component, built with CSS3. [View the demo here.](http://callmenick.com/_development/css-circle-menu/)

![Circle fly out menu](css-circle-menu-featured.png)

## Component Configuration & Compilation

The component makes heavy use of Sass, and also some Compass math helper functions. Sass is compiled via Gulp, and using Sass makes the component easily configurable. The menu items fly out along a quarter-circle with a given spread radius, so basic trigonometry and polar-to-cartesian math make calculating positions much easier, hence the use of Compass helpers. The general workflow for the compilation of the CSS is this:

1. Ruby Sass with Compass gets used via Gulp for pre-processing and helper functions.
2. Compiled CSS gets auto-prefixed via the Gulp autoprefixer post-processor module.
3. Re-compiled CSS gets saved, and a separate minified version also gets saved.

## Component Customisation

Using the Gulp workflow is hugely beneficial, because it makes the component much easier to work with and customise. If you're not using Gulp to compile the Sass, you will still need to leverage Compass to make use of the math helper functions. The following 11 variables are configurable in the Sass up front, and their defaults are written out for you to look at:

```scss
// $nav-item-radius: 48px;                  [1]
// $num-items: 5;                           [2]
// $nav-theme-color: rgb(255, 40, 60);      [3]
// $spread-radius: 144px;                   [4]
// $delay-increment: 0.1s;                  [5]
// $nav-position: "bottom-right";           [6]
// $mq-height: 480px;                       [7]
// $mq-width: 480px;                        [8]
// $button-bar-height: 4px;                 [9]
// $button-bar-spacing: 4px;                [10]
// $button-lr-padding: 10px;                [11]
```

You can edit these as you see fit. Here's the breakdown of these 11 configuration options:

1. Set up the initial navigation item radius.
2. Decalare how many items our nav will contain.
3. Set up a theme colour.
4. The spread radius, which is how far the nav items spread from the origin.
5. The delay increment, which is how much delay there is between each nav item leaving from / returning to the origin.
6. The position of the nav, chosen from one of four values:
    1. `bottom-right` - bottom right corner (this is the default)
    2. `bottom-left` - bottom left corner
    3. `top-left` - top left corner
    4. `top-right` - top right corner
7. Minimum height at which nav increases size.
8. Minimum width at which nav increases size.
9. The height of a bar in the toggle button.
10. The spacing between bars in the toggle button.
11. The padding between the left and right of the toggle button container and the bars.

Other variables will have to be customised further down in the Sass with your own discretion.

## Example Markup

You'll have to markup the menu like this:

```html
<nav id="c-circle-nav" class="c-circle-nav">
  <button id="c-circle-nav__toggle" class="c-circle-nav__toggle">
    <span>Toggle</span>
  </button>
  <ul class="c-circle-nav__items">
    <li class="c-circle-nav__item">
      <a href="#" class="c-circle-nav__link">
        <img src="path/to/icon" alt="">
      </a>
    </li>
    <!-- more items here -->
  </ul>
</nav>
```

Be sure to change up the Sass variable that defines the number of navigation items.

## Activation With JavaScript

A simple click event is used to activate the menu. This is handled via JavaScript, and just runs a simple check for the existence of an `is-active` class on the elements. A mask is also created via JavaScript, and faded in and out over the content depending on whether the menu is active or not. Here's the JavaScript:

```javascript
(function() {

  "use strict";

  /**
   * Cache variables
   */
  var menu = document.querySelector("#c-circle-nav");
  var toggle = document.querySelector("#c-circle-nav__toggle");
  var mask = document.createElement("div");
  var activeClass = "is-active";

  /**
   * Create mask
   */
  mask.classList.add("c-mask");
  document.body.appendChild(mask);

  /**
   * Listen for clicks on the toggle
   */
  toggle.addEventListener("click", function(e) {
    e.preventDefault();
    toggle.classList.contains(activeClass) ? deactivateMenu() : activateMenu();
  });

  /**
   * Listen for clicks on the mask, which should close the menu
   */
  mask.addEventListener("click", function() {
    deactivateMenu();
    console.log('click');
  });

  /**
   * Activate the menu 
   */
  function activateMenu() {
    menu.classList.add(activeClass);
    toggle.classList.add(activeClass);
    mask.classList.add(activeClass);
  }

  /**
   * Deactivate the menu 
   */
  function deactivateMenu() {
    menu.classList.remove(activeClass);
    toggle.classList.remove(activeClass);
    mask.classList.remove(activeClass);
  }

})();
```

The styles for the mask are already included in the Sass, so we're only interested in creating it and appending it to the body. I'm also using the modern `classList` function for class checking, adding, and removing, so if older browsers are on your radar, you'll have to work with some kind of fallback.

## Using Out Of The Box

If you're not using Gulp and Sass, fear not. You can get the compiled CSS in the `css/` directory, and use it out of the box. By default, it's positioned in the bottom right corner, and has a theme colour of pink. You can customise values here, but certain things like the positioning will be difficult, as they are calculated via trigonometric functions directly in Sass via Compass helpers. Changing the number of menu items will also be difficult, as item position is directly related to the number of items. Nonetheless, you'll be able to tweak colours and positioning fairly easily to suit your needs.

## Use As A Bower Package

The component is available as a bower package, and you can import it by running the following command:

```bash
bower install css-circle-menu
```

The required JavaScript and Sass files are included in the bower package too.

## Resources Used

The following resources were leveraged in the making of this component:

* [GulpJS](http://gulpjs.com) for task running
* [Sass](http://sass-lang.com/) & [Compass](http://compass-style.org/) for CSS pre-processing and helper functions
* My [CSS animating hamburger icons component](http://callmenick.com/_development/css-hamburger-menu-icons/) for the CSS-only toggle icon
* [Fontawesome](http://fortawesome.github.io/Font-Awesome/) for some nice aesthetics

## License & Copyright

Licensed under the [MIT license.](http://www.opensource.org/licenses/mit-license.php)

Copyright 2014, [Call Me Nick.](http://callmenick.com)