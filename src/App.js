import React, { Component} from 'react';
import  './App.css';
import Box from './Box';

class App extends Component {
  state = {
    boxes: [
      { key: '1', title: "box one", zIndex: 3},
      { key: '2', title: "box two", zIndex: 2 },
      { key: '3', title: "box three", zIndex: 1 }
    ],
    showClicked: false,
    width:  300,
    height: 300,
  }


  renderBoxes = (boxes) => (
    boxes.map((box) => {
      return <Box
                key={box.key}
                title={box.title}
                zIndex={box.zIndex}
                width={this.state.width}
                height={this.state.height}
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
