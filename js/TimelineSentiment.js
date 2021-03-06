function WindowScreen(){
    return $(window).width();
}

function IsMobileDevice(){
    return WindowScreen() < 1200
}

$(function() {
    if(IsMobileDevice()) {
         widthIframe =  WindowScreen() * 0.9;
         //$('#bubbleChartIFrame').attr('src', 'BubbleChart.html?width=' + widthIframe);
         $('#TEmoji').css('width', widthIframe);
    }
})

var startProductBarPos=-1;
     window.onscroll=function(){
          var bar = document.getElementById('fixedElement');
          if(startProductBarPos<0) { 
            startProductBarPos=findPosY(bar) - 60;
          }

          if(pageYOffset>startProductBarPos){
               bar.style.position='fixed';
               if($(window).width() < 800){
                    $('#fixedElement').css({top: 50});
               }
               else{
                    $('#fixedElement').css({top: 80});
               }
          }
          else{
               bar.style.position='relative';
               $('#fixedElement').css({top: 0});
          }

     };

     function findPosY(obj) {
          var curtop = 0;
          if (typeof (obj.offsetParent) != 'undefined' && obj.offsetParent) {
               while (obj.offsetParent) {
                    curtop += obj.offsetTop;
                    obj = obj.offsetParent;
               }
               curtop += obj.offsetTop;
          }
          else if (obj.y)
               curtop += obj.y;

          return curtop;
     }

var cachedData;
var cachedtopthemes;
var cachedFDGraph;
var cachedthemes;

//GenerateLineGraph - start

var totalWidthLine;
var totalHeightLine;
var marginLine;
var widthLine;
var heightLine;
var lineGraph;
var headerLine;
var xScaleLine;
var yScaleLine;
var xAxisLine;
var yAxisLine;
var xAxisDrawLine;
var yAxisDrawLine;
var lineCircles;
var linePaths;
var tip;
var svg;

var lineCircleBarsTrump
var lineCirclesTrump
var linePathsTrump
var lineTextsTrump
var lineNumbersTrump

var lineCirclesHillary
var linePathsHillary
var lineTextsHillary
var lineNumbersHillary

var numberRange

totalWidthLine = 650;
if(IsMobileDevice()) {
    totalWidthLine =  WindowScreen() * 0.9
}
totalHeightLine = totalWidthLine * 0.55;

$(window).on('resize', function(){	
    if ( $(window).width() < 650) { 
        totalWidthLine =  WindowScreen() * 0.9
        totalHeightLine = $(window).width() * 0.55
    }
    else{
        totalWidthLine = 650;
        totalHeightLine = totalWidthLine * 0.55;
    }

    UpdateLineChart();
    GenerateLineGraph(cachedData, true);
});

InitLineGraphFrame();
InitLineGraph();

function UpdateLineChart() {
    marginLine = { top: 60, right: totalWidthLine * 0.06, bottom: totalWidthLine * 0.045, left: totalWidthLine * 0.1 };
    widthLine = totalWidthLine - marginLine.right - marginLine.left;
    heightLine = totalHeightLine - marginLine.top - marginLine.bottom;

    lineGraphFrame
        .transition().duration(1000)
        .attr('width', widthLine + marginLine.right + marginLine.left)
        .attr('height', heightLine + marginLine.top + marginLine.bottom)
        .attr('transform', `translate(${marginLine.left}, 0)`);

    lineGraph
        .transition().duration(1000) 
        .attr('transform', `translate(${marginLine.left}, ${marginLine.top})`);

    xScaleLine = d3
        .scaleBand()
        .rangeRound([0, widthLine])
        .paddingInner(0.25);

    yScaleLine = d3
        .scaleLinear()
        .range([heightLine, 0]);

    xAxisLine = d3
        .axisBottom(xScaleLine)
        .ticks(5)
        .tickSizeInner(5)
        .tickSizeOuter(0);

    yAxisLine = d3.axisLeft(yScaleLine).tickSize(0);

    xAxisDrawLine
        .attr('transform', `translate(0, ${heightLine})`);
}

function InitLineGraphFrame(){
    marginLine = { top: 60, right: totalWidthLine * 0.06, bottom: totalWidthLine * 0.045, left: totalWidthLine * 0.1 };
    widthLine = totalWidthLine - marginLine.right - marginLine.left;
    heightLine = totalHeightLine - marginLine.top - marginLine.bottom;

    lineGraphFrame = d3
        .select('#divLineChartGraph')
        .append('svg')
        .attr('width', widthLine + marginLine.right + marginLine.left)
        .attr('height', heightLine + marginLine.top + marginLine.bottom)
        .attr('transform', `translate(${marginLine.left}, 10)`);;

    lineGraph = lineGraphFrame.append('g')
        .attr('transform', `translate(${marginLine.left}, ${marginLine.top})`);

    headerLine = lineGraph
        .append('g')
        .attr('class', 'line-header')
        .attr('transform', `translate(0,-60)`)
        .append('text')
        .attr('font-weight','bold')
        .append('tspan')
        .attr('x', widthLine/2 - 70)
        .attr('dy', 15)
        .style('font-size', 21)
        .style('fill', '#efb1ff');

    headerLine.text('Sentiment Overall');

    xScaleLine = d3
        .scaleBand()
        .rangeRound([0, widthLine])
        .paddingInner(0.25);

    yScaleLine = d3
        .scaleLinear()
        .range([heightLine, 0]);

    xAxisLine = d3
        .axisBottom(xScaleLine)
        .ticks(5)
        .tickSizeInner(5)
        .tickSizeOuter(0);

    yAxisLine = d3.axisLeft(yScaleLine).tickSize(0);

}

function InitLineGraph(){

    xAxisDrawLine = lineGraph
        .append('g')
        .attr("id", "xaxisDrawLine")
        .attr('class', 'x_axis')
        .attr('transform', `translate(0 ${heightLine})`);

    yAxisDrawLine = lineGraph.append('g').attr('class', 'y_axis');

    lineCircles = lineGraph.append('g').attr('class', 'lineCircles');

    linePaths = lineGraph.append('g').attr('class', 'linePaths');

    tip = d3.tip().attr('class', 'd3-tip').html( d => displayToolTip(d));
    tip.offset([-10, 0])

    lineCircleBarsTrump = lineCircles.append('g').attr('class', 'lineCircleBarsTrump');
    lineCirclesTrump = lineCircles.append('g').attr('class', 'lineCirclesTrump');
    linePathsTrump = lineCircles.append('g').attr('class', 'linePathsTrump');
    lineTextsTrump = lineCircles.append('g').attr('class', 'lineTextsTrump');
    lineNumbersTrump = lineCircles.append('g').attr('class', 'lineNumbersTrump');

    lineCirclesHillary = lineCircles.append('g').attr('class', 'lineCirclesHillary');
    linePathsHillary = lineCircles.append('g').attr('class', 'linePathsHillary');
    lineTextsHillary = lineCircles.append('g').attr('class', 'lineTextsHillary');
    lineNumbersHillary = lineCircles.append('g').attr('class', 'lineNumbersHillary');
}

function GenerateLineGraph(dataSet, firstLoad = false) {
    var selectBtns = $('.btnSentimentSelected');

    if(selectBtns.length != 1){
        return;
    }

    var eventName = selectBtns.attr('event');
    var title = eventName.replace('_', ' ');
    headerLine.text(title.toUpperCase()).attr('transform', `translate(0, -5)`);

    var dataTrump = dataSet.filter(f => f.candidate == 'Trump').map(d => ({ event:d.event, score:d[eventName], name: "Trump"}));
    var dataHillary = dataSet.filter(f => f.candidate == 'Hillary').map(d => ({ event:d.event, score:d[eventName], name: "Hillary"}));

    yScaleLine.domain([d3.min(dataSet, d => d[eventName]), d3.max(dataSet, d => d[eventName])]);

    xScaleLine.domain(dataSet.map(d => d.event));

    numberRange = d3
        .line()
        .x(d => xScaleLine(d.event))
        .y(d => yScaleLine(d.score))
        .curve(d3.curveMonotoneX);

    var dur = 1000;
    var durPath = 500;
    var delay = 700;
    var tPath = d3.transition().duration(durPath).delay(delay);
    var tDelay = d3.transition().delay(delay);
    var tFast =  d3.transition(100).delay(50);
    var t = d3.transition().duration(dur);
    var tSlow = d3.transition().duration(dur).delay(delay);

    yAxisDrawLine.transition(t).call(yAxisLine.scale(yScaleLine));

    var getLinChartData = (d, i, dataSet) =>
    {
        var eventid = +d3.selectAll('.btnDebateSelected').attr('eventid');
        return {
            Color: i ==  eventid ? (d.name == 'Trump'? 'limegreen' : 'orange') : 'white',
            FontWeight:i == eventid ? 'bold' : 'normal',
            FontSize:i == eventid ? '14px' : '12px',

            Radius: i == eventid ? 10 : 5,

            TextOpacity: i == dataTrump.length - 1 ? 1 : 0,

            BarChartOpacity:i == eventid ? 0.1 : 0,
        }
    }

    lineCircleBarsTrump
        .selectAll('.lineCircleBar')
        .data(dataTrump, d => d.event)
        .join(
            enter => {
                enter
                    .append('rect')
                    .attr('class', d => 'lineCircleBar lineCircleBar' + d.event.replace(' ', '_'))
                    .attr('x', d => xScaleLine(d.event))
                    .attr('y', -30)
                    .attr('width', xScaleLine.bandwidth())
                    .style('fill', 'white')
                    .style("opacity", (d, i) => getLinChartData(d, i, dataSet).BarChartOpacity)
                    .attr('height', totalHeightLine - 55)
                    .transition(t)
                    .style('fill', 'white');
            },

            update => {
                update
                    .transition(t)
                    .style("opacity", (d, i) => getLinChartData(d, i, dataSet).BarChartOpacity)
                    .attr('x', d => xScaleLine(d.event))
                    .attr('height', totalHeightLine - 55)
                    .attr('width', xScaleLine.bandwidth())
            },

            exit => {
            }
        );

    lineCirclesTrump
        .selectAll('.lineCircleTrump')
        .data(dataTrump, d => d.event)
        .join(
            enter => {
                enter
                    .append('circle')
                    .style('fill',  'white')
                    .attr("cx", d => xScaleLine(d.event) + xScaleLine.bandwidth()/2)
                    .attr("cy", d => yScaleLine(d.score))
                    .attr('class', d => 'lineCircle lineCircleTrump lineCircle' + d.event.replace(' ', '_'))
                    .transition(t)
                    .attr("r", (d, i) => getLinChartData(d, i, dataTrump).Radius)
                    .style('fill',  'limegreen');
            },

            update => {
                update
                    .transition(t)
                    .attr("cx", d => xScaleLine(d.event) + xScaleLine.bandwidth()/2)
                    .attr("cy", d => yScaleLine(d.score))
                    .attr("r", (d, i) => getLinChartData(d, i, dataTrump).Radius)
            },

            exit => {
            }
        );

    linePathsTrump
        .selectAll('.linePathTrump')
            .data(dataTrump, d => d.event)
            .join(
                enter => {
                    enter
                        .append('path')
                        .attr('class', 'linePathTrump')
                        .attr('d', numberRange(dataTrump))
                        .attr('transform', `translate(${marginLine.left - totalWidthLine * 0.03}, 0)`)
                        .style('fill', 'none')
                        .style('stroke', 'none')
                        .transition(tFast)
                        .style('stroke',  'limegreen');
                },

                update => {
                    update
                        .transition(t)
                        .attr('transform', `translate(${marginLine.left - totalWidthLine * 0.03}, 0)`)
                        .attr('d', numberRange(dataTrump))
                },

                exit => {
                    exit
                        .transition(t)
                        .remove()
                }
            );

    lineTextsTrump
        .selectAll('.lineTextTrump')
        .data(dataTrump, d => d.event)
        .join(
            enter => {
                enter
                    .append("text")
                    .attr("x", d => xScaleLine(d.event) + xScaleLine.bandwidth()/2 + 10)
                    .attr("y", d => yScaleLine(d.score) - 5)
                    .text("Trump")
                    .attr('class', (d, i) =>  'lineTextTrump lineTextSelected ')
                    // .attr("stroke", "white")
                    .style("opacity", (d, i) => getLinChartData(d, i, dataTrump).TextOpacity)
                    .transition(tFast)
                    .style('fill',  'limegreen')
            },

            update => {
                update
                    .transition(t)
                    .attr("x", d => xScaleLine(d.event) + xScaleLine.bandwidth()/2 + 10)
                    .attr("y", d => yScaleLine(d.score) - 5)
            },

            exit => {
                exit
                    .transition(t)
                    .remove()
            }
        );

    lineNumbersTrump
        .selectAll('.lineNumberTrump')
        .data(dataTrump, d => d.event)
        .join(
            enter => {
                enter
                    .append("text")
                    .attr('class', d => 'lineNumberTrump lineNumberTrump' + d.event.replace(' ', '_'))
                    .attr("x", d => xScaleLine(d.event) + xScaleLine.bandwidth()/2 - 35)
                    .attr("y", d => yScaleLine(d.score) - 5)
                    .text(d => d.score)
                    .style("fill", "white")
                    .transition(tFast)
                    .style("font-size", (d, i) => getLinChartData(d, i, dataTrump).FontSize)
                    .style('fill', (d, i) => getLinChartData(d, i, dataTrump).Color)
                    .style("font-weight", (d, i) => getLinChartData(d, i, dataTrump).FontWeight);
            },

            update => {
                update
                    .transition(t)
                    .attr("x", d => xScaleLine(d.event) + xScaleLine.bandwidth()/2 - 35)
                    .attr("y", d => yScaleLine(d.score) - 5)
                    .text(d => d.score)
                    .style("font-size", (d, i) => getLinChartData(d, i, dataTrump).FontSize)
                    .style('fill', (d, i) => getLinChartData(d, i, dataTrump).Color)
                    .style("font-weight", (d, i) => getLinChartData(d, i, dataTrump).FontWeight);
            },

            exit => {
                exit
                    .transition(t)
                    .remove()
            }
        );


    lineCirclesHillary
        .selectAll('.lineCircleHillary')
        .data(dataHillary, d => d.event)
        .join(
            enter => {
                enter
                    .append('circle')
                    .attr('class',  d => 'lineCircle lineCircleHillary lineCircle' + d.event.replace(' ', '_'))
                    .style('fill',  'white')
                    .attr('cx', d => xScaleLine(d.event) + xScaleLine.bandwidth()/2)
                    .attr('cy', d => yScaleLine(d.score))
                    .transition(t)
                    .attr('r', (d, i) => getLinChartData(d, i, dataHillary).Radius)
                    .style('fill',  'orange')
            },

            update => {
                update
                    .transition(t)
                    .attr('cx', d => xScaleLine(d.event) + xScaleLine.bandwidth()/2)
                    .attr("cy", d => yScaleLine(d.score))
                    .attr('r', (d, i) => getLinChartData(d, i, dataHillary).Radius)
            },

            exit => {

            }
        );

    linePathsHillary
        .selectAll('.linePathHillary')
        .data(dataHillary, d => d.event)
        .join(
            enter => {
                enter
                    .append('path')
                    .attr('class', 'linePathHillary')
                    .attr('d', numberRange(dataHillary))
                    .attr('transform', `translate(${marginLine.left - totalWidthLine * 0.03}, 0)`)
                    .style('fill', 'none')
                    .style('stroke', 'none')
                    .transition(tFast)
                    .style('stroke',  'orange');
            },

            update => {
                update
                    .transition(t)
                    .attr('d', numberRange(dataHillary))
                    .attr('transform', `translate(${marginLine.left - totalWidthLine * 0.03}, 0)`)
            },

            exit => {
                exit
                    .transition(t)
                    .remove()
            }
        );


    lineTextsHillary
        .selectAll('.lineTextHillary')
        .data(dataHillary, d => d.event)
        .join(
            enter => {
                enter
                    .append("text")
                    .attr('class', 'lineTextHillary lineTextSelected')
                    .attr("x", d => xScaleLine(d.event) + xScaleLine.bandwidth()/2 + 10)
                    .attr("y", d => yScaleLine(d.score) - 5)
                    .text("Hillary")
                    // .attr("stroke", "white")
                    .style("opacity", (d, i) => getLinChartData(d, i, dataTrump).TextOpacity)
                    .transition(tFast)
                    .style('fill',  'orange')
            },

            update => {
                update
                    .transition(t)
                    .attr("x", d => xScaleLine(d.event) + xScaleLine.bandwidth()/2 + 10)
                    .attr("y", d => yScaleLine(d.score) - 5)
            },

            exit => {
                exit
                    .transition(t)
                    .remove()
            }
        );

    lineNumbersHillary
        .selectAll('.lineNumberHillary')
        .data(dataHillary, d => d.event)
        .join(
            enter => {
                enter
                    .append("text")
                    .attr('class', d => 'lineNumberHillary lineNumberHillary' + d.event.replace(' ', '_'))
                    .attr("x", d => xScaleLine(d.event) + xScaleLine.bandwidth()/2 - 35)
                    .attr("y", d => yScaleLine(d.score) - 5)
                    .text(d => d.score)
                    .style("fill", "white")
                    .transition(tFast)
                    .style("font-size", (d, i) => getLinChartData(d, i, dataHillary).FontSize)
                    .style('fill', (d, i) => getLinChartData(d, i, dataHillary).Color)
                    .style("font-weight", (d, i) => getLinChartData(d, i, dataHillary).FontWeight);
            },

            update => {
                update
                    .transition(t)
                    .attr("x", d => xScaleLine(d.event) + xScaleLine.bandwidth()/2 - 35)
                    .attr("y", d => yScaleLine(d.score) - 5)
                    .text(d => d.score)
                    .style("font-size", (d, i) => getLinChartData(d, i, dataHillary).FontSize)
                    .style('fill', (d, i) => getLinChartData(d, i, dataHillary).Color)
                    .style("font-weight", (d, i) => getLinChartData(d, i, dataHillary).FontWeight);

            },

            exit => {
                exit
                    .transition(t)
                    .remove()
            }
        );

    if(firstLoad){
        xAxisDrawLine.transition(t)
            .call(xAxisLine.scale(xScaleLine))
            .selectAll("text")
            .attr("class", 'btnLineChartLabel')
            .attr("id", function(d,i) {return d.replace(' ', '_')})
            .on('end', function (d, i) {
                if(i == 0){
                    d3.select('#First_debate').attr('class', 'btnLineChartLabel btnLineChartLabelSelected');
                }
                //d3.select(this).on("click", lineChartNodeClick);
            });
    }

}

//GenerateLineGraph - end


//top themes - start

var totalWidth = 700;
if(IsMobileDevice()) {
    totalWidth =  WindowScreen() * 0.98
}

var totalHeight = totalWidth * 0.5;
var margin = { top: 40, right: 10, bottom: 10, left: 200 };
var width = totalWidth - margin.right - margin.left - 100;
var height = totalHeight - margin.top - margin.bottom;

var TopThemeGraph = d3
    .select('#TopThemeGraph')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

var header = TopThemeGraph
    .append('g')
    .attr('class', 'bar-header')
    .attr('transform', `translate(0,${-margin.top * 0.8})`)
    .append('text')
    .attr('font-weight','bold');

// header
//     .append('tspan')
//     .attr('x', 0)
//     .attr('dy', '1.5em')
//     .style('font-size', '0.8em')
//     .style('fill', '#555')
//     .text('Top 5 Themes');

var bars = TopThemeGraph.append('g').attr('class', 'bars');

var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3
    .scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.25);

var xAxis = d3
    .axisTop(xScale)
    .ticks(5)
    .tickSizeInner(-height)
    .tickSizeOuter(0);

var xAxisDraw = TopThemeGraph.append('g').attr('class', 'x axis');

var yAxis = d3.axisLeft(yScale).tickSize(0);

var yAxisDraw = TopThemeGraph.append('g').attr('class', 'y_axis');

function GenerateTopThemeGraphChart(dataSet, chartResolve){
    var selectBtns = $('.btnDebateSelected');
    var data;
    if(selectBtns.length == 1){
        var eventName = selectBtns.attr('event');
        data = dataSet[eventName].slice(0, 3)
    }
    else{
        var firstRecord = true

        selectBtns.each(function() {
            var eventName = $(this).attr('event');
            var thisData = dataSet[eventName]

            if(firstRecord){
                data = thisData.slice(0, 5);
                firstRecord = false;
            }
            else{
            }

        });
    }

    xScale.domain([0, d3.max(data, d => d[1])+ 5]);
    yScale.domain(data.map(d => d[0]));

    var dur = 1000;
    var t = d3.transition().duration(dur);

    bars
        .selectAll('.bar')
        .data(data, d => d[0])
        .join(
            enter => {
                enter
                    .append('rect')
                    .attr('class', '#efb1ff')
                    .attr('y', d => yScale(d[0]))
                    .attr('height', yScale.bandwidth())
                    .style('fill', 'white')

                    .transition(t)
                    .style('fill', '#efb1ff')
                    .attr('width', d => xScale(d[1]))
                    .on("end", response => {
                        if(chartResolve != undefined)
                        {
                            chartResolve(response)
                        }
                    })
            },

            update => {
                update
                    .transition(t)
                    .style('fill', 'dodgerblue')
                    .attr('y', d => yScale(d[0]))
                    .attr('width', d => xScale(d[1]))
                    .on("end", response => {
                        if(chartResolve != undefined)
                        {
                            chartResolve(response)
                        }
                    })
            },

            exit => {
                exit
                    .transition()
                    .duration(dur / 2)
                    .style('fill-opacity', 0)
                    .remove()
                    .on("end", response => {
                        if(chartResolve != undefined)
                        {
                            chartResolve(response)
                        }
                    })
            }

        )

    // Update Axes.
    //xAxisDraw.transition(t).call(xAxis.scale(xScale));
    yAxisDraw.transition(t).call(yAxis.scale(yScale)).selectAll("text").attr("class", 'TopThemeName');

}

//top themes - end

IntializeThemesChart();

function ProcessedThemes(data){
    //return data;
    return data.map(
        function (d) {

            var stateValue = d.state
            var t1_1 = d.theme_1_1.split(" ").join("_");
            var t2_1 = d.theme_2_1.split(" ").join("_");
            var t3_1 = d.theme_3_1.split(" ").join("_");
            var t1_2 = d.theme_1_2.split(" ").join("_");
            var t2_2 = d.theme_2_2.split(" ").join("_");
            var t3_2 = d.theme_3_2.split(" ").join("_");
            var t1_3 = d.theme_1_3.split(" ").join("_");
            var t2_3 = d.theme_2_3.split(" ").join("_");
            var t3_3 = d.theme_3_3.split(" ").join("_");
            var t1_4 = d.theme_1_4.split(" ").join("_");
            var t2_4 = d.theme_2_4.split(" ").join("_");
            var t3_4 = d.theme_3_4.split(" ").join("_");
            var t1_5 = d.theme_1_5.split(" ").join("_");
            var t2_5 = d.theme_2_5.split(" ").join("_");
            var t3_5 = d.theme_3_5.split(" ").join("_");

            var firstDict = {};
            var vpDict = {};
            var secondDict = {};
            var thirdDict = {};
            var electionDict = {};

            firstDict[t1_1] = 1;
            firstDict[t2_1] = 2;
            firstDict[t3_1] = 3;
            vpDict[t1_2] = 1;
            vpDict[t2_2] = 2;
            vpDict[t3_2] = 3;
            secondDict[t1_3] = 1;
            secondDict[t2_3] = 2;
            secondDict[t3_3] = 3;
            thirdDict[t1_4] = 1;
            thirdDict[t2_4] = 2;
            thirdDict[t3_4] = 3;
            electionDict[t1_5] = 1;
            electionDict[t2_5] = 2;
            electionDict[t3_5] = 3;

            return{
                state:stateValue,
                First_debate: firstDict,
                VP_debate: vpDict,
                Second_debate:secondDict,
                Third_debate: thirdDict,
                Before_Election : electionDict
            }
        }
    );
}

function IntializeThemesChart(){
    d3.csv("data/tweettopthemes.csv",
    rawrow => ({
        state : rawrow['state'],
        theme_1_1 : rawrow['top_theme_1_1'],
        theme_2_1 : rawrow['top_theme_2_1'],
        theme_3_1 : rawrow['top_theme_3_1'],
        theme_1_2 : rawrow['top_theme_1_2'],
        theme_2_2 : rawrow['top_theme_2_2'],
        theme_3_2 : rawrow['top_theme_3_2'],
        theme_1_3 : rawrow['top_theme_1_3'],
        theme_2_3 : rawrow['top_theme_2_3'],
        theme_3_3 : rawrow['top_theme_3_3'],
        theme_1_4 : rawrow['top_theme_1_4'],
        theme_2_4 : rawrow['top_theme_2_4'],
        theme_3_4 : rawrow['top_theme_3_4'],
        theme_1_5 : rawrow['top_theme_1_5'],
        theme_2_5 : rawrow['top_theme_2_5'],
        theme_3_5 : rawrow['top_theme_3_5'],
    })

    ).then(
    data => {
        var processedThemesdata = ProcessedThemes(data)
        cachedthemes = processedThemesdata;
        CreateThemesChart(cachedthemes);
    })
}

function findState(theme) {
    var stateResults = [];
    d3.selectAll('.TopicRankRect').nodes().forEach(function(d,i) { 
        var rectID = d['id'].split('-');
        var state = rectID[0];
        if(theme == rectID[1] && !stateResults.includes(state)){
            stateResults.push(state);
        }
    });
    return stateResults;
}

function findThemes(state) {
    var themeResults = [];
    d3.selectAll('.TopicRankRect').nodes().forEach(function(d,i) { 
        var rectID = d['id'].split('-');
        var theme = rectID[1];
        if(state == rectID[0] && !themeResults.includes(theme)){
            themeResults.push(theme);
        }
    });
    return themeResults;
}


var mouseoverThemestopic = d => {
    var themeName = d.split(" ").join("_")
    d3.select('#' + themeName + "-h").classed("ThemeHighlighted", true);
    d3.select('#' + themeName + "-f").classed("ThemeHighlighted", true);

    var states  = findState(themeName);
    var j;
    for (j = 0; j < states.length; j++) {
        d3.select('#' + states[j] + '-s').classed("ThemeHighlighted", true);
        d3.select('#' + states[j] + '-' + themeName).classed("ThemeHighlighted", true);
    }
}

var mouseoutThemestopic = d => {
    var themeName = d.split(" ").join("_")
    d3.select('#' + d.split(" ").join("_") + "-h").classed("ThemeHighlighted", false);
    d3.select('#' + d.split(" ").join("_") + "-f").classed("ThemeHighlighted", false);
    var states  = findState(themeName);
    var j;
    for (j = 0; j < states.length; j++) {
        d3.select('#' + states[j] + '-s').classed("ThemeHighlighted", false);
        d3.select('#' + states[j] + '-' + themeName).classed("ThemeHighlighted", false);
    }
}

function clickThemestopic(d){
    d3.selectAll('.ThemeSelected').classed("ThemeSelected", false);
    var selected = true;
    var themeName = d.split(" ").join("_")
    d3.select('#' + themeName + "-h").classed("ThemeSelected", selected);
    d3.select('#' + themeName + "-f").classed("ThemeSelected", selected);

    var states  = findState(themeName);
    var j;
    for (j = 0; j < states.length; j++) {
        d3.select('#' + states[j] + '-s').classed("ThemeSelected", selected);
        d3.select('#' + states[j] + '-' + themeName).classed("ThemeSelected", selected);
    }
}
function mouseoverThemesRect () {
    var id = d3.select(this).attr('id').split(" ").join("_").split('-')
    d3.select('#' + id[1] + "-h").classed("ThemeHighlighted", true);
    d3.select('#' + id[1] + "-f").classed("ThemeHighlighted", true);
    d3.select('#' + id[0] + "-s").classed("ThemeHighlighted", true);
    d3.select(this).classed("ThemeHighlighted", true);
}

function mouseoutThemesRect () {
    var id = d3.select(this).attr('id').split(" ").join("_").split('-')
    d3.select('#' + id[1] + "-h").classed("ThemeHighlighted", false);
    d3.select('#' + id[1] + "-f").classed("ThemeHighlighted", false);
    d3.select('#' + id[0] + "-s").classed("ThemeHighlighted", false);
    d3.select(this).classed("ThemeHighlighted", false);
}


function mouseoverThemesSide (d) {
    var state = d3.select(this).attr('id').split('-')[0];
    d3.select('#' + state + "-s").classed("ThemeHighlighted", true);
    var themes = findThemes(state);    
    var j;
    for (j = 0; j < themes.length; j++) {
        d3.select('#' + themes[j] + '-h').classed("ThemeHighlighted", true);
        d3.select('#' + themes[j] + '-f').classed("ThemeHighlighted", true);
        d3.select('#' + state + '-' + themes[j]).classed("ThemeHighlighted", true);
    }
}

function clickThemesSide(d){
    d3.selectAll('.ThemeSelected').classed("ThemeSelected", false);
    var state = d3.select(this).attr('id').split('-')[0];
    d3.select('#' + state + "-s").classed("ThemeSelected", true);
    var themes = findThemes(state);    
    var j;
    for (j = 0; j < themes.length; j++) {
        d3.select('#' + themes[j] + '-h').classed("ThemeSelected", true);
        d3.select('#' + themes[j] + '-f').classed("ThemeSelected", true);
        d3.select('#' + state + '-' + themes[j]).classed("ThemeSelected", true);
    }
}

function mouseoutThemesSide (d) {
    var state = d3.select(this).attr('id').split('-')[0];
    d3.select('#' + state + "-s").classed("ThemeHighlighted", false);
    var themes = findThemes(state);    
    var j;
    for (j = 0; j < themes.length; j++) {
        d3.select('#' + themes[j] + '-h').classed("ThemeHighlighted", false);
        d3.select('#' + themes[j] + '-f').classed("ThemeHighlighted", false);
        d3.select('#' + state + '-' + themes[j]).classed("ThemeHighlighted", false);
    }
}


function CreateThemesChart(data) {

    d3.select("#ThemesChart").html("");
    TOPICS = ['Abortion', 'Benghazi', 'Bernie Sanders', 'Foreign Policy', 'Global Warming', 'Jobs', 'Law', 'Make America Great Again', 'Obama', 
        'Racial Issues','Tax', 'The Wall', 'Women'
    ]

    var themesWidth = 1050;
    var themesHeight = 1300;

    var tThemes = d3.transition().duration(500);

    if(IsMobileDevice()) {
        themesWidth =  WindowScreen() * 0.90
    }

    var ThemesChart = d3
        .select('#ThemesChart')
        .append('svg')
        .attr('width', themesWidth)
        .attr('height', themesHeight)
        .append('g')

    var legend  = ThemesChart
        .append('g')
        .attr('class', 'themeslegend');

        legend.append("rect")
            .attr("width", 30)
            .attr("height", 10)
            .attr('transform', 'translate(0,10)')
            .attr("fill", '#efb1ff');

        legend.append("text")
            .attr('transform', 'translate(40,18)')
            .text('Rank 1st')
            .attr("fill", 'white')
            .style("font-size", "18px");

        legend.append("rect")
            .attr("width", 20)
            .attr("height", 10)
            .attr('transform', (d, i) => 'translate(150,10)')
            .attr("fill", '#efb1ff');

        legend.append("text")
            .attr('transform', 'translate(180,18)')
            .text('Rank 2nd')
            .style("font-size", "18px")
            .attr("fill", 'white');

        legend.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr('transform', (d, i) => 'translate(300,10)')
            .attr("fill", '#efb1ff');

        legend.append("text")
            .attr('transform', 'translate(320,18)')
            .text('Rank 3rd')
            .style("font-size", "18px")
            .attr("fill", 'white');
        

    var header = ThemesChart
        .append('g')
        .attr('class', 'topicheader')
        .attr('transform', `translate(0, 10)`);

    var footer = ThemesChart
        .append('g')
        .attr('class', 'topicfooter')
        .attr('transform', `translate(0, 1100)`);

    var Sider = ThemesChart
        .append('g')
        .attr('class', 'topicSider');

    var Content = ThemesChart
        .append('g')
        .attr('class', 'topicContent');

    var headrGapFactor = 70;
    var angleFactor = 20;
    if(IsMobileDevice()){
        headrGapFactor = 23;
        angleFactor = 40;
    }

    var TopicHeaderText = header.selectAll('text')
        .data(TOPICS)
        .join(
            enter => {
                enter
                .append('g')
                .attr('id', (d, i) => d.split(" ").join("_") )
                .attr('transform', (d, i) => `translate(${120 + i *headrGapFactor}, 100)`)
                .append('text')
                .attr('id', (d, i) => d.split(" ").join("_") + "-h" )
                .attr("transform", `rotate(-${angleFactor})`)
                .attr('class', 'TopicHeaderText')
                .transition(tThemes)
                .text((d, i) => d)
                .attr('text-anchor', 'start')
                .attr('font-weight','bold')
                .style('fill', 'white');
            },

            update => {
                
            },
        )

    
    var TopicFooterText = footer.selectAll('text')
        .data(TOPICS)
        .join(
            enter => {
                enter
                .append('g')
                .attr('transform', (d, i) => `translate(${120 + i *headrGapFactor}, 50)`)
                .append('text')
                .attr('id', (d, i) => d.split(" ").join("_") + "-f" )
                .attr("transform", `rotate(${angleFactor})`)
                .attr('class', 'TopicFooterText')
                .transition(tThemes)
                .text((d, i) => d)
                .attr('text-anchor', 'start')
                .attr('font-weight','bold')
                .style('fill', 'white')
            },

            update => {
                
            },
        )
 
    var TopicSiderText = Sider.selectAll('text')
        .data(data)
        .join(
            enter => {
                enter
                .append('g')
                .attr('id', (d, i) => d.state.split(" ").join("_") )
                .attr('transform', (d, i) => `translate(0, ${140 + i *20})`)
                .append('text')
                .attr('class', 'TopicSiderText')
                .transition(tThemes)
                .text((d, i) => d.state)
                .attr('id', (d, i) => d.state.split(" ").join("_") + '-s')
                .attr('text-anchor', 'start')
                .attr('font-weight','bold')
                .style('fill', 'white')
            },

            update => {
                
            },
        )

    var selectBtns = $('.btnDebateSelected');
    var eventName = selectBtns.attr('event');
    var i;
    for (i = 0; i < data.length; i++) {
        var row = data[i];
        var state = row.state.split(" ").join("_");
       
        var CY = GetTranslate(state)[1];
        var eventData = row[eventName];
        var Themes = Object.keys(eventData);
        var j;
        for (j = 0; j < Themes.length; j++) {
            var themeName = Themes[j];
            var CX = GetTranslate(themeName)[0];
           
            Content
                .append('g')
                .attr('transform', `translate(${CX}, ${CY})`)
                .append("rect")
                .attr('class', 'TopicRankRect')
                .attr('id', state + '-' + themeName)
                .attr("width", eventData[themeName] * 10)
                .attr("height", 10)
                .attr('y', -10)
                .attr("fill", '#efb1ff');
        }

    }

      
    d3.selectAll('.TopicHeaderText').on('mouseover', mouseoverThemestopic);
    d3.selectAll('.TopicHeaderText').on('mouseout', mouseoutThemestopic);
    d3.selectAll('.TopicHeaderText').on('click', clickThemestopic);

    d3.selectAll('.TopicFooterText').on('mouseover', mouseoverThemestopic);
    d3.selectAll('.TopicFooterText').on('mouseout', mouseoutThemestopic);
    d3.selectAll('.TopicFooterText').on('click', clickThemestopic);

    d3.selectAll('.TopicRankRect').on('mouseover', mouseoverThemesRect);
    d3.selectAll('.TopicRankRect').on('mouseout', mouseoutThemesRect);

    d3.selectAll('.TopicSiderText').on('mouseover', mouseoverThemesSide);
    d3.selectAll('.TopicSiderText').on('mouseout', mouseoutThemesSide);
    d3.selectAll('.TopicSiderText').on('click', clickThemesSide);

}

function GetTranslate(idString){
    if(idString == ""){
        var abc = 1;
        return;
    }
    var transform = d3.select('#' + idString).attr("transform");
    var translate = transform.substring(transform.indexOf("(")+1, transform.indexOf(")")).split(",");
    return translate
}



//GenerateSwingState - start

var swingState1 = d3.select('#svgSwingStateGraph1');
var swingState2 = d3.select('#svgSwingStateGraph2');
var swingState3 = d3.select('#svgSwingStateGraph3');
var swingImageSize = 50;
function GenerateSwingState(data, chartResolve) {
    var TrumpStats = data.filter(d => d.candidate == "Trump");
    var selectBtns = $('.btnDebateSelected');

    var eventName = selectBtns.attr('event').replace('_', ' ');
    var TrumpStatsFiltered = TrumpStats.filter(d => d.event == eventName)[0];

    var dur = 400;
    var t = d3.transition().duration(dur);

    var durR = 400;
    var tR = d3.transition().duration(durR).ease(d3.easeBounce).delay(220);

    var durLong = 5000;
    var tLong = d3.transition().duration(durLong);

    var swingState1Promise = () => {
        return new Promise((resolve, reject) => {
            swingState1
                .selectAll('text')
                .data([TrumpStatsFiltered], d => d.swing_state_1)
                .join(
                    enter => {
                        enter
                        .append('text')
                        .attr('x', d => d.swing_state_1 == 'Trump' ? -150 : 150)
                        //.attr('x', 75)
                        .attr('y', 30)
                        .text(d => d.swing_state_1 == 'Trump' ? "Trump":"Hillary")
                        .attr("stroke", d => d.swing_state_1 == 'Trump' ? "green":"orange")
                        .transition(t)
                        .attr('x', 75)
                        .on("end", response => {
                            if(resolve != undefined)
                            {
                                resolve(response);
                            }
                        })
                    },

                    update => {
                        update
                        .transition(t)
                        .attr('x', 75)
                        .text(d => d.swing_state_1 == 'Trump' ? "Trump":"Hillary")
                        .attr("stroke", d => d.swing_state_1 == 'Trump' ? "green":"orange")
                        .on("end", response => {
                            if(resolve != undefined)
                            {
                                resolve(response);
                            }
                        })
                    },

                    exit => {
                        exit
                        .transition(tR)
                        .attr("stroke", "tomato")
                        .attr('x', d => d.swing_state_1 == 'Trump' ? 0 : 150)
                        .remove()
                        .on("end", response => {
                            if(resolve != undefined)
                            {
                                resolve(response);
                            }
                        })
                    }
                )
        })
    }

    var swingState2Promise = () => {
        return new Promise((resolve, reject) => {
            swingState2
                .selectAll('text')
                .data([TrumpStatsFiltered], d => d.swing_state_2)
                .join(
                    enter => {
                        enter
                        .append('text')
                        .attr('x',  d => d.swing_state_2 == 'Trump' ? -150 : 150)
                        .attr('y', 30)
                        .text(d => d.swing_state_2)
                        .attr("stroke", d => d.swing_state_2 == 'Trump' ? "green":"orange")
                        .transition(t)
                        .attr('x', 75)
                        .on("end", response => {
                            if(resolve != undefined)
                            {
                                resolve(response);
                            }
                        })
                    },

                    update => {
                        update
                        .transition(t)
                        .attr('x', 75)
                        .text(d => d.swing_state_2)
                        .attr("stroke", d => d.swing_state_2 == 'Trump' ? "green":"orange")
                        .on("end", response => {
                            if(resolve != undefined)
                            {
                                resolve(response);
                            }
                        })
                    },

                    exit => {
                        exit
                        .transition(tR)
                        .attr("stroke", "tomato")
                        .attr('x',  d => d.swing_state_2 == 'Trump' ? 0 : 150)
                        .remove()
                        .on("end", response => {
                            if(resolve != undefined)
                            {
                                resolve(response);
                            }
                        })
                    }
                )
            })
        }

    var swingState3Promise = () => {
        return new Promise((resolve, reject) => {
            swingState3
                .selectAll('text')
                .data([TrumpStatsFiltered], d => d.swing_state_3)
                .join(
                    enter => {
                        enter
                        .append('text')
                        .attr('x', d => d.swing_state_3 == 'Trump' ? -150 : 150)
                        .attr('y', 30)
                        .text(d => d.swing_state_3 == 'Trump' ? "Trump":"Hillary")
                        .attr("stroke", d => d.swing_state_3 == 'Trump' ? "green":"orange")
                        .transition(t)
                        .attr('x', 75)
                        .on("end", response => {
                            if(resolve != undefined)
                            {
                                resolve(response);
                            }
                        })
                    },

                    update => {
                        update
                        .transition(t)
                        .attr('x', 75)
                        .text(d => d.swing_state_3 == 'Trump' ? "Trump":"Hillary")
                        .attr("stroke", d => d.swing_state_3 == 'Trump' ? "green":"orange")
                        .on("end", response => {
                            if(resolve != undefined)
                            {
                                resolve(response);
                            }
                        })
                    },

                    exit => {
                        exit
                        .transition(tR)
                        .attr("stroke", "tomato")
                        .attr('x',  d => d.swing_state_3 == 'Trump' ? 0 : 150)
                        .remove()
                        .on("end", response => {
                            if(resolve != undefined)
                            {
                                resolve(response);
                            }
                        })
                    }
                )
            })
        }

    Promise.all([swingState1Promise() ,swingState2Promise(), swingState3Promise()
    ]).then(() => {
        if(chartResolve != null){
            chartResolve();
        }
    });
    }

//GenerateSwingState - end


//subjectivities and polarities - start

var formatDecimal2 = d3.format(".2f");

var psFullHeight = 100;
var psScale = d3.scaleLinear().domain([0.00, 1.00]).range([psFullHeight/2, psFullHeight]); 
var psScaleNeg = d3.scaleLinear().domain([1.00, 0.00]).range([0, psFullHeight/2]);   
var psScaleUp = d3.scaleLinear().domain([0.00, 1.00]).range([0.50, 1.00]); 

var trumpPolarityBar 
    = d3.select('.spanTrumpPolarity').append('svg')
                                    .style("width", '30px')
                                    .style("height", psFullHeight + 'px').append('g')

var hillaryPolarityBar 
    = d3.select('.spanHillaryPolarity').append('svg')
                                    .style("width", '30px')
                                    .style("height", psFullHeight + 'px').append('g')

var liquidTrumpBuilt = false;
var gaugeconfigSubjectivity;

var liquidHillaryBuilt = false;
var gaugeconfigSubjectivityH;

function GenerateNumberchanges(data){
    var TrumpStats = data.filter(d => d.candidate == "Trump");
    var HillaryStats = data.filter(d => d.candidate == "Hillary");

    var selectBtns = $('.btnDebateSelected');

    if(selectBtns.length > 0 && selectBtns.length == 1){
        var eventName = selectBtns.attr('event').replace('_', ' ');
        var TrumpStatsFiltered = TrumpStats.filter(d => d.event == eventName);
        var HillaryStatsFiltered = HillaryStats.filter(d => d.event == eventName);

    
        ChangeNumber($('#lbTrumpPolarity'), TrumpStatsFiltered[0].overall_polarity);
        ChangeNumber($('#lbHillaryPolarity'), HillaryStatsFiltered[0].overall_polarity);

        //ChangeNumber($('#lbTrumpSubjectivity'), TrumpStatsFiltered[0].overall_subjectivity);
        //ChangeNumber($('#lbHillarySubjectivity'), HillaryStatsFiltered[0].overall_subjectivity);

        if(liquidTrumpBuilt){
            gaugeconfigSubjectivity.update(TrumpStatsFiltered[0].overall_subjectivity * 100)
        }
        else{
            var configSubjectivity = liquidFillGaugeDefaultSettings();
            configSubjectivity.circleColor = "limegreen";
            configSubjectivity.textColor = "white";
            configSubjectivity.waveTextColor = "black";
            configSubjectivity.waveColor = "#90ee90";
            configSubjectivity.circleThickness = 0.2;
            configSubjectivity.textVertPosition = 0.2;
            configSubjectivity.waveAnimateTime = 1000;
            gaugeconfigSubjectivity= loadLiquidFillGauge("fillgaugeTrumpSubjectivity", TrumpStatsFiltered[0].overall_subjectivity * 100, configSubjectivity);
            liquidTrumpBuilt = true;
        }

        if(liquidHillaryBuilt){
            gaugeconfigSubjectivityH.update(HillaryStatsFiltered[0].overall_subjectivity * 100)
        }
        else{
            var configSubjectivityH = liquidFillGaugeDefaultSettings();
            configSubjectivityH.circleColor = "orange";
            configSubjectivityH.textColor = "white";
            configSubjectivityH.waveTextColor = "black";
            configSubjectivityH.waveColor = "#fed8b1";
            configSubjectivityH.circleThickness = 0.2;
            configSubjectivityH.textVertPosition = 0.2;
            configSubjectivityH.waveAnimateTime = 1000;
            gaugeconfigSubjectivityH= loadLiquidFillGauge("fillgaugeHillarySubjectivity", HillaryStatsFiltered[0].overall_subjectivity * 100, configSubjectivityH);
            liquidHillaryBuilt = true;
        }

        var t = d3.transition().duration(500);

        //Trump Bar
        var gradient = trumpPolarityBar
            .append('defs')
            .append('svg:linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '100%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '100%')
            .attr('spreadMethod', 'pad')

            
        //Hillary Bar
        var gradientH = hillaryPolarityBar
            .append('defs')
            .append('svg:linearGradient')
            .attr('id', 'gradientH')
            .attr('x1', '100%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '100%')
            .attr('spreadMethod', 'pad')

        var lowColor = d3.interpolateGreens(0);
        var highColor = d3.interpolateGreens(0.8);

        var colorScale = d3.scaleSequential(
            (d) => d3.interpolateGreens(psScaleUp(d))
        )   

        gradient.append('stop').attr('offset', '0%').attr('stop-color', highColor).attr('stop-opacity', 1)
        gradient.append('stop').attr('offset', '100%').attr('stop-color', lowColor).attr('stop-opacity', 1)

        var trumpP = parseFloat(parseFloat(TrumpStatsFiltered[0].overall_polarity).toFixed(2));
        var tp = [{tpKey:'theKey', tpValue: trumpP}];
        trumpPolarityBar
            .selectAll('.PSBar')
            .data(tp, d => d.tpKey)
            .join(
                enter => {
                    enter
                    .append('rect')
                    .attr('class', 'PSBar')
                    .attr('x', 5)
                    .attr("y", 0)
                    .attr('height', psFullHeight)
                    .attr('width', 20)
                    .style('fill', 'url(#gradient)')
                },
        );

        trumpPolarityBar
            .selectAll('.PSMidline')
            .data(tp, d => d.tpKey)
            .join(
                enter => {
                    enter
                    .append('line')
                    .attr('class', 'PSMidline')
                    .style("stroke", "red") 
                    .attr("x1", -5) 
                    .attr("x2", 35)  
                    .attr("y1", psFullHeight/2) 
                    .attr("y2", psFullHeight/2)
                },
        );

        trumpPolarityBar
            .selectAll('.PSline')
            .data(tp, d => d.tpKey)
            .join(
                enter => {
                    enter
                        .append('line')
                        .attr('class', 'PSline')
                        .style("stroke", "black") 
                        .attr("x1", -5) 
                        .attr("x2", 35)  
                        .attr("y1", d => psFullHeight - (d.tpValue > 0.00 ? psScale(d.tpValue) : psScaleNeg(Math.abs(d.tpValue)))) 
                        .attr("y2", d => psFullHeight - (d.tpValue > 0.00 ? psScale(d.tpValue) : psScaleNeg(Math.abs(d.tpValue))))
                        .transition()
                        .on('end', function (d, i) {
                            if(d.tpValue > 0.00){
                                $('#lbTrumpPolarity').css('color', colorScale(d.tpValue));
                            }
                            else{
                                $('#lbTrumpPolarity').css('color', 'red');
                            }
                        });
                },

                update => {
                    update
                        .transition(t)
                        .style("stroke", "black") 
                        .attr("y1", d => psFullHeight - (d.tpValue > 0.00 ? psScale(d.tpValue) : psScaleNeg(Math.abs(d.tpValue)))) 
                        .attr("y2", d => psFullHeight - (d.tpValue > 0.00 ? psScale(d.tpValue) : psScaleNeg(Math.abs(d.tpValue)))) 
                        .on('end', function (d, i) {
                            if(d.tpValue > 0.00){
                                $('#lbTrumpPolarity').css('color', colorScale(d.tpValue));
                            }
                            else{
                                $('#lbTrumpPolarity').css('color', 'red');
                            }
                        });
                },

                exit => {
                }
            );

        var lowColorH = d3.interpolateOranges(0);
        var highColorH = d3.interpolateOranges(0.8);

        var colorScaleH = d3.scaleSequential(
            (d) => d3.interpolateOranges(psScaleUp(d))
        )   

        gradientH.append('stop').attr('offset', '0%').attr('stop-color', highColorH).attr('stop-opacity', 1)
        gradientH.append('stop').attr('offset', '100%').attr('stop-color', lowColorH).attr('stop-opacity', 1)

        var hillaryP = parseFloat(parseFloat(HillaryStatsFiltered[0].overall_polarity).toFixed(2));
        var th = [{tpKey:'theKey', tpValue: hillaryP}];
        
        hillaryPolarityBar
            .selectAll('.PSBar')
            .data(th, d => d.tpKey)
            .join(
            enter => {
                enter
                .append('rect')
                .attr('class', 'PSBar')
                .attr('x', 5)
                .attr("y", 0)
                .attr('height', psFullHeight)
                .attr('width', 20)
                .style('fill', 'url(#gradientH)');
            },
        );
        
        hillaryPolarityBar
            .selectAll('.PSMidline')
            .data(tp, d => d.tpKey)
            .join(
                enter => {
                    enter
                    .append('line')
                    .attr('class', 'PSMidline')
                    .style("stroke", "red") 
                    .attr("x1", -5) 
                    .attr("x2", 35)  
                    .attr("y1", psFullHeight/2) 
                    .attr("y2", psFullHeight/2); 
                },
        );

        hillaryPolarityBar
            .selectAll('.PSline')
            .data(th, d => d.tpKey)
            .join(
                enter => {
                    enter
                        .append('line')
                        .attr('class', 'PSline')
                        .style("stroke", "black") 
                        .attr("x1", -5) 
                        .attr("x2", 35)  
                        .attr("y1", d => psFullHeight - (d.tpValue > 0.00 ? psScale(d.tpValue) : psScaleNeg(Math.abs(d.tpValue)))) 
                        .attr("y2", d => psFullHeight - (d.tpValue > 0.00 ? psScale(d.tpValue) : psScaleNeg(Math.abs(d.tpValue))))
                        .transition()
                        .on('end', function (d, i) {
                            if(d.tpValue > 0.00){
                                $('#lbHillaryPolarity').css('color', colorScaleH(d.tpValue));
                            }
                            else{
                                $('#lbHillaryPolarity').css('color', 'red');
                            }
                        });
                },

                update => {
                    update
                        .transition(t)
                        .style("stroke", "black") 
                        .attr("y1",  d => psFullHeight - (d.tpValue > 0.00 ? psScale(d.tpValue) : psScaleNeg(Math.abs(d.tpValue)))) 
                        .attr("y2",  d => psFullHeight - (d.tpValue > 0.00 ? psScale(d.tpValue) : psScaleNeg(Math.abs(d.tpValue)))) 
                        .on('end', function (d, i) {
                            if(d.tpValue > 0.00){
                                $('#lbHillaryPolarity').css('color', colorScaleH(d.tpValue));
                            }
                            else{
                                $('#lbHillaryPolarity').css('color', 'red');
                            }
                        });
                },

                exit => {
                }
            );

    }
    else {

    }

    RefreshStatsColor();
}

async function ChangeNumber(element, targetNumber) {
    var baseNumber = parseFloat(parseFloat(element.text() == ""? "0" : element.text()).toFixed(2));
    var targetNumberParsed = parseFloat(parseFloat(targetNumber== ""? "0" : targetNumber).toFixed(2));

    var diffUnit = 0.01;

    var diffTotal = targetNumberParsed - baseNumber;
    if (diffTotal == 0){
        return;
    }
    else if (diffTotal < 0){
        diffUnit = - diffUnit;
    }

    do {
        if(baseNumber < 0){
            element.addClass('displayNumberNegtive');
        }
        else{
            element.removeClass('displayNumberNegtive');
        }
        baseNumber = parseFloat((baseNumber + diffUnit).toFixed(2)); //solve double precision floating point number problem https://www.w3schools.com/js/js_numbers.asp
        element.text(baseNumber.toFixed(2));

        //element.css('top', 100 - baseNumber *100);

        await sleep(1);
    } while (baseNumber != targetNumberParsed);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//subjectivities and polarities -end

function ClickLineTextHillary(){
    if(d3.select(this).classed('lineTextSelected'))
    {
        d3.select(this).classed('lineTextSelected', false)
        lineNumbersHillary.style('opacity', 0);

    }
    else {
        d3.select(this).classed('lineTextSelected', true)
        lineNumbersHillary.style('opacity', 1);
    }
}

function ClickLineTextTrump(){
    if(d3.select(this).classed('lineTextSelected'))
    {
        d3.select(this).classed('lineTextSelected', false)
        lineNumbersTrump.style('opacity', 0);

    }
    else {
        d3.select(this).classed('lineTextSelected', true)
        lineNumbersTrump.style('opacity', 1);
    }
}

function displayToolTip(d){

    var retval = 'aaa';
    var event = d.event;
    var score = d.score;
    var name = d.name;

    var indicator = $('.btnSentimentSelected').attr('event');
    var indicatorName = indicator.split('_')[1];
    var indicatorCamelCase = indicatorName.charAt(0).toUpperCase() + indicatorName.substr(1).toLowerCase()
    var record = cachedData.filter(c => c.event == event && c.candidate == name)[0];

    retval = `
        <div class='tooltipPopup'>
            <div class='tooltipPopupInner'>
                <div style='display:inline-block;vertical-align:top;width:80px;text-align:left;'>

                    <img width='50' height='50' src=${name == 'Trump'? "images/Trump.jpg" : "images/Hillary.jpg"}>
                    <div sytle ='height:50px;vertical-align:middle;display:inline-block;'>
                        <span style='display:inline-block;vertical-align:middle;width:15px;height:15px;border-radius:50%;background-color:${name == 'Trump'? "green" : "orange"}'></span>
                        <label style='height:15px;vertical-align:middle;'>${name}</label>
                        <br />
                        <a target='__blank' style='color:steelblue;' href=${name == 'Trump'? "https://en.wikipedia.org/wiki/Donald_Trump" : "https://en.wikipedia.org/wiki/Hillary_Clinton" } >more...</a>
                    </div>
                </div>
                <div style='display:inline-block;'>
                    <div>Event: ${event}</div>
                    <div>${indicatorCamelCase}: ${score}</div>
                    <div>Top Theme 1: ${record.top_theme_1}</div>
                    <div>Top Theme 2: ${record.top_theme_2}</div>
                    <div>Top Theme 3: ${record.top_theme_3}</div>
                    <div>Top Theme 4: ${record.top_theme_4}</div>
                    <div>Top Theme 5: ${record.top_theme_5}</div>
                    <div>Swing State 1: ${record.swing_state_1}</div>
                    <div>Swing State 2: ${record.swing_state_2}</div>
                    <div>Swing State 3: ${record.swing_state_3}</div>
                </div>
            </div>
        </div>
    `;

    return retval;
}

function lineChartNodeClickPre(d){
    $('.btnDebate').each(function(){
            if($(this).attr('event') == d.replace(' ', '_')){
                $(this).click();
            }
        }
    );
}

function lineChartNodeClick(d, resolve = null){

    d3.selectAll('.btnLineChartLabel')
        .each(function(f) {
            var thisElement = d3.select(this);

            if(thisElement.attr('id') == d.replace(' ', '_')){
                setTimeout(function(){
                    thisElement.attr('class', 'btnLineChartLabel btnLineChartLabelSelected');
                }, 400);

            }
            else if(thisElement.classed("btnLineChartLabelSelected")){
                setTimeout(function(){
                    thisElement.attr('class', 'btnLineChartLabel');
                }, 400);
            }
        }
    );		

    d3.selectAll('.lineCircle' + d.replace(' ', '_')).each(function(f) {
        d3.select(this).attr('r', 10);
    });

    d3.selectAll('.lineCircle').each(function(f) {
        if(!d3.select(this).classed('lineCircle' + d.replace(' ', '_'))){
            d3.select(this).attr('r', 5);
        }
    });

    $('.btnDebate').removeClass('btnDebateSelected');
    $('.btnDebate').each(function(){
            if($(this).attr('event') == d.replace(' ', '_')){
                $(this).addClass('btnDebateSelected');
            }
        }
    );

    var graphPromise = () => {
            return new Promise((resolve1, reject) => {
                RefreshGraph(resolve1);
        })
    }

    var lineGraphPromise = () => {
        return new Promise((resolve2, reject) => {
            RefreshLineGraph();
            resolve2();
        })
    }

    var FDGraphPromise = () => {
        return new Promise((resolve3, reject) => {
            BuildFDGraph(cachedFDGraph);
            resolve3();
        })
    }

    var EmojiAnalysisPromise = () => {
        return new Promise((resolve4, reject) => {
            CreateEmojiAnalysisDist(d);
            resolve4();
        })
    }

    Promise.all([graphPromise(), lineGraphPromise(), FDGraphPromise(), EmojiAnalysisPromise()]).then(() => {
        if(resolve != null){
            resolve();
        }
    })
}

function mouseoverLineCircle(d) {
    d3.select(this).attr('r', 10);
    //tip.show(d, this);
}

function mouseoutLineCircle(d) {
    var event = d3.selectAll('.btnDebateSelected').attr('event');
    if(!d3.select(this).classed('lineCircle' + event.replace(' ', '_'))){
        d3.select(this).attr('r', 5);
    }
}

function LineChartImageClick(){
    if($(this).hasClass('LineChartImageSelectedTrump')){
        $(this).removeClass('LineChartImageSelectedTrump');

        d3.selectAll('.lineCirclesTrump ').transition().duration(200).attr('opacity', 0);
        d3.selectAll('.linePathsTrump').transition().duration(200).attr('opacity', 0);
        d3.selectAll('.lineTextsTrump').transition().duration(200).attr('opacity', 0);
        d3.selectAll('.lineNumbersTrump').transition().duration(200).attr('opacity', 0);

        $('.TrumpPsGraph').fadeOut();
    }
    else if ($(this).hasClass('TrumpSurround')){
        $(this).addClass('LineChartImageSelectedTrump');

        d3.selectAll('.lineCirclesTrump ').transition().duration(200).attr('opacity', 1);
        d3.selectAll('.linePathsTrump').transition().duration(200).attr('opacity', 1);
        d3.selectAll('.lineTextsTrump').transition().duration(200).attr('opacity', 1);
        d3.selectAll('.lineNumbersTrump').transition().duration(200).attr('opacity', 1);

        $('.TrumpPsGraph').fadeIn();
    }

    if($(this).hasClass('LineChartImageSelectedHillary')){
        $(this).removeClass('LineChartImageSelectedHillary');

        d3.selectAll('.lineCirclesHillary').transition().duration(200).attr('opacity', 0);
        d3.selectAll('.linePathsHillary').transition().duration(200).attr('opacity', 0);
        d3.selectAll('.lineTextsHillary').transition().duration(200).attr('opacity', 0);
        d3.selectAll('.lineNumbersHillary').transition().duration(200).attr('opacity', 0);

        $('.HillaryPsGraph').fadeOut();
    }
    else if ($(this).hasClass('HillarySurround')){
        $(this).addClass('LineChartImageSelectedHillary');

        d3.selectAll('.lineCirclesHillary').transition().duration(200).attr('opacity', 1);
        d3.selectAll('.linePathsHillary').transition().duration(200).attr('opacity', 1);
        d3.selectAll('.lineTextsHillary').transition().duration(200).attr('opacity', 1);
        d3.selectAll('.lineNumbersHillary').transition().duration(200).attr('opacity', 1);

        $('.HillaryPsGraph').fadeIn();
    }
}

function cbMutiSelectChange() {
    if($(this).is(':checked'))
    {
        // $('#divSwingStates').fadeOut();
        // $('#divCandidatesStats').fadeOut();

    }
    else {
        // $('#divSwingStates').fadeIn();
        // $('#divCandidatesStats').fadeIn();
        if($('.btnDebateSelected').length > 1){
            var firstSelected = $('.btnDebateSelected')[0];
            $('.btnDebateSelected').removeClass('btnDebateSelected');
            $(firstSelected).addClass('btnDebateSelected');
        }
    }

    RefreshGraph();
}

function PopulateSentimentStyle(){
    if($('#SubjectivityButton').hasClass('btnSentimentSelected')){
        $('#PolarityButton').addClass('GreyOut');
        $('#lbTrumpPolarity').addClass('GreyOut');
        $('#lbHillaryPolarity').addClass('GreyOut');

        $('#SubjectivityButton').removeClass('GreyOut');
        //$('#lbTrumpSubjectivity').removeClass('GreyOut');
        //$('#lbHillarySubjectivity').removeClass('GreyOut');
    }
    else{
        $('#PolarityButton').removeClass('GreyOut');
        $('#lbTrumpPolarity').removeClass('GreyOut');
        $('#lbHillaryPolarity').removeClass('GreyOut');

        $('#SubjectivityButton').addClass('GreyOut');
        //$('#lbTrumpSubjectivity').addClass('GreyOut');
        //$('#lbHillarySubjectivity').addClass('GreyOut');
    }
}

function btnSentimentClick(){
    $('.btnSentiment').removeClass('btnSentimentSelected');
    $(this).addClass('btnSentimentSelected');

    RefreshStatsColor();

    RefreshLineGraph();

    PopulateSentimentStyle();
}

function RefreshStatsColor(){
    if($('#PolarityButton').hasClass('btnSentimentSelected')){
        $('.PolarityCell').addClass('StatesSelected');
        $('.SubjectivityCell').removeClass('StatesSelected');
    }
    else{
        $('.SubjectivityCell').addClass('StatesSelected');
        $('.PolarityCell').removeClass('StatesSelected');
    }
}

function RefreshGraph(resolve) {

    const GenerateNumberchangesPromise = () => {
        return new Promise((resolve, reject) => {
            GenerateNumberchanges(cachedData);
            resolve();
        })
    }
    const GenerateSwingStatePromise = () => {
        return new Promise((resolve, reject) => {
            GenerateSwingState(cachedData, resolve);
        })
    }
    const GenerateTopThemeGraphChartPromise = () => {
        return new Promise((resolve, reject) => {
            GenerateTopThemeGraphChart(cachedtopthemes, resolve);
        })
    }

    CreateThemesChart(cachedthemes);

    Promise.all([GenerateNumberchangesPromise(), GenerateSwingStatePromise(), GenerateTopThemeGraphChartPromise()]).then(() => {
        if(resolve != null){
            resolve();
        }
    })
}

function RefreshLineGraph(){
    GenerateLineGraph(cachedData);
}

function Populate(){
    PopulateSentimentStyle();
}

var eventQueue = [];
var eventQueueProcessing = -1;

async function btnClick (){
    var event = $(this).attr('event');
    var date = new Date();
    var key = date.getMilliseconds() + date.getSeconds() * 1000;

    if (eventQueue.length > 1) {
        eventQueue[1] = key;
    }
    else {
        eventQueue.push(key);
    }

    //to update the map
    window.debate =  parseInt($(this).attr('eventid'));
    window.update_map();            

    var eventFinished = false;
    var count = 0;
    do {
        if(eventQueue.findIndex((element) => element == key) == 0 && eventQueueProcessing != key)
        {
            eventQueueProcessing = key;

            new Promise(function(resolve, reject) {
                lineChartNodeClick(event, resolve);
                eventFinished = true;
            }).then(function(result) {
                eventQueue.shift();
            });
        }
        count = count + 1;
        await sleep(50);
    } while (eventFinished == false && count < 100);
}

var WireUpEvents = () => {

    d3.selectAll('.btnDebate').on('click', btnClick);

    d3.selectAll('.lineCircle').on('click', d => lineChartNodeClickPre(d.event));
    d3.selectAll('.lineCircleBar').on('click', d => lineChartNodeClickPre(d.event));
    d3.selectAll('.btnSentiment').on('click', btnSentimentClick);

    d3.selectAll('.PolarityButtonClass').on('click', () => { $('#PolarityButton').click() });

    d3.selectAll('.SubjectivityButtonClass').on('click',  () => { $('#SubjectivityButton').click() });

    d3.selectAll('.lineCircle').on('mouseover', mouseoverLineCircle);
    d3.selectAll('.lineCircle').on('mouseout', mouseoutLineCircle);
    $('.LineChartImage').on('click', LineChartImageClick);
    $('#cbShowNumber').on('change',
        function()
        {
            if($(this).is(':checked')){
                lineNumbersHillary.transition().duration(200).attr('opacity', 1);
                lineNumbersTrump.transition().duration(200).attr('opacity', 1);
            }
            else {
                lineNumbersHillary.transition().duration(200).attr('opacity', 0);
                lineNumbersTrump.transition().duration(200).attr('opacity', 0);
            }
        }
    );
    
    $('.Minus').on('click', MinusClick);
    $('.Plus').on('click', PlusClick);

    $(window).click(function(e) {
        $('.tooltipPopup').fadeOut();
    });
}

function MinusClick(){
    nodeCountFilter = nodeCountFilter - 5;
    if(nodeCountFilter < 0){
        nodeCountFilter = 0;
        
    }
    BuildFDGraph(cachedFDGraph, false);
}

function PlusClick(){
    nodeCountFilter = nodeCountFilter + 5;
    if(nodeCountFilter < 0){
        nodeCountFilter = 0;
        
    }
    BuildFDGraph(cachedFDGraph, false);
}

function ProcessTopThemes(data) {
    var firstDebateData = data.filter(d => d.event == 'First debate');
    var VPDebateData = data.filter(d => d.event == 'VP debate');
    var secondDebateData = data.filter(d => d.event == 'Second debate');
    var thirdDebateData = data.filter(d => d.event == 'Third debate');
    var lastDebateData = data.filter(d => d.event == 'Before Election');

    var dictFirst = {};
    var dictVP = {};
    var dictSecond = {};
    var dictThird = {};
    var dictFinal = {};

    processTopThemesDict(firstDebateData, dictFirst);
    processTopThemesDict(VPDebateData, dictVP);
    processTopThemesDict(secondDebateData, dictSecond);
    processTopThemesDict(thirdDebateData, dictThird);
    processTopThemesDict(lastDebateData, dictFinal);

    var getSortedArray =
        dict => Object.keys(dict)
                        .map(key => [key.charAt(0).toUpperCase() + key.substr(1).toLowerCase(), dict[key]])
                        .sort((a, b) => (a[1] < b[1]) ? 1 : -1);

    var arrayFirst = getSortedArray(dictFirst);
    var arrayVP = getSortedArray(dictVP);
    var arraySecond = getSortedArray(dictSecond);
    var arrayThird = getSortedArray(dictThird);
    var arrayFinal = getSortedArray(dictFinal);

    var retval = {};
    retval['First_debate'] = arrayFirst;
    retval['VP_debate'] = arrayVP;
    retval['Second_debate'] = arraySecond;
    retval['Third_debate'] = arrayThird;
    retval['Before_Election'] = arrayFinal;

    return retval;
}

function processTopThemesDict(data, dict){
    
    for (i = 0; i < data.length; i++){
        var top_theme_1 = data[i].top_theme_1;
        var top_theme_2 = data[i].top_theme_2;
        var top_theme_3 = data[i].top_theme_3;
        var top_theme_4 = data[i].top_theme_4;
        var top_theme_5 = data[i].top_theme_5;
        processTopThemesDictFurter(top_theme_1, dict);
        processTopThemesDictFurter(top_theme_2, dict);
        processTopThemesDictFurter(top_theme_3, dict);
        processTopThemesDictFurter(top_theme_4, dict);
        processTopThemesDictFurter(top_theme_5, dict);
    }
}

function processTopThemesDictFurter(topic, dict) {
    if(dict[topic] == undefined){
        dict[topic] = 1;
    }
    else{
        dict[topic] = dict[topic] + 1;
    }
}

var getSortedArray =
    dict => Object.keys(dict)
                .map(key => [key.charAt(0).toUpperCase() + key.substr(1).toLowerCase(), dict[key]])
                .sort((a, b) => (a[1] < b[1]) ? 1 : -1);

LoadAllGraphs();
function LoadAllGraphs(){
    var timelinekey = d3.csv('data/timelinekeynew.csv',
        rawrow => ({
            event : rawrow['event'],
            candidate: rawrow['candidate'],
            overall_polarity: formatDecimal2(+rawrow['overall_polarity']),
            overall_subjectivity: formatDecimal2(+rawrow['overall_subjectivity']),
            top_theme_1:  rawrow['top_theme_1'],
            top_theme_2:  rawrow['top_theme_2'],
            top_theme_3:  rawrow['top_theme_3'],
            top_theme_4:  rawrow['top_theme_4'],
            top_theme_5:  rawrow['top_theme_5'],
            swing_state_1: rawrow['swing_state_1'],
            swing_state_2: rawrow['swing_state_2'],
            swing_state_3: rawrow['swing_state_3']
        })
    );
    // var timelinetopThemes = d3.csv('data/timelinetopthemes.csv',
    //     rawrow => ({
    //         event : rawrow['date'],
    //         state: rawrow['state'],
    //         top_theme_1: rawrow['top_theme_1'],
    //         top_theme_2: rawrow['top_theme_2'],
    //         top_theme_3: rawrow['top_theme_3'],
    //         top_theme_4: rawrow['top_theme_4'],
    //         top_theme_5: rawrow['top_theme_5'],
    //     })
    // );

   
    Promise.all([timelinekey])
        .then(([timelinekeyData]) => {
            cachedData = timelinekeyData;
            GenerateLineGraph(timelinekeyData, true);
            GenerateNumberchanges(timelinekeyData);
            GenerateSwingState(timelinekeyData);

            var filterTrump = timelinekeyData.filter(t => t.candidate == "Trump");

            var processedRows = {};

            var topTheme1 = filterTrump.filter(t => t.event == "First debate")[0]["top_theme_1"];
            var topTheme2 = filterTrump.filter(t => t.event == "First debate")[0]["top_theme_2"];
            var topTheme3 = filterTrump.filter(t => t.event == "First debate")[0]["top_theme_3"];
            var firstDict = {}
            firstDict[topTheme1] = 40;
            firstDict[topTheme2] = 30;
            firstDict[topTheme3] = 20;
            processedRows['First_debate'] = getSortedArray(firstDict);

            topTheme1 = filterTrump.filter(t => t.event == "VP debate")[0]["top_theme_1"];
            topTheme2 = filterTrump.filter(t => t.event == "VP debate")[0]["top_theme_2"];
            topTheme3 = filterTrump.filter(t => t.event == "VP debate")[0]["top_theme_3"];

            var vpDict = {}
            vpDict[topTheme1] = 40;
            vpDict[topTheme2] = 30;
            vpDict[topTheme3] = 20;

            processedRows['VP_debate'] = getSortedArray(vpDict);
            
            topTheme1 = filterTrump.filter(t => t.event == "Second debate")[0]["top_theme_1"];
            topTheme2 = filterTrump.filter(t => t.event == "Second debate")[0]["top_theme_2"];
            topTheme3 = filterTrump.filter(t => t.event == "Second debate")[0]["top_theme_3"];

            var secondDict = {}
            secondDict[topTheme1] = 40;
            secondDict[topTheme2] = 30;
            secondDict[topTheme3] = 20;

            processedRows['Second_debate'] = getSortedArray (secondDict);

            topTheme1 = filterTrump.filter(t => t.event == "Third debate")[0]["top_theme_1"];
            topTheme2 = filterTrump.filter(t => t.event == "Third debate")[0]["top_theme_2"];
            topTheme3 = filterTrump.filter(t => t.event == "Third debate")[0]["top_theme_3"];

            var thirdDict = {}
            thirdDict[topTheme1] = 40;
            thirdDict[topTheme2] = 30;
            thirdDict[topTheme3] = 20;

            processedRows['Third_debate'] = getSortedArray (thirdDict);

            topTheme1 = filterTrump.filter(t => t.event == "Before Election")[0]["top_theme_1"];
            topTheme2 = filterTrump.filter(t => t.event == "Before Election")[0]["top_theme_2"];
            topTheme3 = filterTrump.filter(t => t.event == "Before Election")[0]["top_theme_3"];

            var BEDict = {}
            BEDict[topTheme1] = 40;
            BEDict[topTheme2] = 30;
            BEDict[topTheme3] = 20;

            processedRows['Before_Election'] = getSortedArray (BEDict);

            // var processedRows = ProcessTopThemes(timelinetopThemesData);
            //var processedRows =

            cachedtopthemes = processedRows;
            GenerateTopThemeGraphChart(processedRows);
        })
        .then(
            () => {
                    
                    $('.loaderContainer').hide();
                    WireUpEvents();
                    Populate();
                }
            );
}

CreateFDGraph();

//#Reference: Code below is based on Gatech CSE6242 2020 Spring Homework 2 Question 2 

function CreateFDGraph(){

    d3.csv("data/debateGraph.csv",
    rawrow => ({
        source : rawrow['source'],
        target : rawrow['target'],
        Date : rawrow['Date'],
        value : +rawrow['value']
    })

    ).then(
    data => {
        cachedFDGraph = data;
        BuildFDGraph(data);
    })
}

var nodeCountFilter = 0;
function BuildFDGraph(data, rebuild = true){
    var currentData = JSON.parse(JSON.stringify(data));
    var eventName = 'election_day';
    
    var selectBtns = $('.btnDebateSelected');

    
    if(selectBtns.length == 1){
        eventName = selectBtns.attr('event').replace('_', ' ');

        if(rebuild)
        {
            if(eventName == "Second debate" || eventName == "Third debate"){
                nodeCountFilter = 60;
            }

            if(eventName == "First debate" || eventName == "VP debate"){
                nodeCountFilter = 30;
            }

            if(eventName == "Before Election"){
                nodeCountFilter = 0;
            }
        }
    }

    $('#lbNodeFilter').text(nodeCountFilter);

    var links = currentData.filter(d => d.Date == eventName && d.source != d.target && d.value > nodeCountFilter);

    d3.select("#forceDirectedGraph").selectAll('svg').remove();

    var nodes = {};
    
    // compute the distinct nodes from the links.
    links.forEach(function(link) {
        ////asign class depends on value
        link.type = link.value < 300 ? "LightLink" : "HeavyLink";

        link.source = nodes[link.source] ||
            (nodes[link.source] = {name: link.source});
        link.target = nodes[link.target] ||
            (nodes[link.target] = {name: link.target});
    });
    
    //*calculate degree
    var maxDegree = 0;
    var nodeValues = d3.values(nodes);
    nodeValues.forEach(
        node => {
            node.degree = links.filter(l => l.target.name == node.name || l.source.name == node.name).length;
            node.inDegree = links.filter(l => l.target.name == node.name).length;
            node.outDegree = links.filter(l => l.source.name == node.name).length;
            if(node.degree > maxDegree) {
                maxDegree = node.degree;
            }
        }
    );

    var width = 1400,
        height = 800;

    if(IsMobileDevice()) {
        width =  WindowScreen() * 0.90;
    }
   
    var svgFDGraph = d3.select("#forceDirectedGraph").append("svg")
                .attr("width", width)
                .attr("height", height);
    
    var force = d3.forceSimulation()
        .nodes(d3.values(nodes))
        .force("link", d3.forceLink(links).distance(100))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force("charge", d3.forceManyBody().strength(-250))
        .alphaTarget(1)
        .on("tick", tick);
    
    // add the links and the arrows
    var path = svgFDGraph.append("g")
        .selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("class", function(d) { return "link " + d.type; });
    
    // define the nodes
    var node = svgFDGraph.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    
    // add the nodes
    var rScale = d3.scaleLinear()
    .domain([0, maxDegree])
    .range([1, 20]);

    //*set up color scaler
    var fillScale = d3.scaleLinear()
        .domain([0, maxDegree])
        .range(['#fde0dd','#c51b8a']);

    var nodeCircle = node.append("circle")
        .attr("r", (d, i) => rScale(d.degree))
        .attr("fill", (d, i) => fillScale(d.degree));

    nodeCircle.append("svg:title")
        .text(d => `${d.name}\nIn Degree: ${d.inDegree}\nOut Degree ${d.outDegree}`);

    nodeCircle.on("dblclick", dblclick); //*wire up double click events
     
    
    //*append node names
    var nodeText = node.append("text")
        .text(n => n.name)
        .attr("class", "NodeText");

    nodeText.append("svg:title")
        .text(d => `${d.name}\nIn Degree: ${d.inDegree}\nOut Degree ${d.outDegree}`);

    nodeText.attr("dy", n => 10);

    // add the curvy lines
    function tick() {
        path.attr("d", function(d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" +
                d.source.x + "," +
                d.source.y + "A" +
                dr + "," + dr + " 0 0,1 " +
                d.target.x + "," +
                d.target.y;
        });
    
        node
            .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")"; })
    };

    //*handle double click
    function dblclick(d) {
        var currentCircle = d3.select(this);
        if(d.fixed == true){
            currentCircle.classed("fixed", false);
            d.fixed = false;
            d.fx = null;
            d.fy = null;
        }
        else {
            currentCircle.classed("fixed", true);
            d.fixed = true;
            d.fx = d.x;
            d.fy = d.y;
        }
    }
    
    function dragstarted(d) {
        if (!d3.event.active) force.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    };
    
    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    };
    
    function dragended(d) {
        if (!d3.event.active) force.alphaTarget(0);
        if (d.fixed == true) {
            d.fx = d.x;
            d.fy = d.y;
        }
        else {
            d.fx = null;
            d.fy = null;
        }
    };

}

function CreateEmojiAnalysisDist(event) {
    if(event == "First_debate"){
        CreateEmojiAnalysis('emoji_1st.csv')
    }
    else if(event == "VP_debate"){
        CreateEmojiAnalysis('emoji_vp.csv')
    }
    else if(event == "Second_debate"){
        CreateEmojiAnalysis('emoji_2nd.csv')
    }
    else if(event == "Third_debate"){
        CreateEmojiAnalysis('emoji_3rd.csv')
    }
    else if(event == "Before_Election"){
        CreateEmojiAnalysis('emoji_e.csv')
    }
}


SADNESS_EMOJI = [
    '😔','😥','😩','😫','🤕','😦','😧','😓','😭','😒','😯','☹️','🙁','😢','😟','🤥','😞','😨','😰','🤒','😷','😿','😪','😌','👎'
]

SUPRISE_EMOJI = [
    '🤯','😂','😆','😛','😜','😝','🤓','😹','😅','😲','😮','🙀','😱','👻','👽','🤖','🤡','😈','😼'
]

JOY_EMOJI = [
    '😀','😁','😃','😄','😄','😉','😊','😎','😋','😙','😚','☺️','🙂','🤗','🤩','😘','🥰','😻','😍','😇','😸','😺','😄','😽','🥳','🤠','🤤','🤭','🤑','🙏','👍'
]

DISGUST_EMOJI = [
    '🥵','🥶','🤬','🤢','🤮','🤧','😤','😡','😖','😣','😠','😾','👿','💀','👹','👺','💩','🖕'
]

UNCERTAIN_EMOJI = [
    '😕','🤔','🤨','😐','😑','😶','🙄','😬','🤪','😵','😗','😏','🧐','🥴','😅','🙃','🥺','😳','😴','🤐','🤫','🤞'
]



CreateEmojiAnalysis('emoji_1st.csv')

function CreateEmojiAnalysis(fileName) {
    d3.csv('data/' + fileName,
    rawrow => {
        emoji = GetEmojiFromName(rawrow['name']);
        return ({
            name : emoji,
            category : rawrow['category'],
            value : rawrow['count']
        })
    }
    ).then(
        rawData => {
            var processedData = ProcessEmojiData(rawData);
            BuildEmojiChart(processedData);
            BuildTreeChart(processedData);

            var processedTotalData = ProcessEmojiTotalData(rawData);
            BuildRadarChart(processedTotalData);
        }
    )
}

function GetEmojiFromName(name){
    var number = name.split("_")[1];
    if(name.startsWith("suprise") && SUPRISE_EMOJI.length > number) {
         return SUPRISE_EMOJI[number];
    }
    else if (name.startsWith("uncertain") && UNCERTAIN_EMOJI.length > number) {
        return UNCERTAIN_EMOJI[number];
    }
    else if (name.startsWith("joy") && JOY_EMOJI.length > number) {
        return JOY_EMOJI[number];
    }
    else if (name.startsWith("sadness") && SADNESS_EMOJI.length > number) {
        return SADNESS_EMOJI[number];
    }
    else if (name.startsWith("disgust") && DISGUST_EMOJI.length > number) {
        return DISGUST_EMOJI[number];
    }
    else {
        return "N/A"
    }
}

var JSGroupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  var getArray =
    dict => Object.keys(dict)
                    .map(key => [key, dict[key]]);

function ProcessEmojiData(rawData) {
    var groupby = JSGroupBy(rawData, 'category');
    
    var converted = getArray(groupby);

    var mapped = []

    for (i = 0; i < converted.length; i++) {
        mapped.push({'name': converted[i][0], 'children': converted[i][1]});
    }
    var processed = {
        name: "emoji",
        children: mapped
    }
    return processed;
}

function ProcessEmojiTotalData(rawData) {
    var groupby = JSGroupBy(rawData, 'category');
    var aggregate = Object.keys(groupby)
            .map(key => {
                    let result = 0;
                    var array = groupby[key]; 
                    for (let i = 0; i < array.length - 1; i++) {
                        result += parseInt(array[i].value);
                    }
                return {axis:key,value:result};
            })
            .sort((a, b) => (a.axis < b.axis) ? 1 : -1);;
 
    return [aggregate];
}

function BuildEmojiChart(data){
    $('#TEmoji').html('');
    $('#TEmoji').append(chartEmoji(data));
}

function BuildTreeChart(data){
    $('#TreeChart').html('');
    $('#TreeChart').append(TreeChart(data));
}

//#reference below is from https://observablehq.com/@d3/collapsible-tree

TreeChart = data => {
    dx = 20;
    var TreeWidth = 600;
    dy = TreeWidth / 2.8;
    margin = ({top: 10, right: 120, bottom: 10, left: 40});

    diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);
    tree = d3.tree().nodeSize([dx, dy]);

    const root = d3.hierarchy(data);

    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
        d.id = i;
        d._children = d.children;
        if (d.depth && d.data.name.length !== 7) d.children = null;
    });

    const svg = d3.create("svg")
        .attr("viewBox", [-margin.left, -margin.top, TreeWidth, dx])
        .style("font", "10px sans-serif")
        .style("user-select", "none");

    const gLink = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

    const gNode = svg.append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");

    function update(source) {
        const duration = d3.event && d3.event.altKey ? 2500 : 250;
        const nodes = root.descendants().reverse();
        const links = root.links();

        // Compute the new tree layout.
        tree(root);

        let left = root;
        let right = root;
        root.eachBefore(node => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
        });

        const height = right.x - left.x + margin.top + margin.bottom;

        const transition = svg.transition()
            .duration(duration)
            .attr("viewBox", [-margin.left, left.x - margin.top, TreeWidth, height])
            .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

        // Update the nodes…
        const node = gNode.selectAll("g")
        .data(nodes, d => d.id);

        // Enter any new nodes at the parent's previous position.
        const nodeEnter = node.enter().append("g")
            .attr("transform", d=> `translate(${source.y0},${source.x0})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0)
            .on("click", d => {
            d.children = d.children ? null : d._children;
            update(d);
            });

        nodeEnter.append("circle")
            .attr("r", 2.5)
            .attr("fill", d => d._children ? "#555" : "#999")
            .attr("stroke-width", 10);

        nodeEnter.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d._children ? -6 : 6)
            .attr("text-anchor", d => d._children ? "end" : "start")
            .text(d => d.data.value == undefined? d.data.name :  d.data.name + ' ' + d.data.value)
        .clone(true).lower()
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .attr("stroke", "white");

        // Transition nodes to their new position.
        const nodeUpdate = node.merge(nodeEnter).transition(transition)
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        const nodeExit = node.exit().transition(transition).remove()
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0);

        // Update the links…
        const link = gLink.selectAll("path")
        .data(links, d => d.target.id);

        // Enter any new links at the parent's previous position.
        const linkEnter = link.enter().append("path")
            .attr("d", d => {
            const o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.merge(linkEnter).transition(transition)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition(transition).remove()
            .attr("d", d => {
            const o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
            });

        // Stash the old positions for transition.
        root.eachBefore(d => {
        d.x0 = d.x;
        d.y0 = d.y;
        });
    }

    update(root);

    return svg.node();
}


//#reference below is from https://observablehq.com/@d3/zoomable-sunburst


chartEmoji = data => {

    partition = data => {
        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        return d3.partition()
            .size([2 * Math.PI, root.height + 1])
          (root);
      }
    
    color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
    
    format = d3.format(",d")
    
    var widthEmoji = 500
    
    radius = widthEmoji / 6
    
    arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius(d => d.y0 * radius)
        .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

    const root = partition(data);
  
    root.each(d => d.current = d);
  
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, widthEmoji, widthEmoji])
        .style("font", "10px sans-serif");
  
    const g = svg.append("g")
        .attr("transform", `translate(${widthEmoji / 2},${widthEmoji / 2})`);
  
    const path = g.append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
        .attr("d", d => arc(d.current));
  
    path.filter(d => d.children)
        .style("cursor", "pointer")
        .on("click", clicked);
  
    path.append("title")
        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
  
    const label = g.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
        .attr("dy", "0.35em")
        .attr("fill-opacity", d => +labelVisible(d.current))
        .attr("transform", d => labelTransform(d.current))
        .text(d => d.data.name);
  
    const parent = g.append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked)
        //.on('mouseover', mouseOverEmoji)
        ;

    function clicked(p) {
      parent.datum(p.parent || root);
  
      root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });
  
      const t = g.transition().duration(750);
  
      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
      path.transition(t)
          .tween("data", d => {
            const i = d3.interpolate(d.current, d.target);
            return t => d.current = i(t);
          })
        .filter(function(d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
          .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
          .attrTween("d", d => () => arc(d.current));
  
      label.filter(function(d) {
            var text = d3.select(this).text();
            return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        }).transition(t)
          .attr("fill-opacity", d => +labelVisible(d.target))
          .attrTween("transform", d => () => labelTransform(d.current));
    }
    
    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }
  
    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }
  
    function labelTransform(d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  
    return svg.node();
}

//#reference below is based on example from http://bl.ocks.org/nbremer/6506614

function BuildRadarChart(data){
    
    var w = 600,
    h = 600;

    if(IsMobileDevice()) {
        w = WindowScreen();
        h = WindowScreen();
    }
    var scaler = d3.scaleLinear().domain([0.00, 42000]).range([0.50, 1.00]); 
    var colorscaleRader = d3.scaleSequential(
        (d) => d3.interpolateBlues(scaler(d))
    )   

    //Options for the Radar chart, other than default
    var mycfg = {
        w: w,
        h: h,
        maxValue: 42000,
        levels: 6,
        ExtraWidthX: 0,
        ExtraWidthY: 0,
        color: colorscaleRader
    }
    $('#RadarChart').html('');
    $('#RadarChart').append(GetRadarChart(data, mycfg));
}

GetRadarChart = (d, options) => { 
    var cfg = {
       radius: 5,
       w: 600,
       h: 600,
       factor: 1,
       factorLegend: .85,
       levels: 3,
       maxValue: 0,
       radians: 2 * Math.PI,
       opacityArea: 0.4,
       ToRight: 5,
       TranslateX: 50,
       TranslateY: 130,
       ExtraWidthX: 0,
       ExtraWidthY: 0,
       color: options.color
      };
      
      if('undefined' !== typeof options){
        for(var i in options){
          if('undefined' !== typeof options[i]){
            cfg[i] = options[i];
          }
        }
      }
      cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
      var allAxis = (d[0].map(function(i, j){return i.axis}));
      var total = allAxis.length;
      var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
      var Format = d3.format(".0f");
      //d3.select(id).select("svg").remove();
      
      var svg = d3.create("svg").attr("viewBox", [0, 0, 800, 800]);
      svg.attr("width", cfg.w+cfg.ExtraWidthX)
        .attr("height", cfg.h+cfg.ExtraWidthY);
              
      var g = svg.append("g")
            .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
  
      var tooltip;
      
      //Circular segments
      for(var j=0; j<cfg.levels-1; j++){
        var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
        g.selectAll(".levels")
         .data(allAxis)
         .enter()
         .append("svg:line")
         .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
         .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
         .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
         .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
         .attr("class", "line")
         .style("stroke", "grey")
         .style("stroke-opacity", "0.75")
         .style("stroke-width", "0.3px")
         .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
      }
  
      //Text indicating at what % each level is
      for(var j=0; j<cfg.levels; j++){
        var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
        g.selectAll(".levels")
         .data([1]) //dummy data
         .enter()
         .append("svg:text")
         .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
         .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
         .attr("class", "legend")
         .style("font-family", "sans-serif")
         .style("font-size", "16px")
         .style("font-weight", "bold")
         .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
         .attr("fill", "#737373")
         .text(Format((j+1)*cfg.maxValue/cfg.levels));
      }
      
      series = 0;
  
      var axis = g.selectAll(".axis")
              .data(allAxis)
              .enter()
              .append("g")
              .attr("class", "axis");
  
      axis.append("line")
          .attr("x1", cfg.w/2)
          .attr("y1", cfg.h/2)
          .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
          .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
          .attr("class", "line")
          .style("stroke", "grey")
          .style("stroke-width", "1px");
  
      axis.append("text")
          .attr("class", "legend")
          .text(function(d){return d})
          .style("font-family", "sans-serif")
          .style("font-size", "20px")
          .style("font-weight", "bold")
          .attr("fill", "#4682b4")
          .attr("text-anchor", "middle")
          .attr("dy", "1.5em")
          .attr("transform", function(d, i){return "translate(-5, -25)"})
          .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
          .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});
  
      d.forEach(function(y, x){
        dataValues = [];
        g.selectAll(".nodes")
          .data(y, function(j, i){
            dataValues.push([
              cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
              cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
            ]);
          });
        dataValues.push(dataValues[0]);
        g.selectAll(".area")
            .data([dataValues], d => dataValues.indexOf(d))
            .join(
                enter => {
                    enter
                    .append("polygon")
                    .attr("class", "radar-chart-serie"+series)
                    .style("stroke-width", "2px")
                    .style("stroke", cfg.color(series))
                    .attr("points",function(d) {
                        var str="";
                        for(var pti=0;pti<d.length;pti++){
                            str=str+d[pti][0]+","+d[pti][1]+" ";
                        }
                        return str;
                    })
                    .style("fill", function(j, i){return cfg.color(series)})
                    .style("fill-opacity", cfg.opacityArea)

                    .on('mouseover', function (d){
                        z = "polygon."+d3.select(this).attr("class");
                        g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1); 
                        g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                    })
                    .on('mouseout', function(){
                        g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                    });
                },

                update => {

                },

                exit => {
                }
            );
        series++;
      });
      series=0;
  
  
      d.forEach(function(y, x){
        g.selectAll(".nodes")
          .data(y, d => d.axis)
          .join(
            enter => {
                enter
                    .append("svg:circle")
                    .attr("class", "radar-chart-serie"+series)
                    .attr('r', cfg.radius)
                    .attr("alt", function(j){return Math.max(j.value, 0)})
                    .attr("cx", function(j, i){
                        dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                    return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
                    })
                    .attr("cy", function(j, i){
                        return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
                    })
                    .attr("data-id", function(j){return j.axis})
                    .style("fill", cfg.color(series)).style("fill-opacity", .9)
                    .on('mouseover', function (d){
                            newX =  parseFloat(d3.select(this).attr('cx')) - 10;
                            newY =  parseFloat(d3.select(this).attr('cy')) - 5;
                            
                            tooltip
                                .attr('x', newX)
                                .attr('y', newY)
                                .text(Format(d.value))
                                .transition(200)
                                .style('opacity', 1);
                                
                            z = "polygon."+d3.select(this).attr("class");
                            g.selectAll("polygon")
                                .transition(200)
                                .style("fill-opacity", 0.1); 
                            g.selectAll(z)
                                .transition(200)
                                .style("fill-opacity", .7);
                        })
                    .on('mouseout', function(){
                            tooltip
                                .transition(200)
                                .style('opacity', 0);
                            g.selectAll("polygon")
                                .transition(200)
                                .style("fill-opacity", cfg.opacityArea);
                        })
                    .append("svg:title")
                    .text(function(j){return Math.max(j.value, 0)});
                },

                update => {
                      
                },

                exit => {
                }
            );
        series++;
      });
      //Tooltip
      tooltip = g.append('text')
                 .style('opacity', 0)
                 .style('font-family', 'sans-serif')
                 .style('font-size', '13px');

      
    return svg.node();
  };


/*!
* @license Open source under BSD 2-clause (http://choosealicense.com/licenses/bsd-2-clause/)
* Copyright (c) 2015, Curtis Bratton
* All rights reserved.
*
* Liquid Fill Gauge v1.1
*/
function liquidFillGaugeDefaultSettings(){
return {
    minValue: 0, // The gauge minimum value.
    maxValue: 100, // The gauge maximum value.
    circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
    circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
    circleColor: "#178BCA", // The color of the outer circle.
    waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
    waveCount: 1, // The number of full waves per width of the wave circle.
    waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
    waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
    waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
    waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
    waveAnimate: true, // Controls if the wave scrolls or is static.
    waveColor: "#178BCA", // The color of the fill wave.
    waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
    textVertPosition: .5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
    textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
    valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
    displayPercent: true, // If true, a % symbol is displayed after the value.
    textColor: "#045681", // The color of the value text when the wave does not overlap it.
    waveTextColor: "#A4DBf8" // The color of the value text when the wave overlaps it.
};
}

function loadLiquidFillGauge(elementId, value, config) {
if(config == null) config = liquidFillGaugeDefaultSettings();

var gauge = d3.select("#" + elementId);
var radius = Math.min(parseInt(gauge.style("width")), parseInt(gauge.style("height")))/2;
var locationX = parseInt(gauge.style("width"))/2 - radius;
var locationY = parseInt(gauge.style("height"))/2 - radius;
var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value))/config.maxValue;

var waveHeightScale;
if(config.waveHeightScaling){
    waveHeightScale = d3.scaleLinear()
        .range([0,config.waveHeight,0])
        .domain([0,50,100]);
} else {
    waveHeightScale = d3.scaleLinear()
        .range([config.waveHeight,config.waveHeight])
        .domain([0,100]);
}

var textPixels = (config.textSize*radius/2);
var textFinalValue = parseFloat(value).toFixed(2);
var textStartValue = config.valueCountUp?config.minValue:textFinalValue;
var percentText = config.displayPercent?"%":"";
var circleThickness = config.circleThickness * radius;
var circleFillGap = config.circleFillGap * radius;
var fillCircleMargin = circleThickness + circleFillGap;
var fillCircleRadius = radius - fillCircleMargin;
var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);

var waveLength = fillCircleRadius*2/config.waveCount;
var waveClipCount = 1+config.waveCount;
var waveClipWidth = waveLength*waveClipCount;

// Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
var textRounder = function(value){ return Math.round(value); };
if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
    textRounder = function(value){ return parseFloat(value).toFixed(1); };
}
if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
    textRounder = function(value){ return parseFloat(value).toFixed(2); };
}

// Data for building the clip wave area.
var data = [];
for(var i = 0; i <= 40*waveClipCount; i++){
    data.push({x: i/(40*waveClipCount), y: (i/(40))});
}

// Scales for drawing the outer circle.
var gaugeCircleX = d3.scaleLinear().range([0,2*Math.PI]).domain([0,1]);
var gaugeCircleY = d3.scaleLinear().range([0,radius]).domain([0,radius]);

// Scales for controlling the size of the clipping path.
var waveScaleX = d3.scaleLinear().range([0,waveClipWidth]).domain([0,1]);
var waveScaleY = d3.scaleLinear().range([0,waveHeight]).domain([0,1]);

// Scales for controlling the position of the clipping path.
var waveRiseScale = d3.scaleLinear()
    // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
    // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
    // circle at 100%.
    .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
    .domain([0,1]);
var waveAnimateScale = d3.scaleLinear()
    .range([0, waveClipWidth-fillCircleRadius*2]) // Push the clip area one full wave then snap back.
    .domain([0,1]);

// Scale for controlling the position of the text within the gauge.
var textRiseScaleY = d3.scaleLinear()
    .range([fillCircleMargin+fillCircleRadius*2,(fillCircleMargin+textPixels*0.7)])
    .domain([0,1]);

// Center the gauge within the parent SVG.
var gaugeGroup = gauge.append("g")
    .attr('transform','translate('+locationX+','+locationY+')');

// Draw the outer circle.
var gaugeCircleArc = d3.arc()
    .startAngle(gaugeCircleX(0))
    .endAngle(gaugeCircleX(1))
    .outerRadius(gaugeCircleY(radius))
    .innerRadius(gaugeCircleY(radius-circleThickness));
gaugeGroup.append("path")
    .attr("d", gaugeCircleArc)
    .style("fill", config.circleColor)
    .attr('transform','translate('+radius+','+radius+')');

// Text where the wave does not overlap.
var text1 = gaugeGroup.append("text")
    .text(textRounder(textStartValue) + percentText)
    .attr("class", "liquidFillGaugeText")
    .attr("text-anchor", "middle")
    .attr("font-size", textPixels + "px")
    .style("fill", config.textColor)
    .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');

// The clipping wave area.
var clipArea = d3.area()
    .x(function(d) { return waveScaleX(d.x); } )
    .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
    .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );
var waveGroup = gaugeGroup.append("defs")
    .append("clipPath")
    .attr("id", "clipWave" + elementId);
var wave = waveGroup.append("path")
    .datum(data)
    .attr("d", clipArea)
    .attr("T", 0);

// The inner circle with the clipping wave attached.
var fillCircleGroup = gaugeGroup.append("g")
    .attr("clip-path", "url(#clipWave" + elementId + ")");
fillCircleGroup.append("circle")
    .attr("cx", radius)
    .attr("cy", radius)
    .attr("r", fillCircleRadius)
    .style("fill", config.waveColor);

// Text where the wave does overlap.
var text2 = fillCircleGroup.append("text")
    .text(textRounder(textStartValue) + percentText)
    .attr("class", "liquidFillGaugeText")
    .attr("text-anchor", "middle")
    .attr("font-size", textPixels + "px")
    .style("fill", config.waveTextColor)
    .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');

    // Make the value count up.
    if(config.valueCountUp){
        var textTween = function(){
            var i = d3.interpolate(this.textContent, textFinalValue);
            return function(t) { this.textContent = textRounder(i(t)) + percentText; }
        };
        text1.transition()
            .duration(config.waveRiseTime)
            .tween("text", textTween);
        text2.transition()
            .duration(config.waveRiseTime)
            .tween("text", textTween);
    }

    // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
    var waveGroupXPosition = fillCircleMargin+fillCircleRadius*2-waveClipWidth;
    if(config.waveRise){
        waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(0)+')')
            .transition()
            .duration(config.waveRiseTime)
            .attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')')
            .on("start", function(){ wave.attr('transform','translate(1,0)'); }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
    } else {
        waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')');
    }

    if(config.waveAnimate) animateWave();

    function animateWave() {
        wave.attr('transform','translate('+waveAnimateScale(wave.attr('T'))+',0)');
        wave.transition()
            .duration(config.waveAnimateTime * (1-wave.attr('T')))
            .ease(d3.easeLinear)
            .attr('transform','translate('+waveAnimateScale(1)+',0)')
            .attr('T', 1)
            .on('end', function(){
                wave.attr('T', 0);
                animateWave(config.waveAnimateTime);
            });
    }

    function GaugeUpdater(){
        this.update = function(value){
            var newFinalValue = parseFloat(value).toFixed(2);
            var textRounderUpdater = function(value){ return Math.round(value); };
            if(parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))){
                textRounderUpdater = function(value){ return parseFloat(value).toFixed(1); };
            }
            if(parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))){
                textRounderUpdater = function(value){ return parseFloat(value).toFixed(2); };
            }

            var textTween = function(){
                var i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
                return function(t) { this.textContent = textRounderUpdater(i(t)) + percentText; }
            };

            text1.transition()
                .duration(config.waveRiseTime)
                .tween("text", textTween);
            text2.transition()
                .duration(config.waveRiseTime)
                .tween("text", textTween);

            var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value))/config.maxValue;
            var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);
            var waveRiseScale = d3.scaleLinear()
                // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                // circle at 100%.
                .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
                .domain([0,1]);
            var newHeight = waveRiseScale(fillPercent);
            var waveScaleX = d3.scaleLinear().range([0,waveClipWidth]).domain([0,1]);
            var waveScaleY = d3.scaleLinear().range([0,waveHeight]).domain([0,1]);
            var newClipArea;
            if(config.waveHeightScaling){
                newClipArea = d3.area()
                    .x(function(d) { return waveScaleX(d.x); } )
                    .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
                    .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );
            } else {
                newClipArea = clipArea;
            }

            var newWavePosition = config.waveAnimate?waveAnimateScale(1):0;
            wave.transition()
                .duration(0)
                .transition()
                .duration(config.waveAnimate?(config.waveAnimateTime * (1-wave.attr('T'))):(config.waveRiseTime))
                .ease(d3.easeLinear)
                .attr('d', newClipArea)
                .attr('transform','translate('+newWavePosition+',0)')
                .attr('T','1')
                .on("end", function(){
                    if(config.waveAnimate){
                        wave.attr('transform','translate('+waveAnimateScale(0)+',0)');
                        animateWave(config.waveAnimateTime);
                    }
                });
            waveGroup.transition()
                .duration(config.waveRiseTime)
                .attr('transform','translate('+waveGroupXPosition+','+newHeight+')')
        }
    }

    return new GaugeUpdater();
}