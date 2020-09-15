import React, { PureComponent } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';

// import { createSelectable } from 'react-selectable-fast'

class Box extends PureComponent {

    state = {
        width: 200,
        height: 200,
        absoluteWidth: 200,
        absoluteHeight: 200,
        absoluteLeft: 0,
        absoluteTop: 0,
        activeDrags: 0,
        deltaPosition: {
          x: 0, y: 0
        },
        controlledPosition: {
          x: -400, y: 200
        }
      };
    
      onResetClick = () => {
        this.setState({ width: 200, height: 200, absoluteWidth: 200, absoluteHeight: 200 });
      };
    
      // On top layout
      onResize = (event, {element, size, handle}) => {
        this.setState({width: size.width, height: size.height});
      };
    
      handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
      };
    
      onStart = () => {
        let object =   {
          id: this.props.id,
          zIndex: this.props.zIndex
        }
        this.props.editZindex(object);
        this.setState({activeDrags: ++this.state.activeDrags});
      };
    
      onStop = () => {
        this.setState({activeDrags: --this.state.activeDrags});
      };

      
      render() {
        // console.log(this.props.id, " key")
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        return (
          <Draggable 
            handle="strong" {...dragHandlers} 
            onDrag={this.handleDrag}
          >
               <ResizableBox
                 style={{ backgroundColor: "red", zIndex: this.props.zIndex }}
                className="custom-box box"
                width={this.props.width}
                height={this.props.height}
                handle={<span className="custom-handle custom-handle-se" />}
                handleSize={[10, 10]}>
                <div className="box" style={{ zIndex: this.props.zIndex }}>
                  <strong className="cursor"><div>Drag here</div></strong>
                  <div>{this.props.title}</div>
                  <div>{this.state.deltaPosition.x.toFixed()}, y: {this.state.deltaPosition.y.toFixed()}</div>
                </div>
              </ResizableBox> 
           
            </Draggable>
        );
      }
}

export default Box