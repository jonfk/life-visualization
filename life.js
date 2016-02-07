"use strict";

function drawLife(divElement, svgWidth, svgHeight, totalSquares, toShade) {

  var margin = { top: 10, bottom: 10, right: 10, left: 10 };
  var width = svgWidth - margin.right - margin.left;
  var height = svgHeight - margin.top - margin.bottom;

  var spacing = 5; // space between each square
  var squareSize = 20;

  var svg = divElement.append('svg')
                      .attr('width', svgWidth)
                      .attr('height', svgHeight);



  var container = svg.append('rect')
                     .attr('x', margin.left)
                     .attr('y', margin.top)
                     .attr('width', width)
                     .attr('height', height)
                     .style('fill', 'none')
                     .style('stroke-width', 1)
                     .style('stroke', 'grey');

  var total = 0;
  for (let y = (margin.top + spacing); y < height; y += (squareSize + spacing)) {
    for (let x = (margin.left + spacing); x < width; x += (squareSize + spacing)) {
      if (total >= totalSquares) {
        break;
      }
      let square = svg.append('rect')
                      .attr('x', x)
                      .attr('y', y)
                      .attr('width', squareSize)
                      .attr('height', squareSize)
                      .style('fill', 'none')
                      .style('stroke-width', 1)
                      .style('stroke', 'red');

      for (let i = 0; i < toShade.length; i++) {
        if (total >= toShade[i].start && total < toShade[i].end) {
          square.style('fill', toShade[i].colour);
        }
      }
      total++;
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('hello');

  var format = d3.time.format("%Y-%m-%d");

  let start = format.parse("1992-01-28"); // returns a Date
  let now = new Date();
  let end = d3.time.year.offset(start, 90);

  let numYearsLeft = d3.time.year.range(start, end, 1).length;
  let numWeeksLeft = d3.time.week.range(start, end, 1).length;
  let numDaysLeft = d3.time.day.range(start, end, 1).length;

  let numYearsNow = d3.time.year.range(start, now, 1).length;
  let numWeeksNow = d3.time.week.range(start, now, 1).length;
  console.log(numYearsNow);

  //drawLife(d3.select('#life'), 500, 500, numYearsLeft, [{start: 0, end: numYearsNow, colour: 'steelblue'}]);
  drawLife(d3.select('#life'), 1000, 2000, numWeeksLeft, [{start: 0, end: numWeeksNow, colour: 'steelblue'}]);
});
