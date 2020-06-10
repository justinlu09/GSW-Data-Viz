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
            text: 'Source: <a href="https://www.espn.com/nba/team/_/name/gs/golden-state-warriors">ESPN</a>'
        },
        xAxis: {
            categories: dates,
            title: {
                text: 'Season'
            }
        },
        yAxis: {
            min: 0,
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

function plotPie(coach) {
    Highcharts.chart('cie', {
        chart: {
            type: 'pie',
            style: {
                fontFamily: "'Montserrat', sans-serif"
            }
        },
        title: {
            text: "Championships Won by Coach",
            style: {
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Source: <a href="https://www.basketball-reference.com/"> basketball-reference.com</a>'
        },
        tooltip: {
            pointFormat: '<b>{point.y}<b/>'
        },
        plotOptions: {
            pie: {
                colors: [
                    '#006bb6',
                    '#fdb927',
                    '#FFDD33',
                    '#FF6133'
                ],
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '18px'
                    },
                    format: '{point.name}: {point.y}',
                    distance: 40
                }
            }
        },
        series: [{
            type: 'pie',
            data:[
                {
                    name: 'Steve Kerr',
                    y: 3
                }, {
                    name: 'Edward Gottlieb',
                    y: 1
                }, {
                    name: 'Al Attles',
                    y: 1
                }, {
                    name: 'George Senesky',
                    y: 1
                }
            ]
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
            text: 'Source: <a href="https://www.mysportsfeeds.com/"> mysportsfeeds.com</a>'
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

function plotColumn(shot) {
    var cav2 = 0;
    var cav3 = 0;
    var gsw2 = 0;
    var gsw3 = 0;
    var sas2 = 0;
    var sas3 = 0;
    var bos2 = 0;
    var bos3 = 0;
    for (datum of shot) {
        if ((datum[0] === 2) && (datum[1] === 'SCORED') && (datum[2] === 'GSW')) {
            gsw2 += 1;
        }
        else if ((datum[0] === 3) && (datum[1] === 'SCORED') && (datum[2] === 'GSW')) {
            gsw3 += 1;
        } 
        else if ((datum[0] === 2) && (datum[1] === 'SCORED') && (datum[2] === 'SAS')) {
            sas2 += 1;
        }
        else if ((datum[0] === 3) && (datum[1] === 'SCORED') && (datum[2] === 'SAS')) {
            sas3 += 1;
        }
        else if ((datum[0] === 2) && (datum[1] === 'SCORED') && (datum[2] === 'CAV')) {
            cav2 += 1;
        }
        else if ((datum[0] === 3) && (datum[1] === 'SCORED') && (datum[2] === 'CAV')) {
            cav3 += 1;
        }
        else if ((datum[0] === 2) && (datum[1] === 'SCORED') && (datum[2] === 'BOS')) {
            bos2 += 1;
        }
        else if ((datum[0] === 3) && (datum[1] === 'SCORED') && (datum[2] === 'BOS')) {
            bos3 += 1;
        }
    }

    Highcharts.chart('pufBar', {
        chart: {
            type: 'column',
            style: {
                fontFamily: "'Montserrat', sans-serif"
            }
        },
        colors: [
            '#17408B',
            '#C9082A'
        ],
        title: {
            text: 'Shot Types for Competing Play-off Teams (2017)',
            style: {
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Source: <a href="https://www.mysportsfeeds.com/"> mysportsfeeds.com</a>'
        },
        xAxis: {
            categories: [
                'GSW', 'CAV', 'SAS', 'BOS'
            ],
            labels: {
                useHTML: true,
                formatter: function() {
                    if (this.value == 'GSW') {
                        return '<img src = "GSWlogo.png" style = "width: 60px; vertical-align: middle"/>'
                    }
                    else if (this.value == 'CAV') {
                        return '<img src = "CAVlogo.png" style = "width: 70px; vertical-align: middle"/>'
                    }
                    else if (this.value == 'BOS') {
                        return '<img src = "BOSlogo.png" style = "width: 80px; vertical-align: middle"/>'
                    }
                    else if (this.value == 'SAS') {
                        return '<img src = "SPURSlogo.jpg" style = "width: 80px; vertical-align: middle"/>'
                    }
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of baskets made'
            }
        },
        series: [{
            name: '2-point shots',
            data: [gsw2, cav2, sas2, bos2]
        },
        {
            name: '3-point shots',
            data: [gsw3, cav3, sas3, bos3]
        }
    ],
    credits: false
    })
}

function init() {
    coaches = loadJSON('countries.json');
    warriors = loadJSON('GSW.json');
    gswSalaries = loadJSON('GSWsalaries.json');
    bofa = loadJSON('championLog.json');
    coaches.then(function (coach) {
        plotPie(coach);
    });
    warriors.then(function (score) {
        plotScore(score);
    });
    gswSalaries.then(function(salary) {
        plotSalaries(salary);
    });
    bofa.then(function(shot) {
        plotColumn(shot);
    });
}

document.addEventListener('DOMContentLoaded', init, false);
