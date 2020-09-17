import React, { Component} from 'react';
import  './App.css';
import Box from './Box';
import Selecto from "react-selecto";


class App extends Component {

  state = {
    boxes: [
      { key: 'a', title: "box one", zIndex: 3, x: 0, y: 0 },
      { key: 'b', title: "box two", zIndex: 2, x: 0, y: 0 },
      { key: 'c', title: "box three", zIndex: 1, x: 0, y: 0 },
    ],
    showClicked: false,
    width: 300,
    height: 300,
    showSelector: true,
  }


  componentWillMount() {
    // localStorage.removeItem("boxes");
    const boxes = JSON.parse(localStorage.getItem('boxes'));
    if (boxes !== null) {
      this.setState({
        boxes: boxes,
      })
    }

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (prevState.boxes !== this.state.boxes) {
      localStorage.setItem('boxes', JSON.stringify(this.state.boxes));
    }

  }

  
  editZindex =  (object) => {
    let boxes = [...this.state.boxes]
    const maxZindex = Math.max.apply(Math, boxes.map(function (box) { return box.zIndex; }))
    let clickedItem = boxes.find((box) => box.key === object.id );
    clickedItem.zIndex = maxZindex + 1;
    this.setState({
      boxes: boxes,
      showSelector: false
    })

    
    

  }


  setNewPosition = (object) => {
    let boxes = [...this.state.boxes]
    let clickedItem = boxes.find((box) => box.key === object.id);
    console.log(object)
    clickedItem.x = object.x
    clickedItem.y = object.y
    this.setState({
      boxes: boxes
    })

  }


  renderBoxes = (boxes) => (
    boxes.map((box) => {
      return <Box
                key={box.key}
                id={box.key}
                title={box.title}
                zIndex={box.zIndex}
                width={this.state.width}
                height={this.state.height}
                editZindex={this.editZindex.bind(this)}
                positionX={box.x}
                positionY={box.y}
                setNewPosition={this.setNewPosition.bind(this)}
              />
    })
  )

  handleClicked = () => {
    if(this.state.showSelector){
      this.setState({
        showClicked: !this.state.showClicked
      })
    }
    else
    {
      this.setState({ 
        showSelector: true,
        showClicked: !this.state.showClicked
      });
    }
    
  }

  handleKeyEvents = (e) => {
    console.log(e.keyCode)
    if (e.keyCode === 88)
    {
      console.log(" you pressed X")
      this.setState({ width: 300, height: 300 })

    }
    if(e.keyCode === 90 ) {
      console.log("you pressed Z")
      this.setState({ width: 500, height: 500})
    }

    if (e.keyCode === 83){
      console.log(" you pressed S")
      this.setState({ width: 200, height: 200 })
    }
  }

  

  render() {
    return (
      <div 
        className={"App"} style={{ width: window.outerWidth, height: window.outerHeight}}
        onClick={this.handleClicked}
        onKeyDown={this.handleKeyEvents}
        tabIndex="0"
      >
       
          {this.renderBoxes(this.state.boxes)}
            {this.state.showClicked ?
              <p onClick={this.handleClicked} style={{fontSize: 40}}>clicked</p>
              :
              null
          }
          {
            this.state.showSelector ? 
            <Selecto
              container={document.body}
              dragContainer={window}
              selectableTargets={[".target", document.querySelector(".target2")]}
              selectByClick={true}
              selectFromInside={true}
              continueSelect={false}
              toggleContinueSelect={"shift"}
              keyContainer={window}
              hitRate={100}
              onSelectStart={e => {
                console.log("start", e);
                e.added.forEach(el => {
                  el.classList.add("selected");
                });
                e.removed.forEach(el => {
                  el.classList.remove("selected");
                });
              }}
              onSelectEnd={e => {
                console.log("end", e);
                e.afterAdded.forEach(el => {
                  console.log(el, "elment")
                  el.classList.add("selected");
                });
                e.afterRemoved.forEach(el => {
                  el.classList.remove("selected");
                });
              }}
            />
            :
            null
          }
          
      </div>
    );
  }
}

export default App;
