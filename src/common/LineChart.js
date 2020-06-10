import React, {Component} from 'react';
import Chart from "chart.js";

class LineChart extends Component{
    constructor(props){
        super(props);
        this.chartRef = React.createRef()
    }
    componentDidMount(){
        console.log('>>>>>>>>>>>>> ',this.props.data)
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            data: {
                labels: this.props.data.map(d => d.type),
                datasets: [{
                    label: 'My Azonka credits',
                    data: this.props.data.map(d => d.amount),
                    backgroundColor: ['#f3f3f3'],
                    borderWidth: 2,
                    borderColor: '#08C'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                responsive: true,
                responsiveAnimationDuration: 500
            },
            datasets: [{
                label: this.props.title,
                data: this.props.data.map(d => d.amount),
                backgroundColor: '#08c'
            }]
        })
    }
    render(){
        return (
            <canvas ref={this.chartRef} />
        )
    }
}

export default LineChart;