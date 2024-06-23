const exportButton = document.getElementById("export-button");
const resultsButton = document.querySelector(".results-button");
const seljudete= document.getElementById("select-classroom select-2");
const selcateg_nat=document.getElementById("select-classroom select-4");
const selecateg_comunit=document.getElementById("select-classroom select-3");
const selAn=document.getElementById("select-1 years");
let myChart = null;
let C=null;


resultsButton.addEventListener("click", async function () {
  let valAN=selAn.value.toUpperCase();
  if (valAN=="2013" || valAN=="2014"){
     await fetch('http://localhost/APa/api/data.php')
          .then (async response => await response.json())
          .then(data => {
            console.log(data);
            var judete = [];
            var Categorie_Nationala = [];
            var Categorie_Comunitara = [];
            var Total = [];
            var Marca=[];
            var An=[];
            var filteredData=[];
            let valJud=seljudete.value.toUpperCase();
            let valselcateg_nat=selcateg_nat.value.toUpperCase();
            let valselcateg_com=selecateg_comunit.value;
            data.forEach(function(item) {
            if((item.JUDET.includes(valJud))&&(item.CATEGORIE_NATIONALA.includes(valselcateg_nat))&&(item.CATEGORIA_COMUNITARA.includes(valselcateg_com))&&(item.AN.includes(valAN))){
              judete.push(item.JUDET);
              Categorie_Nationala.push(item.CATEGORIE_NATIONALA);
              Categorie_Comunitara.push(item.CATEGORIA_COMUNITARA);
              if(Marca.includes(item.MARCA)){
                Total[Total.length-1]= String(parseInt(Total[Total.length-1])+ parseInt(item.TOTAL));
              }
              else{
              Marca.push(item.MARCA);
              Total.push(item.TOTAL);
              }
              
              An.push(item.AN);
              }
          });

            const ctx = document.getElementById('chart');
            if (myChart) {
              myChart.destroy();
            }
            const Visualization=document.getElementById("select-2 vs");
            C=Visualization.value;
            switch(C)
           { case 'line':
                     myChart = new Chart(ctx, {
                        type: 'line', // or 'line', 'pie', etc.
                        data: {
                            labels: Marca,
                            datasets: [{
                                label: 'Total',
                                data: Total,
                                backgroundColor: 'black',
                                borderColor: 'black',
                                borderWidth: 1
                            }]
                        },
                        options: {
                          animation: false,
                          resposive: false,
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              ticks: {
                                color: "black",
                              },
                            },
                            x: {
                              ticks: {
                                color: "black",
                              },
                            },
                          },
                
                          plugins: {
                            title: {
                              display: true,
                              text: "Total per country",
                              color: "black",
                              font: {
                                size: 18,
                              },
                            },
                            legend: {
                              labels: {
                                color: "black",
                              },
                            },
                          },
                        }
                    });
             case 'bar':
              myChart = new Chart(ctx, {
               // bar, horizontalBar, pie, line, doughnut, radar, polarArea

        data: {
          labels: Marca,
          datasets: [
            {
              type:'bar',
              label: 'Total',
              data: Total,
              backgroundColor: "red",
            },
          ],
        },

        options: {
          animation: false,
          resposive: false,
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                color: "black",
              },
            },
            x: {
              ticks: {
                color: "black",
              },
            },
          },

          plugins: {
            title: {
              display: true,
              text: "Total per country",
              color: "black",
              font: {
                size: 18,
              },
            },
            legend: {
              labels: {
                color: "black",
              },
            },
          },
        }
              });  
             case 'pie':
              myChart = new Chart(ctx, {
                type: "doughnut",
                data: {
                  datasets: [
                    {
                      data: Total,
                      backgroundColor: [
                        "red",
                        "blue",
                        "yellow",
                        "green",
                        "purple",
                        "gray",
                        "red",
                        "blue",
                        "yellow",
                        "green",
                        "purple",
                        "gray",
                        "#c934ba",
                        "#d8d2d8",
                        "#262430",
                        "#9b8b63",
                        "#3e443b",
                        "#373a23",
                        "#0a4722",
                        "#e2ced9",
                        "#274944",
                        "#7c89a8",
                        "#559b5c",
                        "#c1c6bc",
                        "#c6a28b",
                        "#060704",
                        "#080c09",
                        "#000000",
                        "#4c7cbf",
                        "#828282",
                        "#a0d18e",
                        "#aee6e8",
                        "#1d122d",
                        "#0a0909",
                        "#443f40",
                        "#497260",
                        "#89117f",
                        "#b7c6b3",
                        "#75756d",
                        "#d8745b",
                        "#351902",
                        "#094900",
                        "#a56de0",
                        "#081019",
                        "#59d815",
                        "#769e83",
                        "#9986a8",
                        "#b72b1f",
                        "#a09c93",
                        "#5324e2",
                        "#edd5d3",
                        "#d85c49",
                        "#f7de99",
                        "#ea2c98",
                        "#c7fc71",
                        "#8b4cef",
                        "#a69dad"
                      ],
                      borderWidth: 0,
                    },
                  ],
                  labels: Marca,
                },
        
                options: {
                  plugins: {
                    title: {
                      display: true,
                      text: "Total Parks by Country",
                      color: "black",
                      font: {
                        size: 18,
                      },
                    },
        
                    legend: {
                      labels: {
                        color: "black",
                      },
                    },
                  },
                },
              });
            }
                })
                .catch(error => console.error('Error fetching data:', error));
    } else if(valAN=="2015"||valAN=="2016"){
      await fetch('http://localhost/APa/api/data2.php')
          .then (async response => await response.json())
          .then(data => {
            console.log(data);
            var judete = [];
            var Categorie_Nationala = [];
            var Categorie_Comunitara = [];
            var Total = [];
            var Marca=[];
            var An=[];
            var filteredData=[];
            let valJud=seljudete.value.toUpperCase();
            let valselcateg_nat=selcateg_nat.value.toUpperCase();
            let valselcateg_com=selecateg_comunit.value.toUpperCase();
            data.forEach(function(item) {
            if((item.JUDET.includes(valJud))&&(item.CATEGORIE_NATIONALA.includes(valselcateg_nat))&&(item.CATEGORIA_COMUNITARA.includes(valselcateg_com))&&(item.AN.includes(valAN))){
              judete.push(item.JUDET);
              Categorie_Nationala.push(item.CATEGORIE_NATIONALA);
              Categorie_Comunitara.push(item.CATEGORIA_COMUNITARA);
              if(Marca.includes(item.MARCA)){
                Total[Total.length-1]= String(parseInt(Total[Total.length-1])+ parseInt(item.TOTAL));
              }
              else{
              Marca.push(item.MARCA);
              Total.push(item.TOTAL);
              }
             
              
              An.push(item.AN);
              }
          });

            const ctx = document.getElementById('chart');
            if (myChart) {
              myChart.destroy();
            }
            const Visualization=document.getElementById("select-2 vs");
            C=Visualization.value;
            switch(C)
           { case 'line':
                     myChart = new Chart(ctx, {
                        type: 'line', // or 'line', 'pie', etc.
                        data: {
                            labels: Marca,
                            datasets: [{
                                label: 'Total',
                                data: Total,
                                backgroundColor: 'black',
                                borderColor: 'black',
                                borderWidth: 1
                            }]
                        },
                        options: {
                          animation: false,
                          resposive: false,
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              ticks: {
                                color: "black",
                              },
                            },
                            x: {
                              ticks: {
                                color: "black",
                              },
                            },
                          },
                
                          plugins: {
                            title: {
                              display: true,
                              text: "Total per country",
                              color: "black",
                              font: {
                                size: 18,
                              },
                            },
                            legend: {
                              labels: {
                                color: "black",
                              },
                            },
                          },
                        }
                    });
             case 'bar':
              myChart = new Chart(ctx, {
               // bar, horizontalBar, pie, line, doughnut, radar, polarArea

        data: {
          labels: Marca,
          datasets: [
            {
              type:'bar',
              label: 'Total',
              data: Total,
              backgroundColor: "red",
            },
          ],
        },

        options: {
          animation: false,
          resposive: false,
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                color: "black",
              },
            },
            x: {
              ticks: {
                color: "black",
              },
            },
          },

          plugins: {
            title: {
              display: true,
              text: "Total per country",
              color: "black",
              font: {
                size: 18,
              },
            },
            legend: {
              labels: {
                color: "black",
              },
            },
          },
        }
              });  
             case 'doughnut':
              myChart = new Chart(ctx, {
                type: "doughnut",
                data: {
                  datasets: [
                    {
                      data: Total,
                      backgroundColor: [
                        "red",
                        "blue",
                        "yellow",
                        "green",
                        "purple",
                        "gray",
                      ],
                      borderWidth: 0,
                    },
                  ],
                  labels: Marca,
                },
        
                options: {
                  plugins: {
                    title: {
                      display: true,
                      text: "Total Parks by Country",
                      color: "black",
                      font: {
                        size: 18,
                      },
                    },
        
                    legend: {
                      labels: {
                        color: "black",
                      },
                    },
                  },
                },
              });
            }
                })
                .catch(error => console.error('Error fetching data:', error));
    } else if (valAN=="2017"){
      await fetch('http://localhost/APa/api/data3.php')
          .then (async response => await response.json())
          .then(data => {
            console.log(data);
            var judete = [];
            var Categorie_Nationala = [];
            var Categorie_Comunitara = [];
            var Total = [];
            var Marca=[];
            var An=[];
            var filteredData=[];
            let valJud=seljudete.value.toUpperCase();
            let valselcateg_nat=selcateg_nat.value.toUpperCase();
            let valselcateg_com=selecateg_comunit.value.toUpperCase();
            data.forEach(function(item) {
            if((item.JUDET.includes(valJud))&&(item.CATEGORIE_NATIONALA.includes(valselcateg_nat))&&(item.CATEGORIA_COMUNITARA.includes(valselcateg_com))&&(item.AN.includes(valAN))){
              judete.push(item.JUDET);
              Categorie_Nationala.push(item.CATEGORIE_NATIONALA);
              Categorie_Comunitara.push(item.CATEGORIA_COMUNITARA);
              if(Marca.includes(item.MARCA)){
                Total[Total.length-1]= String(parseInt(Total[Total.length-1])+ parseInt(item.TOTAL));
              }
              else{
              Marca.push(item.MARCA);
              Total.push(item.TOTAL);
              }
              
              An.push(item.AN);
              }
          });

            const ctx = document.getElementById('chart');
            if (myChart) {
              myChart.destroy();
            }
            const Visualization=document.getElementById("select-2 vs");
            C=Visualization.value;
            switch(C)
           { case 'line':
                     myChart = new Chart(ctx, {
                        type: 'line', // or 'line', 'pie', etc.
                        data: {
                            labels: Marca,
                            datasets: [{
                                label: 'Total',
                                data: Total,
                                backgroundColor: 'black',
                                borderColor: 'black',
                                borderWidth: 1
                            }]
                        },
                        options: {
                          animation: false,
                          resposive: false,
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              ticks: {
                                color: "black",
                              },
                            },
                            x: {
                              ticks: {
                                color: "black",
                              },
                            },
                          },
                
                          plugins: {
                            title: {
                              display: true,
                              text: "Total per country",
                              color: "black",
                              font: {
                                size: 18,
                              },
                            },
                            legend: {
                              labels: {
                                color: "black",
                              },
                            },
                          },
                        }
                    });
             case 'bar':
              myChart = new Chart(ctx, {
               // bar, horizontalBar, pie, line, doughnut, radar, polarArea

        data: {
          labels: Marca,
          datasets: [
            {
              type:'bar',
              label: 'Total',
              data: Total,
              backgroundColor: "red",
            },
          ],
        },

        options: {
          animation: false,
          resposive: false,
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                color: "black",
              },
            },
            x: {
              ticks: {
                color: "black",
              },
            },
          },

          plugins: {
            title: {
              display: true,
              text: "Total per country",
              color: "black",
              font: {
                size: 18,
              },
            },
            legend: {
              labels: {
                color: "black",
              },
            },
          },
        }
              });  
             case 'doughnut':
              myChart = new Chart(ctx, {
                type: "doughnut",
                data: {
                  datasets: [
                    {
                      data: Total,
                      backgroundColor: [
                        "red",
                        "blue",
                        "yellow",
                        "green",
                        "purple",
                        "gray",
                      ],
                      borderWidth: 0,
                    },
                  ],
                  labels: Marca,
                },
        
                options: {
                  plugins: {
                    title: {
                      display: true,
                      text: "Total Parks by Country",
                      color: "black",
                      font: {
                        size: 18,
                      },
                    },
        
                    legend: {
                      labels: {
                        color: "black",
                      },
                    },
                  },
                },
              });
            }
                })
                .catch(error => console.error('Error fetching data:', error));
    }
              
  });

  function downloadCSV(csv, filename) {
    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function exportChartToCSV(myChart) {
  const datasets = myChart.data.datasets;
  const labels = myChart.data.labels;
  let csv = 'Label,Value\n';

  datasets.forEach((dataset) => {
      dataset.data.forEach((value, index) => {
          csv += `${labels[index]},${value}\n`;
      });
  });

  downloadCSV(csv, 'chart-data.csv');
}

function downloadWebP(canvas, filename) {
  const downloadLink = document.createElement('a');
  downloadLink.download = filename;
  var chart = document.getElementById("chart");
  downloadLink.href = chart.toDataURL('image/webp');
  downloadLink.click();
}

function downloadSVG(filename) {
  var canvas = document.getElementById('chart');
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var canvasDataURL = canvas.toDataURL("image/png");

  var svgData = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}">
          <image href="${canvasDataURL}" x="0" y="0" width="${canvasWidth}" height="${canvasHeight}" />
      </svg>
  `;
  
  var svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  var svgUrl = URL.createObjectURL(svgBlob);
  var downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = 'chart.svg';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}



  exportButton.addEventListener("click", function () {
    const exportSelect = document.getElementById("export-select");
    const exportFormat = exportSelect.value;
    switch (exportFormat) {
      case "CSV":
        exportAsCSV();
        break;
      case "WebP":
        exportAsWebP();
        break;
      case "SVG":
        exportAsSVG(myChart);
        break;
      default:
        alert("Invalid export format");
    }
  });



const exportAsCSV = () => {
  exportChartToCSV(myChart);
};

  
  const exportAsWebP = () => {
    downloadWebP(myChart,"chart.webp");
};

const exportAsSVG = () =>{
  downloadSVG("chart.svg");
};

