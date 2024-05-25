gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Flip);

let scroll;
let transitionOffset = 1100;
let staggerDefault = 0.07;
let durationDefault = 1.47;
let durationDefaultFaster = 1.2;

let navigationHeight = $('.main-nav-bar').innerHeight();
$(window).resize(function() {
    navigationHeight = $('.main-nav-bar').innerHeight();
});

CustomEase.create("primary-ease", "0.62, 0.05, 0.01, 0.99");
CustomEase.create("primary-ease-out", ".34, 1.56, 0.64, 1");

initPageTransitions();

// Animation - Page Loader Short
function initLoaderShort() {

    var tl = gsap.timeline();

    tl.set(".loading-screen", {
        opacity: 0
    }, 0);

    tl.set(".loading-overlay", {
        autoAlpha: 0
    }, 0);

    if (document.querySelector('.section-wrap-home-header')) {
        tl.set(".swipe-container .swipe-screen", {
            scaleX: 0,
        }, 0);

        tl.set(".section-home-header .floating-number", {
            x: 0,
            rotate: 0.001,
        }, 0);
    }

    tl.call(function() {
        scroll.start();
    }, null, 0);

}

// Animation - Page Loader
function initLoader() {

    var tl = gsap.timeline();

    tl.set(".loading-screen", {
        opacity: 0
    }, 0.2);

    tl.call(function() {
        scroll.start();
        window.scrollTo(0, 0);
    }, null, 0);

    tl.call(function() {
        initLoaderHomePart1();
        pageTransitionOut();
        scroll.scrollTo('#main-wrap', {
            immediate: true,
            force: true,
            lock: true,
            duration: 0.0166
        });
        ScrollTrigger.refresh();
    }, null, 0.2);
}

// Animation - Page Loader Home
function initLoaderHome() {

    let firstOffset = 2;

    var tl = gsap.timeline();

    tl.set("html", {
        cursor: "wait"
    });

    tl.set("html", {
        cursor: "auto",
    });

    tl.set(".loading-screen", {
        opacity: 0
    }, 0.2);

    tl.set(".fade-in.animate-transition", {
        opacity: 0
    });

    tl.call(function() {
        scroll.stop();
        initLoaderHomePart1();
        window.scrollTo(0, 0);
    }, null, 0);

    tl.call(function() {
        scroll.scrollTo('#main-wrap', {
            immediate: true,
            force: true,
            lock: true,
            duration: 0.0166
        });
        ScrollTrigger.refresh();
    }, null, 0.2);

    tl.call(function() {
        pageTransitionOut();
    }, null, firstOffset);

    tl.call(function() {
        scroll.start();
    }, null, (firstOffset + durationDefault));
}

// Animation - Page Leave Work
function pageTransitionWorkSingle() {
    var tl = gsap.timeline();

    let transitionElements = document.querySelector('.transition-work-single');
    let transitionElementsRowTitle = transitionElements.querySelector('.row-title');
    let transitionElementsFooterImage = transitionElements.querySelector('.footer-image');
    let cloneTransitionElements = transitionElements.cloneNode(true);
    let transitionElementsNewContainer = document.querySelector('.transition-work-single-container');
    let transitionElementsOldContainer = document.querySelector('.transition-work-single-old-container');

    let transitionElementsState = Flip.getState(".transition-work-single");

    transitionElementsNewContainer.appendChild(transitionElements);
    transitionElementsOldContainer.appendChild(cloneTransitionElements);

    Flip.from(transitionElementsState, {
        absolute: true,
        ease: "primary-ease",
        duration: durationDefault + 0.3
    });

    gsap.set(cloneTransitionElements, {
        autoAlpha: 0
    });

    gsap.to(transitionElementsRowTitle, {
        y: "0%",
        ease: "primary-ease",
        duration: durationDefault + 0.3,
    });

    gsap.to(transitionElementsFooterImage, {
        y: "0%",
        ease: "primary-ease",
        duration: durationDefault + 0.3,
    });

    gsap.to(".main-nav-bar", {
        yPercent: -100,
        ease: "primary-ease",
        duration: durationDefault,
    });

    gsap.to(".section-work-single-footer .row-top .split-lines", {
        yPercent: 100,
        ease: "primary-ease",
        stagger: staggerDefault,
        duration: durationDefaultFaster,
    });

    gsap.to(".section-work-single-header, .section-wrapper-blocks, .section-work-single-prefooter", {
        autoAlpha: 0,
        ease: "ease",
        duration: 0.5,
    });

    tl.call(function() {
        scroll.stop();
    }, null, 0);

}

// Animation - Page Enter Next Work
function pageTransitionOutWorkSingle() {

    var tl = gsap.timeline();


    tl.set($('.section-work-single-header .row-title'), {
        autoAlpha: 0,
    }, 0);

    tl.set(".loading-overlay", {
        autoAlpha: 0
    }, 0);

    tl.set(".main-nav-bar", {
        clearProps: "all"
    }, 0);

    tl.set('.styled-media-transition .figure-reveal', {
        scaleY: 0,
        rotate: 0.001,
    }, 0);

    tl.to($('.transition-work-single-container .transition-work-single'), {
        autoAlpha: 0,
        ease: "ease",
        duration: 0.2,
        onComplete: () => {
            $('.transition-work-single-container .transition-work-single').remove()
        }
    }, 1.1);

    tl.to($('.section-work-single-header .row-title'), {
        autoAlpha: 1,
        ease: "ease",
        duration: 0.2,
        clearProps: "all"
    }, 1);

    tl.fromTo(".main-nav-bar .logo .letters svg", {
        yPercent: 110,
    }, {
        yPercent: 0,
        ease: "primary-ease",
        duration: durationDefault,
        stagger: staggerDefault,
        clearProps: "all"
    }, -0.3);

    tl.fromTo(".main-nav-bar .col-nav, .main-nav-bar .col-btn", {
        yPercent: -200,
    }, {
        yPercent: 0,
        ease: "primary-ease",
        duration: durationDefault,
        stagger: staggerDefault,
        clearProps: "all"
    }, -0.1);

    tl.fromTo(".row-info-wrap .split-lines.animate-transition .single-line-inner", {
        yPercent: 100,
        rotate: 0.001
    }, {
        yPercent: 0,
        rotate: 0.001,
        ease: "primary-ease",
        duration: durationDefault,
        stagger: staggerDefault
    }, 0);

    tl.fromTo(".fade-in.animate-transition", {
        y: "3em",
        rotate: 0.001,
        autoAlpha: 0
    }, {
        y: 0,
        rotate: 0.001,
        autoAlpha: 1,
        ease: "Expo.easeOut",
        duration: durationDefault,
        stagger: staggerDefault
    }, 0.2);

    tl.call(function() {
        scroll.stop();
    }, null, 0);

    tl.call(function() {
        scroll.start();
    }, null, 1.3);
}

// Animation - Page Loader Home Part 1
function initLoaderHomePart1() {

    var tl = gsap.timeline();

    tl.fromTo(".split-lines.animate-transition .single-line-inner", {
        yPercent: 100,
        rotate: 0.001
    }, {
        yPercent: 0,
        rotate: 0.001,
        ease: "primary-ease",
        duration: durationDefault,
        stagger: staggerDefault
    }, 0);

    if (document.querySelector('.floating-number h4')) {

        tl.fromTo(".floating-number h4", {
            yPercent: 120,
            rotate: 0.001
        }, {
            yPercent: 0,
            rotate: 0.001,
            ease: "primary-ease",
            duration: durationDefault
        }, 0);
    }

}

// Animation - Page Leave
function pageTransitionIn() {
    var tl = gsap.timeline();

    tl.set(".transition-container", {
        opacity: 1
    }, 0);

    tl.set(".transition-container .overlay-transition-dark", {
        opacity: 0
    }, 0);

    tl.set(".transition-container .transition-screen", {
        xPercent: -100
    }, 0);

    tl.to(".transition-container .transition-screen", {
        xPercent: 0,
        ease: "primary-ease",
        duration: (durationDefault * 0.7),
        stagger: staggerDefault,
    }, 0);

    tl.set(".transition-container .transition-screen", {
        xPercent: -100
    });

    tl.to(".transition-container .overlay-transition-dark", {
        opacity: 1,
        duration: durationDefault,
        ease: "ease"
    }, 0);

    tl.set(".transition-container .overlay-transition-dark, .transition-container", {
        opacity: 0
    }, (transitionOffset / 1000) + 0.05);

    tl.call(function() {
        scroll.stop();
    }, null, 0);
}

// Animation - Page Enter
function pageTransitionOut() {
    var tl = gsap.timeline();

    tl.call(function() {
        scroll.stop();
    }, null, 0);

    if (document.querySelector('.section-wrap-home-header')) {
        tl.call(function() {
            scroll.start();
        }, null, durationDefault);
    } else {
        tl.call(function() {
            scroll.start();
        }, null, 0.5);
    }

    tl.set(".loading-overlay", {
        autoAlpha: 0
    }, 0);

    tl.fromTo(".main-nav-bar .logo .letters svg", {
        yPercent: 110,
    }, {
        yPercent: 0,
        ease: "primary-ease",
        duration: durationDefault,
        stagger: staggerDefault,
        clearProps: "all"
    }, -0.3);

    tl.fromTo(".main-nav-bar .col-nav, .main-nav-bar .col-btn", {
        yPercent: -200,
    }, {
        yPercent: 0,
        ease: "primary-ease",
        duration: durationDefault,
        stagger: staggerDefault,
        clearProps: "all"
    }, -0.1);

    if (document.querySelector('.fade-in.animate-transition')) {
        tl.fromTo(".fade-in.animate-transition", {
            y: "3em",
            rotate: 0.001,
            autoAlpha: 0
        }, {
            y: 0,
            rotate: 0.001,
            autoAlpha: 1,
            ease: "Expo.easeOut",
            duration: durationDefault,
            stagger: staggerDefault
        }, 0.4);
    }

    if (document.querySelector('.border-top.animate-transition')) {
        tl.fromTo(".border-top.animate-transition", {
            scaleX: 0,
            rotate: 0.001
        }, {
            scaleX: 1,
            rotate: 0.001,
            ease: "primary-ease",
            duration: durationDefault,
            stagger: staggerDefault
        }, 0);
    }

    if (document.querySelector('.main-nav-bar.is-error')) {
        tl.fromTo(".main-nav-bar.is-error .nav-service", {
            rotate: 0.001,
            yPercent: 125
        }, {
            rotate: 0.001,
            yPercent: 0,
            duration: durationDefault,
            ease: "primary-ease"
        }, -0.05);
    }

    /* Home */

    if (document.querySelector('.section-wrap-home-header')) {

        tl.fromTo(".section-wrap-home-header .logo .letters svg", {
            yPercent: 110,
        }, {
            yPercent: 0,
            ease: "primary-ease",
            duration: durationDefault,
            stagger: staggerDefault,
            clearProps: "all"
        }, -0.3);

        let swipeStagger;
        if ($(window).width() > 1024) {
            swipeStagger = 0;
        } else {
            swipeStagger = staggerDefault;
        }

        tl.to(".swipe-container .swipe-screen", {
            scaleX: 0,
            ease: "primary-ease",
            duration: durationDefault,
            stagger: swipeStagger
        }, 0);

        tl.to(".section-home-header .floating-number", {
            x: 0,
            rotate: 0.001,
            ease: "primary-ease",
            duration: durationDefault
        }, 0);
    }

    if (document.querySelector('.styled-media-transition')) {
        tl.fromTo($('.styled-media-transition .figure-reveal'), {
            scaleY: 1,
            rotate: 0.001
        }, {
            scaleY: 0,
            rotate: 0.001,
            ease: "primary-ease",
            duration: durationDefault,
            stagger: staggerDefault
        }, -0.15);

        tl.fromTo($('.styled-media-transition .figure-inner'), {
            scale: 1.5,
            rotate: 0.001
        }, {
            scale: 1,
            rotate: 0.001,
            ease: "primary-ease",
            duration: durationDefault,
            stagger: staggerDefault,
        }, -0.15);
    }
}

function initPageTransitions() {

    // Reset scroll on page next
    history.scrollRestoration = "manual";

    barba.hooks.afterEnter(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
    });

    barba.hooks.leave(() => {
        initBasicFunctions();
    });

    // Functions Before
    function initResetDataBefore() {}

    // Functions After
    function initResetDataAfter() {
        $('[data-navigation-status]').attr('data-navigation-status', 'not-active');
        $('[data-scrolling-direction]').attr('data-scrolling-direction', 'down');
        $('[data-scrolling-started]').attr('data-scrolling-started', 'false');
    }

    let triggerBarba;
    let nameBarbaTransitionWorkSingle = 'from-to-work-single';
    let nameBarbaTransitionWorkSingleName = 'work-single';
    barba.init({
        sync: true,
        debug: false,
        timeout: 7000,
        transitions: [{
            name: 'to-home',
            from: {

            },
            to: {
                namespace: ['home']
            },
            once(data) {
                initSmoothScroll(data.next.container);
                initScript();
                initLoaderHome();
            },
        }, {
            custom: ({
                trigger
            }) => {
                triggerBarba = trigger;
            },
            name: 'from-to-work-single',
            from: {
                namespace: ['work-single']
            },
            to: {
                namespace: ['work-single']
            },
            async leave(data) {
                if (triggerBarba != 'back') {
                    pageTransitionWorkSingle(data.current);
                    initResetDataBefore();
                    await delay(600);
                } else {
                    pageTransitionIn(data.current);
                    initResetDataBefore();
                    await delay(transitionOffset);
                }
                initBarbaNavUpdate(data);
                initResetDataAfter();
                scroll.destroy();
                data.current.container.remove();
            },
            async enter(data) {
                if (triggerBarba != 'back') {
                    pageTransitionOutWorkSingle(data.next.container);
                } else {
                    pageTransitionOut(data.next.container);
                    initLoaderHomePart1();
                }
            },
            async beforeEnter(data) {
                ScrollTrigger.getAll().forEach(t => t.kill());
                initSmoothScroll(data.next.container);
                initScript();
            },
        }, {
            name: 'self',
            async leave(data) {
                pageTransitionIn(data.current);
                initResetDataBefore();
                await delay(transitionOffset);
                initBarbaNavUpdate(data);
                initResetDataAfter();
                scroll.destroy();
                data.current.container.remove();
            },
            async enter(data) {
                pageTransitionOut(data.next.container);
                initLoaderHomePart1();
            },
            async beforeEnter(data) {
                ScrollTrigger.getAll().forEach(t => t.kill());
                initSmoothScroll(data.next.container);
                initScript();
            },
        }, {
            name: 'default',
            once(data) {
                initSmoothScroll(data.next.container);
                initScript();
                initLoader();
            },
            async leave(data) {
                pageTransitionIn(data.current.container);
                initResetDataBefore();
                await delay(transitionOffset);
                initBarbaNavUpdate(data);
                initResetDataAfter();
                scroll.destroy();
                data.current.container.remove();
            },
            async enter(data) {
                pageTransitionOut(data.next.container);
                initLoaderHomePart1();
            },
            async beforeEnter(data) {
                ScrollTrigger.getAll().forEach(t => t.kill());
                initSmoothScroll(data.next.container);
                initScript();
            },
        }]
    });

    function initSmoothScroll(container) {
        initLenis();
        ScrollTrigger.refresh();
    }
}

function initLenis() {

    // Lenis: https://github.com/studio-freight/lenis
    scroll = new Lenis({
        duration: 1
    });

    scroll.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        scroll.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

// Don't touch
function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

/**
 * Fire all scripts on page load
 */
function initScript() {
    initSplitText();
    initCheckWindowHeight();
    initBasicFunctions();
    initLazyLoad();
    initScrollTriggerPlayVideoInview();
    initScrollToAnchorLenis();
    initMagnetic();
    initVimeoLightbox();
    initVimeoPlayer();
    initScrolltriggerAnimations();
    initBearlyDigitalContactForm();
}

/**
 * Barba Update Links outside Main on page Transition
 */
function initBarbaNavUpdate(data) {

    const updateItems = $(data.next.html).find('[data-barba-update]');

    $('[data-barba-update]').each(function(index) {
        if ($(updateItems[index]).get(0)) {
            const newLinkStatus = $(updateItems[index]).get(0).getAttribute('data-link-status');
            $(this).attr('data-link-status', newLinkStatus);
        }
    });
}

/**
 * Window Inner Height Check
 */
function initCheckWindowHeight() {
    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh-in-px', `${vh}px`);
}

/**
 * Basic Functions
 */
function initBasicFunctions() {

    // Toggle Navigation
    $('[data-navigation-toggle="toggle"]').click(function() {
        if ($('[data-navigation-status]').attr('data-navigation-status') == 'not-active') {
            $('[data-navigation-status]').attr('data-navigation-status', 'active');
            scroll.stop();
        } else {
            $('[data-navigation-status]').attr('data-navigation-status', 'remove');
            setTimeout(function() {
                $('[data-navigation-status]').attr('data-navigation-status', 'not-active');
                scroll.start();
            }, (durationDefaultFaster * 1000));
        }
    });

    // Close Navigation
    $('[data-navigation-toggle="close"]').click(function() {
        $('[data-navigation-status]').attr('data-navigation-status', 'remove');
        setTimeout(function() {
            $('[data-navigation-status]').attr('data-navigation-status', 'not-active');
            scroll.start();
        }, (durationDefault * 1000));
    });

    // Key ESC - Close Navigation
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            if ($('[data-navigation-status]').attr('data-navigation-status') == 'active') {
                $('[data-navigation-status]').attr('data-navigation-status', 'not-active');
                scroll.start();
            }
        }
    });

    //  Toggle Grid
    $(document).on('keydown', function(e) {
        if (e.shiftKey && e.keyCode === 71) {
            e.preventDefault();
            if ($('[data-grid-status]').attr('data-grid-status') == 'not-active') {
                $('[data-grid-status]').attr('data-grid-status', 'active');
                Cookies.set('grid-status', 'active', {
                    expires: 365
                });
            } else {
                $('[data-grid-status]').attr('data-grid-status', 'not-active');
                Cookies.set('grid-status', 'not-active', {
                    expires: 365
                });
            }
        }
    });

    $('[data-grid-toggle="toggle"]').click(function() {
        if ($('[data-grid-status]').attr('data-grid-status') == 'not-active') {
            $('[data-grid-status]').attr('data-grid-status', 'active');
            Cookies.set('grid-status', 'active', {
                expires: 365
            });
        } else {
            $('[data-grid-status]').attr('data-grid-status', 'not-active');
            Cookies.set('grid-status', 'not-active', {
                expires: 365
            });
        }
    });

    if (Cookies.get('grid-status') == 'active') {
        $('[data-grid-status]').attr('data-grid-status', 'active');
    }

    /* Play Video on Hover */

    $('[data-thumb-video-on-hover="true"]').each(function() {
        let videoThumb = $(this);
        let videoOnHoverTrue = videoThumb.find('video');
        videoThumb.on('mouseenter', function() {
            videoOnHoverTrue.get(0).currentTime = 0;
            videoThumb.attr('data-thumb-video-status', 'active');
            videoOnHoverTrue.trigger('play');
        });
        videoThumb.on('mouseleave', function() {
            videoThumb.attr('data-thumb-video-status', 'not-active');
            setTimeout(function() {
                videoOnHoverTrue.trigger('pause');
            }, 300);
        });
    });

    /* Interactive Image */

    $('.interactive-image').each(function() {
        let interativeImage = $(this);

        var $elements = interativeImage.find('[data-interactive-image-status-mobile]');
        var currentIndex = 0;
        var delay = 1000;
        var continueLoop = true;

        function activateNextElement() {

            if (!continueLoop) {
                return;
            }

            $elements.attr('data-interactive-image-status-mobile', 'not-active');
            $elements.eq(currentIndex).attr('data-interactive-image-status-mobile', 'active');
            currentIndex = (currentIndex + 1) % $elements.length;

            setTimeout(activateNextElement, delay);
        }

        activateNextElement();

    });

    /* Testimonials */

    // Cycle with Delay
    $('[data-testimonial-init').each(function() {
        var cycle = $(this);
        var cycleElements = cycle.find('[data-testimonial-status]');
        let cycleCurrentIndex = 0;
        let cycleCurrentIndexElement = cycle.find('.count-current');

        // Add attr to largest element
        let elementLargestHeight = 0;
        let elementLargest = null;

        cycleElements.each(function() {
            var elementHeight = $(this).find('.col-quote').outerHeight();
            if (elementHeight > elementLargestHeight) {
                elementLargestHeight = elementHeight;
                elementLargest = $(this);
            }
        });


        if (elementLargest != null) {
            cycleElements.attr('data-testimonial-largest', 'false');
            elementLargest.attr('data-testimonial-largest', 'true');
        }

        // Update function
        function updateActiveElement(index) {
            cycleElements.attr('data-testimonial-status', 'not-active');
            cycleElements.each(function() {
                if ($(this).attr('data-testimonial-index') == index) {
                    $(this).attr('data-testimonial-status', 'active');
                    gsap.fromTo($(this).find('.single-line-inner'), {
                        yPercent: 110,
                        rotate: 0.001
                    }, {
                        yPercent: 0,
                        rotate: 0.001,
                        ease: "primary-ease",
                        duration: durationDefault,
                        stagger: staggerDefault,
                        delay: -0.3,
                    });
                }
            });
            cycleCurrentIndexElement.text(cycleCurrentIndex + 1);
        }

        // Prev function
        function activatePrevElement() {
            cycleCurrentIndex = (cycleCurrentIndex - 1 + cycleElements.length) % cycleElements.length;
            updateActiveElement(cycleCurrentIndex);
        }

        // Next function
        function activateNextElement() {
            cycleCurrentIndex = (cycleCurrentIndex + 1) % cycleElements.length;
            updateActiveElement(cycleCurrentIndex);
        }

        // Arrows
        cycle.find('[data-testimonial-toggle="prev"]').click(function() {
            activatePrevElement();
        });
        cycle.find('[data-testimonial-toggle="next"]').click(function() {
            activateNextElement();
        });

        // Keyboard only when hovering inside section
        var listenForKeyboard = false;

        cycle.mouseenter(function() {
            listenForKeyboard = true;
        }).mouseleave(function() {
            listenForKeyboard = false;
        });

        $(document).keydown(function(e) {
            if (!listenForKeyboard) return;
            if (e.keyCode == 37) {
                activatePrevElement();
            } else if (e.keyCode == 39) {
                activateNextElement();
            }
        });
    });

    // Accordion
    $('[data-accordion-toggle]').click(function() {
        if ($(this).parent().attr('data-accordion-status') == 'active') {
            $(this).parent().attr('data-accordion-status', 'not-active').siblings().attr('data-accordion-status', 'not-active');
        } else {
            $(this).parent().siblings().attr('data-accordion-status', 'not-active');
            $(this).parent().attr('data-accordion-status', 'active');
        }
        setTimeout(function() {
            scroll.destroy();
            initLenis();
            ScrollTrigger.refresh();
        }, 735);
    });

    // Forms switch
    $('[data-forms-switch-init]').each(function() {
        let formsSwitch = $(this);
        formsSwitch.find('[data-form-click]').click(function() {
            let formID = $(this).attr('data-form-id');
            let formDropdownName = $(this).attr('data-form-dropdown-name');
            if ($(this).attr('data-form-status') == 'not-active') {
                formsSwitch.find('[data-form-id="' + formID + '"]').attr('data-form-status', 'active').siblings().attr('data-form-status', 'not-active');
                formsSwitch.find('[data-form-change-text]').attr('data-form-change-text', formDropdownName).text(formDropdownName);
                gsap.fromTo(formsSwitch.find('[data-form-id="' + formID + '"] .form-col'), {
                    y: "4em",
                    autoAlpha: 0,
                    rotate: 0.001
                }, {
                    y: "0em",
                    autoAlpha: 1,
                    rotate: 0.001,
                    ease: "primary-ease",
                    duration: durationDefault,
                    stagger: staggerDefault,
                    clearProps: "all"
                });
            }
            setTimeout(function() {
                scroll.destroy();
                initLenis();
                ScrollTrigger.refresh();
            }, 250);
        });
    });

    $('[data-select-btn-click="toggle"]').click(function() {
        let selectBtn = $(this).closest('[data-select-btn-status]');
        if (selectBtn.attr('data-select-btn-status') == 'not-active') {
            selectBtn.attr('data-select-btn-status', 'active');
        } else {
            selectBtn.attr('data-select-btn-status', 'not-active');
        }
    });

    $('[data-select-btn-click="close"]').click(function() {
        let selectBtn = $(this).closest('[data-select-btn-status]');
        selectBtn.attr('data-select-btn-status', 'not-active');
    });
}

/**
 * Lazy Load
 */
function initLazyLoad() {
    // https://github.com/verlok/vanilla-lazyload
    var lazyLoadInstance = new LazyLoad({
        container: document.querySelector('[data-scroll-container]'),
        elements_selector: ".lazy",
    });
}

/**
 * Play Video Inview
 */
function initScrollTriggerPlayVideoInview() {

    let allVideoDivs = gsap.utils.toArray('.playpauze');

    allVideoDivs.forEach((videoDiv, i) => {

        let videoElem = videoDiv.querySelector('video')

        ScrollTrigger.create({
            trigger: videoElem,
            start: '0% 110%',
            end: '200% -10%',
            onEnter: () => videoElem.play(),
            onEnterBack: () => videoElem.play(),
            onLeave: () => videoElem.pause(),
            onLeaveBack: () => videoElem.pause(),
        });
    });
}

/**
 * Lenis - ScrollTo Anchor Links
 */
function initScrollToAnchorLenis() {

    $("[data-anchor-target]").click(function() {

        let targetScrollToAnchorLenis = $(this).attr('data-anchor-target');
        scroll.scrollTo(targetScrollToAnchorLenis, {
            offset: 0,
            duration: durationDefault,
            easing: (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2),
        });

    });
}

/**
 * GSAP Split Text
 */
function initSplitText() {


    var splitTextLines = new SplitText(".split-lines.not-split", {
        type: "lines",
        linesClass: "single-line"
    });
    $('.split-lines.not-split .single-line').wrapInner('<div class="single-line-inner">');
    $(splitTextLines.elements).each(function() {
        if ($(this).hasClass('not-split')) {
            $(this).removeClass('not-split');
        }
    });

    // var splitWordsWrap = new SplitText(".split-words-wrap", {type: "words", wordsClass: "single-word"});
    // $('.split-words-wrap .single-word').wrapInner('<div class="single-word-inner">');

    // var splitWords = new SplitText(".split-words", {type: "words", wordsClass: "single-word"});
    // $('.split-words .single-word').wrapInner('<div class="single-word-inner">');

    // var splitTextChars = new SplitText(".split-chars", {type: "chars", charsClass: "single-char"});
    // $('.split-chars .single-char').wrapInner('<div class="single-char-inner">');
}

/**
 * Magnetic
 */
function initMagnetic() {

    // Magnetic Buttons
    // Found via: https://codepen.io/tdesero/pen/RmoxQg
    var magnets = document.querySelectorAll('[data-magnetic-target]');

    if (window.innerWidth > 1024) {

        magnets.forEach((magnet) => {
            magnet.addEventListener('mousemove', moveMagnet);
            magnet.addEventListener('mouseleave', function(event) {
                gsap.to($(event.currentTarget).find('.magnetic-inner'), durationDefault, {
                    x: 0,
                    y: 0,
                    ease: Expo.easeOut
                });
            });
        });

        function moveMagnet(event) {
            var magnetButton = event.currentTarget;
            var bounding = magnetButton.getBoundingClientRect();
            var magnetsStrength = magnetButton.getAttribute("data-magnetic-strength");

            if ($(event.currentTarget).parent().hasClass('hover')) {
                gsap.to($(magnetButton).find('.magnetic-inner'), 1, {
                    x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * magnetsStrength,
                    y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * magnetsStrength,
                    rotate: "0.001deg",
                    ease: Expo.easeOut
                });
            } else {
                gsap.to($(magnetButton).find('.magnetic-inner'), durationDefault, {
                    x: (event.clientX - bounding.left) - (bounding.width / 2),
                    y: (event.clientY - bounding.top) - (bounding.height / 2),
                    rotate: "0.001deg",
                    ease: Expo.easeOut
                });
            }

        }
    }
}

/**
 * Vimeo Lightbox Embed
 */
function initVimeoLightbox() {

    $('[data-vimeo-lightbox-target]').each(function(index) {

        var vimeoLightbox = $(this);
        var vimeoLightboxOpenButton = $('[data-vimeo-lightbox-control="open"]');
        var vimeoLightboxCloseButton = $('[data-vimeo-lightbox-control="close"]');

        var videoIndexID = 'vimeo-lightbox-index-' + index;
        $(this).attr('id', videoIndexID);

        var iframe = $(this).attr('id');

        // New Lightbox
        vimeoLightboxOpenButton.click(function() {

            var vimeoLightboxVideoID = $(this).data('vimeo-lightbox-id');
            var vimeoLightboxPlaceholder = $(this).data('vimeo-lightbox-placeholder');
            var vimeoLightboxRatio = $(this).data('vimeo-lightbox-ratio');
            var vimeoLightboxContent = '<div class="overlay vimeo-append-content"><iframe src="https://player.vimeo.com/video/' + vimeoLightboxVideoID + '?api=1&background=1&autoplay=0&loop=0&muted=1&playsinline=1" width="640" height="360" frameborder="0" webkit-playsinline playsinline allow="autoplay;"></iframe><img class="overlay vimeo-overlay-placeholder" src="' + vimeoLightboxPlaceholder + '" /></div>';

            // Add or Replace Lightbox (Check if is new or current video)
            if (vimeoLightbox.attr('data-vimeo-lightbox-current-id') == vimeoLightboxVideoID) {
                // Nothing
            } else {
                vimeoLightbox.find('.vimeo-append-content').remove();
                vimeoLightbox.find('.single-vimeo-lightbox').append(vimeoLightboxContent);
            }

            vimeoLightbox.find('.single-vimeo-lightbox').css('--aspect-ratio', ' ' + vimeoLightboxRatio);
            vimeoLightbox.attr('data-vimeo-status-activated', 'true');
            scroll.stop();

            // Check Landscape vs Portrait
            if (parseFloat(vimeoLightboxRatio) > 100) {
                vimeoLightbox.attr('data-vimeo-lightbox-orientation', 'portrait');
            } else {
                vimeoLightbox.attr('data-vimeo-lightbox-orientation', 'landscape');
            }

            // Calculate Max. Height
            var vimeoLightboxHeight = vimeoLightbox.find('.single-vimeo-calculate').innerHeight();
            var vimeoLightboxWidth = vimeoLightbox.find('.single-vimeo-calculate').innerWidth();
            var vimeoLightboxRatioNoPercent = parseInt(vimeoLightboxRatio) / 100;
            vimeoLightbox.find('.single-vimeo-calculate-wrap').css('width', ' ' + (100 / ((vimeoLightboxWidth * vimeoLightboxRatioNoPercent) / vimeoLightboxHeight)) + '%');

            $(window).resize(function() {
                if (vimeoLightbox.attr('data-vimeo-status-activated') == 'true') {
                    vimeoLightboxHeight = vimeoLightbox.find('.single-vimeo-calculate').innerHeight();
                    vimeoLightboxWidth = vimeoLightbox.find('.single-vimeo-calculate').innerWidth();
                    vimeoLightbox.find('.single-vimeo-calculate-wrap').css('width', ' ' + (100 / ((vimeoLightboxWidth * vimeoLightboxRatioNoPercent) / vimeoLightboxHeight)) + '%');
                }
            });

            // New Vimeo Player
            var player = new Vimeo.Player(iframe);

            // Play Function
            function vimeoLightboxPlay() {
                vimeoLightbox.attr('data-vimeo-status-play', 'true');
                if (vimeoLightbox.attr('data-vimeo-status-muted') == 'false') {
                    player.setVolume(1);
                } else {
                    player.setVolume(0);
                }
                player.play();
            }

            // Close Function
            function vimeoLightboxClose() {

                // Update Current Video ID
                vimeoLightbox.attr('data-vimeo-lightbox-current-id', vimeoLightboxVideoID);

                player.setVolume(0);
                scroll.start();
                vimeoLightbox.attr('data-vimeo-status-activated', 'remove');
                setTimeout(function() {
                    vimeoLightbox.attr('data-vimeo-status-activated', 'false');
                    vimeoLightbox.attr('data-vimeo-status-loaded', 'false');
                    vimeoLightbox.attr('data-vimeo-status-play', 'false');
                    player.unload();
                }, (durationDefaultFaster * 1000));
            }

            // Check Touchscreen
            function isTouchScreendevice() {
                return 'ontouchstart' in window || navigator.maxTouchPoints;
            };
            if (isTouchScreendevice()) {
                // No autoplay on touchscreen device
            } else {
                vimeoLightboxPlay();
            }

            // Play
            vimeoLightbox.find('[data-vimeo-control="play"]').off().click(function() {
                vimeoLightboxPlay();
            });

            // Pause
            vimeoLightbox.find('[data-vimeo-control="pause"]').off().click(function() {
                vimeoLightbox.attr('data-vimeo-status-play', 'false');
                player.pause();
            });

            // Mute
            vimeoLightbox.find('[data-vimeo-control="mute"]').off().click(function() {
                if (vimeoLightbox.attr('data-vimeo-status-muted') == 'false') {
                    player.setVolume(0);
                    vimeoLightbox.attr('data-vimeo-status-muted', 'true');
                } else {
                    player.setVolume(1);
                    vimeoLightbox.attr('data-vimeo-status-muted', 'false');
                }
            });

            // Loaded
            player.on('play', function() {
                vimeoLightbox.attr('data-vimeo-status-loaded', 'true');
            });

            // Close Mouse Click
            vimeoLightboxCloseButton.off().click(function() {
                vimeoLightboxClose();
            });

            // Close Esc Key
            $(document).keydown(function(e) {
                if (e.keyCode == 27) {
                    vimeoLightboxClose();
                }
            });

            // Remove Controls after hover
            var vimeoHoverTimer;
            $(document).on("mousemove", function() {
                if (vimeoLightbox.attr('data-vimeo-status-hover') == 'false') {
                    //Show the element
                    vimeoLightbox.attr('data-vimeo-status-hover', 'true');
                } else {
                    //Reset the timer to X amount of ms
                    clearTimeout(vimeoHoverTimer);
                    vimeoHoverTimer = setTimeout(vimeoHoverTrue, 3000);
                }
            });

            function vimeoHoverTrue() {
                vimeoLightbox.attr('data-vimeo-status-hover', 'false');
            }

            // Ended
            var onEnd = function(data) {
                vimeoLightboxClose();
            };

            player.on('ended', onEnd);
        });
    });
}

/**
 * Vimeo Player Embed
 */
function initVimeoPlayer() {

    // Full controls
    // https://codepen.io/simpson77/pen/YXowmy

    $('[data-vimeo-player-target]').each(function(index) {

        var playerID = $(this);
        let tl;

        var videoIndexID = 'vimeo-player-index-' + index;
        $(this).attr('id', videoIndexID);

        var iframe = $(this).attr('id');
        var player = new Vimeo.Player(iframe);

        // Loaded
        player.on('play', function() {
            playerID.attr('data-vimeo-status-loaded', 'true');
        });

        // Autoplay
        if (playerID.attr('data-vimeo-player-autoplay') == 'false') {
            // If autoplay = false
            player.setVolume(1);
            player.pause();
        } else {
            // If autoplay = true
            player.setVolume(0);
            playerID.attr('data-vimeo-status-muted', 'true');

            if (playerID.attr('data-vimeo-status-paused-by-user') == 'false') {
                tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: playerID,
                        start: "0% 100%",
                        end: "100% 0%",
                        toggleActions: "play none none none",
                        markers: false,
                        onEnter: () => vimeoPlayerPlay(),
                        onLeave: () => vimeoPlayerPause(),
                        onEnterBack: () => vimeoPlayerPlay(),
                        onLeaveBack: () => vimeoPlayerPause(),
                    }
                });
            }
        }

        function vimeoPlayerPlay() {
            playerID.attr('data-vimeo-status-activated', 'true');
            playerID.attr('data-vimeo-status-play', 'true');
            player.play();
        }

        function vimeoPlayerPause() {
            playerID.attr('data-vimeo-status-play', 'false');
            player.pause();
        }

        // Click Play
        playerID.find('[data-vimeo-control="play"]').click(function() {
            if (playerID.attr('data-vimeo-status-muted') == 'true') {
                player.setVolume(0);
            } else {
                player.setVolume(1);
            }
            vimeoPlayerPlay();
        });

        // Click Pause
        playerID.find('[data-vimeo-control="pause"]').click(function() {
            vimeoPlayerPause();
            // If paused by user kill autoplay on scroll
            if (playerID.attr('data-vimeo-player-autoplay') == 'true') {
                playerID.attr('data-vimeo-status-paused-by-user', 'true');
                tl.kill();
            }
        });

        // Click Mute
        playerID.find('[data-vimeo-control="mute"]').click(function() {
            if (playerID.attr('data-vimeo-status-muted') == 'false') {
                player.setVolume(0);
                playerID.attr('data-vimeo-status-muted', 'true');
            } else {
                player.setVolume(1);
                playerID.attr('data-vimeo-status-muted', 'false');
            }
        });

        // Remove Controls after hover
        var vimeoHoverTimer;
        $(document).on("mousemove", function() {
            if (playerID.attr('data-vimeo-status-hover') == 'false') {
                //Show the element
                playerID.attr('data-vimeo-status-hover', 'true');
            } else {
                //Reset the timer to X amount of ms
                clearTimeout(vimeoHoverTimer);
                vimeoHoverTimer = setTimeout(vimeoHoverTrue, 3000);
            }
        });

        function vimeoHoverTrue() {
            playerID.attr('data-vimeo-status-hover', 'false');
        }

        // Ended
        var onEnd = function() {
            playerID.attr('data-vimeo-status-activated', 'false');
            playerID.attr('data-vimeo-status-play', 'false');
            player.unload();
        };

        player.on('ended', onEnd);

    });
}

/**
 * Scrolltrigger Animations Desktop + Mobile
 */
function initScrolltriggerAnimations() {

    if (document.querySelector('main .styled-media')) {
        $('main .styled-media').each(function() {
            let triggerElement = $(this);
            let targetElementFigureInner = $(this).find('.figure-inner');
            let targetElementReveal = $(this).find('.figure-reveal');
            let targetElementDescription = $(this).find('.split-lines .single-line-inner')

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    start: "0% 90%",
                    end: "100% 0%",
                    toggleActions: "play none none none"
                }
            });

            if (targetElementReveal.length) {
                tl.fromTo(targetElementReveal, {
                    scaleY: 1,
                    rotate: 0.001
                }, {
                    scaleY: 0,
                    rotate: 0.001,
                    ease: "primary-ease",
                    duration: durationDefault
                }, 0);
            }

            if (targetElementFigureInner.length) {
                tl.fromTo(targetElementFigureInner, {
                    scale: 1.5,
                    rotate: 0.001
                }, {
                    scale: 1,
                    rotate: 0.001,
                    ease: "primary-ease",
                    duration: durationDefault
                }, 0);
            }

            if (targetElementDescription.length) {
                tl.fromTo(targetElementDescription, {
                    yPercent: 110,
                    rotate: 0.001
                }, {
                    yPercent: 0,
                    rotate: 0.001,
                    ease: "primary-ease",
                    duration: durationDefault,
                    stagger: staggerDefault
                }, "> -1.16");
            }
        });
    }

    if (document.querySelector('main .split-lines.animate-scroll-each .single-line')) {
        $('main .split-lines.animate-scroll-each .single-line').each(function() {
            let triggerElement = $(this);
            let targetElement = $(this).find('.single-line-inner');

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    start: "0% 90%",
                    end: "100% 0%",
                    toggleActions: "play none none none"
                }
            });

            tl.fromTo(targetElement, {
                yPercent: 110,
                rotate: 0.001
            }, {
                yPercent: 0,
                rotate: 0.001,
                ease: "primary-ease",
                duration: durationDefault,
                stagger: staggerDefault
            }, -0.2);
        });
    }

    if (document.querySelector('.section-work-together .logo-wrap')) {
        $('.section-work-together .logo-wrap').each(function() {
            let triggerElement = $(this);
            let targetElement = $(this).find('.letters svg');

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    start: "0% 90%",
                    end: "100% 0%",
                    toggleActions: "play none none none"
                }
            });

            tl.fromTo(targetElement, {
                yPercent: 110,
                rotate: 0.001
            }, {
                yPercent: 0,
                rotate: 0.001,
                ease: "primary-ease",
                duration: durationDefault,
                stagger: staggerDefault
            });
        });
    }

    if (document.querySelector('main .split-lines.animate-scroll')) {
        $('main .split-lines.animate-scroll').each(function() {
            let triggerElement = $(this);
            let targetElement = $(this).find('.single-line-inner');

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    start: "0% 90%",
                    end: "100% 0%",
                    toggleActions: "play none none none"
                }
            });

            tl.fromTo(targetElement, {
                yPercent: 110,
                rotate: 0.001
            }, {
                yPercent: 0,
                rotate: 0.001,
                ease: "primary-ease",
                duration: durationDefault,
                stagger: staggerDefault
            }, -0.2);
        });
    }

    if (document.querySelector('main .fade-in.animate-scroll')) {
        $('main .fade-in.animate-scroll').each(function() {
            let triggerElement = $(this);
            let targetElement = $(this);

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    start: "0% 90%",
                    end: "100% 0%",
                    toggleActions: "play none none none"
                }
            });

            tl.fromTo(targetElement, {
                y: "3em",
                rotate: 0.001,
                autoAlpha: 0
            }, {
                y: 0,
                rotate: 0.001,
                autoAlpha: 1,
                ease: "Expo.easeOut",
                duration: durationDefault,
                stagger: staggerDefault
            }, 0.2);
        });
    }

    if (document.querySelector('main .animate-scroll-group')) {
        $('main .animate-scroll-group').each(function() {
            let triggerElement = $(this);
            let targetElementLines = triggerElement.find('.single-line-inner');
            let targetElementFade = triggerElement.find('.fade-in');
            let targetElementButton = triggerElement.find('.btn-animate-in .link');

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    start: "0% 90%",
                    end: "100% 0%",
                    toggleActions: "play none none none"
                }
            });

            if (targetElementLines.length) {
                tl.fromTo(targetElementLines, {
                    yPercent: 110,
                    rotate: 0.001
                }, {
                    yPercent: 0,
                    rotate: 0.001,
                    ease: "primary-ease",
                    duration: durationDefault,
                    stagger: staggerDefault
                }, -0.2);
            }

            let fadeOffset;
            if (targetElementLines.length) {
                fadeOffset = "> -1.16";
            } else {
                fadeOffset = "0.2";
            }

            if (targetElementFade.length) {
                tl.fromTo(targetElementFade, {
                    y: "2em",
                    rotate: 0.001,
                    autoAlpha: 0
                }, {
                    y: 0,
                    rotate: 0.001,
                    autoAlpha: 1,
                    ease: "Expo.easeOut",
                    duration: durationDefault,
                    stagger: staggerDefault
                }, fadeOffset);
            }

            let btnOffset;
            if (targetElementLines.length) {
                btnOffset = "> -1.36";
            } else if (targetElementFade.length) {
                btnOffset = "> -1.36";
            } else {
                btnOffset = "-0";
            }

            if (targetElementButton.length) {
                tl.fromTo(targetElementButton, {
                    yPercent: 110,
                    rotate: 0.001,
                }, {
                    yPercent: 0,
                    rotate: 0.001,
                    ease: "primary-ease",
                    duration: durationDefault,
                    stagger: staggerDefault
                }, btnOffset);
            }
        });
    }


    ScrollTrigger.matchMedia({

        // Desktop Only Scrolltrigger 
        "(min-width: 1025px)": function() {

            if (document.querySelector('.main-nav-bar')) {

                $('.main-nav-bar.is-not-home').each(function(index) {
                    let triggerElement = $(this).find('.logo-wrap');
                    let targetElementLogo = $(this).find('.logo');
                    let targetElementService = $(this).find('.nav-service');

                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            start: "0% 0%",
                            end: "100% 0%",
                            scrub: 0.25,
                            onEnterBack: () => serviceEnter(),
                            onLeave: () => serviceLeave(),
                        }
                    });
                    tl.fromTo(targetElementLogo, {
                        rotate: 0.001,
                        scale: 1,
                    }, {
                        rotate: 0.001,
                        scale: 0.2,
                        ease: "none"
                    });

                    gsap.set(targetElementService, {
                        rotate: 0.001,
                        yPercent: 125
                    });

                    function serviceEnter() {
                        gsap.to(targetElementService, {
                            rotate: 0.001,
                            yPercent: 125,
                            duration: durationDefault,
                            ease: "primary-ease"
                        });
                    }

                    function serviceLeave() {
                        gsap.to(targetElementService, {
                            rotate: 0.001,
                            yPercent: 0,
                            duration: durationDefault,
                            ease: "primary-ease"
                        });
                    }
                });
            }

            if (document.querySelector('.section-wrap-home-header')) {
                $('.section-wrap-home-header').each(function() {
                    let triggerElement = $(this).find('.section-home-header');
                    let targetElementDarkOverlay = $(this).find('.overlay-dark');
                    let targetElementNav = $('.main-nav-bar .nav-service, .main-nav-bar .logo .logo-click');
                    let targetElementTileLogo = $(this).find('.col-logo-inner');
                    let targetElementTileCenter = $(this).find('.center-tile');
                    let targetElementFloatingNumber = $(this).find('.floating-number');
                    let targetElementMagneticInner = $(this).find('.magnetic-overlay');
                    let targetElementFigure = $(this).find('.row-reel figure');

                    let durationFirstScroll = 1.25;

                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            start: "0% 0%",
                            end: "200% 0%",
                            scrub: 0,
                            markers: false,
                            onEnterBack: () => headerEnter(),
                            onLeave: () => headerLeave(),
                        }
                    });

                    tl.fromTo(targetElementTileLogo, {
                        xPercent: 0,
                    }, {
                        duration: durationFirstScroll,
                        xPercent: 100,
                        ease: "none"
                    });

                    tl.fromTo(targetElementTileCenter, {
                        scaleX: 0.5,
                    }, {
                        duration: durationFirstScroll,
                        scaleX: 1,
                        ease: "none"
                    }, 0);

                    tl.fromTo(targetElementFloatingNumber, {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }, {
                        duration: durationFirstScroll,
                        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                        ease: "none"
                    }, 0);

                    tl.fromTo(targetElementFigure, {
                        scale: 1,
                        rotate: 0.001
                    }, {
                        duration: durationFirstScroll,
                        scale: 1.1,
                        rotate: 0.001,
                        ease: "none"
                    }, 0);

                    tl.to(targetElementMagneticInner, {
                        width: "100%",
                        duration: durationFirstScroll,
                        rotate: 0.001,
                        ease: "none"
                    }, 0);

                    tl.fromTo(targetElementDarkOverlay, {
                        opacity: 0,
                    }, {
                        duration: 1,
                        opacity: 1,
                        ease: "none"
                    }, 1);

                    gsap.set(targetElementNav, {
                        rotate: 0.001,
                        yPercent: 125
                    });

                    function headerEnter() {

                        gsap.to(targetElementNav, {
                            opacity: 0,
                            duration: 0.1,
                            ease: "none"
                        });
                    }

                    function headerLeave() {

                        gsap.fromTo(targetElementNav, {
                            opacity: 1,
                            rotate: 0.001,
                            yPercent: 125,
                        }, {
                            rotate: 0.001,
                            yPercent: 0,
                            duration: durationDefault,
                            stagger: (staggerDefault * 2),
                            ease: "primary-ease"
                        });
                    }
                });
            }

            if (document.querySelector('.section-work-scroll')) {

                $('.section-work-scroll').each(function() {
                    let triggerElement = $(this).find('.single-work-slides');
                    let targetElementDarkOverlay = $(this).find('.overlay-dark');
                    let slidesAmount = $(this).attr('data-slides-amount');
                    let targetThumbListFirst = $(this).find('[data-slide-item-index="1"]');
                    let targetThumbListSecond = $(this).find('[data-slide-item-index="2"]');
                    let targetThumbListPicture = $(this).find('.thumbnail-inner > .overlay');
                    let targetThumbListMagneticFirst = targetThumbListFirst.find('.magnetic-overlay');
                    let targetThumbListMagneticSecond = targetThumbListSecond.find('.magnetic-overlay');


                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            start: "top top",
                            end: "bottom bottom",
                            markers: false,
                            scrub: 0
                        }
                    });

                    tl.fromTo(targetThumbListSecond, {
                        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                    }, {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        ease: "none",
                        duration: (slidesAmount - 1)
                    });

                    tl.fromTo(targetThumbListPicture, {
                        scale: 1.1,
                        rotate: 0.001,
                    }, {
                        scale: 1,
                        rotate: 0.001,
                        ease: "none",
                        duration: (slidesAmount - 1)
                    }, "<");

                    // tl.fromTo(targetThumbListMagneticFirst, {
                    //    yPercent: 0,
                    //    rotate: 0.001,
                    // }, {
                    //    yPercent: -50,
                    //    rotate: 0.001,
                    //    ease: "none",
                    //    duration: (slidesAmount - 1)
                    // }, "<");

                    // tl.fromTo(targetThumbListMagneticSecond, {.section-home-header .row-reelivm
                    //    yPercent: 50,
                    //    rotate: 0.001,
                    // }, {
                    //    yPercent: 0,
                    //    rotate: 0.001,
                    //    ease: "none",
                    //    duration: (slidesAmount - 1)
                    // }, "<");

                    tl.fromTo(targetElementDarkOverlay, {
                        opacity: 0,
                    }, {
                        duration: 1,
                        opacity: 1,
                        ease: "none"
                    });

                });

                // Check the index of section in view
                function checkIndexSection() {
                    var indexSections = document.querySelectorAll("[data-work-height-index]");
                    var indexSectionsCount = $("[data-slides-amount]").attr('data-slides-amount');

                    for (var i = 0; i < indexSections.length; i++) {
                        var indexSection = indexSections[i];
                        var indexSectionTop = indexSection.getBoundingClientRect().top;
                        var indexSectionBottom = indexSection.getBoundingClientRect().bottom;
                        var indexObserverOffset = window.innerHeight / 2.5;

                        if (indexSectionTop <= indexObserverOffset && indexSectionBottom >= indexObserverOffset) {

                            var singleSectionIndex = $(indexSection).attr('data-work-height-index');
                            var currentSlide = parseInt(singleSectionIndex);
                            if ($('[data-slide-index-active]').attr('data-slide-index-active') == singleSectionIndex) {

                            } else {
                                var currentSlidePercentage = ((currentSlide - 1) / indexSectionsCount) * -100 + "%";
                                $('[data-slide-index-active]').attr('data-slide-index-active', singleSectionIndex);
                                $('.current-slide-index-change').text(singleSectionIndex);
                                $('.section-work-scroll').css('--current-slide-precentage', currentSlidePercentage);
                                $('[data-slide-item-index]').attr('data-slide-item-status', 'not-active');
                                $('[data-slide-item-index="' + (parseInt(singleSectionIndex)) + '"]').attr('data-slide-item-status', 'active');
                            }

                        }
                    }
                }

                // Check when scrolling
                document.addEventListener("scroll", function() {
                    checkIndexSection();
                });

                // Check on page-transition
                barba.hooks.after(() => {
                    checkIndexSection();
                });
            }

            if (document.querySelector('.section-sticky-wrap')) {
                $('.section-sticky-wrap').each(function() {
                    let stickyWrap = $(this);
                    let triggerElement = $(this).find('.section-sticky-wrap-invisible');
                    let targetElementDarkOverlay = $(this).find('.overlay-dark');

                    // Function to calculate the offset for the sticky effect
                    function calcStickyWrapOffset() {
                        let windowHeight = $(window).innerHeight();
                        let wrapContentHeight = stickyWrap.find('.section-sticky-wrap-inner').innerHeight();
                        let stickyOffset = (wrapContentHeight - windowHeight);
                        stickyWrap.css('--sticky-wrap-offset', Math.round(stickyOffset) + "px");
                    }

                    // First calculate
                    calcStickyWrapOffset();

                    $(window).resize(function() {
                        // Calculate on resize
                        calcStickyWrapOffset();
                    });

                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            start: "0% 100%",
                            end: "0% 0%",
                            scrub: 0,
                            markers: false,
                        }
                    });

                    tl.fromTo(targetElementDarkOverlay, {
                        opacity: 0,
                    }, {
                        duration: 1,
                        opacity: 1,
                        ease: "none"
                    });
                });
            }

        }, // End Desktop Only Scrolltrigger

        // Mobile Only Scrolltrigger
        "(max-width: 1024px)": function() {

            if (document.querySelector('.example')) {
                // Scrolltrigger Animation : Example
                $('.example').each(function(index) {
                    let triggerElement = $(this);
                    let targetElement = $('.example');

                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            start: "0% 100%",
                            end: "100% 0%",
                            toggleActions: "play none none none"
                        }
                    });
                    tl.to(targetElement, {
                        rotate: 90,
                        ease: "none"
                    });
                });
            }
        } // End Mobile Only Scrolltrigger


    }); // End GSAP Matchmedia
}

/**
 * Plugin Custom Contact Form Bearly Digital
 */
function initBearlyDigitalContactForm() {

    window.bearly.loadforms();

}