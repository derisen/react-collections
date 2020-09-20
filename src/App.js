import React, { Component} from 'react';
import  './App.css';
import Box from './Box';
import Selecto from "react-selecto";


class App extends Component {

  state = {
    boxes: [
      { key: 'a', title: "box one", zIndex: 3, x: 0, y: 0, width: 300, height: 300, selected: false },
      { key: 'b', title: "box two", zIndex: 2, x: 0, y: 0, width: 300, height: 300, selected: false},
      { key: 'c', title: "box three", zIndex: 1, x: 0, y: 0, width: 300, height: 300, selected: false },
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
    clickedItem.x = object.x
    clickedItem.y = object.y
    this.setState({
      boxes: boxes
    })

  }

  resizeStart = () => {
    this.setState({
      showSelector: false
    })
  }

  adjustResize = (object) => {
    let boxes = [...this.state.boxes];
    let dragedItem = boxes.find((box) => box.key === object.id);
  
    dragedItem.width  = object.width
    dragedItem.height = object.height
    this.setState({
      boxes: boxes
    });
  }


  renderBoxes = (boxes) => (
    boxes.map((box) => {
      return <Box
                key={box.key}
                id={box.key}
                title={box.title}
                zIndex={box.zIndex}
                width={box.width}
                height={box.height}
                editZindex={this.editZindex.bind(this)}
                positionX={box.x}
                positionY={box.y}
                setNewPosition={this.setNewPosition.bind(this)}
                resizeStart={this.resizeStart}
               adjustResize={this.adjustResize.bind(this)}
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


  handelSelectStart = (e) => {
    e.added.forEach(el => {
      el.classList.add("selected");
    });
    e.removed.forEach(el => {
      el.classList.remove("selected");
    });
  }


  handelSelectEnd = (e) => {
    console.log("select end")
    if(e.afterAdded.length)
    {
      e.afterAdded.forEach(el => {
        el.classList.add("selected");
        let boxes = [...this.state.boxes];
        let dragedItem = boxes.find((box) => box.key === el.id);
        console.log(dragedItem)
        if (dragedItem) {
          dragedItem.selected = true;
          this.setState({
            boxes: boxes
          });
        }
        else {
          console.log("in no item")
        }
      });
      e.afterRemoved.forEach(el => {
        console.log("in remove")
        el.classList.remove("selected");
      });
    }
    else
    {
      let boxes = [...this.state.boxes];
      let isAllFalse = true 
      for(let i = 0; boxes.length > i; i++)
      {
        if(boxes[i].selected)
        {
          isAllFalse = false;
          boxes[i].selected = false;
        }      
      }
      if (!isAllFalse){
        this.setState({
          boxes: boxes
        })
      }
      
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
              onSelectStart={this.handelSelectStart}
              onSelectEnd={this.handelSelectEnd}
            />
            :
            null
          }
          
      </div>
    );
  }
}

export default App;
