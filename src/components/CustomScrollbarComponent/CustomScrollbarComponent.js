import React from "react";
import './customScrollbarComponent.scss';

class CustomScrollbarComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleScrollStart = this.handleScrollStart.bind(this);
    this.handleScrollEnd = this.handleScrollEnd.bind(this);
    this.checkScrollPosition = this.checkScrollPosition.bind(this);
    this.recalculateValuesForResize = this.recalculateValuesForResize.bind(this);
    this.setCustomScrollFromOrigin = this.setCustomScrollFromOrigin.bind(this);

    this.targetContainer = React.createRef();
    this.scrollContainer = React.createRef();
    this.scrollBlock = React.createRef();

    this.state = {
      isVisible: false,
      isScrolling: false,
      currentScrollPosition: 0,
      parentScrollPosition: 0,
      scrollbarWidth: 0
    };
  }

  componentDidMount() {
    const newState = Object.assign({}, this.state);
    if (typeof window !== 'undefined') window.addEventListener('resize', this.recalculateValuesForResize);
    newState.scrollbarWidth = this.scrollContainer.current.getBoundingClientRect().width;
    if (this.targetContainer && this.targetContainer.current && this.targetContainer.current.clientWidth < this.targetContainer.current.scrollWidth)
      newState.isVisible = true;
    this.setState(newState);
  }

  componentDidUpdate(props, state) {
    if (!props.loaded) {
      if (props.loaded !== this.props.loaded) {
        this.recalculateValuesForResize();
      }
    }
    if (this.state.isScrolling && !state.isScrolling) {
      document.addEventListener('mousemove', this.checkScrollPosition, {passive: false});
      document.addEventListener('touchmove', this.checkScrollPosition, {passive: false});
      document.addEventListener('mouseup', this.handleScrollEnd, {passive: false});
    } else if (!this.state.isScrolling && state.isScrolling) {
      document.removeEventListener('mousemove', this.checkScrollPosition, {passive: false});
      document.removeEventListener('touchmove', this.checkScrollPosition, {passive: false});
      document.removeEventListener('mouseup', this.handleScrollEnd, {passive: false});
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') window.removeEventListener('resize', this.recalculateValuesForResize);
  }

  setScrollValue(value) {
    if (this.targetContainer && this.targetContainer.current) {
      const maxScrollValue = this.targetContainer.current.scrollWidth - this.targetContainer.current.clientWidth;
      this.targetContainer.current.scrollLeft = (value * maxScrollValue) / 100;
    }
  }

  setCustomScrollFromOrigin() {
    if (this.targetContainer && this.targetContainer.current) {
      const newState = Object.assign({}, this.state);
      const scrollContainer = this.scrollContainer.current.getBoundingClientRect();
      const scrollBlock = this.scrollBlock.current.getBoundingClientRect();
      const originScrollPercentage = (this.targetContainer.current.scrollLeft / (this.targetContainer.current.scrollWidth - this.targetContainer.current.clientWidth));
      let currentScrollbarPosition = (originScrollPercentage * (scrollContainer.width - scrollBlock.width));
      newState.currentScrollPosition = currentScrollbarPosition;
      this.setState(newState);
    }
  }

  recalculateValuesForResize() {
    if (this.scrollContainer.current && this.scrollBlock.current && this.targetContainer.current) {
      const newState = Object.assign({}, this.state);
      const containerClientRect = this.scrollContainer.current.getBoundingClientRect();
      let nextScrollbarWidth = null;
      let percentageChange = null;
      if (this.targetContainer.current.clientWidth < this.targetContainer.current.scrollWidth) {
        newState.isVisible = true;
        nextScrollbarWidth = containerClientRect.width;
        if ( nextScrollbarWidth > newState.scrollbarWidth) {
          percentageChange = (nextScrollbarWidth - newState.scrollbarWidth) / newState.scrollbarWidth * 100;
          newState.currentScrollPosition += (newState.currentScrollPosition * percentageChange) / 100;
        } else if (nextScrollbarWidth < newState.scrollbarWidth) {
          percentageChange = (newState.scrollbarWidth - nextScrollbarWidth) / newState.scrollbarWidth * 100;
          newState.currentScrollPosition -= (newState.currentScrollPosition * percentageChange) / 100;
        }
      } else {
        newState.isVisible = false;
      }

      newState.scrollbarWidth = nextScrollbarWidth;
      this.setState(newState);
    }
  }

  handleScrollStart(event) {
    if (this.state.isScrolling === false) {
      this.checkScrollPosition(event, () => {
        const newState = Object.assign({}, this.state);
        newState.isScrolling = true;
        this.setState(newState);
      });
    }
  }

  handleScrollEnd() {
    if (this.state.isScrolling === true) {
      const newState = Object.assign({}, this.state);
      newState.isScrolling = false;
      this.setState(newState);
    }
  }

  checkScrollPosition(event, callback = null) {
    event.preventDefault();
    event.stopPropagation();
    if (this.scrollContainer.current && this.scrollBlock.current) {
      const newState = Object.assign({}, this.state);
      const containerClientRect = this.scrollContainer.current.getBoundingClientRect();
      const scrollClientRect = this.scrollBlock.current.getBoundingClientRect();
      let touchHelper =  null;
      let scrollStartPosition = null;
      if (event.type === "mousemove" || event.type === "mousedown") {
        scrollStartPosition = event.clientX - (scrollClientRect.width / 2);
      }
      else if (event.type === "touchmove" || event.type === "touchstart") {
        touchHelper = event.touches[0] || event.changedTouches[0]
        scrollStartPosition = touchHelper.pageX - (scrollClientRect.width / 2);
      }
      let scrollPositionPercentage = null;
      if (scrollStartPosition < containerClientRect.left) {
        scrollStartPosition = containerClientRect.left;
      }

      if (scrollStartPosition > containerClientRect.left + (containerClientRect.width - scrollClientRect.width)) {
        newState.currentScrollPosition = (containerClientRect.width - scrollClientRect.width);
      } else {
        newState.currentScrollPosition = scrollStartPosition - containerClientRect.left;
      }

      scrollPositionPercentage = ((scrollStartPosition - containerClientRect.left) / (containerClientRect.width - scrollClientRect.width)) * 100;
      if (scrollPositionPercentage > 100)
        scrollPositionPercentage = 100;
      this.setScrollValue(scrollPositionPercentage);
      this.setState(newState, callback);
    }
  }

  render() {
    let additionalClasses = "";
    
    if (this.state && this.state.isVisible) {
      additionalClasses += " is_visible"
      if (this.state.isScrolling) {
        additionalClasses += " is_grabbing";
      }
    }


    return (
      <>
        <div
          ref={this.targetContainer}
          className={`${this.props.placeholderClassName} ScrollbarTargetPlaceholder`}
          onScroll={this.setCustomScrollFromOrigin}
        >
          {this.props.children}
        </div>
        <div className="CustomScrollbarComponent">
          <div
            ref={this.scrollContainer}
            className={`CustomScrollbarComponent__placeholder${additionalClasses}`}
            onTouchStart={this.handleScrollStart} 
            onTouchEnd={this.handleScrollEnd} 
            onMouseDown={this.handleScrollStart} 
            onMouseUp={this.handleScrollEnd} 
            // onMouseLeave={this.handleScrollEnd}
          >
            <span
              ref={this.scrollBlock}
              style={{ left: this.state.currentScrollPosition }}
              className="CustomScrollbarComponent__placeholder__scrollBlock"
            />
          </div>
        </div>
      </>
    );
  }
}

export default CustomScrollbarComponent;
