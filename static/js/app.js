d3.json("samples.json").then(function(data){
    console.log(data);
    var sampledata = Object.values(data.samples);
    console.log(sampledata);
    var metadata = Object.values(data.metadata);
    console.log(metadata);
    var namedata = Object.values(data.names);
    console.log(namedata);
    var svalues = sampledata.map(samples =>  samples.sample_values);
    console.log(svalues)
    var otu_ids = sampledata.map(samples =>  samples.otu_ids);
    console.log(otu_ids)
    var otu_labels = sampledata.map(samples =>  samples.otu_labels);
    console.log(otu_labels)
    var meta_id = metadata.map(metadata =>  metadata.id);
    console.log(meta_id)
    var ethnicity = metadata.map(metadata =>  metadata.ethnicity);
    console.log(ethnicity)
    var gender = metadata.map(metadata =>  metadata.gender);
    console.log(gender)
    var age = metadata.map(metadata =>  metadata.age);
    console.log(age)
    var location = metadata.map(metadata =>  metadata.location);
    console.log(location)
    var bbtype = metadata.map(metadata =>  metadata.bbtype);
    console.log(bbtype)
    var wfreq = metadata.map(metadata =>  metadata.wfreq);
    console.log(wfreq)

    var dropdownMenu = d3.select("#selDataset");

    namedata.forEach((name) => {
        var row = dropdownMenu.append("option");
        row.text(name);
        console.log(name)
    });
});

d3.selectAll("#selDataset").on("change", optionChanged);


    // This function is called when a dropdown menu item is selected
    function optionChanged(value) {
            
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dropvalue = dropdownMenu.property("value");
         console.log(dropvalue)

        currentdata = sampledata.filter(row => row.id == dropvalue); 
         console.log(currentdata)
    };








