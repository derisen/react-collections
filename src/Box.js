import React, { PureComponent } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';


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
          x: 0, y: 0
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
            x: ui.x,
            y: ui.y,
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
        let object = {
          ...this.state.deltaPosition,
          id: this.props.id
        }
        this.props.setNewPosition(object)
        this.setState({activeDrags: --this.state.activeDrags});
        
      };

      
      render() {
        return (
          <Draggable 
            handle="strong"
            onStart={this.onStart} 
            onStop={this.onStop}
            onDrag={this.handleDrag}
            defaultPosition={{ x: this.props.positionX, y: this.props.positionY}}
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