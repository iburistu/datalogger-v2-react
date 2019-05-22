import React from 'react';
import {Line} from 'react-chartjs-2';

export default class Graph extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        graphData: {},
        rawData: {},
        options: {
            scales: {
                xAxes: [
                    {
                        type: "time",
                        display: true,
                        labelString: "Date and Time"
                    }
                ]
            }
        },
        id: "",
      }
    }
  
    componentDidMount() {
      const { match : { params } } = this.props;
      fetch(`http://192.168.0.102:4000/api/${params.id}`)
      .then(response => response.json())
      .then(data => this.setState({id: params.id, rawData: data}, () => this.sanitize(this.state.rawData)))
      .catch((err) => console.log(err));
    }
  
    componentDidUpdate() {
      const { match : { params } } = this.props;
      if (params.id !== this.state.id) {
        fetch(`http://192.168.0.102:4000/api/${params.id}`)
        .then(response => response.json())
        .then(data => this.setState({id: params.id, rawData: data}, () => this.sanitize(this.state.rawData)))
        .catch((err) => console.log(err));
      }
    }
  
    sanitize(rawdata) {
      let data = {
        labels: [],
        datasets: [
          {
            label: this.state.id,
            fill: false,
            borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
            lineTension: 0.01,
            data: [],
            pointRadius: 0
          }
        ]
      };

      for (let i = 0; i < rawdata.length; i++) {
        data.datasets[0].data.push(rawdata[i].y);
        data.labels.push(rawdata[i].t);
      }
      
      this.setState({graphData: data});
    }

    /*movemean(array, M) {
        let buffer = new Array(M - 1).fill(0);
        let output = new Array();
        for (let i = 0; i < array.length; i++) {
            output.push((buffer.reduce((a, b) => a + b, 0)) + array[i]) / M;
            buffer.shift();
            buffer.push(array[i]);
        }
    }*/
  
    render() {
      return(
        <Line data={this.state.graphData} options={this.state.options} height={125}/>
      )
    }
}