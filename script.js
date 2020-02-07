 // data retrieved on 06.02.2020 from https://data.giss.nasa.gov/gistemp/
// working with API locally (file saved on localhost)

async function getData() { //named async bcos its an asynchronous function making asynchronous calls
    const response = await fetch("nasaData.csv");
    const data = await response.text();  //we decide to receive data as text. it could also be json,blob,arraybuffer,redirect etc
    console.log(data);
   
   //parse the csv; meaning breaking up the data and arranging it objects etc
    //we use the split function here to put the element in an array
   
    //we can split the table with line break since each row is demacated by a "\n"
    //table could also be demacated with \, \. etc
    const table = data.split("\n");
    //row refers to the rows in the table and 
    //first 3 rows are splited in column
    table.forEach(row =>{
        const columns =row.split(",");
        const year =columns[0];
        xlabels.push(year); //chart ref can be added here
        const tempA =columns[1];
         avgMonths.push(tempA); //chart ref can be added here
         const tempN =columns[2];
         avgMonths1.push(tempA); //chart ref can be added here
        console.log(year,tempA, tempN);
    });
}


// Presenting the result of the ocean mean temperature in a chart
const xlabels =[];  //important its made a global variable
const avgMonths = [];  //important its made a global variable
const avgMonths1 =[];//important its made a global variable

chartIt();  //calling function (position matter)

async function chartIt(){
    await getData();  //after chartIt is called, it waits for getData() before executing
const ctx = document.getElementById('chart').getContext('2d');
// To present as chart we create a new variable and set to blank array
const myChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: xlabels,  //const newLabel is referenced here
        datasets: [{
            label: 'Ocean Avg temperature (Northern Hemisphere)',
            data: avgMonths, avgMonths1,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    });
}
 