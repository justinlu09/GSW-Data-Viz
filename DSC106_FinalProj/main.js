async function loadJSON(path) {
    let response = await fetch(path);
    let dataset = await response.json();
    return dataset;
}




function plotSalaries(salary) {
    var sal = [];
    var dates = [];
    for (datum of salary) {
        sal.push([datum[0], Math.round(datum[1])]);
        dates.push(datum[0]);
    }
    Highcharts.chart('salaryLine', {
        chart: {
            type: 'line',
            style: {
                fontFamily: "'Montserrat', sans-serif"
            }
        },
        title: {
            text: "GSW's Average Salaries from 2002-2018",
            style: {
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: "Source: ESPN"
        },
        xAxis: {
            categories: dates,
            title: {
                text: 'Season'
            }
        },
        yAxis: {
            title: {
                text: 'Salary'
            }
        },
        series: [{
            data: sal,
            showInLegend: false,
            tooltip: {
                pointFormat: '<b>${point.y}<b/>'
            }
        }],
        credits: false
    });
}

function plotPie(country) {

    Highcharts.chart('cie', {
        chart: {
            type: 'pie',
            style: {
                fontFamily: "'Montserrat', sans-serif"
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
            borderWidth: 1,
            backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true,
            symbolRadius: 0
        },
        title: {
            text: "Championships Won by Coach",
            style: {
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Source: <a href = "http://basketball-reference.com/teams/GSW/coaches.html"> basketball-reference.com </a>'
        },
        tooltip: {
            pointFormat: '{point.y}'
        },
        plotOptions: {
            pie: {
                colors: [
                    '#FFDD33',
                    '#FFA833',
                    '#4633FF',
                    '#ECFF33'
                ],
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    format: "{point.percentage:.1f}%",
                    style: {
                        fontSize: '18px'
                    }
                }
            },
            showInLegend: true
        },
        series: [{
            type: 'pie',
            data:[
                {
                    name: 'Al Attles',
                    y: 1,
                }, {
                    name: 'Edwaard Gottlieb',
                    y: 1,
                }, {
                    name: 'Steve Kerr',
                    y: 3,
                }, {
                    name: 'George Senesky',
                    y: 1,
                }
            ], 
            showInLegend: true
        }
            
    ],
        credits: false
    });
}
function plotScore(score) {
    var scored = [];
    var missed = [];
    for (datum of score) {
        if (datum[2] == 'SCORED') {
            scored.push([datum[0], datum[1]]);
        } else {
            missed.push([datum[0], datum[1]]);
        }
    }
    scoredProp = scored.length / (scored.length + missed.length);
    missedProp = missed.length / (scored.length + missed.length);

    leftTop3 = Array.from({length: 300}, (x, i) => i);
    leftBottom3 = Array.from({length: 300}, (x, i) => i);

    function leftTop3Line(xValues) {
        var dataLin = [],
            xValues = xValues;

        xValues.forEach(function(x) {
            dataLin.push(15 * Math.sqrt(- ( x - 320)) + 250);
        })
        return dataLin;
    }

    Highcharts.chart('court', {
        chart: {
            plotBackgroundImage: 'basketballcourt.jpg',
            style: {
                fontFamily: "'Montserrat', sans-serif"
            }
        },
        title: {
            text: "Golden State Warriors 2016-2017 Shot Log",
            style: {
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: "Source: https://www.mysportsfeed.com/"
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
            borderWidth: 1,
            backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true,
            symbolRadius:0
        },
        xAxis: {
            min: 20,
            max: 1000,
            visible: false
        },
        yAxis: {
            max: 500,
            visible: false, 
            endOnTick: false,

          
        },
        series: [
            // {
            //     type: 'spline',
            //     data: leftTop3Line(leftTop3),
            // },
            {
                type: 'scatter',
                data: scored,
                color: 'green',
                showInLegend: false,
                tooltip: {
                    headerFormat: 'Scored Percentage: '.concat(String((scoredProp * 100).toFixed(2) + '%')),
                    pointFormat: '{undefined}'
                }
            },
            {
                type: 'scatter',
                data: missed,
                color: 'red',
                showInLegend: false,
                tooltip: {
                    headerFormat: 'Missed Percentage: '.concat(String((missedProp * 100).toFixed(2) + '%')),
                    pointFormat: '{undefined}'
                }
            }
        ],
        credits: false
    })
}
function plotBar(s) {
    var d = [];
    var h = [];
    for (datum of s) {
        d.push([datum[0], datum[1]]);
        h.push(datum[0])
    }
    Highcharts.chart('pufBar', {
        chart: {
            type: 'column',
            style: {
                fontFamily: "'Montserrat', sans-serif"
            }
        },
        title: {
            text: "Heights & Rebound Averages",
            style: {
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: "Source: NBA Stats API/basketball-reference.com"
        },
        xAxis: {
            categories: h,
            title: {
                text: 'Heights (cm)'
            }
        },
        yAxis: {
            title: {
                text: 'Average Rebounds'
            }
        },
        series:[
            {
                data: d,
                showInLegend: false,
                tooltip: {
                    headerFormat: '{undefined}',
                    pointFormat: '{point.y:.2f}'
                }
            }
        ],
        credits: false
    });
}
function init() {
    countries = loadJSON('countries.json');
    warriors = loadJSON('GSW.json');
    hr = loadJSON('GSWrebs.json');
    gswSalaries = loadJSON('GSWsalaries.json');
    countries.then(function (country) {
        plotPie(country);
    });
    warriors.then(function (score) {
        plotScore(score);
    });
    hr.then(function (s) {
        plotBar(s);
    });
    gswSalaries.then(function(salary) {
        plotSalaries(salary)
    })
}
document.addEventListener('DOMContentLoaded', init, false);

