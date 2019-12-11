import React from 'react';
import dataSet from './dataset';
import {
    select,
    scaleBand,
    scaleLinear,
    max
} from 'd3';


// High Order Component that wraps a component inside a lifecycle component
function Responsive(Component) {
    return class extends React.Component {
        constructor(){
            super()
            this.state = { width: undefined, height: undefined }
            this.resize = this.resize.bind(this)
        }
        componentDidMount() {
            window.addEventListener('resize', this.resize)
            this.resize();
        }

        resize () {
            const node = this.node;
            const bounds = node.getBoundingClientRect();
            const width = bounds.width;
            const height = bounds.height;
            this.setState({width, height})  
        }
        render() {
            const { width, height } = this.state;
            return( 
                <div 
                    style={{width: '100%', height: '100%'}}
                    ref={node => { this.node = node; }}
                >
                    {
                        width && <Component
                            width={width}
                            height={height}
                        />
                    }
                </div>
            )
        }
    }
}

class BarChart extends React.Component {
    constructor () {
        super();
        this.state = {
            data: dataSet
        };
        this.draw = this.draw.bind(this);
    };

    componentDidMount() {
        window.addEventListener('resize', this.draw)
        this.draw();
    }

    draw() {
        const node = select(this.node);
        const { width: w, height: h } = this.props;
        const { data } = this.state
        
        const xScale = scaleBand();
        xScale.domain(data.map(d => d.year));
        xScale.padding(0.1)
        xScale.range([0, w]);

        const yScale = scaleLinear();
        yScale.domain([0, max(data.map(d => d.gdp))]);
        yScale.range([0, h]);

        const upd = node.selectAll('rect').data(data);
        upd.enter()
            .append('rect')
                .merge(upd)
                .attr('x', d => xScale(d.year))
                .attr('y', d => h - yScale(d.gdp))
                .attr('width', xScale.bandwidth())
                .attr('height', d => yScale(d.gdp))
                .attr('fill', 'blue')
    }

    componentDidUpdate() {
        this.draw();
    }

    componentWillMount() {
        window.removeEventListener('resize', this.draw)   
    }

    render() {
        return (
            <svg
                style={{width: '100%', height: '100%'}}
                ref={node => {
                    this.node = node;
                }}
            >
            </svg>
        );
    }
}

export default Responsive(BarChart);