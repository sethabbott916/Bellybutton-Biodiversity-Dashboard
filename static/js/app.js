
//Open json file containing sample data first
d3.json("data/samples.json").then(function(data){

    //extract values from dataset and assign them to variables
    console.log(data);
    var sampledata = Object.values(data.samples);
    var metadata = Object.values(data.metadata);
    var namedata = Object.values(data.names);
    var svalues = sampledata.map(samples =>  samples.sample_values);
    console.log(svalues)
    var otu_ids = sampledata.map(samples =>  samples.otu_ids);
    console.log(otu_ids)
    var otu_labels = sampledata.map(samples =>  samples.otu_labels);
    var meta_id = metadata.map(metadata =>  metadata.id);
    var ethnicity = metadata.map(metadata =>  metadata.ethnicity);
    var gender = metadata.map(metadata =>  metadata.gender);
    var age = metadata.map(metadata =>  metadata.age);
    var location = metadata.map(metadata =>  metadata.location);
    var bbtype = metadata.map(metadata =>  metadata.bbtype);
    var wfreq = metadata.map(metadata =>  metadata.wfreq);
    console.log(wfreq)

    //Build table with rows for each different value availavle for that subject
    initTable(meta_id, ethnicity, gender, age, location, bbtype, wfreq)
    var dropdownMenu = d3.select("#selDataset");

    
    // append a dropdown menu option for each unique subject
    namedata.forEach((name) => {
        var row = dropdownMenu.append("option");
        row.text(name);
    });

    //Populate table with summary data for the subject
    function initTable(meta_id, ethnicity, gender, age, location, bbtype, wfreq) {
        var table = d3.select("#sample-metadata");
        table.append("tbody").text("ID: " + meta_id[0]);
        table.append("tbody").text("Ethnicity: " + ethnicity[0]);
        table.append("tbody").text("Gender: " + gender[0]);
        table.append("tbody").text("Age: " + age[0]);
        table.append("tbody").text("Location: " + location[0]);
        table.append("tbody").text("bbtype: " + bbtype[0]);
        table.append("tbody").text("wfreq: " + wfreq[0])
    };

    // assign data for microbes with the highest values to variables
    var topsvalues = svalues[0].slice(0, 10);
    var topotuids = otu_ids[0].slice(0, 10);
    var hoverotu = otu_labels[0].slice(0, 10);
    console.log(hoverotu)
    
    //loop to create labels for top microbes
    barlabels = []
    for (var i = 0; i < 10; i++) {
        barlabels[i] = "OTU " + topotuids[i]; 
    }
    console.log(barlabels)

    //Reverse values so that bar graph puts higher values at the top
    var topsvalues = topsvalues.reverse();
    var barlabels = barlabels.reverse();
    console.log(barlabels);

    //specify data being represented in bubble chart
    var trace2 = {
        x: otu_ids[0],
        y: svalues[0],
        text: otu_labels[0],
        mode: 'markers',
        marker: {
          color: otu_ids[0],
          size: svalues[0]
        }
      };
      
    var bubbledata = [trace2];
    
    //define layout for bubble chart
    var layout = {
        title: "OTU ID",
        showlegend: false
    };
      
    //plot bubble chart to div: "bubble"
    Plotly.newPlot('bubble', bubbledata, layout);

    //define data input for bar chart 
    //(must be an object so put dictionary within "[]")
    var bardata = [{
        x: topsvalues,
        y: barlabels,
        text: hoverotu,
        type: "bar",
        orientation: "h"
    }];


  // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", bardata);

    var gaugedata = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq[0],
          title: { text: "Belly Button Washing Frequency: Scrubs per Week" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 6], color: "lightgray" },
              { range: [6, 9], color: "lightblue" }
            ],
            }
        }
    ];
      
    var gaugelayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', gaugedata, gaugelayout);
    
});



    // This function is called when a dropdown menu item is selected
function optionChanged(value) {
            
    var dropdownMenu = d3.select("#selDataset");
    var dropvalue = dropdownMenu.property("value");
    console.log(dropvalue);

    d3.json("data/samples.json").then(function(data){

        var metadata = Object.values(data.metadata);
        currentdata = metadata.filter(row => row.id == dropvalue); 
        console.log(currentdata)
        var meta_id = currentdata[0].id
        var ethnicity = currentdata[0].ethnicity
        var gender = currentdata[0].gender
        var age = currentdata[0].age
        var location = currentdata[0].location
        var bbtype = currentdata[0].bbtype
        var wfreq = currentdata[0].wfreq
        buildTable(meta_id, ethnicity, gender, age, location, bbtype, wfreq);

        var sampledata = Object.values(data.samples);
        sampledata = sampledata.filter(row => row.id == dropvalue);
        console.log(sampledata)

        var svalues = sampledata.map(samples =>  samples.sample_values);
        console.log(svalues)
        var otu_ids = sampledata.map(samples =>  samples.otu_ids);
        console.log(otu_ids)
        var otu_labels = sampledata.map(samples =>  samples.otu_labels);
        console.log(otu_labels)

        var trace2 = {
            x: otu_ids[0],
            y: svalues[0],
            text: otu_labels[0],
            mode: 'markers',
            marker: {
              color: otu_ids[0],
              size: svalues[0]
            }
          };
          
        var bubbledata = [trace2];
          
        var layout = {
            title: "OTU ID",
            showlegend: false
        };
          
        Plotly.newPlot('bubble', bubbledata, layout);


        var topsvalues = svalues[0].slice(0, 10);
        var topotuids = otu_ids[0].slice(0, 10);
        var hoverotu = otu_labels[0].slice(0, 10);
        
        barlabels = []
        
        for (var i = 0; i < 10 ; i++) {
            //fixed bug for subjects with less than 10 results
            if (topotuids[i] !== undefined){
            barlabels[i] = "OTU " + topotuids[i]; 
            }
        };


        var topsvalues = topsvalues.reverse();
        var barlabels = barlabels.reverse();

        // define data for bar plot and put it in object format
        var bardata = [{
            x: topsvalues,
            y: barlabels,
            text: hoverotu,
            type: "bar",
            orientation: "h"
        }];

    // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", bardata);

        var gaugedata = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: wfreq,
              title: { text: "Belly Button Washing Frequency: Scrubs per Week" },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9] },
                steps: [
                  { range: [0, 6], color: "lightgray" },
                  { range: [6, 9], color: "lightblue" }
                ],
                }
            }
        ];
          
        var gaugelayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', gaugedata, gaugelayout);


        
        function buildTable(meta_id, ethnicity, gender, age, location, bbtype, wfreq) {
            var table = d3.select("#sample-metadata");
            d3.select("#sample-metadata").html("");
            table.append("tbody").text("ID: " + meta_id);
            if (ethnicity !== null) {
                table.append("tbody").text("Ethnicity: " + ethnicity);
            };
            if (gender !== null) {
                table.append("tbody").text("Gender: " + gender);
            };
            if (age !== null) {
                table.append("tbody").text("Age: " + age);
            };
            if (location !== null) {
                table.append("tbody").text("Location: " + location);
            };
            if (bbtype !== null) {
                table.append("tbody").text("bbtype: " + bbtype);
            };
            if (wfreq !== null) {
                table.append("tbody").text("wfreq: " + wfreq);
            };

        }
            
    });
};











