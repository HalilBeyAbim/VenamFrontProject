$('#head_slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: `
    <button type="button" class="slick_prev"><i class="fa-solid fa-angle-left"></i></button>
    `,
    nextArrow: `
    <button type="button" class="slick_next"><i class="fa-solid fa-angle-right"></i></button>
    `,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });



  let topImage = $('.top-img');

function setSlickTopImage() {
  return topImage.slick({
    lazyLoad: 'ondemand',
    slidesToShow: 1,
    slidesToScroll: 1
  });
}



class PriceRange extends HTMLElement {
  constructor() {
    super();

    console.log('Price Range: Constructor', this);
  }

  connectedCallback() {
    // Elements
    this.elements = {
      container: this.querySelector('div'),
      track: this.querySelector('div > div'),
      from: this.querySelector('input:first-of-type'),
      to: this.querySelector('input:last-of-type'),
      output: this.querySelector('output')
    }

    // Event listeners
    this.elements.from.addEventListener('input', this.handleInput.bind(this));
    this.elements.to.addEventListener('input', this.handleInput.bind(this));

    // Properties
    this.currency = (this.hasAttribute('currency') &&
                     this.getAttribute('currency') !== undefined &&
                     this.getAttribute('currency') !== '') ? this.getAttribute('currency') : '£';
          
    // Update the DOM
    this.updateDom();

    console.log('Price Range: Connected', this);
  }

  disconnectedCallback() {
    delete this.elements;
    delete this.currency;

    console.log('Price Range: Disconnected', this);
  }
  
  get from() {
    return parseInt(this.elements.from.value);
  }
  get to() {
    return parseInt(this.elements.to.value);
  }
  
  handleInput(event) {
    if (parseInt(this.elements.to.value) - parseInt(this.elements.from.value) <= 1) {
      if (event.target === this.elements.from) {
        this.elements.from.value = (parseInt(this.elements.to.value) - 1);
      } else if (event.target === this.elements.to) {
        this.elements.to.value = (parseInt(this.elements.from.value) + 1);
      }
    }

    // Update the DOM
    this.updateDom();
    
    console.log('Price Range: Updated!!', {
      from: parseInt(this.elements.from.value),
      to: parseInt(this.elements.to.value)
    });
  }

  updateDom() {
    this.drawFill();
    this.drawOutput();
  }

  drawFill() {
    const percent1 = (this.elements.from.value / this.elements.from.max) * 100,
          percent2 = (this.elements.to.value / this.elements.to.max) * 100;

    this.elements.track.style.background = `linear-gradient(to right, var(--track-color) ${percent1}%, var(--track-highlight-color) ${percent1}%, var(--track-highlight-color) ${percent2}%, var(--track-color) ${percent2}%)`;
  }

  drawOutput() {
    this.elements.output.textContent = `${this.currency}${this.elements.from.value} - ${this.currency}${this.elements.to.value}`;
  }
}

customElements.define('price-range', PriceRange);