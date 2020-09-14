import React from "react";
import './customScrollbarVerticalComponent.scss';

class CustomScrollbarVerticalComponent extends React.Component {
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
      scrollbarHeight: 0
    };
  }

  componentDidMount() {
    const newState = Object.assign({}, this.state);
    if (typeof window !== 'undefined') window.addEventListener('resize', this.recalculateValuesForResize);
    newState.scrollbarHeight = this.scrollContainer.current.getBoundingClientRect().height;
    if (this.targetContainer && this.targetContainer.current && this.targetContainer.current.clientHeight < this.targetContainer.current.scrollHeight)
      newState.isVisible = true;
    this.setState(newState);
  }

  componentDidUpdate(props, state) {
    if (!props.loaded) {
      if (props.loaded !== this.props.loaded) {
        this.recalculateValuesForResize();
      }
    }

    if (props.children || this.props.children) {
      if (props.children !== this.props.children) {
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
      const maxScrollValue = this.targetContainer.current.scrollHeight - this.targetContainer.current.clientHeight;
      this.targetContainer.current.scrollTop = (value * maxScrollValue) / 100;
    }
  }

  setCustomScrollFromOrigin() {
    if (this.targetContainer && this.targetContainer.current) {
      const newState = Object.assign({}, this.state);
      const scrollContainer = this.scrollContainer.current.getBoundingClientRect();
      const scrollBlock = this.scrollBlock.current.getBoundingClientRect();
      const originScrollPercentage = (this.targetContainer.current.scrollTop / (this.targetContainer.current.scrollHeight - this.targetContainer.current.clientHeight));
      let currentScrollbarPosition = (originScrollPercentage * (scrollContainer.height - scrollBlock.height));
      newState.currentScrollPosition = currentScrollbarPosition;
      if (!newState.currentScrollPosition) {
        newState.currentScrollPosition = 0;
      }
      this.setState(newState);
    }
  }

  recalculateValuesForResize() {
    if (this.scrollContainer.current && this.scrollBlock.current && this.targetContainer.current) {
      const newState = Object.assign({}, this.state);
      const containerClientRect = this.scrollContainer.current.getBoundingClientRect();
      let nextScrollbarHeight = null;
      let percentageChange = null;
      if (this.targetContainer.current.clientHeight < this.targetContainer.current.scrollHeight) {
        newState.isVisible = true;
        nextScrollbarHeight = containerClientRect.height;
        if ( nextScrollbarHeight > newState.scrollbarHeight) {
          percentageChange = (nextScrollbarHeight - newState.scrollbarHeight) / newState.scrollbarHeight * 100;
          newState.currentScrollPosition += (newState.currentScrollPosition * percentageChange) / 100;
        } else if (nextScrollbarHeight < newState.scrollbarHeight) {
          percentageChange = (newState.scrollbarHeight - nextScrollbarHeight) / newState.scrollbarHeight * 100;
          newState.currentScrollPosition -= (newState.currentScrollPosition * percentageChange) / 100;
        }
      } else {
        newState.isVisible = false;
      }
      if (!newState.currentScrollPosition) {
        newState.currentScrollPosition = 0;
      }
      newState.scrollbarHeight = nextScrollbarHeight;
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
        scrollStartPosition = event.clientY - (scrollClientRect.height / 2);
      }
      else if (event.type === "touchmove" || event.type === "touchstart") {
        touchHelper = event.touches[0] || event.changedTouches[0]
        scrollStartPosition = touchHelper.clientY - (scrollClientRect.height / 2);
      }
      let scrollPositionPercentage = null;

      if (scrollStartPosition < containerClientRect.top) {
        scrollStartPosition = containerClientRect.top;
      }

      if (scrollStartPosition > containerClientRect.top + (containerClientRect.height - scrollClientRect.height)) {
        newState.currentScrollPosition = (containerClientRect.height - scrollClientRect.height);
      } else {
        newState.currentScrollPosition = scrollStartPosition - containerClientRect.top;
      }

      if (!newState.currentScrollPosition) {
        newState.currentScrollPosition = 0;
      }

      scrollPositionPercentage = ((scrollStartPosition - containerClientRect.top) / (containerClientRect.height - scrollClientRect.height)) * 100;
      if (scrollPositionPercentage > 100)
        scrollPositionPercentage = 100;
      this.setScrollValue(scrollPositionPercentage);
      this.setState(newState, callback);
    }
  }

  render() {
    let additionalClasses = "";
    let placeholderAdditionalClasses = "";

    if (this.state && this.state.isVisible) {
      placeholderAdditionalClasses += " is_visible"
      additionalClasses += " is_visible"
      if (this.state.isScrolling) {
        additionalClasses += " is_grabbing";
      }
    }


    return (
      <div className="CustomScrollbarVerticalComponent">
        <div
          ref={this.targetContainer}
          className={`CustomScrollbarVerticalComponent__ScrollbarVerticalTargetPlaceholder${placeholderAdditionalClasses}`}
          onScroll={this.setCustomScrollFromOrigin}
        >
          {this.props.children}
        </div>
        <div className="CustomScrollbarVerticalComponent__ScrollbarPlaceholder">
          <div
            ref={this.scrollContainer}
            className={`CustomScrollbarVerticalComponent__ScrollbarPlaceholder__placeholder${additionalClasses}`}
            onTouchStart={this.handleScrollStart} 
            onTouchEnd={this.handleScrollEnd} 
            onMouseDown={this.handleScrollStart} 
            onMouseUp={this.handleScrollEnd} 
          >
            <span
              ref={this.scrollBlock}
              style={{ top: this.state.currentScrollPosition }}
              className="CustomScrollbarVerticalComponent__ScrollbarPlaceholder__placeholder__scrollBlock"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CustomScrollbarVerticalComponent;
