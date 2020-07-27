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
    initTable(meta_id, ethnicity, gender, age, location, bbtype, wfreq)
    var dropdownMenu = d3.select("#selDataset");

    namedata.forEach((name) => {
        var row = dropdownMenu.append("option");
        row.text(name);
        console.log(name)
    });

    function initTable(meta_id, ethnicity, gender, age, location, bbtype, wfreq) {
        var table = d3.select("#sample-metadata");
        
        table.append("tbody").text("ID: " + meta_id[0]);
        
        table.append("tbody").text("Ethnicity: " + ethnicity[0]);

        table.append("tbody").text("Gender: " + gender[0]);

        table.append("tbody").text("Age: " + age[0]);

        table.append("tbody").text("Location: " + location[0]);

        table.append("tbody").text("bbtype: " + bbtype[0]);

        table.append("tbody").text("wfreq: " + wfreq[0]);
        

    }
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
            if (ethnicity !== "") {
                table.append("tbody").text("Ethnicity: " + ethnicity);
            };
            if (gender !== "") {
                table.append("tbody").text("Gender: " + gender);
            };
            if (age !== "") {
                table.append("tbody").text("Age: " + age);
            };
            if (location !== "") {
                table.append("tbody").text("Location: " + location);
            };
            if (bbtype !== "") {
                table.append("tbody").text("bbtype: " + bbtype);
            };
            if (wfreq !== "") {
                table.append("tbody").text("wfreq: " + wfreq);
            };

        }
            
    });
};











