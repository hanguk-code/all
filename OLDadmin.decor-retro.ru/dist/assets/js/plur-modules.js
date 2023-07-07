/**
 * main settings
 */
var KTAppOptions = {
    "colors": {
        "state": {
            "brand": "#5d78ff",
            "metal": "#c4c5d6",
            "light": "#ffffff",
            "accent": "#00c5dc",
            "primary": "#5867dd",
            "success": "#34bfa3",
            "info": "#36a3f7",
            "warning": "#ffb822",
            "danger": "#fd3995",
            "focus": "#9816f4"
        },
        "base": {
            "label": [
                "#c5cbe3",
                "#a1a8c3",
                "#3d4465",
                "#3e4466"
            ],
            "shape": [
                "#f0f3ff",
                "#d9dffa",
                "#afb4d4",
                "#646c9a"
            ]
        }
    }
};

/**
 * layout.js
 */
var KTLayout = function() {
    var body;

    var header;
    var headerMenu;
    var headerMenuOffcanvas;

    var asideMenu;
    var asideMenuOffcanvas;
    var asideToggler;

    var asideSecondary;
    var asideSecondaryToggler;

    var scrollTop;

    var pageStickyPortlet;

    // Header
    var initHeader = function() {
        var tmp;
        var headerEl = KTUtil.get('kt_header');

        if (tmp = KTUtil.attr(headerEl, 'data-ktheader-minimize-offset')) {
            options.offset.desktop = tmp;
        }

        if (tmp = KTUtil.attr(headerEl, 'data-ktheader-minimize-mobile-offset')) {
            options.offset.mobile = tmp;
        }

        header = new KTHeader('kt_header');
    }

    // Header Menu
    var initHeaderMenu = function() {
        // init aside left offcanvas
        headerMenuOffcanvas = new KTOffcanvas('kt_header_menu_wrapper', {
            overlay: true,
            baseClass: 'kt-header-menu-wrapper',
            closeBy: 'kt_header_menu_mobile_close_btn',
            toggleBy: {
                target: 'kt_header_mobile_toggler',
                state: 'kt-header-mobile__toolbar-toggler--active'
            }
        });

        headerMenu = new KTMenu('kt_header_menu', {
            submenu: {
                desktop: 'dropdown',
                tablet: 'accordion',
                mobile: 'accordion'
            },
            accordion: {
                slideSpeed: 200, // accordion toggle slide speed in milliseconds
                expandAll: false // allow having multiple expanded accordions in the menu
            }
        });
    }

    // Header Topbar
    var initHeaderTopbar = function() {
        asideToggler = new KTToggle('kt_header_mobile_topbar_toggler', {
            target: 'body',
            targetState: 'kt-header__topbar--mobile-on',
            togglerState: 'kt-header-mobile__toolbar-topbar-toggler--active'
        });
    }

    // Aside
    var initAside = function() {
        // init aside left offcanvas
        var asidBrandHover = false;
        var aside = KTUtil.get('kt_aside');
        var asideBrand = KTUtil.get('kt_aside_brand');
        var asideOffcanvasClass = KTUtil.hasClass(aside, 'kt-aside--offcanvas-default') ? 'kt-aside--offcanvas-default' : 'kt-aside';

        asideMenuOffcanvas = new KTOffcanvas('kt_aside', {
            baseClass: asideOffcanvasClass,
            overlay: true,
            closeBy: 'kt_aside_close_btn',
            toggleBy: {
                target: 'kt_aside_mobile_toggler',
                state: 'kt-header-mobile__toolbar-toggler--active'
            }
        });

        // Handle minimzied aside hover
        if (KTUtil.hasClass(body, 'kt-aside--fixed')) {
            var insideTm;
            var outsideTm;

            KTUtil.addEvent(aside, 'mouseenter', function(e) {
                e.preventDefault();

                if (KTUtil.isInResponsiveRange('desktop') === false) {
                    return;
                }

                if (outsideTm) {
                    clearTimeout(outsideTm);
                    outsideTm = null;
                }

                insideTm = setTimeout(function() {
                    if (KTUtil.hasClass(body, 'kt-aside--minimize') && KTUtil.isInResponsiveRange('desktop')) {
                        KTUtil.removeClass(body, 'kt-aside--minimize');

                        // Minimizing class
                        KTUtil.addClass(body, 'kt-aside--minimizing');
                        KTUtil.transitionEnd(body, function() {
                            KTUtil.removeClass(body, 'kt-aside--minimizing');
                        });

                        // Hover class
                        KTUtil.addClass(body, 'kt-aside--minimize-hover');
                        asideMenu.scrollUpdate();
                        asideMenu.scrollTop();
                    }
                }, 50);
            });

            KTUtil.addEvent(aside, 'mouseleave', function(e) {
                e.preventDefault();

                if (KTUtil.isInResponsiveRange('desktop') === false) {
                    return;
                }

                if (insideTm) {
                    clearTimeout(insideTm);
                    insideTm = null;
                }

                outsideTm = setTimeout(function() {
                    if (KTUtil.hasClass(body, 'kt-aside--minimize-hover') && KTUtil.isInResponsiveRange('desktop')) {
                        KTUtil.removeClass(body, 'kt-aside--minimize-hover');
                        KTUtil.addClass(body, 'kt-aside--minimize');

                        // Minimizing class
                        KTUtil.addClass(body, 'kt-aside--minimizing');
                        KTUtil.transitionEnd(body, function() {
                            KTUtil.removeClass(body, 'kt-aside--minimizing');
                        });

                        // Hover class
                        asideMenu.scrollUpdate();
                        asideMenu.scrollTop();
                    }
                }, 100);
            });
        }
    }

    // Aside menu
    var initAsideMenu = function() {
        // Init aside menu
        var menu = KTUtil.get('kt_aside_menu');
        var menuDesktopMode = (KTUtil.attr(menu, 'data-ktmenu-dropdown') === '1' ? 'dropdown' : 'accordion');

        var scroll;
        if (KTUtil.attr(menu, 'data-ktmenu-scroll') === '1') {
            scroll = {
                rememberPosition: true, // remember position on page reload
                height: function() {  // calculate available scrollable area height
                    var height;

                    if (KTUtil.isInResponsiveRange('desktop')) {
                        height =
                            parseInt(KTUtil.getViewPort().height) -
                            parseInt(KTUtil.actualHeight('kt_aside_brand')) -
                            parseInt(KTUtil.getByID('kt_aside_footer') ? KTUtil.actualHeight('kt_aside_footer') : 0);
                    } else {
                        height =
                            parseInt(KTUtil.getViewPort().height) -
                            parseInt(KTUtil.getByID('kt_aside_footer') ? KTUtil.actualHeight('kt_aside_footer') : 0);
                    }

                    height = height - (parseInt(KTUtil.css(menu, 'marginBottom')) + parseInt(KTUtil.css(menu, 'marginTop')));

                    return height;
                }
            };
        }

        asideMenu = new KTMenu('kt_aside_menu', {
            // vertical scroll
            scroll: scroll,

            // submenu setup
            submenu: {
                desktop: menuDesktopMode,
                tablet: 'accordion', // menu set to accordion in tablet mode
                mobile: 'accordion' // menu set to accordion in mobile mode
            },

            //accordion setup
            accordion: {
                expandAll: false // allow having multiple expanded accordions in the menu
            }
        });
    }

    // Sidebar toggle
    var initAsideToggler = function() {
        if (!KTUtil.get('kt_aside_toggler')) {
            return;
        }

        asideToggler = new KTToggle('kt_aside_toggler', {
            target: 'body',
            targetState: 'kt-aside--minimize',
            togglerState: 'kt-aside__brand-aside-toggler--active'
        });

        asideToggler.on('toggle', function(toggle) {
            KTUtil.addClass(body, 'kt-aside--minimizing');

            KTUtil.transitionEnd(body, function() {
                KTUtil.removeClass(body, 'kt-aside--minimizing');

                if (KTUtil.get('kt_page_portlet')) {
                    pageStickyPortlet.updateSticky();
                }
            });

            headerMenu.pauseDropdownHover(800);
            asideMenu.pauseDropdownHover(800);

            // Remember state in cookie
            Cookies.set('kt_aside_toggle_state', toggle.getState());
            // to set default minimized left aside use this cookie value in your
            // server side code and add "kt-brand--minimize kt-aside--minimize" classes to
            // the body tag in order to initialize the minimized left aside mode during page loading.
        });

        asideToggler.on('beforeToggle', function(toggle) {
            var body = KTUtil.get('body');
            if (KTUtil.hasClass(body, 'kt-aside--minimize') === false && KTUtil.hasClass(body, 'kt-aside--minimize-hover')) {
                KTUtil.removeClass(body, 'kt-aside--minimize-hover');
            }
        });
    }

    // Aside secondary
    var initAsideSecondary = function() {
        if (!KTUtil.get('kt_aside_secondary')) {
            return;
        }

        asideSecondaryToggler = new KTToggle('kt_aside_secondary_toggler', {
            target: 'body',
            targetState: 'kt-aside-secondary--expanded'
        });

        asideSecondaryToggler.on('toggle', function(toggle) {
            KTUtil.transitionEnd(body, function() {
                if (KTUtil.get('kt_page_portlet')) {
                    pageStickyPortlet.updateSticky();
                }
            });
        });
    }

    // Scrolltop
    var initScrolltop = function() {
        var scrolltop = new KTScrolltop('kt_scrolltop', {
            offset: 300,
            speed: 600
        });
    }

    // Init page sticky portlet
    var initPageStickyPortlet = function() {
        return new KTPortlet('kt_page_portlet', {
            sticky: {
                offset: parseInt(KTUtil.css( KTUtil.get('kt_header'), 'height')),
                zIndex: 90,
                position: {
                    top: function() {
                        var pos = 0;

                        if (KTUtil.isInResponsiveRange('desktop')) {
                            if (KTUtil.hasClass(body, 'kt-header--fixed')) {
                                pos = pos + parseInt(KTUtil.css( KTUtil.get('kt_header'), 'height') );
                            }

                            if (KTUtil.hasClass(body, 'kt-subheader--fixed') && KTUtil.get('kt_subheader')) {
                                pos = pos + parseInt(KTUtil.css( KTUtil.get('kt_subheader'), 'height') );
                            }
                        } else {
                            if (KTUtil.hasClass(body, 'kt-header-mobile--fixed')) {
                                pos = pos + parseInt(KTUtil.css( KTUtil.get('kt_header_mobile'), 'height') );
                            }
                        }

                        return pos;
                    },
                    left: function(portlet) {
                        var porletEl = portlet.getSelf();

                        return KTUtil.offset(porletEl).left;
                    },
                    right: function(portlet) {
                        var porletEl = portlet.getSelf();

                        var portletWidth = parseInt(KTUtil.css(porletEl, 'width'));
                        var bodyWidth = parseInt(KTUtil.css(KTUtil.get('body'), 'width'));
                        var portletOffsetLeft = KTUtil.offset(porletEl).left;

                        return bodyWidth - portletWidth - portletOffsetLeft;
                    }
                }
            }
        });
    }

    return {
        init: function() {
            body = KTUtil.get('body');

            this.initHeader();
            this.initAside();
            this.initAsideSecondary();
            this.initPageStickyPortlet();

            // Non functional links notice(can be removed in production)
            $('#kt_aside_menu, #kt_header_menu').on('click', '.kt-menu__link[href="#"]:not(.kt-menu__toggle)', function(e) {
                swal("", "You have clicked on a non-functional dummy link!");

                e.preventDefault();
            });
        },

        initHeader: function() {
            initHeader();
            initHeaderMenu();
            initHeaderTopbar();
            initScrolltop();
        },

        initAside: function() {
            initAside();
            initAsideMenu();
            initAsideToggler();

            this.onAsideToggle(function(e) {
                // Update sticky portlet
                if (pageStickyPortlet) {
                    pageStickyPortlet.updateSticky();
                }

                // Reload datatable
                var datatables = $('.kt-datatable');
                if (datatables) {
                    datatables.each(function() {
                        $(this).KTDatatable('redraw');
                    });
                }
            });
        },

        initAsideSecondary: function() {
            initAsideSecondary();
        },

        initPageStickyPortlet: function() {
            if (!KTUtil.get('kt_page_portlet')) {
                return;
            }

            pageStickyPortlet = initPageStickyPortlet();
            pageStickyPortlet.initSticky();

            KTUtil.addResizeHandler(function(){
                pageStickyPortlet.updateSticky();
            });

            initPageStickyPortlet();
        },

        getAsideMenu: function() {
            return asideMenu;
        },

        onAsideToggle: function(handler) {
            if (typeof asideToggler.element !== 'undefined') {
                asideToggler.on('toggle', handler);
            }
        },

        getAsideToggler: function() {
            return asideToggler;
        },

        openAsideSecondary: function() {
            asideSecondaryToggler.toggleOn();
        },

        closeAsideSecondary: function() {
            asideSecondaryToggler.toggleOff();
        },

        getAsideSecondaryToggler: function() {
            return asideSecondaryToggler;
        },

        onAsideSecondaryToggle: function(handler) {
            if (asideSecondaryToggler) {
                asideSecondaryToggler.on('toggle', handler);
            }
        },

        closeMobileAsideMenuOffcanvas: function() {
            if (KTUtil.isMobileDevice()) {
                asideMenuOffcanvas.hide();
            }
        },

        closeMobileHeaderMenuOffcanvas: function() {
            if (KTUtil.isMobileDevice()) {
                headerMenuOffcanvas.hide();
            }
        }
    };
}();

// Init on page load completed
KTUtil.ready(function() {
    KTLayout.init();
});

/**
 * quick-panel.js
 */
var KTQuickPanel = function() {
    var panel = KTUtil.get('kt_quick_panel');
    var notificationPanel = KTUtil.get('kt_quick_panel_tab_notifications');
    var actionsPanel = KTUtil.get('kt_quick_panel_tab_actions');
    var settingsPanel = KTUtil.get('kt_quick_panel_tab_settings');

    var getContentHeight = function() {
        var height;
        var nav = KTUtil.find(panel, '.kt-offcanvas-panel__nav');
        var content = KTUtil.find(panel, '.kt-offcanvas-panel__body');

        height = parseInt(KTUtil.getViewPort().height) -
            parseInt(KTUtil.actualHeight(nav)) -
            parseInt(KTUtil.css(nav, 'margin-bottom')) -
            (2 * parseInt(KTUtil.css(nav, 'padding-top'))) -
            10;

        return height;
    }

    var initOffcanvas = function() {
        var offcanvas = new KTOffcanvas(panel, {
            overlay: true,
            baseClass: 'kt-offcanvas-panel',
            closeBy: 'kt_quick_panel_close_btn',
            toggleBy: 'kt_quick_panel_toggler_btn'
        });
    }

    var initNotifications = function() {
        KTUtil.scrollInit(notificationPanel, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return getContentHeight();
            }
        });
    }

    var initActions = function() {
        KTUtil.scrollInit(actionsPanel, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return getContentHeight();
            }
        });
    }

    var initSettings = function() {
        KTUtil.scrollInit(settingsPanel, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return getContentHeight();
            }
        });
    }

    var updatePerfectScrollbars = function() {
        $(panel).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            KTUtil.scrollUpdate(notificationPanel);
            KTUtil.scrollUpdate(actionsPanel);
            KTUtil.scrollUpdate(settingsPanel);
        });
    }

    return {
        init: function() {
            initOffcanvas();
            initNotifications();
            initActions();
            initSettings();
            updatePerfectScrollbars();
        }
    };
}();

// Init on page load completed
KTUtil.ready(function() {
    KTQuickPanel.init();
});

/**
 * quick-search.js
 */
var KTQuickSearch = function() {
    var target;
    var form;
    var input;
    var closeIcon;
    var resultWrapper;
    var resultDropdown;
    var resultDropdownToggle;
    var inputGroup;
    var query = '';

    var hasResult = false;
    var timeout = false;
    var isProcessing = false;
    var requestTimeout = 200; // ajax request fire timeout in milliseconds
    var spinnerClass = 'kt-spinner kt-spinner--input kt-spinner--sm kt-spinner--brand kt-spinner--right';
    var resultClass = 'kt-quick-search--has-result';
    var minLength = 2;

    var showProgress = function() {
        isProcessing = true;
        KTUtil.addClass(inputGroup, spinnerClass);

        if (closeIcon) {
            KTUtil.hide(closeIcon);
        }
    }

    var hideProgress = function() {
        isProcessing = false;
        KTUtil.removeClass(inputGroup, spinnerClass);

        if (closeIcon) {
            if (input.value.length < minLength) {
                KTUtil.hide(closeIcon);
            } else {
                KTUtil.show(closeIcon, 'flex');
            }
        }
    }

    var showDropdown = function() {
        if (resultDropdownToggle && !KTUtil.hasClass(resultDropdown, 'show')) {
            $(resultDropdownToggle).dropdown('toggle');
            $(resultDropdownToggle).dropdown('update');
        }
    }

    var hideDropdown = function() {
        if (resultDropdownToggle && KTUtil.hasClass(resultDropdown, 'show')) {
            $(resultDropdownToggle).dropdown('toggle');
        }
    }

    var processSearch = function() {
        if (hasResult && query === input.value) {
            hideProgress();
            KTUtil.addClass(target, resultClass);
            showDropdown();
            KTUtil.scrollUpdate(resultWrapper);

            return;
        }

        query = input.value;

        KTUtil.removeClass(target, resultClass);
        showProgress();
        hideDropdown();

        setTimeout(function() {
            $.ajax({
                url: 'https://keenthemes.com/keen/tools/preview/api/quick_search.php',
                data: {
                    query: query
                },
                dataType: 'html',
                success: function(res) {
                    hasResult = true;
                    hideProgress();
                    KTUtil.addClass(target, resultClass);
                    KTUtil.setHTML(resultWrapper, res);
                    showDropdown();
                    KTUtil.scrollUpdate(resultWrapper);
                },
                error: function(res) {
                    hasResult = false;
                    hideProgress();
                    KTUtil.addClass(target, resultClass);
                    KTUtil.setHTML(resultWrapper, '<span class="kt-quick-search__message">Connection error. Pleae try again later.</div>');
                    showDropdown();
                    KTUtil.scrollUpdate(resultWrapper);
                }
            });
        }, 1000);
    }

    var handleCancel = function(e) {
        input.value = '';
        query = '';
        hasResult = false;
        KTUtil.hide(closeIcon);
        KTUtil.removeClass(target, resultClass);
        hideDropdown();
    }

    var handleSearch = function() {
        if (input.value.length < minLength) {
            hideProgress();
            hideDropdown();

            return;
        }

        if (isProcessing == true) {
            return;
        }

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(function() {
            processSearch();
        }, requestTimeout);
    }

    return {
        init: function(element) {
            // Init
            target = element;
            form = KTUtil.find(target, '.kt-quick-search__form');
            input = KTUtil.find(target, '.kt-quick-search__input');
            closeIcon = KTUtil.find(target, '.kt-quick-search__close');
            resultWrapper = KTUtil.find(target, '.kt-quick-search__wrapper');
            resultDropdown = KTUtil.find(target, '.dropdown-menu');
            resultDropdownToggle = KTUtil.find(target, '[data-toggle="dropdown"]');
            inputGroup = KTUtil.find(target, '.input-group');

            // Attach input keyup handler
            KTUtil.addEvent(input, 'keyup', handleSearch);
            KTUtil.addEvent(input, 'focus', handleSearch);

            // Prevent enter click
            form.onkeypress = function(e) {
                var key = e.charCode || e.keyCode || 0;
                if (key == 13) {
                    e.preventDefault();
                }
            }

            KTUtil.addEvent(closeIcon, 'click', handleCancel);
        }
    };
};

var KTQuickSearchMobile = KTQuickSearch;

// Init on page load completed
KTUtil.ready(function() {
    if (KTUtil.get('kt_quick_search_dropdown')) {
        KTQuickSearch().init(KTUtil.get('kt_quick_search_dropdown'));
    }

    if (KTUtil.get('kt_quick_search_inline')) {
        KTQuickSearchMobile().init(KTUtil.get('kt_quick_search_inline'));
    }

    if (KTUtil.get('kt_quick_search_offcanvas')) {
        KTQuickSearchMobile().init(KTUtil.get('kt_quick_search_offcanvas'));
    }
});

/**
 * offcanvas-panel.js
 */
var KTOffcanvasPanel = function() {
    var notificationPanel = KTUtil.get('kt_offcanvas_toolbar_notifications');
    var quickActionsPanel = KTUtil.get('kt_offcanvas_toolbar_quick_actions');
    var profilePanel = KTUtil.get('kt_offcanvas_toolbar_profile');
    var searchPanel = KTUtil.get('kt_offcanvas_toolbar_search');

    var initNotifications = function() {
        var head = KTUtil.find(notificationPanel, '.kt-offcanvas-panel__head');
        var body = KTUtil.find(notificationPanel, '.kt-offcanvas-panel__body');

        var offcanvas = new KTOffcanvas(notificationPanel, {
            overlay: true,
            baseClass: 'kt-offcanvas-panel',
            closeBy: 'kt_offcanvas_toolbar_notifications_close',
            toggleBy: 'kt_offcanvas_toolbar_notifications_toggler_btn'
        });

        KTUtil.scrollInit(body, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(KTUtil.getViewPort().height);

                if (head) {
                    height = height - parseInt(KTUtil.actualHeight(head));
                    height = height - parseInt(KTUtil.css(head, 'marginBottom'));
                }

                height = height - parseInt(KTUtil.css(notificationPanel, 'paddingTop'));
                height = height - parseInt(KTUtil.css(notificationPanel, 'paddingBottom'));

                return height;
            }
        });
    }

    var initQucikActions = function() {
        var head = KTUtil.find(quickActionsPanel, '.kt-offcanvas-panel__head');
        var body = KTUtil.find(quickActionsPanel, '.kt-offcanvas-panel__body');

        var offcanvas = new KTOffcanvas(quickActionsPanel, {
            overlay: true,
            baseClass: 'kt-offcanvas-panel',
            closeBy: 'kt_offcanvas_toolbar_quick_actions_close',
            toggleBy: 'kt_offcanvas_toolbar_quick_actions_toggler_btn'
        });

        KTUtil.scrollInit(body, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(KTUtil.getViewPort().height);

                if (head) {
                    height = height - parseInt(KTUtil.actualHeight(head));
                    height = height - parseInt(KTUtil.css(head, 'marginBottom'));
                }

                height = height - parseInt(KTUtil.css(quickActionsPanel, 'paddingTop'));
                height = height - parseInt(KTUtil.css(quickActionsPanel, 'paddingBottom'));

                return height;
            }
        });
    }

    var initProfile = function() {
        var head = KTUtil.find(profilePanel, '.kt-offcanvas-panel__head');
        var body = KTUtil.find(profilePanel, '.kt-offcanvas-panel__body');

        var offcanvas = new KTOffcanvas(profilePanel, {
            overlay: true,
            baseClass: 'kt-offcanvas-panel',
            closeBy: 'kt_offcanvas_toolbar_profile_close',
            toggleBy: 'kt_offcanvas_toolbar_profile_toggler_btn'
        });

        KTUtil.scrollInit(body, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(KTUtil.getViewPort().height);

                if (head) {
                    height = height - parseInt(KTUtil.actualHeight(head));
                    height = height - parseInt(KTUtil.css(head, 'marginBottom'));
                }

                height = height - parseInt(KTUtil.css(profilePanel, 'paddingTop'));
                height = height - parseInt(KTUtil.css(profilePanel, 'paddingBottom'));

                return height;
            }
        });
    }

    var initSearch = function() {
        var head = KTUtil.find(searchPanel, '.kt-offcanvas-panel__head');
        var body = KTUtil.find(searchPanel, '.kt-offcanvas-panel__body');
        var search = KTUtil.get('kt_quick_search_offcanvas');
        var form = KTUtil.find(search, '.kt-quick-search__form');
        var wrapper = KTUtil.find(search, '.kt-quick-search__wrapper');

        var offcanvas = new KTOffcanvas(searchPanel, {
            overlay: true,
            baseClass: 'kt-offcanvas-panel',
            closeBy: 'kt_offcanvas_toolbar_search_close',
            toggleBy: 'kt_offcanvas_toolbar_search_toggler_btn'
        });

        KTUtil.scrollInit(wrapper, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(KTUtil.getViewPort().height);

                height = height - parseInt(KTUtil.actualHeight(form));
                height = height - parseInt(KTUtil.css(form, 'marginBottom'));

                if (head) {
                    height = height - parseInt(KTUtil.actualHeight(head));
                    height = height - parseInt(KTUtil.css(head, 'marginBottom'));
                }

                height = height - parseInt(KTUtil.css(searchPanel, 'paddingTop'));
                height = height - parseInt(KTUtil.css(searchPanel, 'paddingBottom'));

                return height;
            }
        });
    }

    return {
        init: function() {
            initNotifications();
            initQucikActions();
            initProfile();
            initSearch();
        }
    };
}();

// Init on page load completed
KTUtil.ready(function() {
    KTOffcanvasPanel.init();
});

/**
 * lib.js
 */
var KTLib = function() {

    return {
        initMiniChart: function(src, data, color, border, fill, tooltip) {
            if (src.length == 0) {
                return;
            }

            // set default values
            fill = (typeof fill !== 'undefined') ? fill : false;
            tooltip = (typeof tooltip !== 'undefined') ? tooltip : false;

            var config = {
                type: 'line',
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
                    datasets: [{
                        label: "",
                        borderColor: color,
                        borderWidth: border,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 4,
                        pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                        pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                        pointHoverBackgroundColor: KTApp.getStateColor('brand'),
                        pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
                        fill: fill,
                        backgroundColor: color,
                        data: data,
                    }]
                },
                options: {
                    title: {
                        display: false,
                    },
                    tooltips: (tooltip ? {
                        enabled: true,
                        intersect: false,
                        mode: 'nearest',
                        bodySpacing: 5,
                        yPadding: 10,
                        xPadding: 10,
                        caretPadding: 0,
                        displayColors: false,
                        backgroundColor: KTApp.getStateColor('brand'),
                        titleFontColor: '#ffffff',
                        cornerRadius: 4,
                        footerSpacing: 0,
                        titleSpacing: 0
                    } : false),
                    legend: {
                        display: false,
                        labels: {
                            usePointStyle: false
                        }
                    },
                    responsive: false,
                    maintainAspectRatio: true,
                    hover: {
                        mode: 'index'
                    },
                    scales: {
                        xAxes: [{
                            display: false,
                            gridLines: false,
                            scaleLabel: {
                                display: false,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            display: false,
                            gridLines: false,
                            scaleLabel: {
                                display: false,
                                labelString: 'Month'
                            }
                        }]
                    },

                    elements: {
                        line: {
                            tension: 0.5
                        },
                        point: {
                            radius: 2,
                            borderWidth: 4
                        },
                    },

                    layout: {
                        padding: {
                            left: 6,
                            right: 0,
                            top: 4,
                            bottom: 0
                        }
                    }
                }
            };

            var chart = new Chart(src, config);
        },

        initMediumChart: function(src, data, max, color, border) {
            if (!document.getElementById(src)) {
                return;
            }

            var border = border ? border : 2;

            // Main chart
            var ctx = document.getElementById(src).getContext("2d");

            var gradient = ctx.createLinearGradient(0, 0, 0, 100);
            gradient.addColorStop(0, Chart.helpers.color(color).alpha(0.3).rgbString());
            gradient.addColorStop(1, Chart.helpers.color(color).alpha(0).rgbString());

            var mainConfig = {
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
                    datasets: [{
                        label: 'Orders',
                        borderColor: color,
                        borderWidth: border,
                        backgroundColor: gradient,
                        pointBackgroundColor: KTApp.getStateColor('brand'),
                        data: data,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: false,
                        text: 'Stacked Area'
                    },
                    tooltips: {
                        enabled: true,
                        intersect: false,
                        mode: 'nearest',
                        bodySpacing: 5,
                        yPadding: 10,
                        xPadding: 10,
                        caretPadding: 0,
                        displayColors: false,
                        backgroundColor: KTApp.getStateColor('brand'),
                        titleFontColor: '#ffffff',
                        cornerRadius: 4,
                        footerSpacing: 0,
                        titleSpacing: 0
                    },
                    legend: {
                        display: false,
                        labels: {
                            usePointStyle: false
                        }
                    },
                    hover: {
                        mode: 'index'
                    },
                    scales: {
                        xAxes: [{
                            display: false,
                            scaleLabel: {
                                display: false,
                                labelString: 'Month'
                            },
                            ticks: {
                                display: false,
                                beginAtZero: true,
                            }
                        }],
                        yAxes: [{
                            display: false,
                            scaleLabel: {
                                display: false,
                                labelString: 'Value'
                            },
                            gridLines: {
                                color: '#eef2f9',
                                drawBorder: false,
                                offsetGridLines: true,
                                drawTicks: false
                            },
                            ticks: {
                                max: max,
                                display: false,
                                beginAtZero: true
                            }
                        }]
                    },
                    elements: {
                        point: {
                            radius: 0,
                            borderWidth: 0,
                            hoverRadius: 0,
                            hoverBorderWidth: 0
                        }
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            };

            var chart = new Chart(ctx, mainConfig);

            // Update chart on window resize
            KTUtil.addResizeHandler(function() {
                chart.update();
            });
        }
    };
}();

/**
 * @class app.js
 */
var KTApp = function() {
    /** @type {object} colors State colors **/
    var colors = {};

    var initTooltip = function(el) {
        var skin = el.data('skin') ? 'tooltip-' + el.data('skin') : '';
        var width = el.data('width') == 'auto' ? 'tooltop-auto-width' : '';
        var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';
        var placement = el.data('placement') ? el.data('placement') : 'left';

        el.tooltip({
            trigger: triggerValue,
            template: '<div class="tooltip ' + skin + ' ' + width + '" role="tooltip">\
                <div class="arrow"></div>\
                <div class="tooltip-inner"></div>\
            </div>'
        });
    }

    var initTooltips = function() {
        // init bootstrap tooltips
        $('[data-toggle="kt-tooltip"]').each(function() {
            initTooltip($(this));
        });
    }

    var initPopover = function(el) {
        var skin = el.data('skin') ? 'popover-' + el.data('skin') : '';
        var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';

        el.popover({
            trigger: triggerValue,
            template: '\
            <div class="popover ' + skin + '" role="tooltip">\
                <div class="arrow"></div>\
                <h3 class="popover-header"></h3>\
                <div class="popover-body"></div>\
            </div>'
        });
    }

    var initPopovers = function() {
        // init bootstrap popover
        $('[data-toggle="kt-popover"]').each(function() {
            initPopover($(this));
        });
    }

    var initFileInput = function() {
        // init bootstrap popover
        $('.custom-file-input').on('change', function() {
            var fileName = $(this).val();
            $(this).next('.custom-file-label').addClass("selected").html(fileName);
        });
    }

    var initPortlet = function(el, options) {
        // init portlet tools
        var el = $(el);
        var portlet = new KTPortlet(el[0], options);
    }

    var initPortlets = function() {
        // init portlet tools
        $('[data-ktportlet="true"]').each(function() {
            var el = $(this);

            if (el.data('data-ktportlet-initialized') !== true) {
                initPortlet(el, {});
                el.data('data-ktportlet-initialized', true);
            }
        });
    }

    var initScroll = function() {
        $('[data-scroll="true"]').each(function() {
            var el = $(this);
            KTUtil.scrollInit(this, {
                mobileNativeScroll: true,
                handleWindowResize: true,
                rememberPosition: (el.data('remember-position') == 'true' ? true : false),
                height: function() {
                    if (KTUtil.isInResponsiveRange('tablet-and-mobile') && el.data('mobile-height')) {
                        return el.data('mobile-height');
                    } else {
                        return el.data('height');
                    }
                }
            });
        });
    }

    var initAlerts = function() {
        // init bootstrap popover
        $('body').on('click', '[data-close=alert]', function() {
            $(this).closest('.alert').hide();
        });
    }

    var initSticky = function() {
        var sticky = new Sticky('[data-sticky="true"]');
    }

    var initAbsoluteDropdown = function(context) {
        var dropdownMenu;

        if (!context) {
            return;
        }

        $('body').on('show.bs.dropdown', context, function(e) {
            dropdownMenu = $(e.target).find('.dropdown-menu');
            $('body').append(dropdownMenu.detach());
            dropdownMenu.css('display', 'block');
            dropdownMenu.position({
                'my': 'right top',
                'at': 'right bottom',
                'of': $(e.relatedTarget),
            });
        }).on('hide.bs.dropdown', context, function(e) {
            $(e.target).append(dropdownMenu.detach());
            dropdownMenu.hide();
        });
    }

    var initAbsoluteDropdowns = function() {
        $('body').on('show.bs.dropdown', function(e) {
            // e.target is always parent (contains toggler and menu)
            var $toggler = $(e.target).find("[data-attach='body']");
            if ($toggler.length === 0) {
                return;
            }
            var $dropdownMenu = $(e.target).find('.dropdown-menu');
            // save detached menu
            var $detachedDropdownMenu = $dropdownMenu.detach();
            // save reference to detached menu inside data of toggler
            $toggler.data('dropdown-menu', $detachedDropdownMenu);

            $('body').append($detachedDropdownMenu);
            $detachedDropdownMenu.css('display', 'block');
            $detachedDropdownMenu.position({
                my: 'right top',
                at: 'right bottom',
                of: $(e.relatedTarget),
            });
        });

        $('body').on('hide.bs.dropdown', function(e) {
            var $toggler = $(e.target).find("[data-attach='body']");
            if ($toggler.length === 0) {
                return;
            }
            // access to reference of detached menu from data of toggler
            var $detachedDropdownMenu = $toggler.data('dropdown-menu');
            // re-append detached menu inside parent
            $(e.target).append($detachedDropdownMenu.detach());
            // hide dropdown
            $detachedDropdownMenu.hide();
        });
    };

    return {
        init: function(options) {
            if (options && options.colors) {
                colors = options.colors;
            }

            KTApp.initComponents();
        },

        initComponents: function() {
            initScroll();
            initTooltips();
            initPopovers();
            initAlerts();
            initPortlets();
            initFileInput();
            initSticky();
            initAbsoluteDropdowns();
        },

        initTooltips: function() {
            initTooltips();
        },

        initTooltip: function(el) {
            initTooltip(el);
        },

        initPopovers: function() {
            initPopovers();
        },

        initPopover: function(el) {
            initPopover(el);
        },

        initPortlet: function(el, options) {
            initPortlet(el, options);
        },

        initPortlets: function() {
            initPortlets();
        },

        initSticky: function() {
            initSticky();
        },

        initAbsoluteDropdown: function(context) {
            initAbsoluteDropdown(context);
        },

        block: function(target, options) {
            var el = $(target);

            options = $.extend(true, {
                opacity: 0.05,
                overlayColor: '#000000',
                type: '',
                size: '',
                state: 'brand',
                centerX: true,
                centerY: true,
                message: '',
                shadow: true,
                width: 'auto'
            }, options);

            var html;
            var version = options.type ? 'kt-spinner--' + options.type : '';
            var state = options.state ? 'kt-spinner--' + options.state : '';
            var size = options.size ? 'kt-spinner--' + options.size : '';
            var spinner = '<div class="kt-spinner ' + version + ' ' + state + ' ' + size + '"></div';

            if (options.message && options.message.length > 0) {
                var classes = 'blockui ' + (options.shadow === false ? 'blockui' : '');

                html = '<div class="' + classes + '"><span>' + options.message + '</span><span>' + spinner + '</span></div>';

                var el = document.createElement('div');
                KTUtil.get('body').prepend(el);
                KTUtil.addClass(el, classes);
                el.innerHTML = '<span>' + options.message + '</span><span>' + spinner + '</span>';
                options.width = KTUtil.actualWidth(el) + 10;
                KTUtil.remove(el);

                if (target == 'body') {
                    html = '<div class="' + classes + '" style="margin-left:-' + (options.width / 2) + 'px;"><span>' + options.message + '</span><span>' + spinner + '</span></div>';
                }
            } else {
                html = spinner;
            }

            var params = {
                message: html,
                centerY: options.centerY,
                centerX: options.centerX,
                css: {
                    top: '30%',
                    left: '50%',
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none',
                    width: options.width
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor,
                    opacity: options.opacity,
                    cursor: 'wait',
                    zIndex: (target == 'body' ? 1100 : 10)
                },
                onUnblock: function() {
                    if (el && el[0]) {
                        KTUtil.css(el[0], 'position', '');
                        KTUtil.css(el[0], 'zoom', '');
                    }
                }
            };

            if (target == 'body') {
                params.css.top = '50%';
                $.blockUI(params);
            } else {
                var el = $(target);
                el.block(params);
            }
        },

        unblock: function(target) {
            if (target && target != 'body') {
                $(target).unblock();
            } else {
                $.unblockUI();
            }
        },

        blockPage: function(options) {
            return KTApp.block('body', options);
        },

        unblockPage: function() {
            return KTApp.unblock('body');
        },

        progress: function(target, options) {
            var skin = (options && options.skin) ? options.skin : 'light';
            var alignment = (options && options.alignment) ? options.alignment : 'right';
            var size = (options && options.size) ? ' kt-spinner--' + options.size : '';
            var classes = 'kt-spinner ' + 'kt-spinner--' + skin + ' kt-spinner--' + alignment + size;

            KTApp.unprogress(target);
            KTUtil.attr(target, 'disabled', true);

            $(target).addClass(classes);
            $(target).data('progress-classes', classes);
        },

        unprogress: function(target) {
            $(target).removeClass($(target).data('progress-classes'));
            KTUtil.removeAttr(target, 'disabled');
        },

        getStateColor: function(name) {
            return colors["state"][name];
        },

        getBaseColor: function(type, level) {
            return colors["base"][type][level - 1];
        }
    };
}();

// Initialize KTApp class on document ready
$(document).ready(function() {
    KTApp.init(KTAppOptions);
});
