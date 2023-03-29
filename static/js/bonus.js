function gaugeGraph(patientID){
    const belly_button_json_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json" ;
    d3.json(belly_button_json_url).then(function(data) {
        let metadata = data.metadata;
        let patient = metadata.filter(       
            (samplePatient) => samplePatient.id == patientID
        )[0];

        // Guage Graph
        var guageData = [
            {
              domain: { x: [0, 5], y: [0, 1] },
              value: patient.wfreq,
              text: patient.wfreq,
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 10 },
              gauge: {
                axis: { range: [null, 9] },
                steps: [
                  { range: [0, 1], color: "rgb(248, 243, 236)" },
                  { range: [1, 2], color: "rgb(239, 234, 220)" },
                  { range: [2, 3], color: "rgb(230, 225, 205)" },
                  { range: [3, 4], color: "rgb(218, 217, 190)" },
                  { range: [4, 5], color: "rgb(204, 209, 176)" },
                  { range: [5, 6], color: "rgb(189, 202, 164)" },
                  { range: [6, 7], color: "rgb(172, 195, 153)" },
                  { range: [7, 8], color: "rgb(153, 188, 144)" },
                  { range: [8, 9], color: "rgb(132, 181, 137)" },
                ],
              },
            },
          ];
      
          var layout = {
            title: "<b>Belly Button Washing Frequency</b> <br>Scrubs Per Week</br>",
            width: 400,
            height: 400,
            margin: { t: 50, r: 25, l: 25, b: 25 },
          };
          Plotly.newPlot("gauge", guageData, layout);
    });

}