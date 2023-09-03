document.addEventListener('DOMContentLoaded', (event) => {
  var header = document.getElementById("masthead");

  let smallScreen = window.matchMedia("(max-width: 374px)");
  function makeHeaderSticky() {
    if (!smallScreen.matches) {
      header.classList.toggle("sticky", window.pageYOffset > 0);
    }

  }
  window.onscroll = function () {
    makeHeaderSticky();
  };


  // lazy-load
  const el = document.querySelectorAll('.lazy');
  window.observer = lozad(el);
  window.observer.observe();

  const getElement = (context, selector) => {
    if (!context && !selector) {
      return null;
    }

    return context.querySelector(selector);
  };

  const uniqSlider = document.querySelector('.uniq-slider');

  //  uniq-slider
  if(uniqSlider !== null) {
    let uniqItem = uniqSlider.querySelectorAll('.js-uniq-item');
    let uniqControl = uniqSlider.querySelectorAll('.js-uniq-control');

    uniqItem.forEach((el, i) => {
      const id = el.getAttribute('data-id');

      if(window.outerWidth < 1024) {
        el.classList.add('slide')
        el.classList.add('show')
      } else {
        el.addEventListener('click', (event) => {
          uniqItem.forEach((siblings) => {
            siblings.classList.remove('slide')
            setTimeout(() => {
              siblings.classList.remove('show')
            }, 99)
          });

          uniqControl.forEach((control) => {
            control.classList.remove('slide')
          });

          uniqSlider.querySelector('.js-uniq-control[data-id="'+ id + '"]').classList.add('slide');

          el.classList.add('slide')
          setTimeout(() => {
            el.classList.add('show')
          }, 100)
        })
      }
    })

    uniqControl.forEach((el, i) => {
      const id = el.getAttribute('data-id');
      el.addEventListener('click', (event) => {
        uniqControl.forEach((siblings) => {
          siblings.classList.remove('slide')
        });

        uniqItem.forEach((control) => {
          control.classList.remove('slide')
          setTimeout(() => {
            control.classList.remove('show')
          }, 99)
        });

        uniqSlider.querySelector('.js-uniq-item[data-id="'+ id + '"]').classList.add('slide');
        setTimeout(() => {
          uniqSlider.querySelector('.js-uniq-item[data-id="'+ id + '"]').classList.add('show');
        }, 100)

        el.classList.add('slide')
      })
    })
  }


  // js switch slider
  const parentSwitch = document.querySelectorAll('.js-slider-control');

  if(parentSwitch !== null) {

    parentSwitch.forEach( (parent) => {
      const switchButton = parent.querySelectorAll('.controls-tab__control');
      const switchBlock  = parent.querySelectorAll('.card-slider');
      switchButton.forEach((el) => {
        const back = el.closest('.controls-tab__body').querySelector('.controls-tab__back')
        const id = el.getAttribute('data-id');
        const  color = el.getAttribute('data-bgcolor');
        let width = el.clientWidth;
        let left = el.offsetLeft
        if(el.classList.contains('active')) {
          width = el.clientWidth;
          back.style.width = width + 32 + 'px';
          back.style.backgroundColor = color;
        }
        el.addEventListener('click', () => {

          if(el.classList.contains('js-slider-second')) {
            parent.classList.add('dark');
          } else {
            parent.classList.remove('dark');
          }

          switchButton.forEach((siblings)=> {
            siblings.classList.remove('active')
          })

          switchBlock.forEach((siblings)=> {
            siblings.classList.remove('active')
          })
          if(parent.querySelector('.card-slider[data-id="'+ id +'"]') !== null) {
            parent.querySelector('.card-slider[data-id="'+ id +'"]').classList.add('active');
          }

          back.style.width = width + 32 + 'px';
          back.style.left = left - 16 + 'px';
          back.style.backgroundColor = color;
          el.classList.add('active')
        })
      })
    })

  }


  // bottom slider
  const parentInit = document.querySelectorAll('[data-slider="card-slider"]');

  if(parentInit !== null) {
    parentInit.forEach((el) => {
      const smallCardsSlider = el.querySelector('.swiper-container');

      const smallCardsSwiper = new Swiper(smallCardsSlider, {
        simulateTouch: true,
        lazy: {
          loadOnTransitionStart: true
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        loop: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        followFinger: true,
        on: {
          afterInit: (event) => {
            setTimeout(() => {
              console.log( el.querySelectorAll('.swiper-pagination-bullet'));
              el.querySelectorAll('.swiper-slide').forEach((slide, slideIndex) => {
                const tooltip = slide.getAttribute('data-tooltip-text');
                el.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, bulletIndex) => {
                  if(slideIndex === bulletIndex) {
                    bullet.innerHTML = `
										  <span class="nav-tooltip nav-tooltip--white nav-tooltip--bottom">${tooltip}</span>
										`
                  }
                })
              })
            }, 0)

          },
        },
        navigation: {
          nextEl: getElement(smallCardsSlider.closest('[data-slider="card-slider"]'), '.js-swiper-next'),
          prevEl: getElement(smallCardsSlider.closest('[data-slider="card-slider"]'), '.js-swiper-prev'),
          disabledClass: 'swiper-lock'
        },
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          clickable: true
        },

      });
    })
  }

  if(document.body.classList.contains('product-page')) {
    const svgControls = document.querySelector('.js-svg-controls');
    const svgControl = svgControls.querySelectorAll('.js-svg-control');
    const tabsWrap = svgControls.querySelector('.svg-tabs');
    const svgParent = document.querySelector('.product-second');
    const iceButton = svgParent.querySelector('.js-move-iceberg');
    const iceButtonBack = svgParent.querySelector('.js-moveBack-iceberg');
    const iceberg = svgParent.querySelector('.iceberg');
    const rcontainer = svgParent.querySelector('.rconainer');
    const palms = rcontainer.querySelectorAll('.right-elem');
    const clouds = svgParent.querySelectorAll('.cloud');
    const bg = svgParent.querySelector('.product-second__bg');
    const svg = svgParent.querySelector('.product-second__svg');
    const text = svgParent.querySelector('.wth-text');

    if(svgControls !== null && svgControl !== null) {
      iceButton.addEventListener('click', () => {
        iceberg.classList.add('move');
        iceButton.classList.add('active');
        iceButtonBack.classList.remove('active');
        iceButton.closest('.controls-tab__body').classList.add('green')
        clouds.forEach((palm) => {
          palm.classList.add('move')
        })
        tabsWrap.classList.add('hide1');

        rcontainer.classList.add('show');
        palms.forEach((palm) => {
          palm.classList.add('show')
        })
        setTimeout(() => {
          rcontainer.classList.add('finish');
          bg.classList.add('finish');
          text.classList.add('show');
        }, 200)

        setTimeout(() => {
          iceberg.classList.add('hide1');
        }, 200)
      })

      iceButtonBack.addEventListener('click', () => {
        iceberg.classList.remove('hide1');
        iceberg.classList.remove('move');
        iceButtonBack.classList.add('active');
        tabsWrap.classList.remove('hide1')
        iceButton.classList.remove('active');
        iceButton.closest('.controls-tab__body').classList.remove('green')
        palms.forEach((palm) => {
          palm.classList.remove('show')
        })
        clouds.forEach((palm) => {
          palm.classList.remove('move')
        })
        rcontainer.classList.remove('show');
        rcontainer.classList.remove('finish');
        bg.classList.remove('finish');
        text.classList.remove('show');
        clearAllBodyScrollLocks()
      })


      svgControl.forEach((control) => {
        console.log(control);
        let id = control.getAttribute('data-id');
        control.addEventListener('click', () => {
          svgControls.querySelectorAll('.js-control-tab').forEach((tab) => {
            tab.classList.remove('active');
          })
          svgControl.forEach((el) => {
            el.classList.remove('active');
          })
          control.classList.add('active');
          document.querySelector('.button--tab[data-id="'+ id +'"]').classList.add('active');
          svgControls.querySelector('.js-control-tab[data-id="'+ id +'"]').classList.add('active');
          iceberg.querySelectorAll('.js-svg-control').forEach((elem) => {
            if(elem.getAttribute('data-id') === id) {
              elem.classList.add('active');
            }
          })
          document.body.classList.remove('oh');
        })
      })
    }

    var scrollPos = 0;
    let height = svgControls.offsetHeight;
    let scrollBottom = true;
    let scrollTop = true;
    window.addEventListener('scroll', (e) => {
      const headerHeight = document.querySelector('.site-header').offsetHeight
      let topPos = svgControls.getBoundingClientRect().top;
      if (document.body.getBoundingClientRect().top < scrollPos) {
        if (topPos < 0 + headerHeight + 80 && scrollBottom) {
          if (svgParent.querySelector('.controls-tab__control.active').nextElementSibling !== null) {
            document.body.classList.add('oh');
            svgParent.querySelector('.controls-tab__control.active').nextElementSibling.click();
            scrollBottom = true
            scrollTop = true;
            setTimeout(() => {
              document.body.classList.remove('oh');
            }, 500)
            scrollBottom = false
          }
        }
      } else {
        if(topPos > 0 + headerHeight && scrollTop) {
          if (svgParent.querySelector('.controls-tab__control.active').previousElementSibling !== null) {

            document.body.classList.add('oh');
            svgParent.querySelector('.controls-tab__control.active').previousElementSibling.click();
            scrollBottom = true
            scrollTop = true;
            setTimeout(() => {
              document.body.classList.remove('oh');
            }, 500)
            scrollTop = false;
          }
        }
      }
      if(window.scrollY === 0) {
        scrollBottom = true
        scrollTop = true;
        document.body.classList.remove('oh');
      }

      scrollPos = document.body.getBoundingClientRect().top;
    })

    let svgTextWrap = document.querySelectorAll('.js-text-svg').forEach((elem) => {
      let title = elem.querySelector('[data-title]')
      let text = elem.querySelector('[data-text]')
      let id = elem.getAttribute('data-id')

      var newText = text.innerHTML.split('<br>');
      var newTitle = title.innerHTML.split('<br>');

      let textSvg = newText.map((el) => {
        return `
         <tspan x="0" dy="1.5em">${el}</tspan>
      `
      })

      let titleSvg = newTitle.map((el) => {
        return `
         <tspan x="0" dy="1.3em">${el}</tspan>
      `
      })

      document.querySelector('.svg-tooltip[data-id="'+id +'"]').querySelector('.svg-tooltip__text').innerHTML = textSvg.join('');
      document.querySelector('.svg-tooltip[data-id="'+id +'"]').querySelector('.svg-tooltip__title').innerHTML = titleSvg.join('');
    })


    document.querySelectorAll('.js-scroll-to').forEach((elem) => {
      const scrollTo = elem.getAttribute('data-scroll');
      const scrollBlock = document.querySelector(''+scrollTo +'')
      const headerHeight = document.querySelector('.site-header').offsetHeight
      let id = elem.getAttribute('data-id')
      elem.addEventListener('click', () => {
        const y = scrollBlock.getBoundingClientRect().top + window.scrollY;
        document.querySelector('.js-uniq-item[data-id="'+ id+'"]').click()
        window.scroll({
          top: window.outerWidth < 1024 ? y - headerHeight - 10 : y - headerHeight -50,
          left: 100,
          behavior: 'smooth'
        });
      })
    })

    const cubes = document.querySelectorAll('.js-cube');
    const svgTOp = document.querySelector('.product-top__svg')

    svgTOp.addEventListener('mouseleave', () => {
      document.querySelectorAll('.svg-tooltip').forEach((el) => {
        el.classList.remove('show')
      })
    })

    cubes.forEach((cube) => {
      const scrollTo = cube.getAttribute('data-scroll');
      const scrollBlock = document.querySelector(''+scrollTo +'')
      const headerHeight = document.querySelector('.site-header').offsetHeight
      const y = scrollBlock.getBoundingClientRect().top + window.scrollY;
      const id = cube.getAttribute('data-id');

      cube.addEventListener('click', () => {
        document.querySelector('.js-uniq-item[data-id="'+ id+'"]').click()
        window.scroll({
          top: window.outerWidth < 1024 ? y - headerHeight - 10 : y - headerHeight -50,
          left: 100,
          behavior: 'smooth'
        });
      })
      cube.addEventListener('mouseover', () => {

        if(cube.classList.contains('js-cube-tank')) {
          document.querySelectorAll('.js-cube-tank').forEach((hover) => {
            hover.classList.add('hover')
          })
        }

        if(cube.classList.contains('js-first-cube')) {
          document.querySelectorAll('.cube-first-hover').forEach((firstcube) => {
            firstcube.classList.add('hover')
          })
        }

        if(cube.classList.contains('js-second-hover')) {
          document.querySelectorAll('.sec-cube-hover').forEach((secondcube) => {
            secondcube.classList.add('hover')
          })
        }


        cube.classList.add('hover')
        document.querySelectorAll('.svg-tooltip').forEach((el) => {
          el.classList.remove('show')
        })

        document.querySelector('.svg-tooltip[data-id="'+id +'"]').classList.add('show')
      })

      cube.addEventListener('mouseleave', () => {
        cubes.forEach((hover) => {
          hover.classList.remove('hover')
        })

        document.querySelectorAll('.js-cube-tank').forEach((hover) => {
          hover.classList.remove('hover')
        })

        document.querySelectorAll('.cube-first-hover').forEach((firstcube) => {
          firstcube.classList.remove('hover')
        })

        document.querySelectorAll('.sec-cube-hover').forEach((secondcube) => {
          secondcube.classList.remove('hover')
        })
      })

      document.querySelector('.svg-tooltip[data-id="'+id +'"]').addEventListener('mouseleave', (event) => {
        console.log(18484);
        event.currentTarget.classList.remove('show')
      })
    })

  }
  // iceberg

  const openList = document.querySelector('.js-open-list');
  const closeList = document.querySelectorAll('.js-close-list');

  if(openList !== null) {
    document.querySelector('.items-popup').addEventListener('touchstart', handleTouchStart, false);
    document.querySelector('.items-popup').addEventListener('touchmove', handleTouchMove, false);

    openList.addEventListener('click', () => {
      document.querySelector('.items-popup').classList.add('show');

      setTimeout(() => {
        document.querySelector('.items-popup').classList.add('finish');
      }, 300)
    })

    closeList.forEach((close) => {

      close.addEventListener('click', () => {
        document.querySelector('.items-popup').classList.remove('finish');

        setTimeout(() => {
          document.querySelector('.items-popup').classList.remove('show');
        }, 300)
      })

    })

    document.querySelectorAll('.js-scroll-to').forEach((elem) => {
      elem.addEventListener('click', () => {
        document.querySelector('.items-popup').classList.remove('finish');

        setTimeout(() => {
          document.querySelector('.items-popup').classList.remove('show');
        }, 300)

      })
    })

    var yDown = null;
    function handleTouchStart(evt) {
      yDown = evt.touches[0].clientY;
    };
    function handleTouchMove(evt) {
      if (! yDown ) {
        return;
      }
      var yUp = evt.touches[0].clientY;

      var yDiff = yDown - yUp;
      if(Math.abs( yDiff )>20){ //to deal with to short swipes

        if ( yDiff > 0 ) {/* up swipe */
          document.querySelector('.items-popup').classList.remove('finish');

          setTimeout(() => {
            document.querySelector('.items-popup').classList.remove('show');
          }, 300)
        } else { /* down swipe */

        }
        /* reset values */
        yDown = null;
      }
    };
  }


  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "ios";
    }

    return "unknown";
  }

  // Initial state


  // pricing page

  // price tabs

  const mainTabButtons = document.querySelectorAll('.js-price-button');
  const middleTabButtons = document.querySelectorAll('.js-middle-button');
  const bottomTabButtons = document.querySelectorAll('.js-pay-button');
  const middleButtonsWrap = document.querySelector('.pricing-top__s-tabs');

  window.funcCalc = function () {
    middleButtonsWrap.querySelectorAll('.middle-buttons').forEach((elem) => {

      elem.querySelectorAll('.middle-button').forEach((el) => {
        const length = elem.querySelectorAll('.middle-button').length;
        const wW = window.innerWidth

        if(length > 5) {
          elem.classList.add('many')
        }

        elem.querySelectorAll('.middle-button').forEach((el) => {
          if((el.offsetWidth * length) - 50 > wW) {
            elem.classList.add('hide')
            document.querySelector('.mob-tabs-open[data-id="'+ id+'"]').classList.add('visvi')
          }
        })
      })
    })
  }

  if(middleButtonsWrap !== null) {
    setTimeout(() => {
      funcCalc()
    }, 0)

    window.addEventListener('resize', () => {
      funcCalc()
    })

  }

  var type = window.location.hash.substring(1);
  const typeSecond = type.slice(type.indexOf('-') + 1);
  mainTabButtons.forEach((mainButton) => {
      const wrap = mainButton.closest('.js-price-wrap');
      const id = mainButton.getAttribute('data-id');
      const wrapTwo = mainButton.closest('.js-middle-block');

      if(type.includes(id)) {
        setTimeout(() => {
          mainButton.click()
        }, 100)

      }

    if(mainButton.classList.contains('active')) {
        // const secondText = document.querySelector('.js-price-wrap[data-id="'+id +'"]').querySelector('.js-middle-button.active .middle-button__name').innerText;
        // let addUrl = "#"+id+'-'+secondText.toLowerCase();
        //
        // window.history.replaceState('statedata', 'title', addUrl);
      }

      mainButton.addEventListener('click', (event) => {
        const secondText = document.querySelector('.js-price-wrap[data-id="'+id +'"]').querySelector('.js-middle-button.active .middle-button__name').innerText
        let addUrl = '#'+id+'-'+secondText.toLowerCase();
        window.location.hash = addUrl

        setTimeout(() => {
          funcCalc()
          bottomTabButtons.forEach((button) => {
            const wrap = button.closest('.js-price-wrap');
            const back = wrap.querySelector('.back-over');

            if(button.classList.contains('active')) {
              back.style.width = button.clientWidth + 'px'
            }
          })
        }, 0)

        wrap.querySelectorAll('.js-price-button').forEach((siblings) => {
          siblings.classList.remove('active');
        })
        event.currentTarget.classList.add('active');
        document.querySelectorAll('.js-price-block').forEach((siblingsBlocks) => {
          siblingsBlocks.classList.remove('active');
          setTimeout(() => {
            siblingsBlocks.classList.remove('show');
          }, 100)
        })
        document.querySelectorAll('.js-price-block[data-id="'+ id +'"]').forEach((blockActive) => {
          blockActive.classList.add('active');
          setTimeout(() => {
            blockActive.classList.add('show');
          }, 100)
          blockActive.querySelectorAll('.js-middle-block').forEach((inner, i) => {
            if(i === 0) {
              inner.classList.add('active');
              setTimeout(() => {
                inner.classList.add('show');
              }, 100)
            } else {
              inner.classList.remove('active');
              setTimeout(() => {
                inner.classList.remove('show');
              }, 100)
            }

          })

          blockActive.querySelectorAll('.js-middle-button').forEach((inner, i) => {
            if(i === 0) {
              inner.classList.add('active');
            } else {
              inner.classList.remove('active');
            }
          })
        })

      })
  })

  middleTabButtons.forEach((mainButton) => {
    const wrap = mainButton.closest('.js-price-wrap');
    const id = mainButton.getAttribute('data-id');
    const idNumb = mainButton.getAttribute('data-id').match(/[a-zA-Z]+/g);
    const text = mainButton.querySelector('.middle-button__name').innerText
    var newType = type.match(/[a-zA-Z]+/g);
    var newType2 = typeSecond.match(/[a-zA-Z]+/g);
    if(newType[0].includes(idNumb[0]) && text.toLowerCase().includes(newType2[0])) {
      setTimeout(() => {
        mainButton.click()
      }, 200)

    }

    mainButton.addEventListener('click', (event) => {
      const secondText = document.querySelector('.js-price-button.active').getAttribute('data-id')
      let addUrl = '#'+secondText+'-'+text.toLowerCase();
      window.location.hash = addUrl

      setTimeout(() => {
        bottomTabButtons.forEach((button) => {
          const wrap = button.closest('.js-price-wrap');
          const back = wrap.querySelector('.back-over');

          if(button.classList.contains('active')) {
            back.style.width = button.clientWidth + 'px'
          }
        })
      }, 0)

      wrap.querySelectorAll('.js-middle-button').forEach((siblings) => {
        siblings.classList.remove('active');
      })
      event.currentTarget.classList.add('active');
      document.querySelectorAll('.js-middle-block').forEach((siblingsBlocks) => {
        siblingsBlocks.classList.remove('active');
        setTimeout(() => {
          siblingsBlocks.classList.remove('show');
        }, 100)
      })
      document.querySelectorAll('.js-middle-block[data-id="'+ id +'"]').forEach((blockActive) => {
        blockActive.classList.add('active');
        setTimeout(() => {
          blockActive.classList.add('show');
        }, 100)
      })
    })
  })

  bottomTabButtons.forEach((mainButton) => {
    const wrap = mainButton.closest('.js-price-wrap');
    const wrapTwo = mainButton.closest('.js-middle-block');
    const id = mainButton.getAttribute('data-id');
    const back = wrap.querySelector('.back-over');

    if(mainButton.classList.contains('active')) {
      back.style.width = mainButton.clientWidth + 'px'
    }

    mainButton.addEventListener('click', (event) => {
      wrap.querySelectorAll('.js-pay-button').forEach((siblings) => {
        siblings.classList.remove('active');
      })
      event.currentTarget.classList.add('active');
      if(event.currentTarget.classList.contains('js-pay-second')) {
        wrap.classList.add('right');
        back.style.width = event.currentTarget.clientWidth + 'px'
      } else {
        wrap.classList.remove('right');
        back.style.width = event.currentTarget.clientWidth + 'px'
      }
      wrapTwo.querySelectorAll('.js-pay-block').forEach((siblingsBlocks) => {
        siblingsBlocks.classList.remove('active');
        setTimeout(() => {
          siblingsBlocks.classList.remove('show');
        }, 100)
      })
      wrapTwo.querySelectorAll('.js-pay-block[data-id="'+ id +'"]').forEach((blockActive) => {
        blockActive.classList.add('active');
        setTimeout(() => {
          blockActive.classList.add('show');
        }, 100)
      })
    })
  })

  const accordionBtns = document.querySelectorAll(".js-acc-btn");

  accordionBtns.forEach((accordion) => {
    accordion.onclick = function () {
      this.classList.toggle("is-open");
      this.parentElement.classList.toggle("is-open");

      let content = this.parentElement.querySelector('.js-acc-body');

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    };
  });


  // mob-tab

  const openTabs = document.querySelectorAll('.js-open-tabs');
  const closeTabs = document.querySelectorAll('.js-close-tabs');
  const chooseTav = document.querySelectorAll('.js-choose-tab')


  if(openTabs !== null) {

    openTabs.forEach((open) => {
        const id = open.getAttribute('data-id')
        open.addEventListener('click', () => {
          document.querySelector('.tabs-popup').classList.add('show');
          document.querySelector('.tabs-popup').querySelectorAll('.tabs-popup__list').forEach((list) => {
            list.classList.remove('show')
          })
          console.log(document.querySelector('.tabs-popup').querySelector('.tabs-popup__list[data-id="'+ id +'"]'));
          document.querySelector('.tabs-popup').querySelector('.tabs-popup__list[data-id="'+ id +'"]').classList.add('show')
          setTimeout(() => {
            document.querySelector('.tabs-popup').classList.add('finish');
          }, 300)
        })
    })

    closeTabs.forEach((close) => {

      close.addEventListener('click', () => {
        document.querySelector('.tabs-popup').classList.remove('finish');

        setTimeout(() => {
          document.querySelector('.tabs-popup').classList.remove('show');
        }, 300)
      })

    })

    chooseTav.forEach((choose) => {
      const wrap = choose.closest('.tabs-popup')
      choose.addEventListener('click', () => {
        const id = wrap.querySelector('.active').getAttribute('data-id');
        const text = wrap.querySelector('.active .tabs-item__name').innerHTML
        const img = wrap.querySelector('.active img')
        const textWrap = wrap.querySelector('.active').closest('.tabs-popup__list').getAttribute('data-id')

        document.querySelector('.js-open-tabs[data-id="'+ textWrap +'"] span').innerText = text;
        document.querySelector('.js-open-tabs[data-id="'+ textWrap +'"]').querySelectorAll('img').forEach((image, i) => {
          console.log(image);
          if(i === 0 ) {
            image.setAttribute('src', img.getAttribute('src'));
          } else {
            image.setAttribute('src', img.getAttribute('data-hover'));
          }

        })
      wrap.classList.remove('finish');

        setTimeout(() => {
        wrap.classList.remove('show');
          document.querySelector('.js-middle-button[data-id="'+ id +'"]').click()
        }, 300)
      })
    })

    document.querySelectorAll('.tabs-item').forEach((tabItem) => {
      tabItem.addEventListener('click', () => {
        tabItem.closest('.tabs-popup').querySelectorAll('.tabs-item').forEach((siblings) => {
          siblings.classList.remove('active')
        })
        tabItem.classList.add('active')
        tabItem.closest('.tabs-popup').querySelector('.js-choose-tab').classList.add('enable')
      })
    })
  }
})
