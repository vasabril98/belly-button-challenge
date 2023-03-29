


function graphs1(patientID){
    const belly_button_json_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json" ;
    d3.json(belly_button_json_url).then(function(data) {
        let samples = data.samples;
        let patient = samples.filter(       
            (samplePatient) => samplePatient.id == patientID
        )[0];
    
        let ids = patient.otu_ids;
        let values = patient.sample_values;
        let labels = patient.otu_labels;

        // Horizontal Bar Graph
        let trace1 = {
            x: values.slice(0, 10).reverse(),
            y: ids
            .slice(0, 10)
            .map((otuID) => `OTU ${otuID}`)
            .reverse(),
            text: labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        };

        let data_graph1 = [trace1];
    
        let layout1 = {
            title: "Top 10 OTUs Found",
            xaxis: { autorange: true },
            yaxis: { autorange: true },
            margin: { t: 75, l: 105 },
            height: 600,
        };
    
        Plotly.newPlot("bar", data_graph1, layout1);


        // Buble Graph
        let trace2 = {
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
            color: ids,
            size: values,
            colorscale: "Earth",
            },
        };
    
        let data_graph2 = [trace2];
    
        let layout2 = {
            margin: { t: 0 },
            xaxis: { title: "OTU ID" },
            hovermode: "closest",
            width: 1250,
        };
    
        Plotly.newPlot("bubble", data_graph2, layout2);
    });

}

function graphs2(patientID){
    const belly_button_json_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json" ;
    d3.json(belly_button_json_url).then(function(data) {
        let metadata = data.metadata;
        let patient = metadata.filter(       
            (samplePatient) => samplePatient.id == patientID
        )[0];
        

        // Demographics Box
        let demographicsBox = d3.select("#sample-metadata").html("");
        for (const key in patient ){
            demographicsBox.append("h6").text(`${key}: ${patient[key]}`);

        }
    });

}

function init(){
    const belly_button_json_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json" ;

    d3.json(belly_button_json_url).then(function(data) {
        let names = data.names;
        // add all the test subject ID no. to the dropdown menu
        let dropdown = d3.select("#selDataset");
        for(let i = 0 ; i < names.length ; i++){
            dropdown.append("option").text(names[i]);
        }

        const firstPatient = names[0];
        graphs1(firstPatient);
        graphs2(firstPatient);
        gaugeGraph(firstPatient);
    });
}

function optionChanged(patientID) {
    graphs1(patientID);
    graphs2(patientID);
    gaugeGraph(patientID);

}

init();
