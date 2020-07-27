d3.json("samples.json").then(function(data){
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
    initTable(meta_id, ethnicity, gender, age, location, bbtype, wfreq)
    var dropdownMenu = d3.select("#selDataset");

    namedata.forEach((name) => {
        var row = dropdownMenu.append("option");
        row.text(name);
    });

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

    var topsvalues = svalues[0].slice(0, 10);
    var topotuids = otu_ids[0].slice(0, 10);
    var hoverotu = otu_labels[0].slice(0, 10);
    console.log(hoverotu)
    
    barlabels = []
    for (var i = 0; i < 10; i++) {
        barlabels[i] = "OTU " + topotuids[i]; 
    }
    console.log(barlabels)

    var topsvalues = topsvalues.reverse();

    var barlabels = barlabels.reverse();
    console.log(barlabels);

    var trace = {
        x: topsvalues,
        y: barlabels,
        text: hoverotu,
        type: "bar",
        orientation: "h"
    };

    var bardata = [trace];

  // Define the plot layout
    var layout = {
    xaxis: { title: "Sample Value" },
    yaxis: { title: "OTU ID"}
    };

  // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", bardata, layout);

});

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }    

    // This function is called when a dropdown menu item is selected
function optionChanged(value) {
            
    var dropdownMenu = d3.select("#selDataset");
    var dropvalue = dropdownMenu.property("value");
    console.log(dropvalue);

    d3.json("samples.json").then(function(data){

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











