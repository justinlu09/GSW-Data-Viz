async function loadJSON(path) {
    let response = await fetch(path);
    let dataset = await response.json();
    return dataset;
}


function plotScatter(dist) {
    var d = []
    for (datum of dist) {
        d.push([datum[0], datum[1]])
    }
    Highcharts.chart('shotLogScatter', {
        chart: {
            type: 'scatter'
        },
        title: {
            text: 'Accuracy for Shot Distances for 2014-2015 Season'
        },
        subtitle: {
            text: "Source: Scraped from NBA's API"
        },
        xAxis: {
            title: {
                text: 'Distance from Hoop'
            }
        },
        yAxis: {
            title: {
                text: 'Accuracy (%)'
            }
        },
        series: [{
            data: d,
            showInLegend: false
        }],
        credits: false
    });
}

function plotSalaries(salary) {
    var sal = [];
    var dates = [];
    for (datum of salary) {
        sal.push([datum[0], datum[1]]);
        dates.push(datum[0]);
    }
    Highcharts.chart('salaryLine', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Salaries from 2002-2018'
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
            showInLegend: false
        }],
        credits: false
    });
}

function plotPie(country) {
    var datu = [];
    for (datum of country) {
        datu.push([datum[0], datum[1]]);
    }
    Highcharts.chart('cie', {
        chart: {
            type: 'pie'
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
            text: "Players' Ethnicities"
        },
        subtitle: {
            text: "Source: Scraped from NBA's API/Basketball Reference (1996-2019)"
        },
        series: [{
            data: datu,
            showInLegend: true
        }],
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
    Highcharts.chart('court', {
        chart: {
            type: 'scatter'
        },
        title: {
            text: "Golden State Warriors 2016-2017 Shot Log"
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
            visible: false
        },
        yAxis: {
            visible: false
        },
        series: [
            {
                type: 'scatter',
                data: scored,
                color: 'green',
                showInLegend: false
            },
            {
                type: 'scatter',
                data: missed,
                color: 'red',
                showInLegend: false
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
            type: 'column'
        },
        title: {
            text: "Heights & Rebound Averages"
        },
        xAxis: {
            categories: h,
            title: {
                text: 'Heights'
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
                showInLegend: false
            }
        ],
        credits: false
    });
}
function init() {
    distance = loadJSON('shotLogs.json');
    salaries = loadJSON('salaries.json');
    countries = loadJSON('countries.json');
    warriors = loadJSON('GSW.json');
    hr = loadJSON('rebs.json');
    distance.then(function (dist) {
        plotScatter(dist);
    });
    salaries.then(function (salary) {
        plotSalaries(salary);
    });
    countries.then(function (country) {
        plotPie(country);
    });
    warriors.then(function (score) {
        plotScore(score);
    });
    hr.then(function (s) {
        plotBar(s);
    })
}
document.addEventListener('DOMContentLoaded', init, false);

