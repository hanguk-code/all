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

// webpack support
if (typeof module !== 'undefined') {
    module.exports = KTLayout;
}

// Init on page load completed
KTUtil.ready(function() {
    KTLayout.init();
});

var KTAsideSecondary = function() {
    var panel = KTUtil.get('kt_aside_secondary');
    var content1 = KTUtil.get('kt_aside_secondary_tab_1');
    var content2 = KTUtil.get('kt_aside_secondary_tab_2');
    var content3 = KTUtil.get('kt_aside_secondary_tab_3');
    var scroll1 = KTUtil.find(content1, '.kt-aside-secondary__content-body');
    var scroll2 = KTUtil.find(content2, '.kt-aside-secondary__content-body');
    var scroll3 = KTUtil.find(content3, '.kt-aside-secondary__content-body');
    var mobileNavToggler;
    var lastOpenedTab;

    var getContentHeight = function(content) {
        var height;
        var head = KTUtil.find(content, '.kt-aside-secondary__content-head');
        var body = KTUtil.find(content, '.kt-aside-secondary__content-body');

        height = parseInt(KTUtil.getViewPort().height) - parseInt(KTUtil.actualHeight(head)) - 60;

        if (KTUtil.isInResponsiveRange('desktop')) {
            height = height - KTUtil.actualHeight(KTUtil.get('kt_header'));
        } else {
            height = height - KTUtil.actualHeight(KTUtil.get('kt_header_mobile'));
        }

        return height;
    }

    var initNavs = function() {
        $('#kt_aside_secondary_nav a[data-toggle="tab"]').on('click', function (e) {
            if ((lastOpenedTab && lastOpenedTab.is($(this))) && $('body').hasClass('kt-aside-secondary--expanded')) {
                KTLayout.closeAsideSecondary();
            } else {
                lastOpenedTab =  $(this);
                KTLayout.openAsideSecondary();
            }
        });

        $('#kt_aside_secondary_close').on('click', function (e) {
            KTLayout.closeAsideSecondary();
        });

        $('#kt_aside_secondary_nav a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            KTUtil.scrollUpdate(scroll1);
            KTUtil.scrollUpdate(scroll2);
            KTUtil.scrollUpdate(scroll3);
        });

        mobileNavToggler = new KTToggle('kt_aside_secondary_mobile_nav_toggler', {
            target: 'body',
            targetState: 'kt-aside-secondary--mobile-nav-expanded'
        });
    }

    var initContent1 = function() {
        KTUtil.scrollInit(scroll1, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return getContentHeight(content1);
            }
        });
    }

    var initContent2 = function() {
        KTUtil.scrollInit(scroll2, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return getContentHeight(content2);
            }
        });
    }

    var initContent3 = function() {
        KTUtil.scrollInit(scroll3, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return getContentHeight(content3);
            }
        });
    }

    return {
        init: function() {
            //initOffcanvas();
            initNavs();
            initContent1();
            initContent2();
            initContent3();
        }
    };
}();

// Init on page load completed
KTUtil.ready(function() {
    KTAsideSecondary.init();
});

var KTDemoPanel = function() {
    var demoPanel = KTUtil.getByID('kt_demo_panel');
    var offcanvas;

    var init = function() {
        offcanvas = new KTOffcanvas(demoPanel, {
            overlay: true,
            baseClass: 'kt-demo-panel',
            closeBy: 'kt_demo_panel_close',
            toggleBy: 'kt_demo_panel_toggle'
        });

        var head = KTUtil.find(demoPanel, '.kt-demo-panel__head');
        var body = KTUtil.find(demoPanel, '.kt-demo-panel__body');

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

                height = height - parseInt(KTUtil.css(demoPanel, 'paddingTop'));
                height = height - parseInt(KTUtil.css(demoPanel, 'paddingBottom'));

                return height;
            }
        });

        if (typeof offcanvas !== 'undefined' && !$.isEmptyObject(offcanvas)) {
            offcanvas.on('hide', function() {
                alert(1);
                var expires = new Date(new Date().getTime() + 60 * 60 * 1000); // expire in 60 minutes from now
                Cookies.set('kt_demo_panel_shown', 1, { expires: expires });
            });
        }
    }

    var remind = function() {
        if (!(encodeURI(window.location.hostname) == 'keenthemes.com' || encodeURI(window.location.hostname) == 'www.keenthemes.com')) {
            return;
        }

        setTimeout(function() {
            if (!Cookies.get('kt_demo_panel_shown')) {
                var expires = new Date(new Date().getTime() + 15 * 60 * 1000); // expire in 15 minutes from now
                Cookies.set('kt_demo_panel_shown', 1, { expires: expires });
                offcanvas.show();
            }
        }, 4000);
    }

    return {
        init: function() {
            init();
            remind();
        }
    };
}();

// Init on page load completed
KTUtil.ready(function() {
    KTDemoPanel.init();
});

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

// webpack support
if (typeof module !== 'undefined') {
    module.exports = KTLib;
}

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
