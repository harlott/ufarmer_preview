import React from 'react';
import './galleryComponent.scss';
import _get from 'lodash/get';

class GalleryComponent extends React.PureComponent {
  constructor(props){
    super(props);
    this.sliderItems = [];
    this.currentX = 0;
    this.itemClientWidth = null;
    
    this.state = {
      current: 0,
    };

    this.updateByResize = this.updateByResize.bind(this);
  }

  componentDidMount() {
    this.slidersQty = _get(this.props.data, 'length', 0);
    window.addEventListener('resize', this.updateByResize, { passive: false });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateByResize, { passive: false });
  }

  updateByResize() {
    this.currentX = -(this.itemsContainer.clientWidth * this.state.current);
    this.itemsContainer.style.marginLeft = `${this.currentX}px`;
  }

  prev = () => { 
    if (this.state.current > 0) {
      this.currentX = this.currentX + this.itemsContainer.clientWidth;
      this.itemsContainer.style.marginLeft = `${this.currentX}px`;
      this.setState((prevState) => ({ current: prevState.current - 1 }));
    } else {
      this.currentX = - (this.itemsContainer.clientWidth * (this.slidersQty - 1));
      this.itemsContainer.style.marginLeft = `${this.currentX}px`;
      this.setState(() => ({ current: this.slidersQty - 1 }));
    }
  }

  next = () => {
    if (this.state.current < this.props.data.length - 1) {
      this.currentX = this.currentX - this.itemsContainer.clientWidth;
      this.itemsContainer.style.marginLeft = `${this.currentX}px`;
      this.setState((prevState) => ({ current: prevState.current + 1}));
    } else {
      this.currentX = 0;
      this.itemsContainer.style.marginLeft = `${this.currentX}px`;
      this.setState(() => ({ current: 0}));
    }
  }
  
  render(){
    const { data } = this.props;
    return(
      <>
        <section id="gallery-content" className="gallery-content">
          <div ref={node => {this.itemsContainer = node}} className="full-width columns is-mobile is-gapless gallery-content__contents-container">
            {data &&
              data.map((current, idx) => (
                <article
                  ref={node => (this.sliderItems[idx] = node) }
                  id={`item-${idx}`}
                  key={idx}
                  className="gallery-content__bg-container is-full"
                  style={
                    {
                      backgroundImage: `url('${_get(current.image, 'childImageSharp.fluid.src', current.image)}')`,
                    }
                  }
                >
                </article>
              )
            )}
          </div>
          {data && (
              <div className="gallery-content__bg-container__pagination">
                <div className="arrow-left" onClick={() => {this.prev()}} />
                <div className="tot-items">{this.state.current + 1} / {data.length}</div>
                <div className="arrow-right" onClick={() => this.next(data.length)} />
              </div>
          )}
        </section>
      </>
    )
  }  
}

export default GalleryComponent;
