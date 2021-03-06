"use strict";

const Weeks = 0;
const Years = 1;

function drawLife(divElement, numSquaresWidth, spacing, squareSize, totalSquares, toShade, startTime, period) {

  let width = (spacing * (numSquaresWidth + 1)) + (squareSize * numSquaresWidth);
  let numSquaresHeight = Math.ceil(totalSquares / numSquaresWidth);
  let height = (spacing * (numSquaresHeight + 1)) + (squareSize * numSquaresHeight);

  var margin = { top: 10, bottom: 10, right: 10, left: 10 };
  var svgWidth = width + margin.right + margin.left;
  var svgHeight = height + margin.top + margin.bottom;

  var svg = divElement.append('svg')
                      .attr('width', svgWidth)
                      .attr('height', svgHeight);

  var focus = svg.append("g")
                 .attr("class", "focus")
                 .style("display", "none");

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
                      .attr('offset', total)
                      .attr('width', squareSize)
                      .attr('height', squareSize)
                      .style('fill', 'none')
                      .style('stroke-width', 1)
                      .style('stroke', 'grey');

      switch (period) {
        case Weeks:
          square.on('mouseover', function () {
            let offset = parseInt(square.attr('offset')) + 1;
            let time = d3.time.week.offset(startTime, offset);
            console.log(time);
          })
          break;
        case Years:
          square.on('mouseover', function () {
            let offset = parseInt(square.attr('offset')) + 1;
            let time = d3.time.year.offset(startTime, offset);
            console.log(time);
          })
          break;
      }
      for (let i = 0; i < toShade.length; i++) {
        if (total >= toShade[i].start && total < toShade[i].end) {
          square.style('fill', toShade[i].colour)
                .style('fill-opacity', 0.7);
        }
      }
      total++;
    }
  }
}

function drawWeeksLeft(birthdate, lifeExpectancy) {
  let start = birthdate;
  let now = new Date();
  let end = d3.time.year.offset(start, lifeExpectancy);

  let numWeeksLeft = d3.time.week.range(start, end, 1).length;
  let numWeeksNow = d3.time.week.range(start, now, 1).length;

  drawLife(d3.select('#life'), 50, 3, 10, numWeeksLeft, [{start: 0, end: numWeeksNow, colour: 'steelblue'}], start, Weeks);
}

function drawYearsLeft(birthdate, lifeExpectancy) {
  let start = birthdate;
  let now = new Date();
  let end = d3.time.year.offset(start, lifeExpectancy);

  let numYearsLeft = d3.time.year.range(start, end, 1).length;
  let numYearsNow = d3.time.year.range(start, now, 1).length;
  console.log(numYearsLeft);

  drawLife(d3.select('#life'), 8, 5, 20, numYearsLeft, [{start: 0, end: numYearsNow, colour: 'steelblue'}], start, Years);
}

document.addEventListener('DOMContentLoaded', function () {
  var format = d3.time.format("%Y-%m-%d");

  let start = format.parse("1992-01-28"); // returns a Date

  let now = new Date();
  let end = d3.time.year.offset(start, 90);

  let numDaysLeft = d3.time.day.range(start, end, 1).length;


  drawWeeksLeft(start, 80);
  //drawYearsLeft(start, 101);
});
