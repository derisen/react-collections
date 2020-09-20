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

      handleResizeStart = (e) => {
        this.props.resizeStart()
      }

  resizeStartStop = (e, data) => {
    let object = {
      id: this.props.id,
      ...data.size,
    }
    this.props.adjustResize(object)
  }

      
      render() {
        return (
          <div>
          <Draggable 
            handle="strong"
            onStart={this.onStart} 
            onStop={this.onStop}
            onDrag={this.handleDrag}
            defaultPosition={{ x: this.props.positionX, y: this.props.positionY}}
          >
        
            <ResizableBox
              style={{ zIndex: this.props.zIndex }}
              id={this.props.id}
              onResizeStart={this.handleResizeStart}
              onResizeStop={this.resizeStartStop}
              className="custom-box box target"
              width={this.props.width}
              height={this.props.height}
              handle={<span className="custom-handle custom-handle-se" />}
              // maxConstraints={[1400, 1400]}
              maxConstraints={[1500, 1500]}
              handleSize={[10, 10]}
            >
              <div className="box" style={{ zIndex: this.props.zIndex }}>
                <strong className="cursor"><div>Drag here</div></strong>
                <div>{this.props.title}</div>
                <div>{this.state.deltaPosition.x.toFixed()}, y: {this.state.deltaPosition.y.toFixed()}</div>
              </div>
            </ResizableBox>                
          </Draggable> 
          </div>
        );
      }
}

export default Box