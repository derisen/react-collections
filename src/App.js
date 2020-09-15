import React, { Component} from 'react';
import  './App.css';
import Box from './Box';

class App extends Component {
  state = {
    boxes: [
      { key: 'a', title: "box one", zIndex: 3},
      { key: 'b', title: "box two", zIndex: 2 },
      { key: 'c', title: "box three", zIndex: 1}
    ],
    showClicked: false,
    width:  300,
    height: 300,
  }

  editZindex =  (object) => {
    // console.log(object, "key")
    let boxes = [...this.state.boxes]
    // console.log(boxes, " boxes")
    console.log(boxes, ".////////////////////////")
    const maxZindex = Math.max.apply(Math, boxes.map(function (box) { return box.zIndex; }))
    let clickedItem = boxes.find((box) => box.key === object.id );
    // let objectWithMaxZindex = boxes.find((box) => box.zIndex === maxZindex);
    // console.log(maxZindex);
    // console.log(objectWithMaxZindex)
    // objectWithMaxZindex.zIndex = object.zIndex;
    clickedItem.zIndex = maxZindex + 1;
    console.log(boxes, ".////////////////////////")
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
              />
    })
  )

  handleClicked = () => {
    this.setState({
      showClicked: !this.state.showClicked
    })
  }

  handleKeyEvents = (e) => {
    console.log(e.keyCode)
    if (e.keyCode === 88)
    {
      console.log(" you pressed X")
      this.setState({ width: 300, height: 300 })

    }
    if(e.keyCode === 90 ) {
      console.log(" you pressed Z")
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
      </div>
    );
  }
}

export default App;
