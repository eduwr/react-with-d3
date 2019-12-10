import React from 'react';
import dataSet from './dataset';
import {
    select,
    scaleBand,
    scaleLinear,
    max,
} from 'd3';

class BarChart extends React.Component {
    constructor () {
        super();
        this.state = {
            data: dataSet
        };
    };

    componentDidMount() {
        this.draw();
    }

    draw() {
        const node = select(this.node);
        const bounds = node.node().getBoundingClientRect;
        const w = bounds.width;
        const h = bounds.height;
        const { data } = this.state
        
        const xScale = scaleBand();
        xScale.domain(data.map(d => d.year));
        xScale.range([0, w]);

        const yScale = scaleLinear();
        const maxY = max(data.forEach(d => d.gdp));
        yScale.domain([0, maxY]);
        yScale.range([0, h]);

        const upd = node.selectAll('rect').data(data);
        upd.enter()
            .append('rect')
            .attr('x', d => xScale(d.year))
            .attr('y', d => 0)
            .attr('width', xScale.bandwidth())
            .attr('height', d => yScale(d.gdp))
            .attr('fill', 'blue')

    }

    componentDidUpdate() {
        this.draw();
    }

    render() {
        return (
            <svg
                style={{width: '100%', height: '100%'}}
                ref={node => {
                    this.node=node;
                }}
            >
            </svg>
        );
    }
}

export default BarChart;